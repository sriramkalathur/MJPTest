
GO
/****** Object:  Schema [administration]    Script Date: 17-05-2023 8.51.15 PM ******/
CREATE SCHEMA [administration]
GO
/****** Object:  UserDefinedTableType [administration].[ListItem]    Script Date: 17-05-2023 8.51.15 PM ******/
CREATE TYPE [administration].[ListItem] AS TABLE(
	[ItemId] [int] NULL
)
GO
/****** Object:  Table [administration].[ApplicantPositionDocuments]    Script Date: 17-05-2023 8.51.15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [administration].[ApplicantPositionDocuments](
	[ApplicantPositionDocumentId] [int] IDENTITY(1,1) NOT NULL,
	[ApplicantPositionId] [int] NULL,
	[DocumentType] [int] NULL,
	[DocumentContent] [varbinary](max) NULL,
	[LastUpdatedBy] [varchar](50) NULL,
	[LastUpdtedTime] [datetime] NULL,
 CONSTRAINT [PK_ApplicantJobDocuments] PRIMARY KEY CLUSTERED 
(
	[ApplicantPositionDocumentId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [administration].[Applicants]    Script Date: 17-05-2023 8.51.15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [administration].[Applicants](
	[ApplicantId] [int] IDENTITY(1,1) NOT NULL,
	[UserName] [varchar](50) NULL,
	[Password] [varchar](100) NULL,
	[DisplayName] [varchar](100) NULL,
	[FirstName] [varchar](100) NULL,
	[LastName] [varchar](100) NULL,
	[DateOfBirth] [datetime] NULL,
	[Email] [varchar](100) NULL,
	[MobileNumber] [varchar](100) NULL,
	[Address1] [varchar](200) NULL,
	[Address2] [varchar](200) NULL,
	[City] [varchar](100) NULL,
	[StateId] [int] NULL,
	[Pincode] [varchar](10) NULL,
	[PassportNumber] [varchar](50) NULL,
	[LastUpdatedBy] [varchar](50) NULL,
	[LastUpdatedTime] [datetime] NULL,
 CONSTRAINT [PK_Applicants] PRIMARY KEY CLUSTERED 
(
	[ApplicantId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [administration].[ApplicationStatusHistory]    Script Date: 17-05-2023 8.51.15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [administration].[ApplicationStatusHistory](
	[ApplicationStatusHistoryId] [int] IDENTITY(1,1) NOT NULL,
	[StatusId] [int] NULL,
	[StatusDate] [datetime] NULL,
	[JobApplicationId] [int] NULL,
	[LastUpdatedBy] [varchar](50) NULL,
	[LastUpdatedTime] [datetime] NULL,
	[Remarks] [varchar](200) NULL,
 CONSTRAINT [PK_ApplicationStatusHistoryId] PRIMARY KEY CLUSTERED 
(
	[ApplicationStatusHistoryId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [administration].[Companies]    Script Date: 17-05-2023 8.51.15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [administration].[Companies](
	[CompanyId] [int] IDENTITY(1,1) NOT NULL,
	[CompanyName] [varchar](100) NULL,
	[CompanyCode]  AS (concat('CMP-',[CompanyId])),
	[DisplayName] [varchar](100) NULL,
	[Rating] [int] NULL,
	[Address1] [varchar](150) NULL,
	[Address2] [varchar](150) NULL,
	[Address3] [varchar](150) NULL,
	[City] [varchar](50) NULL,
	[CompanyLogo] [varchar](max) NULL,
	[StateId] [int] NULL,
	[Pincode] [varchar](50) NULL,
	[Email] [varchar](50) NULL,
	[URL] [varchar](50) NULL,
	[ContactNumber] [varchar](20) NULL,
	[IsActive] [bit] NULL,
	[LastUpdatedBy] [varchar](50) NULL,
	[LastUpdatedTime] [datetime] NULL,
 CONSTRAINT [PK_Companies] PRIMARY KEY CLUSTERED 
(
	[CompanyId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [administration].[JobApplicationDocuments]    Script Date: 17-05-2023 8.51.15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [administration].[JobApplicationDocuments](
	[JobApplicationDocumentId] [int] IDENTITY(1,1) NOT NULL,
	[DocumentType] [int] NULL,
	[JobApplicationId] [int] NULL,
	[DocumentContent] [varbinary](max) NULL,
	[FileName] [varchar](100) NULL,
	[Remarks] [varchar](200) NULL,
	[DocumentTitle] [varchar](100) NULL,
	[LastUpdatedBy] [varchar](50) NULL,
	[LastUpdatedTime] [datetime] NULL,
 CONSTRAINT [PK_JobApplicationDocuments] PRIMARY KEY CLUSTERED 
(
	[JobApplicationDocumentId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [administration].[JobApplications]    Script Date: 17-05-2023 8.51.15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [administration].[JobApplications](
	[JobApplicationId] [int] IDENTITY(1,1) NOT NULL,
	[ApplicantId] [int] NULL,
	[JobApplicationCode]  AS (concat('APP-',[JobApplicationId])),
	[ApplicationNumber]  AS (concat('APP-',[JobApplicationId])),
	[JobPositionId] [int] NULL,
	[StatusId] [int] NULL,
	[IsActive] [bit] NULL,
	[AppliedDate] [datetime] NULL,
	[AppliedToCompany] [bit] NULL,
	[InterviewDate] [datetime] NULL,
	[InterviewType] [int] NULL,
	[InterviewURL] [varchar](100) NULL,
	[InterviewInstrutions] [varchar](200) NULL,
	[InterviewStatusId] [int] NULL,
	[ApplicantRemarks] [varchar](300) NULL,
	[StaffRemarks] [varchar](300) NULL,
	[LastUpdatedBy] [varchar](50) NULL,
	[LastUpdatedDate] [datetime] NULL,
 CONSTRAINT [PK_ApplicantJobs] PRIMARY KEY CLUSTERED 
(
	[JobApplicationId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [administration].[JobPositionCategories]    Script Date: 17-05-2023 8.51.15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [administration].[JobPositionCategories](
	[JobPositionCatgoryId] [int] IDENTITY(1,1) NOT NULL,
	[CategoryName] [varchar](100) NULL,
	[Description] [varchar](200) NULL,
	[LastUpdatedOn] [datetime] NULL,
	[LastUpdatedBy] [varchar](50) NULL,
 CONSTRAINT [PK_Table_1] PRIMARY KEY CLUSTERED 
(
	[JobPositionCatgoryId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [administration].[JobPositionDocuments]    Script Date: 17-05-2023 8.51.15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [administration].[JobPositionDocuments](
	[JobPositionDocumentId] [int] IDENTITY(1,1) NOT NULL,
	[DocumentType] [int] NULL,
	[JobPositionId] [int] NULL,
	[DocumentContent] [varbinary](max) NULL,
	[DocumentTitle] [varchar](100) NULL,
	[FileName] [varchar](100) NULL,
	[Remarks] [varchar](200) NULL,
	[LastUpdatedBy] [varchar](50) NULL,
	[LastUpdatedTime] [datetime] NULL,
 CONSTRAINT [PK_JobPositionDocuments] PRIMARY KEY CLUSTERED 
(
	[JobPositionDocumentId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [administration].[JobPositionFeatures]    Script Date: 17-05-2023 8.51.15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [administration].[JobPositionFeatures](
	[JobPositionFeatureId] [int] IDENTITY(1,1) NOT NULL,
	[JobPositionId] [int] NOT NULL,
	[Description] [varchar](50) NULL,
	[TextColor] [varchar](20) NULL,
	[TextStyle] [varchar](20) NULL,
	[Size] [varchar](50) NULL,
	[IsBold] [bit] NULL,
	[IsItalic] [bit] NULL,
	[IsActive] [bit] NOT NULL,
	[LastUpdatdBy] [varchar](50) NULL,
	[LastUpdatedTime] [datetime] NULL,
 CONSTRAINT [PK_JobPositionFeatureId] PRIMARY KEY CLUSTERED 
(
	[JobPositionFeatureId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [administration].[JobPositionGrades]    Script Date: 17-05-2023 8.51.15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [administration].[JobPositionGrades](
	[JobPositionGradeId] [int] IDENTITY(1,1) NOT NULL,
	[GradeName] [varchar](100) NULL,
	[GradeCode] [varchar](100) NULL,
	[CategoryId] [int] NULL,
	[LastUpdatedBy] [varchar](50) NULL,
	[LastUpdatedDate] [datetime] NULL,
 CONSTRAINT [PK_JobPositionGrades] PRIMARY KEY CLUSTERED 
(
	[JobPositionGradeId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [administration].[JobPositionRequirements]    Script Date: 17-05-2023 8.51.15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [administration].[JobPositionRequirements](
	[JobRequirementId] [int] IDENTITY(1,1) NOT NULL,
	[Description] [varchar](100) NULL,
	[JobPositionId] [int] NOT NULL,
	[IsActive] [bit] NOT NULL,
	[IsMandatory] [bit] NULL,
	[LastUpdatedBy] [varchar](50) NULL,
	[LastUpdatedTime] [datetime] NULL,
 CONSTRAINT [PK_JobRequirements] PRIMARY KEY CLUSTERED 
(
	[JobRequirementId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [administration].[JobPositions]    Script Date: 17-05-2023 8.51.15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [administration].[JobPositions](
	[JobPositionId] [int] IDENTITY(1,1) NOT NULL,
	[JobCode]  AS (concat('JP-',[JobPositionId])),
	[CompanyId] [int] NULL,
	[CompanyJobCode] [varchar](50) NULL,
	[PostedOn] [datetime] NULL,
	[NumberOfPositions] [int] NULL,
	[CategoryId] [int] NULL,
	[GradeId] [int] NULL,
	[LocationTypeId] [int] NULL,
	[PositionTitle] [varchar](100) NULL,
	[JDSummary] [varchar](100) NULL,
	[Location] [varchar](100) NULL,
	[StatusId] [int] NULL,
	[IsActive] [bit] NULL,
	[PostedBy] [varchar](50) NULL,
	[LastDateOfApplication] [datetime] NULL,
	[LastUpdatedBy] [varchar](50) NULL,
	[LastUpdatedTime] [datetime] NULL,
 CONSTRAINT [PK_JobPositions] PRIMARY KEY CLUSTERED 
(
	[JobPositionId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [administration].[JobPositionStatus]    Script Date: 17-05-2023 8.51.15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [administration].[JobPositionStatus](
	[JobPositionStatusId] [int] IDENTITY(1,1) NOT NULL,
	[StatusId] [int] NULL,
	[DisplayText] [varchar](50) NULL,
	[StatusType] [varchar](50) NULL,
	[Role] [varchar](50) NULL,
	[LastUpdatedBy] [varchar](50) NULL,
	[LastUpdatedTime] [datetime] NULL,
 CONSTRAINT [PK_ApplicantJobStatus] PRIMARY KEY CLUSTERED 
(
	[JobPositionStatusId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [administration].[JobPositionTags]    Script Date: 17-05-2023 8.51.15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [administration].[JobPositionTags](
	[JobPositionTagId] [int] IDENTITY(1,1) NOT NULL,
	[JobPositionId] [int] NULL,
	[TagName] [varchar](100) NULL,
	[Remarks] [varchar](100) NULL,
	[LastUpdatedBy] [varchar](50) NULL,
	[LastUpdatedTime] [datetime] NULL,
 CONSTRAINT [PK_JobTags] PRIMARY KEY CLUSTERED 
(
	[JobPositionTagId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [administration].[MJPLOVItems]    Script Date: 17-05-2023 8.51.15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [administration].[MJPLOVItems](
	[LOVItemId] [int] IDENTITY(1,1) NOT NULL,
	[LOVGroup] [varchar](100) NULL,
	[DisplayText] [varchar](100) NULL,
	[ItemCode] [varchar](100) NULL,
	[LastUpdatedBy] [varchar](50) NULL,
	[LastUpdatedDate] [datetime] NULL,
 CONSTRAINT [PKMJPLOVItems] PRIMARY KEY CLUSTERED 
(
	[LOVItemId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [administration].[States]    Script Date: 17-05-2023 8.51.15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [administration].[States](
	[StateId] [int] IDENTITY(1,1) NOT NULL,
	[StateName] [varchar](50) NULL,
	[DisplayName] [varchar](50) NULL,
	[LastUpdatdBy] [varchar](50) NULL,
	[LastUpdatedTime] [datetime] NULL,
 CONSTRAINT [PK_States] PRIMARY KEY CLUSTERED 
(
	[StateId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [administration].[Users]    Script Date: 17-05-2023 8.51.15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [administration].[Users](
	[UserId] [int] IDENTITY(1,1) NOT NULL,
	[UserName] [varchar](50) NULL,
	[DisplayName] [varchar](100) NULL,
	[FirstName] [varchar](100) NULL,
	[LastName] [varchar](100) NULL,
	[Email] [varchar](100) NULL,
	[MobileNumber] [varchar](100) NULL,
	[Role] [int] NULL,
	[LastUpdatedBy] [varchar](50) NULL,
	[LastUpdatedTime] [datetime] NULL,
 CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED 
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [administration].[Companies] ADD  CONSTRAINT [DF_Companies_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [administration].[JobApplications] ADD  CONSTRAINT [DF_JobApplications_AppliedToCompany]  DEFAULT ((0)) FOR [AppliedToCompany]
GO
ALTER TABLE [administration].[JobPositions] ADD  CONSTRAINT [DF_JobPositions_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [administration].[ApplicantPositionDocuments]  WITH CHECK ADD  CONSTRAINT [FK_ApplicantPositionDocuments_ApplicantPositions] FOREIGN KEY([ApplicantPositionId])
REFERENCES [administration].[JobApplications] ([JobApplicationId])
GO
ALTER TABLE [administration].[ApplicantPositionDocuments] CHECK CONSTRAINT [FK_ApplicantPositionDocuments_ApplicantPositions]
GO
ALTER TABLE [administration].[ApplicationStatusHistory]  WITH CHECK ADD  CONSTRAINT [FK_ApplicationStatusHistory_JobApplications] FOREIGN KEY([JobApplicationId])
REFERENCES [administration].[JobApplications] ([JobApplicationId])
GO
ALTER TABLE [administration].[ApplicationStatusHistory] CHECK CONSTRAINT [FK_ApplicationStatusHistory_JobApplications]
GO
ALTER TABLE [administration].[Companies]  WITH CHECK ADD  CONSTRAINT [FK_Companies_States] FOREIGN KEY([StateId])
REFERENCES [administration].[States] ([StateId])
GO
ALTER TABLE [administration].[Companies] CHECK CONSTRAINT [FK_Companies_States]
GO
ALTER TABLE [administration].[JobApplicationDocuments]  WITH CHECK ADD  CONSTRAINT [FK_JobApplicationDocuments_JobApplications] FOREIGN KEY([JobApplicationId])
REFERENCES [administration].[JobApplications] ([JobApplicationId])
GO
ALTER TABLE [administration].[JobApplicationDocuments] CHECK CONSTRAINT [FK_JobApplicationDocuments_JobApplications]
GO
ALTER TABLE [administration].[JobApplications]  WITH CHECK ADD  CONSTRAINT [FK_ApplicantPositions_Applicants] FOREIGN KEY([ApplicantId])
REFERENCES [administration].[Applicants] ([ApplicantId])
GO
ALTER TABLE [administration].[JobApplications] CHECK CONSTRAINT [FK_ApplicantPositions_Applicants]
GO
ALTER TABLE [administration].[JobPositionDocuments]  WITH CHECK ADD  CONSTRAINT [FK_JobPositionDocuments_JobPositions] FOREIGN KEY([JobPositionId])
REFERENCES [administration].[JobPositions] ([JobPositionId])
GO
ALTER TABLE [administration].[JobPositionDocuments] CHECK CONSTRAINT [FK_JobPositionDocuments_JobPositions]
GO
ALTER TABLE [administration].[JobPositionFeatures]  WITH CHECK ADD  CONSTRAINT [FK_JobPositionFeatureId_JobPositions] FOREIGN KEY([JobPositionId])
REFERENCES [administration].[JobPositions] ([JobPositionId])
GO
ALTER TABLE [administration].[JobPositionFeatures] CHECK CONSTRAINT [FK_JobPositionFeatureId_JobPositions]
GO
ALTER TABLE [administration].[JobPositionGrades]  WITH CHECK ADD  CONSTRAINT [FK_JobPositionGrades_JobPositionCategories] FOREIGN KEY([CategoryId])
REFERENCES [administration].[JobPositionCategories] ([JobPositionCatgoryId])
GO
ALTER TABLE [administration].[JobPositionGrades] CHECK CONSTRAINT [FK_JobPositionGrades_JobPositionCategories]
GO
ALTER TABLE [administration].[JobPositionRequirements]  WITH CHECK ADD  CONSTRAINT [FK_JobPositionRequirements_JobPositions] FOREIGN KEY([JobPositionId])
REFERENCES [administration].[JobPositions] ([JobPositionId])
GO
ALTER TABLE [administration].[JobPositionRequirements] CHECK CONSTRAINT [FK_JobPositionRequirements_JobPositions]
GO
ALTER TABLE [administration].[JobPositions]  WITH CHECK ADD  CONSTRAINT [FK_JobPositions_Companies] FOREIGN KEY([CompanyId])
REFERENCES [administration].[Companies] ([CompanyId])
GO
ALTER TABLE [administration].[JobPositions] CHECK CONSTRAINT [FK_JobPositions_Companies]
GO
ALTER TABLE [administration].[JobPositions]  WITH CHECK ADD  CONSTRAINT [FK_JobPositions_JobPositionCategories] FOREIGN KEY([CategoryId])
REFERENCES [administration].[JobPositionCategories] ([JobPositionCatgoryId])
GO
ALTER TABLE [administration].[JobPositions] CHECK CONSTRAINT [FK_JobPositions_JobPositionCategories]
GO
ALTER TABLE [administration].[JobPositions]  WITH CHECK ADD  CONSTRAINT [FK_JobPositions_MJPLOVItems] FOREIGN KEY([LocationTypeId])
REFERENCES [administration].[MJPLOVItems] ([LOVItemId])
GO
ALTER TABLE [administration].[JobPositions] CHECK CONSTRAINT [FK_JobPositions_MJPLOVItems]
GO
ALTER TABLE [administration].[JobPositionTags]  WITH CHECK ADD  CONSTRAINT [FK_JobPositionTags_JobPositions] FOREIGN KEY([JobPositionId])
REFERENCES [administration].[JobPositions] ([JobPositionId])
GO
ALTER TABLE [administration].[JobPositionTags] CHECK CONSTRAINT [FK_JobPositionTags_JobPositions]
GO
/****** Object:  StoredProcedure [administration].[CalculatePaginationResult]    Script Date: 17-05-2023 8.51.15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [administration].[CalculatePaginationResult]
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
/****** Object:  StoredProcedure [administration].[ExportApplicationsReport]    Script Date: 17-05-2023 8.51.15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [administration].[ExportApplicationsReport]
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
	INNER JOIN [administration].[JobPositionCategories] ct ON ct.JobPositionCatgoryId = jp.CategoryId
	INNER JOIN [administration].[Applicants] ap ON ap.ApplicantId = ajp.ApplicantId
	WHERE ((jp.PostedOn >= @postedStartDate) OR (@postedStartDate IS NULL)) 
		AND ((jp.PostedOn <= @postedEndDate) OR (@postedEndDate IS NULL))
	
END

GO
/****** Object:  StoredProcedure [administration].[FilterApplicantJobPositions]    Script Date: 17-05-2023 8.51.15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [administration].[FilterApplicantJobPositions]
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
		jpg.GradeName AS [GradeName],
		jp.NumberOfPositions,
		ajp.AppliedDate,
		ajp.InterviewDate,
		jp.StatusId,

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
		c.Rating AS [CompanyRating]

	FROM [administration].[JobPositions] jp 
	LEFT JOIN [administration].[JobApplications] ajp ON (ajp.JobPositionId = jp.JobPositionId)  AND
		(@applicantId IS NULL OR ajp.[ApplicantId] = @applicantId)
	INNER JOIN [administration].[JobPositionTags] tg ON tg.JobPositionId = jp.JobPositionId
	LEFT JOIN [administration].[Applicants] ap ON ap.ApplicantId = ajp.ApplicantId 
		
	INNER JOIN @categories fcat ON (fcat.ItemId = jp.CategoryId OR fcat.ItemId IS NULL)
	INNER JOIN @companies fc ON (fc.ItemId = jp.CompanyId OR fc.ItemId IS NULL)
	INNER JOIN [administration].Companies c ON jp.CompanyId = c.CompanyId
	INNER JOIN [administration].JobPositionCategories jpc ON jp.CategoryId = jpc.JobPositionCatgoryId
	INNER JOIN [administration].JobPositionGrades jpg ON jp.GradeId = jpg.JobPositionGradeId
	WHERE  (@filterText IS NULL OR tg.TagName LIKE @filterText OR jp.PositionTitle LIKE @filterText)
	AND (jp.StatusId = @STATUS_OPEN)
	ORDER BY jp.PostedOn DESC
	OFFSET @skipRecords ROWS
	FETCH FIRST @itemsPerPage ROWS ONLY
END

GO
/****** Object:  StoredProcedure [administration].[FilterApplicationsReport]    Script Date: 17-05-2023 8.51.15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [administration].[FilterApplicationsReport]
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
	INNER JOIN [administration].[JobPositionCategories] ct ON ct.JobPositionCatgoryId = jp.CategoryId
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
	INNER JOIN [administration].[JobPositionCategories] ct ON ct.JobPositionCatgoryId = jp.CategoryId
	INNER JOIN [administration].[Applicants] ap ON ap.ApplicantId = ajp.ApplicantId
	WHERE ((jp.PostedOn >= @postedStartDate) OR (@postedStartDate IS NULL)) 
		AND ((jp.PostedOn <= @postedEndDate) OR (@postedEndDate IS NULL))
	ORDER BY jp.PostedOn DESC
	OFFSET @skipRecords ROWS
	FETCH FIRST @itemsPerPage ROWS ONLY

END

GO
/****** Object:  StoredProcedure [administration].[FilterCompanies]    Script Date: 17-05-2023 8.51.15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [administration].[FilterCompanies]
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
		c.[Url],
		st.DisplayName AS [State]
	FROM [administration].[Companies] c 
	INNER JOIN [administration].[States] st ON st.StateId = c.StateId
	WHERE (@filterText IS NULL OR c.CompanyName LIKE @filterText OR c.DisplayName LIKE @filterText)
	ORDER BY c.CompanyId DESC
	OFFSET @skipRecords ROWS
	FETCH FIRST @itemsPerPage ROWS ONLY
END


GO
/****** Object:  StoredProcedure [administration].[FilterJobApplications]    Script Date: 17-05-2023 8.51.15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [administration].[FilterJobApplications]
(	@status [administration].[ListItem] READONLY,
	@companies [administration].[ListItem] READONLY,
	@filterText VARCHAR(200),
	@currentPage INT = 1,
	@itemsPerPage INT = 5,
	@applicantId INT = NULL
) AS
BEGIN
	
	BEGIN
		SET @filterText = CONCAT('%', @filterText, '%')
	END

	DECLARE @skipRecords INT
	DECLARE @totalPages INT
	DECLARE @totalRecordsCount INT


	SELECT @totalRecordsCount = COUNT(jp.JobPositionId)	
	FROM [administration].[JobPositions] jp 
	INNER JOIN [administration].[JobApplications] ajp ON (ajp.JobPositionId = jp.JobPositionId) 
	INNER JOIN [administration].[Applicants] ap ON ap.ApplicantId = ajp.ApplicantId 
	INNER JOIN @companies fc ON (fc.ItemId = jp.CompanyId OR fc.ItemId IS NULL)
	INNER JOIN [administration].Companies c ON jp.CompanyId = c.CompanyId
	WHERE ((@applicantId IS NULL OR ap.ApplicantId = @applicantId) AND
		(@filterText IS NULL OR ap.DisplayName LIKE @filterText
			OR jp.PositionTitle LIKE @filterText
			OR c.DisplayName LIKE @filterText))
	
	
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
		jp.StatusId,

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
	INNER JOIN @companies fc ON (fc.ItemId = jp.CompanyId OR fc.ItemId IS NULL)
	INNER JOIN @status st ON (st.ItemId = ajp.StatusId OR st.ItemId IS NULL)
	INNER JOIN [administration].Companies c ON jp.CompanyId = c.CompanyId
	WHERE ((@applicantId IS NULL OR ap.ApplicantId = @applicantId) AND
		(@filterText IS NULL OR ap.DisplayName LIKE @filterText
			OR jp.PositionTitle LIKE @filterText
			OR c.DisplayName LIKE @filterText))
	ORDER BY jp.PostedOn DESC
	OFFSET @skipRecords ROWS
	FETCH FIRST @itemsPerPage ROWS ONLY
END

GO
/****** Object:  StoredProcedure [administration].[FilterJobPositions]    Script Date: 17-05-2023 8.51.15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [administration].[FilterJobPositions]
(	@status [administration].[ListItem] READONLY,
	@companies [administration].[ListItem] READONLY,
	@filterText VARCHAR(200),
	@currentPage INT = 1,
	@itemsPerPage INT = 10,
	@applicantId INT = NULL
) AS
BEGIN
	
	BEGIN
		SET @filterText = CONCAT('%', @filterText, '%')
	END

	DECLARE @skipRecords INT
	DECLARE @totalPages INT
	DECLARE @totalRecordsCount INT


	SELECT @totalRecordsCount = COUNT(jp.JobPositionId)	
	FROM [administration].[JobPositions] jp 
	INNER JOIN @companies fc ON (fc.ItemId = jp.CompanyId OR fc.ItemId IS NULL)
	INNER JOIN @status st ON (st.ItemId = jp.StatusId OR st.ItemId IS NULL)
	WHERE (@filterText IS NULL OR jp.PositionTitle LIKE @filterText)
	
	
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
		
		-- Company detials
		c.CompanyCode AS [CompanyCode],
		c.CompanyId AS [CompanyId],
		c.[URL] as [CompanyURL], 
		c.DisplayName as [CompanyName],
		c.Rating AS [Rating],

		gr.GradeName AS [GradeName],
		ct.CategoryName AS [CategoryName]
	FROM [administration].[JobPositions] jp 
	INNER JOIN @companies fc ON (fc.ItemId = jp.CompanyId OR fc.ItemId IS NULL)
	INNER JOIN @status st ON (st.ItemId = jp.StatusId OR st.ItemId IS NULL)
	INNER JOIN [administration].[Companies] c ON c.CompanyId = jp.CompanyId
	INNER JOIN [administration].[JobPositionCategories] ct ON ct.JobPositionCatgoryId = jp.CategoryId
	INNER JOIN [administration].[JobPositionGrades] gr ON gr.JobPositionGradeId = jp.GradeId
	WHERE (@filterText IS NULL OR jp.PositionTitle LIKE @filterText)
	ORDER BY jp.PostedOn DESC
	OFFSET @skipRecords ROWS
	FETCH FIRST @itemsPerPage ROWS ONLY
END


GO
/****** Object:  StoredProcedure [administration].[FilterRecommendedCompanies]    Script Date: 17-05-2023 8.51.15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [administration].[FilterRecommendedCompanies]
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
		st.DisplayName AS [State],
		c.CompanyLogo
	FROM [administration].[Companies] c 
	INNER JOIN [administration].[States] st ON st.StateId = c.StateId
	WHERE c.IsActive= 1
	AND c.Rating >= @minRating
	ORDER BY c.rating DESC
	OFFSET @skipRecords ROWS
	FETCH FIRST @itemsPerPage ROWS ONLY
END


GO
/****** Object:  StoredProcedure [administration].[SelectApplicantJobPositions]    Script Date: 17-05-2023 8.51.15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [administration].[SelectApplicantJobPositions]
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
