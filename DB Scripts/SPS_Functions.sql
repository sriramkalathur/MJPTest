USE [mjp]
GO
/****** Object:  UserDefinedFunction [administration].[GetJobStatus]    Script Date: 7/7/2024 12:31:44 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER FUNCTION [administration].[GetJobStatus]
(	@expiryDate DATETIME,
	@currentStatusId INT
)
RETURNS INT
AS
BEGIN
	/* Expiry Status will not be saved in the statusId
	When the expirydte crosses, this function return EXPIRED
	If the currentstatusId is OPEN, check if it expired. For other status leave the status asIS */
	DECLARE @STATUS_OPEN INT = 1
	DECLARE @STATUS_EXPIRED INT = 3

	RETURN CASE WHEN @currentStatusId = @STATUS_OPEN THEN
				IIF(DATEDIFF(DAY, @expiryDate, GETDATE()) > 0, @STATUS_EXPIRED, @currentStatusId)
			ELSE @currentStatusId
			END
END

GO
/****** Object:  StoredProcedure [administration].[CalculatePaginationResult]    Script Date: 7/7/2024 12:31:44 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [administration].[CalculatePaginationResult]
(	@totalRecordsCount INT,
	@itemsPerPage INT,
	@currentPage INT,

	@totalPages INT OUT,
	@skipRecords INT OUT)
AS
BEGIN
	--DECLARE @totalPages INT

	SET @totalPages = CEILING(CAST(@totalRecordsCount AS DECIMAL)/@itemsPerPage)

	--SELECT @totalPages

	IF(@totalPages = 0) 
		SET @currentPage = 1
	ELSE IF (@currentPage > @totalPages) 
		SET @currentPage = @totalPages
	
	SET @skipRecords = (@currentPage -1) * @itemsPerPage;

	IF(@currentPage > @totalPages)
	BEGIN
		-- Bug fix
	SET @currentPage = 1
	END

END
GO
/****** Object:  StoredProcedure [administration].[ExportApplicationsReport]    Script Date: 7/7/2024 12:31:44 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [administration].[ExportApplicationsReport]
(	@postedBefore DATETIME,
	@postedAfter DATETIME
)
AS
BEGIN
	DECLARE @postedStartDate DATETIME
	DECLARE @postedEndDate DATETIME

	SET @postedEndDate = CONVERT(VARCHAR(15), @postedBefore , 101)
	SET @postedStartDate = CONVERT(VARCHAR(15), @postedAfter , 101)

	SELECT	jp.JobCode,
			jp.CompanyJobCode,
			ajp.JobApplicationCode AS [ApplicationNumber],
			c.DisplayName AS [CompanyName],
			ct.[CategoryName] AS [Category],

			jp.PositionTitle,
			jp.PostedOn AS [PostedDate],
			ajp.AppliedDate,
			ajp.StatusId AS [ApplicationStatusId],
			ap.DisplayName AS [ApplicantName]
	FROM [administration].[JobPositions] jp 
	INNER JOIN [administration].[JobApplications] ajp ON ajp.JobPositionId = jp.JobPositionId
	INNER JOIN [administration].[Companies] c ON jp.CompanyId = c.CompanyId
	INNER JOIN [administration].[JobPositionCategories] ct ON ct.JobPositionCategoryId = jp.CategoryId
	INNER JOIN [administration].[Applicants] ap ON ap.ApplicantId = ajp.ApplicantId
	WHERE ((jp.PostedOn >= @postedStartDate) OR (@postedStartDate IS NULL)) 
		AND ((jp.PostedOn <= @postedEndDate) OR (@postedEndDate IS NULL))
	
END

GO
/****** Object:  StoredProcedure [administration].[FilterApplicantJobPositions]    Script Date: 7/7/2024 12:31:44 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [administration].[FilterApplicantJobPositions]
(	@status [administration].[ListItem] READONLY,
	@categories [administration].[ListItem] READONLY,
	@companies [administration].[ListItem] READONLY,
	@filterText VARCHAR(200),
	@applicantId INT,
	@currentPage INT = 1,
	@itemsPerPage INT = 10
) AS
BEGIN
	
	DECLARE @STATUS_OPEN INT = 1

	IF(@filterText IS NOT NULL)
	BEGIN
		SET @filterText = CONCAT('%', @filterText, '%')
	END

	DECLARE @skipRecords INT
	DECLARE @totalPages INT
	DECLARE @totalRecordsCount INT


	SELECT @totalRecordsCount = COUNT(DISTINCT jp.JobPositionId)	
	FROM [administration].[JobPositions] jp 
	LEFT JOIN [administration].[JobApplications] ajp ON (ajp.JobPositionId = jp.JobPositionId)  AND
		(@applicantId IS NULL OR ajp.[ApplicantId] = @applicantId)
	INNER JOIN [administration].[JobPositionTags] tg ON tg.JobPositionId = jp.JobPositionId
	INNER JOIN @categories fcat ON (fcat.ItemId = jp.CategoryId OR fcat.ItemId IS NULL)
	INNER JOIN @companies fc ON (fc.ItemId = jp.CompanyId OR fc.ItemId IS NULL)
	WHERE  (@filterText IS NULL OR tg.TagName LIKE @filterText OR jp.PositionTitle LIKE @filterText)
	AND (jp.StatusId = @STATUS_OPEN)

		--Get the pagiantion count
	EXEC [administration].[CalculatePaginationResult] @totalRecordsCount, 
				@itemsPerPage, @currentPage, @totalPages OUT, @skipRecords OUT

	SELECT @totalRecordsCount AS [TotalRecords],
		@skipRecords AS [SkippedRecords], 
		@totalPages AS [TotalPages],
		@currentPage AS [CurrentPage]


	SELECT	DISTINCT
		ajp.JobApplicationId,
		jp.JobPositionId,

		-- Job Position detials
		jp.JDSummary,
		jp.PositionTitle,
		jp.PostedOn,
		jp.JobCode,
		jpc.CategoryName AS [CategoryName],
		rk.RankName AS [RankName],
		jp.NumberOfPositions,
		ajp.AppliedDate,
		ajp.InterviewDate,
		jp.StatusId,
		jp.PostedBy,

		-- Applicant JOB detials
		ajp.StatusId AS [JobApplicationStatusId],
		ajp.ApplicationNumber,
		ajp.StaffRemarks,
		ajp.ApplicantRemarks,
		ISNULL(ajp.LastUpdatedDate, jp.LastUpdatedTime) AS [LastUpdatedTime],
		
		-- Applicant details
		ajp.ApplicantId,
		ap.UserName AS [ApplicantUserName],
		ap.DisplayName AS [ApplicantName],
		ap.MobileNumber AS [ContactNumber],
	
		-- Company detials
		c.CompanyCode AS [CompanyCode],
		c.CompanyId AS [CompanyId],
		c.[URL] as [CompanyURL],
		c.DisplayName as [CompanyName],
		c.Rating AS [CompanyRating],
		c.CompanyLogo as [CompanyLogo]

	FROM [administration].[JobPositions] jp 
	LEFT JOIN [administration].[JobApplications] ajp ON (ajp.JobPositionId = jp.JobPositionId)  AND
		(@applicantId IS NULL OR ajp.[ApplicantId] = @applicantId)
	INNER JOIN [administration].[JobPositionTags] tg ON tg.JobPositionId = jp.JobPositionId
	LEFT JOIN [administration].[Applicants] ap ON ap.ApplicantId = ajp.ApplicantId 
		
	INNER JOIN @categories fcat ON (fcat.ItemId = jp.CategoryId OR fcat.ItemId IS NULL)
	INNER JOIN @companies fc ON (fc.ItemId = jp.CompanyId OR fc.ItemId IS NULL)
	INNER JOIN [administration].Companies c ON jp.CompanyId = c.CompanyId
	INNER JOIN [administration].JobPositionCategories jpc ON jp.CategoryId = jpc.JobPositionCategoryId
	INNER JOIN [administration].[JobPositionRanks] rk ON jp.RankId = rk.JobPositionRankId
	WHERE  (@filterText IS NULL OR tg.TagName LIKE @filterText OR jp.PositionTitle LIKE @filterText)
	AND (jp.StatusId = @STATUS_OPEN)
	ORDER BY jp.PostedOn DESC
	OFFSET @skipRecords ROWS
	FETCH FIRST @itemsPerPage ROWS ONLY
END

GO
/****** Object:  StoredProcedure [administration].[FilterApplicants]    Script Date: 7/7/2024 12:31:44 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [administration].[FilterApplicants]
(	@searchText VARCHAR(100),
	@statusId INT,

	@currentPage INT = 1,
	@itemsPerPage INT = 10
) AS
BEGIN
		
	DECLARE @skipRecords INT
	DECLARE @totalPages INT
	DECLARE @totalRecordsCount INT

	DECLARE @MAX INT = 99999

	IF(@searchText IS NOT NULL)
	BEGIN
		SET @searchText = CONCAT('%', @searchText , '%')
	END



	/* IF FromRange IS NULL assign MIN. If ToRange is NULL assign MAX so that we can filter BETWEEN */
	SELECT @totalRecordsCount = COUNT(app.ApplicantId)	
	--FROM [administration].[ApplicantPersonalDetails] pd 
	FROM [administration].[Applicants] app 
	WHERE  ((@searchText IS NULL OR (app.FirstName LIKE  @searchText
			OR app.LastName LIKE @searchText
			OR app.Email LIKE @searchText
			OR app.MobileNumber LIKE @searchText))
	AND  (@statusId IS NULL OR  app.StatusId = @statusId))
	
	--Get the pagiantion count
	EXEC [administration].[CalculatePaginationResult] @totalRecordsCount, 
				@itemsPerPage, @currentPage, @totalPages OUT, @skipRecords OUT

	SELECT @totalRecordsCount AS [TotalRecords],
		@skipRecords AS [SkippedRecords], 
		@totalPages AS [TotalPages],
		@currentPage AS [CurrentPage]


	SELECT	app.DisplayName AS [ApplicantName],
			app.ApplicantId,
			app.Email,
			app.MobileNumber,
			pd.AnnualSalary AS [Salary],
			pd.Experience,
			app.StatusId,
			ct.CategoryName AS [Category],
			rk.RankName AS [Rank],
			app.AvailabilityStatusId AS [AvailabilityStatusId]
	FROM [administration].[Applicants] app
	LEFT JOIN [administration].[ApplicantPersonalDetails] pd ON app.ApplicantId = pd.ApplicantId
	LEFT JOIN [administration].[JobPositionCategories] ct ON ct.JobPositionCategoryId = pd.CategoryId
	LEFT JOIN [administration].[JobPositionRanks] rk ON rk.JobPositionRankId = pd.RankId
WHERE ((@searchText IS NULL OR (app.FirstName LIKE  @searchText
			OR app.LastName LIKE @searchText
			OR app.Email LIKE @searchText
			OR app.MobileNumber LIKE @searchText))
	AND  (@statusId IS NULL OR  app.StatusId = @statusId))
	ORDER BY app.LastUpdatedTime DESC
	OFFSET @skipRecords ROWS
	FETCH FIRST @itemsPerPage ROWS ONLY
END

GO
/****** Object:  StoredProcedure [administration].[FilterApplicationsReport]    Script Date: 7/7/2024 12:31:44 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [administration].[FilterApplicationsReport]
(	@postedBefore DATETIME,
	@postedAfter DATETIME,

	@currentPage INT = 1,
	@itemsPerPage INT = 5
)
AS
BEGIN
	DECLARE @skipRecords INT
	DECLARE @totalPages INT
	DECLARE @totalRecordsCount INT

	DECLARE @postedStartDate DATETIME
	DECLARE @postedEndDate DATETIME

	DECLARE @ALL_PAGES INT = -1;

	SET @postedEndDate = CONVERT(VARCHAR(15), @postedBefore , 101)
	SET @postedStartDate = CONVERT(VARCHAR(15), @postedAfter , 101)
	

	SELECT @totalRecordsCount = COUNT(ajp.JobPositionId)	
	FROM [administration].[JobPositions] jp 
	INNER JOIN [administration].[JobApplications] ajp ON ajp.JobPositionId = jp.JobPositionId
	INNER JOIN [administration].[Companies] c ON jp.CompanyId = c.CompanyId
	INNER JOIN [administration].[JobPositionCategories] ct ON ct.JobPositionCategoryId = jp.CategoryId
	WHERE ((jp.PostedOn >= @postedStartDate) OR (@postedStartDate IS NULL)) 
		AND ((jp.PostedOn <= @postedEndDate) OR (@postedEndDate IS NULL))
	
	
	IF(@itemsPerPage = @ALL_PAGES) 
	BEGIN
		-- All Pages. No skip and include all records
		SET @skipRecords = 0
		SET @itemsPerPage = @totalRecordsCount
	END

		--Get the pagiantion count
	EXEC [administration].[CalculatePaginationResult] @totalRecordsCount, 
				@itemsPerPage, @currentPage, @totalPages OUT, @skipRecords OUT

	SELECT @totalRecordsCount AS [TotalRecords],
		@skipRecords AS [SkippedRecords], 
		@totalPages AS [TotalPages],
		@currentPage AS [CurrentPage]

	SELECT	jp.JobCode,
			jp.CompanyJobCode,
			ajp.JobApplicationCode AS [ApplicationNumber],
			c.DisplayName AS [CompanyName],
			ct.[CategoryName] AS [Category],

			jp.PositionTitle,
			jp.PostedOn AS [PostedDate],
			ajp.AppliedDate,
			ajp.StatusId AS [ApplicationStatusId],
			ap.DisplayName AS [ApplicantName]
	FROM [administration].[JobPositions] jp 
	INNER JOIN [administration].[JobApplications] ajp ON ajp.JobPositionId = jp.JobPositionId
	INNER JOIN [administration].[Companies] c ON jp.CompanyId = c.CompanyId
	INNER JOIN [administration].[JobPositionCategories] ct ON ct.JobPositionCategoryId = jp.CategoryId
	INNER JOIN [administration].[Applicants] ap ON ap.ApplicantId = ajp.ApplicantId
	WHERE ((jp.PostedOn >= @postedStartDate) OR (@postedStartDate IS NULL)) 
		AND ((jp.PostedOn <= @postedEndDate) OR (@postedEndDate IS NULL))
	ORDER BY jp.PostedOn DESC
	OFFSET @skipRecords ROWS
	FETCH FIRST @itemsPerPage ROWS ONLY

END

GO
/****** Object:  StoredProcedure [administration].[FilterCompanies]    Script Date: 7/7/2024 12:31:44 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [administration].[FilterCompanies]
(	@filterText VARCHAR(200),
	@currentPage INT = 1,
	@itemsPerPage INT = 10
) AS
BEGIN
	
	BEGIN
		SET @filterText = CONCAT('%', @filterText, '%')
	END

	DECLARE @skipRecords INT
	DECLARE @totalPages INT
	DECLARE @totalRecordsCount INT


	SELECT @totalRecordsCount = COUNT(c.CompanyId)	
	FROM [administration].[Companies] c 
	WHERE (@filterText IS NULL OR c.CompanyName LIKE @filterText OR c.DisplayName LIKE @filterText)
	
	
	--Get the pagiantion count
	EXEC [administration].[CalculatePaginationResult] @totalRecordsCount, 
				@itemsPerPage, @currentPage, @totalPages OUT, @skipRecords OUT

	SELECT @totalRecordsCount AS [TotalRecords],
		@skipRecords AS [SkippedRecords], 
		@totalPages AS [TotalPages],
		@currentPage AS [CurrentPage]


	SELECT
		c.CompanyId,
		c.CompanyCode,
		c.CompanyName,
		c.ContactNumber,

		c.Email,
		c.Address1,
		c.Address2,
		c.Address3,

		c.DisplayName,
		c.IsActive,
		c.Rating,
		c.City,
		c.Pincode,
		c.[Url]
		--st.DisplayName AS [State]
	FROM [administration].[Companies] c 
	--INNER JOIN [administration].[States] st ON st.StateId = c.StateId
	WHERE (@filterText IS NULL OR c.CompanyName LIKE @filterText OR c.DisplayName LIKE @filterText)
	ORDER BY c.CompanyId DESC
	OFFSET @skipRecords ROWS
	FETCH FIRST @itemsPerPage ROWS ONLY
END


GO
/****** Object:  StoredProcedure [administration].[FilterJobApplications]    Script Date: 7/7/2024 12:31:44 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [administration].[FilterJobApplications]
(	@applicationStatus [administration].[ListItem] READONLY,
	@jobStatus [administration].[ListItem] READONLY,
	@companies [administration].[ListItem] READONLY,
	@filterText VARCHAR(200),
	@applicantId INT = NULL,
	@currentPage INT = 1,
	@itemsPerPage INT = 5
	
) AS
BEGIN
	
	DECLARE @searchText VARCHAR(200)

	BEGIN
		SET @searchText = CONCAT('%', @filterText, '%')
	END

	DECLARE @skipRecords INT
	DECLARE @totalPages INT
	DECLARE @totalRecordsCount INT


	DECLARE @EXPIRED_STATUS INT = 3

	DECLARE @includeExpiredJobs BIT = 0

	-- For ALL item ItemId will be NULL
	IF(EXISTS (SELECT 1 FROM @jobStatus WHERE ItemId = @EXPIRED_STATUS OR ItemId IS NULL)) 
	BEGIN
		--Need to include expired statis
		SET @includeExpiredJobs = 1
	END

	

	SELECT @totalRecordsCount = COUNT(jp.JobPositionId)	
	FROM [administration].[JobPositions] jp 
	INNER JOIN [administration].[JobApplications] ajp ON (ajp.JobPositionId = jp.JobPositionId) 
	INNER JOIN [administration].[Applicants] ap ON ap.ApplicantId = ajp.ApplicantId 
	INNER JOIN @companies fc ON (fc.ItemId = jp.CompanyId OR fc.ItemId IS NULL)
	--INNER JOIN [administration].Companies c ON jp.CompanyId = c.CompanyId
	-- EXPIRED Jobs status will not be updated in table. So get the status as per today and match
	INNER JOIN @jobStatus jobst ON (jobst.ItemId IS NULL OR [administration].[GetJobStatus](jp.ExpiryDate, jp.StatusId) = jobst.ItemId)
	INNER JOIN @applicationStatus appst ON (appst.ItemId = ajp.StatusId OR appst.ItemId IS NULL)
	WHERE ((@applicantId IS NULL OR ap.ApplicantId = @applicantId) AND
		(@filterText IS NULL OR 
		   (ap.DisplayName LIKE @searchText
			OR jp.PositionTitle LIKE @searchText
			OR jp.JobCode = @filterText)))
		--AND (@includeExpiredJobs = 1 OR DATEDIFF(DAY, jp.ExpiryDate, GETDATE())<0)
	
	
		--Get the pagiantion count
	EXEC [administration].[CalculatePaginationResult] @totalRecordsCount, 
				@itemsPerPage, @currentPage, @totalPages OUT, @skipRecords OUT

	SELECT @totalRecordsCount AS [TotalRecords],
		@skipRecords AS [SkippedRecords], 
		@totalPages AS [TotalPages],
		@currentPage AS [CurrentPage]


	SELECT
		ajp.JobApplicationId AS [JobApplicationId],
		jp.JobPositionId,
		ajp.ApplicationNumber,
		-- Job Position detials
		--jp.JDSummary,
		jp.PositionTitle,
		jp.PostedOn,
		jp.JobCode,
		--jp.NumberOfPositions,
		ajp.AppliedDate,
		ajp.InterviewDate,
		[administration].[GetJobStatus](jp.ExpiryDate, jp.StatusId) AS [StatusId],
		jp.ExpiryDate,
		rk.RankName AS [Rank],

		-- Applicant JOB detials
		ajp.StatusId AS [ApplicationStatusId],
		ISNULL(ajp.LastUpdatedDate, jp.LastUpdatedTime) AS [LastUpdatedTime],
		
		-- Applicant details
		ajp.ApplicantId,
		ap.UserName AS [ApplicantUserName],
		ap.DisplayName AS [ApplicantName],
	
		-- Company detials
		c.CompanyCode AS [CompanyCode],
		c.CompanyId AS [CompanyId],
		c.[URL] as [CompanyURL], 
		c.DisplayName as [CompanyName],
		c.Rating AS [CompanyRating]
		FROM [administration].[JobPositions] jp 
	INNER JOIN [administration].[JobApplications] ajp ON (ajp.JobPositionId = jp.JobPositionId) 
	INNER JOIN [administration].[Applicants] ap ON ap.ApplicantId = ajp.ApplicantId 
	INNER JOIN [administration].[JobPositionRanks] rk ON rk.JobPositionRankId = jp.rankId
	INNER JOIN @companies fc ON (fc.ItemId = jp.CompanyId OR fc.ItemId IS NULL)
	INNER JOIN [administration].Companies c ON jp.CompanyId = c.CompanyId
	INNER JOIN @applicationStatus appst ON (appst.ItemId = ajp.StatusId OR appst.ItemId IS NULL)
	INNER JOIN @jobStatus jobst ON (jobst.ItemId IS NULL OR [administration].[GetJobStatus](jp.ExpiryDate, jp.StatusId) = jobst.ItemId)
	WHERE ((@applicantId IS NULL OR ap.ApplicantId = @applicantId) AND
		(@filterText IS NULL OR 
		   (ap.DisplayName LIKE @searchText
			OR jp.PositionTitle LIKE @searchText
			OR jp.JobCode = @filterText)))
		--AND (jobst.ItemId IS NULL OR [administration].[GetJobStatus](appst.ItemId, ajp.StatusId) = jobst.ItemId)
		--AND (@includeExpiredJobs = 1 OR DATEDIFF(DAY, jp.ExpiryDate, GETDATE())<0)
	
	ORDER BY jp.PostedOn DESC
	OFFSET @skipRecords ROWS
	FETCH FIRST @itemsPerPage ROWS ONLY
END

GO
/****** Object:  StoredProcedure [administration].[FilterJobPositions]    Script Date: 7/7/2024 12:31:44 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [administration].[FilterJobPositions]
(	@status [administration].[ListItem] READONLY,
	@companies [administration].[ListItem] READONLY,
	@filterText VARCHAR(200),
	@currentPage INT = 1,
	@itemsPerPage INT = 10,
	@applicantId INT = NULL
) AS
BEGIN
	
	DECLARE @searchText VARCHAR(200)

	BEGIN
		SET @searchText = CONCAT('%', @filterText, '%')
	END

	DECLARE @skipRecords INT
	DECLARE @totalPages INT
	DECLARE @totalRecordsCount INT


	SELECT @totalRecordsCount = COUNT(jp.JobPositionId)	
	FROM [administration].[JobPositions] jp 
	INNER JOIN @companies fc ON (fc.ItemId = jp.CompanyId OR fc.ItemId IS NULL)
	INNER JOIN @status st ON (st.ItemId = jp.StatusId OR st.ItemId IS NULL)
	WHERE (@filterText IS NULL OR (jp.PositionTitle LIKE @searchText
		OR jp.CompanyJobCode LIKE @searchText
		OR jp.JobCode = @filterText))
	
	--Get the pagiantion count
	EXEC [administration].[CalculatePaginationResult] @totalRecordsCount, 
				@itemsPerPage, @currentPage, @totalPages OUT, @skipRecords OUT

	SELECT @totalRecordsCount AS [TotalRecords],
		@skipRecords AS [SkippedRecords], 
		@totalPages AS [TotalPages],
		@currentPage AS [CurrentPage]


	SELECT
		jp.JobPositionId,
		jp.PositionTitle,
		jp.PostedOn,
		jp.JDSummary,
		jp.JobCode,

		jp.CompanyJobCode,
		jp.NumberOfPositions,
		jp.LastDateOfApplication,
		jp.StatusId,
		jp.LastUpdatedTime AS [LastUpdatedTime],
		jp.ExpiryDate AS [ExpiryDate],
		-- Company detials
		c.CompanyCode AS [CompanyCode],
		c.CompanyId AS [CompanyId],
		c.[URL] as [CompanyURL], 
		c.DisplayName as [CompanyName],
		c.Rating AS [Rating],

		rk.RankName AS [RankName],
		--dt.DepartmentName AS [DepartmentName]
		cat.CategoryName AS [Category]
	FROM [administration].[JobPositions] jp 
	INNER JOIN @companies fc ON (fc.ItemId = jp.CompanyId OR fc.ItemId IS NULL)
	INNER JOIN @status jobst ON (jobst.ItemId IS NULL OR [administration].[GetJobStatus](jp.ExpiryDate, jp.StatusId) = jobst.ItemId)
	INNER JOIN [administration].[Companies] c ON c.CompanyId = jp.CompanyId
	INNER JOIN [administration].[JobPositionCategories] cat ON cat.JobPositionCategoryId = jp.CategoryId
	INNER JOIN [administration].[JobPositionRanks] rk ON rk.JobPositionRankId = jp.RankId
	WHERE (@filterText IS NULL OR (jp.PositionTitle LIKE @searchText
		OR jp.CompanyJobCode LIKE @searchText
		OR jp.JobCode = @filterText))
	ORDER BY jp.PostedOn DESC
	OFFSET @skipRecords ROWS
	FETCH FIRST @itemsPerPage ROWS ONLY
END


GO
/****** Object:  StoredProcedure [administration].[FilterJobPositionsForApplicant]    Script Date: 7/7/2024 12:31:44 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [administration].[FilterJobPositionsForApplicant]
(	@status [administration].[ListItem] READONLY,
	@categories [administration].[ListItem] READONLY,
	@companies [administration].[ListItem] READONLY,
	@filterText VARCHAR(200),
	@applicantId INT
) AS
BEGIN
	
	IF(@filterText IS NOT NULL)
	BEGIN
		SET @filterText = CONCAT('%', @filterText, '%')
	END

	SELECT	DISTINCT
		ajp.ApplicantPositionId,
		jp.JobPositionId,
		jp.JDSummary,
		jp.PositionTitle,
		jp.PostedOn,
		jp.PostedBy,
		jp.JobCode,
		jpc.CategoryName AS [Category],

		c.CompanyCode AS [CompanyCode],
		c.CompanyId AS [CompanyId],
		c.[URL] as [CompanyURL],
		c.DisplayName as [CompanyDisplayName],
		c.Rating AS [CompanyRating],

		jp.NumberOfPositions,
		ajp.AppliedDate,
		ajp.StatusId AS [ApplicantStatus],
		ajp.StaffRemarks,
		ajp.ApplicantRemarks,
		ISNULL(ajp.LastUpdatedDate, jp.LastUpdatedDate) AS [LastUpdatedTime]

	FROM [administration].[JobPositions] jp 
	LEFT JOIN [administration].[ApplicantPositions] ajp ON (ajp.JobPositionId = jp.JobPositionId)  
	INNER JOIN [administration].[JobPositionTags] tg ON tg.JobPositionId = jp.JobPositionId
		
	INNER JOIN @companies fcomp ON (fcomp.ItemId = jp.CompanyId OR fcomp.ItemId IS NULL)
	INNER JOIN @categories fcat ON (fcat.ItemId = jp.CategoryId OR fcat.ItemId IS NULL)
	INNER JOIN [administration].Companies c ON jp.CompanyId = c.CompanyId
	INNER JOIN [administration].JobPositionCategories jpc ON jp.CategoryId = jpc.JobPositionCatgoryId
	WHERE (ajp.ApplicantPositionId IS NULL OR  @applicantId IS NULL OR ajp.[ApplicantId] = @applicantId)
		AND (@filterText IS NULL OR tg.TagName LIKE @filterText)
END

GO
/****** Object:  StoredProcedure [administration].[FilterProfiles]    Script Date: 7/7/2024 12:31:44 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [administration].[FilterProfiles]
(	@jobPositionId INT,
	@searchText VARCHAR(100),
	
	@rankId INT,
	@salaryFrom DECIMAL,
	@salaryTo DECIMAL,
	
	@availabilityStatus INT,
	@experienceFrom DECIMAL(18,4),
	@experienceTo DECIMAL(18,4),
	@currentPage INT = 1,
	@itemsPerPage INT = 10
) AS
BEGIN
		
	DECLARE @skipRecords INT
	DECLARE @totalPages INT
	DECLARE @totalRecordsCount INT

	DECLARE @MAX INT = 99999

	IF(@searchText IS NOT NULL)
	BEGIN
		SET @searchText = CONCAT('%', @searchText , '%')
	END

	DECLARE @ACTIVE_STATUS INT = 2

	/* Filter only ACTIVE profiles */
	/* IF FromRange IS NULL assign MIN. If ToRange is NULL assign MAX so that we can filter BETWEEN */
	SELECT @totalRecordsCount = COUNT(pd.ApplicantId)	
	FROM [administration].[ApplicantPersonalDetails] pd 
	INNER JOIN [administration].[Applicants] app ON app.ApplicantId = pd.ApplicantId
	--JOIN [administration].[JobPositions] jp ON jp.JobPositionId = @jobPositionId 
	LEFT OUTER JOIN [administration].[JobApplications] jap ON jap.ApplicantId = pd.ApplicantId
			AND jap.JobPositionId = @jobPositionId 
	WHERE ((@rankId IS NULL OR pd.RankId = @rankId)
	AND (pd.AnnualSalary BETWEEN ISNULL(@salaryFrom, 0) AND ISNULL(@salaryTo, @MAX))
	AND (CAST(pd.Experience AS DECIMAL(18,2)) BETWEEN ISNULL(@experienceFrom, 0) AND ISNULL(@experienceTo, @MAX))
	AND (@searchText IS NULL OR (app.FirstName LIKE  @searchText
			OR app.LastName LIKE @searchText
			OR app.Email LIKE @searchText
			OR app.MobileNumber LIKE @searchText))
	AND ISNULL(app.StatusId, 0) = @ACTIVE_STATUS)
	AND (@availabilityStatus IS NULL OR  app.AvailabilityStatusId = @availabilityStatus)
	
	--Get the pagiantion count
	EXEC [administration].[CalculatePaginationResult] @totalRecordsCount, 
				@itemsPerPage, @currentPage, @totalPages OUT, @skipRecords OUT

	SELECT @totalRecordsCount AS [TotalRecords],
		@skipRecords AS [SkippedRecords], 
		@totalPages AS [TotalPages],
		@currentPage AS [CurrentPage]


	SELECT	app.DisplayName AS [ApplicantName],
			app.ApplicantId,
			app.Email,
			app.MobileNumber,
			ISNULL(pd.AnnualSalary,0) AS [Salary],
			pd.Experience,
			rk.RankName AS [Rank],
			jap.JobApplicationId AS [JobApplicationId],
			jap.ApplicationNumber AS [ApplicantNumber],
			jap.StatusId AS [ApplicationStatusId],
			app.AvailabilityStatusId
	FROM [administration].[ApplicantPersonalDetails] pd 
	INNER JOIN [administration].[Applicants] app ON app.ApplicantId = pd.ApplicantId
	INNER JOIN [administration].[JobPositionRanks] rk ON rk.JobPositionRankId = pd.RankId
	LEFT OUTER JOIN [administration].[JobApplications] jap ON jap.ApplicantId = pd.ApplicantId
			AND jap.JobPositionId = @jobPositionId 
	WHERE ((@rankId IS NULL OR pd.RankId = @rankId)
	AND (ISNULL(pd.AnnualSalary, 0) BETWEEN ISNULL(@salaryFrom, 0) AND ISNULL(@salaryTo, @MAX))
	AND (CAST(pd.Experience AS DECIMAL(18,2)) BETWEEN ISNULL(@experienceFrom, 0) AND ISNULL(@experienceTo, @MAX))
	AND (@searchText IS NULL OR (app.FirstName LIKE  @searchText
			OR app.LastName LIKE @searchText
			OR app.Email LIKE @searchText
			OR app.MobileNumber LIKE @searchText))
	AND ISNULL(app.StatusId, 0) = @ACTIVE_STATUS)
	AND (@availabilityStatus IS NULL OR  app.AvailabilityStatusId = @availabilityStatus)
	ORDER BY jap.LastUpdatedDate DESC
	OFFSET @skipRecords ROWS
	FETCH FIRST @itemsPerPage ROWS ONLY
END

GO
/****** Object:  StoredProcedure [administration].[FilterRecommendedCompanies]    Script Date: 7/7/2024 12:31:44 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [administration].[FilterRecommendedCompanies]
(	@currentPage INT = 1,
	@itemsPerPage INT = 10,
	@minRating INT = 3
) AS
BEGIN
	
	SET @itemsPerPage = 10
	DECLARE @skipRecords INT
	DECLARE @totalPages INT
	DECLARE @totalRecordsCount INT


	SELECT @totalRecordsCount = COUNT(c.CompanyId)	
	FROM [administration].[Companies] c 
	WHERE c.IsActive= 1
	AND c.Rating >= @minRating
	
	
	--Get the pagiantion count
	EXEC [administration].[CalculatePaginationResult] @totalRecordsCount, 
				@itemsPerPage, @currentPage, @totalPages OUT, @skipRecords OUT

	SELECT @totalRecordsCount AS [TotalRecords],
		@skipRecords AS [SkippedRecords], 
		@totalPages AS [TotalPages],
		@currentPage AS [CurrentPage]


	SELECT
		c.CompanyId,
		c.CompanyCode,
		c.CompanyName,
		c.ContactNumber,

		c.Email,
		c.Address1,
		c.Address2,
		c.Address3,

		c.DisplayName,
		c.IsActive,
		c.Rating,
		c.City,
		c.Pincode,
		c.[Url],
		--st.DisplayName AS [State],
		c.CompanyLogo
	FROM [administration].[Companies] c 
	--INNER JOIN [administration].[States] st ON st.StateId = c.StateId
	WHERE c.IsActive= 1
	--AND c.IsRecommended = 1
	--AND c.Rating >= @minRating
	ORDER BY c.rating DESC
	OFFSET @skipRecords ROWS
	FETCH FIRST @itemsPerPage ROWS ONLY
END


GO
/****** Object:  StoredProcedure [administration].[SearchJobPositions]    Script Date: 7/7/2024 12:31:44 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [administration].[SearchJobPositions]
(	@rankId INTEGER,
	@filterText VARCHAR(200),
	@applicantId INT,
	@minExperience DECIMAL(18,2),
	@maxExperience  DECIMAL(18,2),
	@currentPage INT = 1,
	@itemsPerPage INT = 10
) AS
BEGIN
	
	DECLARE @STATUS_OPEN INT = 1
	DECLARE @MAX INT = 99999

	IF(@filterText IS NOT NULL)
	BEGIN
		SET @filterText = CONCAT('%', @filterText, '%')
	END

	DECLARE @skipRecords INT
	DECLARE @totalPages INT
	DECLARE @totalRecordsCount INT

	-- Filter only the non-expired & active Jons
	SELECT @totalRecordsCount = COUNT(DISTINCT jp.JobPositionId)	
	FROM [administration].[JobPositions] jp 
	INNER JOIN [administration].[JobPositionTags] tg ON tg.JobPositionId = jp.JobPositionId
	INNER JOIN [administration].[JobPositionRanks] rk ON rk.JobPositionRankId = jp.RankId
	WHERE  (@filterText IS NULL OR tg.TagName LIKE @filterText OR jp.PositionTitle LIKE @filterText)
	AND ((DATEDIFF(DAY, jp.ExpiryDate, GETDATE()) <=0) 
	AND jp.StatusId = @STATUS_OPEN
	AND (@rankId IS NULL OR jp.RankId = @rankId))
	AND ((@minExperience IS NULL OR @minExperience >= jp.MinExperience)
	AND (@maxExperience IS NULL OR @maxExperience <= jp.MaxExperience))

		--Get the pagiantion count
	EXEC [administration].[CalculatePaginationResult] @totalRecordsCount, 
				@itemsPerPage, @currentPage, @totalPages OUT, @skipRecords OUT

	SELECT @totalRecordsCount AS [TotalRecords],
		@skipRecords AS [SkippedRecords], 
		@totalPages AS [TotalPages],
		@currentPage AS [CurrentPage]

	DECLARE @result TABLE (
		JobPositionId INT,
		JDSummary VARCHAR(200),
		PositionTitle VARCHAR(100),
		PostedOn DATETIME,
		JobCode VARCHAR(100),
		RankName VARCHAR(100),
		DepartmentName VARCHAR(100),
		NumberOfPositions INT,

		InterviewDate DATETIME,
		StatusId INT,
		PostedBy VARCHAR(100),
		ExpiryDate DATETIME,
		[LastUpdatedTime] DATETIME,
		
		MinExperience DECIMAL(18,2),
		MAXExperience DECIMAL(18,2),
		SalaryRange VARCHAR(100),
		IsRecommended BIT,

		-- Applicant JOB detials
		JobApplicationId INT,
		ApplicantId INT,
		AppliedDate DATETIME,
		JobApplicationStatusId INT,
		ApplicationNumber VARCHAR(10),

		-- Company detials
		[CompanyCode] VARCHAR(50),
		[CompanyId] INT,
		[CompanyURL] VARCHAR(100),
		[CompanyName] VARCHAR(100),
		[CompanyRating] INT
		--c.CompanyLogo as [CompanyLogo] 
	)

	INSERT INTO @result
	SELECT	DISTINCT
		jp.JobPositionId,
		jp.JDSummary,
		jp.PositionTitle,
		jp.PostedOn,
		jp.JobCode,
		rk.RankName AS [RankName],
		dt.DepartmentName,
		jp.NumberOfPositions,
		jp.InterviewDate,
		
		jp.StatusId,
		jp.PostedBy,
		jp.ExpiryDate,
		jp.LastUpdatedTime [LastUpdatedTime],
		jp.MinExperience,
		jp.MaxExperience,
		CONCAT(jp.SalaryRange , ' ', cr.DisplayText),
		ISNULL(jp.IsRecommended, 0),

		-- Applicant JOB detials
		NULL, --applicaitonid
		NULL, --applciantid
		NULL, --applieddate
		NULL, --statusid,
		NULL,

		-- Company detials
		c.CompanyCode AS [CompanyCode],
		c.CompanyId AS [CompanyId],
		c.[URL] as [CompanyURL],
		c.DisplayName as [CompanyName],
		c.Rating AS [CompanyRating]
		--c.CompanyLogo as [CompanyLogo]

	FROM [administration].[JobPositions] jp 
	INNER JOIN [administration].Companies c ON jp.CompanyId = c.CompanyId
	INNER JOIN [administration].[JobPositionTags] tg ON tg.JobPositionId = jp.JobPositionId
	INNER JOIN [administration].[JobPositionRanks] rk ON rk.JobPositionRankId = jp.RankId
	INNER JOIN [administration].[Departments] dt ON rk.DepartmentId = dt.DepartmentId
	LEFT JOIN [administration].[MJPLOVItems] cr ON cr.LOVItemId = jp.CurrencyId
	WHERE  (@filterText IS NULL OR tg.TagName LIKE @filterText OR jp.PositionTitle LIKE @filterText)
	AND ((DATEDIFF(DAY, jp.ExpiryDate, GETDATE()) <=0) 
	AND jp.StatusId = @STATUS_OPEN
	AND (@rankId IS NULL OR jp.RankId = @rankId))
	AND ((@minExperience IS NULL OR @minExperience >= jp.MinExperience)
	AND (@maxExperience IS NULL OR @maxExperience <= jp.MaxExperience))
	ORDER BY jp.PostedOn DESC
	OFFSET @skipRecords ROWS
	FETCH FIRST @itemsPerPage ROWS ONLY

	--Update the Userspecific info if applicantid is not NULL
	IF(@applicantId IS NOT NULL)
	BEGIN
		UPDATE @result
		SET JobApplicationId = ajp.JobApplicationId,
			ApplicantId = ajp.ApplicantId,
			AppliedDate = ajp.AppliedDate,
			JobApplicationStatusId= ajp.StatusId,
			ApplicationNumber=ajp.ApplicationNumber
		FROM @result r 
		LEFT JOIN [administration].[JobApplications] ajp ON r.JobPositionId = ajp.JobPositionId
		WHERE ajp.ApplicantId = @applicantId

	END

	SELECT * FROM @result
END
GO
/****** Object:  StoredProcedure [administration].[SelectApplicantJobPositions]    Script Date: 7/7/2024 12:31:44 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [administration].[SelectApplicantJobPositions]
(	@status [administration].[ListItem] READONLY,
	@categories [administration].[ListItem] READONLY,
	@companies [administration].[ListItem] READONLY,
	@filterText VARCHAR(200),
	@applicantId INT
) AS
BEGIN
	
	IF(@filterText IS NOT NULL)
	BEGIN
		SET @filterText = CONCAT('%', @filterText, '%')
	END

	SELECT	DISTINCT
		ajp.ApplicantPositionId,
			jp.JobPositionId,
			jp.JDSummary,
			jp.PositionTitle,
			jp.PostedOn,
			jp.JobCode,
			jpc.CategoryName AS [Category],

			c.CompanyCode AS [CompanyCode],
			c.CompanyId AS [CompanyId],
			c.[URL] as [CompanyURL],
			c.DisplayName as [CompanyDisplayName],
			c.Rating AS [CompanyRating],

			jp.NumberOfPositions,
			ajp.AppliedDate,
			ajp.StatusId AS [ApplicantStatus],
			ajp.StaffRemarks,
			ajp.ApplicantRemarks,
			ISNULL(ajp.LastUpdatedDate, jp.LastUpdatedDate) AS [LastUpdatedTime]

	FROM [administration].[JobPositions] jp 
	LEFT JOIN [administration].[ApplicantPositions] ajp ON (ajp.JobPositionId = jp.JobPositionId)  
	INNER JOIN [administration].[JobPositionTags] tg ON tg.JobPositionId = jp.JobPositionId
		
	INNER JOIN @companies fcomp ON (fcomp.ItemId = jp.CompanyId OR fcomp.ItemId IS NULL)
	INNER JOIN @categories fcat ON (fcat.ItemId = jp.CategoryId OR fcat.ItemId IS NULL)
	INNER JOIN [administration].Companies c ON jp.CompanyId = c.CompanyId
	INNER JOIN [administration].JobPositionCategories jpc ON jp.CategoryId = jpc.JobPositionCatgoryId
	WHERE (ajp.[ApplicantPositionId] IS NULL OR ajp.[ApplicantId] = @applicantId)
		AND (@filterText IS NULL OR tg.TagName LIKE @filterText)
END

GO
/****** Object:  StoredProcedure [administration].[SelectJobDetails]    Script Date: 7/7/2024 12:31:44 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [administration].[SelectJobDetails]
(	
	@jobPositionId INT,
	@applicantId INT
) AS
BEGIN
	
	SELECT	
		ajp.ApplicantPositionId,
		jp.JobPositionId,

		-- Job Position detials
		jp.JDSummary,
		jp.PositionTitle,
		jp.PostedOn,
		jp.JobCode,
		jpc.CategoryName AS [CategoryName],
		jpg.GradeName AS [GradeName],
		jp.NumberOfPositions,
		ajp.AppliedDate,
		ajp.InterviewDate,

		-- Applicant JOB detials
		ajp.StatusId AS [ApplicantStatusId],
		ajp.StaffRemarks,
		ajp.ApplicantRemarks,
		ISNULL(ajp.LastUpdatedDate, jp.LastUpdatedDate) AS [LastUpdatedTime],
		
		-- Applicant details
		ajp.ApplicantId,
		ap.UserName AS [ApplicantUserName],
		ap.DisplayName AS [ApplicantName],
	
		-- Company detials
		c.CompanyCode AS [CompanyCode],
		c.CompanyId AS [CompanyId],
		c.[URL] as [CompanyURL],
		c.DisplayName as [CompanyDisplayName],
		c.Rating AS [CompanyRating]

	FROM [administration].[JobPositions] jp 
	LEFT JOIN [administration].[ApplicantPositions] ajp ON (ajp.JobPositionId = jp.JobPositionId)
		AND (ajp.ApplicantId = @applicantId)
	LEFT JOIN [administration].[Applicants] ap ON ap.ApplicantId = ajp.ApplicantId 
	INNER JOIN [administration].Companies c ON jp.CompanyId = c.CompanyId
	INNER JOIN [administration].JobPositionCategories jpc ON jp.CategoryId = jpc.JobPositionCatgoryId
	INNER JOIN [administration].JobPositionGrades jpg ON jp.GradeId = jpg.JobPositionGradeId
	WHERE (jp.JobPositionId = @jobPositionId)
END

GO
/****** Object:  StoredProcedure [administration].[SelectRecommendedPositions]    Script Date: 7/7/2024 12:31:44 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [administration].[SelectRecommendedPositions]
(	@recordCount INT = 10
) AS
BEGIN
	
	DECLARE @OPEN_STATUS INT 
	SET @OPEN_STATUS = 1

	SELECT	
		jp.JobPositionId,
		jp.JDSummary,
		jp.PositionTitle,
		jp.PostedOn,
		
		CONCAT(jp.SalaryRange, ' ' , cur.DisplayText) AS [SalaryRange],
		jp.JobCode,
		jp.CompanyJobCode,
		jp.StatusId,
		jp.LastDateOfApplication,
		jp.ExpiryDate,
		rk.RankName,

		c.DisplayName AS [CompanyName],
		c.Rating AS [CompanyRating],

		jp.MinExperience AS [MinExperience],
		jp.MaxExperience AS [MaxExperience],
		rk.RankName AS [Rank]
	FROM [administration].[JobPositions] jp 
	INNER JOIN [administration].[Companies] c ON c.CompanyId = jp.CompanyId
	LEFT JOIN [administration].[MJPLOVItems] cur ON jp.CurrencyId = cur.LOVItemId
	INNER JOIN [administration].[JobPositionRanks] rk ON rk.JobPositionRankId = jp.RankId
	WHERE 
	jp.IsRecommended = 1 AND
	jp.StatusId = @OPEN_STATUS
	ORDER BY jp.PostedOn DESC
	OFFSET 0 ROWS
	FETCH FIRST @recordCount ROWS ONLY
END
GO
/****** Object:  StoredProcedure [administration].[UpdateExperience]    Script Date: 7/7/2024 12:31:44 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [administration].[UpdateExperience]
(	@applicantId INT
)
AS
BEGIN
	DECLARE @experience INT

	SELECT @experience = SUM(DATEDIFF(day, seaex.FromDate, seaex.ToDate))
	FROM [administration].[SEAExperience] seaex
	WHERE seaex.ApplicantId = @applicantId

	UPDATE [administration].[ApplicantPersonalDetails]
	SET Experience = (@experience/ 365.0)
	WHERE ApplicantId = @applicantId
END

GO
