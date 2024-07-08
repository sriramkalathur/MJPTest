USE [mjp]
GO
/****** Object:  Table [administration].[ApplicantDocuments]    Script Date: 7/7/2024 12:39:37 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [administration].[ApplicantDocuments](
	[ApplicantDocumentId] [int] IDENTITY(1,1) NOT NULL,
	[ApplicantId] [int] NULL,
	[DocumentTypeId] [int] NULL,
	[DocumentName] [varchar](50) NULL,
	[DocumentNumber] [varchar](50) NULL,
	[IssueDate] [datetime] NULL,
	[ExpiryDate] [datetime] NULL,
	[IssuePlace] [varchar](100) NULL,
	[LastUpdatedBy] [varchar](50) NULL,
	[LastUpdatedTime] [datetime] NULL,
 CONSTRAINT [PK_ApplicantDocuments] PRIMARY KEY CLUSTERED 
(
	[ApplicantDocumentId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [administration].[ApplicantFiles]    Script Date: 7/7/2024 12:39:37 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [administration].[ApplicantFiles](
	[ApplicantFileId] [int] IDENTITY(1,1) NOT NULL,
	[DocumentType] [int] NULL,
	[ApplicantId] [int] NULL,
	[DocumentContent] [varbinary](max) NULL,
	[DocumentTitle] [varchar](100) NULL,
	[FileName] [varchar](100) NULL,
	[Remarks] [varchar](200) NULL,
	[LastUpdatedBy] [varchar](50) NULL,
	[LastUpdatedTime] [datetime] NULL,
 CONSTRAINT [PK_JobApplicantFiles] PRIMARY KEY CLUSTERED 
(
	[ApplicantFileId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [administration].[ApplicantPersonalDetails]    Script Date: 7/7/2024 12:39:37 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [administration].[ApplicantPersonalDetails](
	[ApplicantPersonalDetailId] [int] IDENTITY(1,1) NOT NULL,
	[ApplicantId] [int] NULL,
	[DisplayName] [varchar](150) NULL,
	[DateOfBirth] [datetime] NULL,
	[FatherName] [varchar](100) NULL,
	[Nationality] [int] NULL,
	[MaritalStatus] [int] NULL,
	[ProfileSummary] [varchar](200) NULL,
	[JobStatus] [int] NULL,
	[CategoryId] [int] NULL,
	[VesselTypeId] [int] NULL,
	[DepartmentId] [int] NULL,
	[RankId] [int] NULL,
	[ExperienceYrs] [int] NULL,
	[ExperienceMonths] [int] NULL,
	[Experience]  AS (concat(isnull([ExperienceYrs],(0)),'.',isnull([ExperienceMonths],(0)))),
	[AnnualSalary] [decimal](18, 4) NULL,
	[AnnualSalaryCurrencyId] [int] NULL,
	[ExpectedSalary] [decimal](18, 0) NULL,
	[ExpectedSalaryCurrencyId] [int] NULL,
	[LanguagesKnown] [varchar](300) NULL,
	[EducationalQualification] [varchar](100) NULL,
	[TechnicalQualification] [varchar](100) NULL,
	[PermanentAddressSameAsCurrent] [bit] NULL,
	[PermanantAddress1] [varchar](200) NULL,
	[PermanentAddress2] [varchar](200) NULL,
	[PermanentCity] [varchar](100) NULL,
	[PermanentPincode] [varchar](10) NULL,
	[CurrentAddress1] [varchar](200) NULL,
	[CurrentAddress2] [varchar](200) NULL,
	[CurrentCity] [varchar](100) NULL,
	[CurrentPincode] [varchar](10) NULL,
	[AlternateContactNumber] [varchar](20) NULL,
	[AlternateEmail] [varchar](50) NULL,
	[IsActive] [bit] NULL,
	[LastUpdatedBy] [varchar](50) NULL,
	[LastUpdatedTime] [datetime] NULL,
 CONSTRAINT [PK_ApplicantProfile] PRIMARY KEY CLUSTERED 
(
	[ApplicantPersonalDetailId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [administration].[ApplicantPositionDocuments]    Script Date: 7/7/2024 12:39:37 AM ******/
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
/****** Object:  Table [administration].[Applicants]    Script Date: 7/7/2024 12:39:37 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [administration].[Applicants](
	[ApplicantId] [int] IDENTITY(1,1) NOT NULL,
	[UserName] [varchar](50) NULL,
	[Password] [varchar](100) NULL,
	[FirstName] [varchar](100) NULL,
	[LastName] [varchar](100) NULL,
	[DisplayName]  AS (concat([FirstName],',',[LastName])),
	[Email] [varchar](100) NULL,
	[MobileNumber] [varchar](20) NULL,
	[StatusId] [int] NULL,
	[AvailabilityStatusId] [int] NULL,
	[PersonalInfoCompleted] [bit] NULL,
	[DocumentsCompleted] [bit] NULL,
	[LastUpdatedBy] [varchar](50) NULL,
	[LastUpdatedTime] [datetime] NULL,
 CONSTRAINT [PK_Applicants] PRIMARY KEY CLUSTERED 
(
	[ApplicantId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [administration].[ApplicantSTCWCourses]    Script Date: 7/7/2024 12:39:37 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [administration].[ApplicantSTCWCourses](
	[STCWCourseId] [int] IDENTITY(1,1) NOT NULL,
	[ApplicantId] [int] NULL,
	[CourseId] [int] NULL,
	[CertificateNumber] [varchar](100) NULL,
	[Grade] [varchar](50) NULL,
	[IssueDate] [datetime] NULL,
	[IssuePlace] [varchar](100) NULL,
	[ValidTill] [datetime] NULL,
	[Details] [varchar](200) NULL,
	[LastUpdatedBy] [varchar](50) NULL,
	[LastUpdatedTime] [datetime] NULL,
 CONSTRAINT [PK_ApplicantSTCWCourses] PRIMARY KEY CLUSTERED 
(
	[STCWCourseId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [administration].[ApplicationStatusHistory]    Script Date: 7/7/2024 12:39:37 AM ******/
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
/****** Object:  Table [administration].[Companies]    Script Date: 7/7/2024 12:39:37 AM ******/
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
	[RPSLNumber] [varchar](50) NULL,
	[CompanyProfile] [varchar](200) NULL,
	[Address1] [varchar](150) NULL,
	[Address2] [varchar](150) NULL,
	[Address3] [varchar](150) NULL,
	[City] [varchar](50) NULL,
	[CompanyLogo] [varchar](max) NULL,
	[StateId] [int] NULL,
	[Pincode] [varchar](50) NULL,
	[IsRecommended] [bit] NULL,
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
/****** Object:  Table [administration].[CompanyUsers]    Script Date: 7/7/2024 12:39:37 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [administration].[CompanyUsers](
	[CompanyUserId] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [int] NULL,
	[CompanyId] [int] NULL,
	[LastUpdatedBy] [varchar](50) NULL,
	[LastUpdatedTime] [datetime] NULL,
 CONSTRAINT [PK_CompanyUsers] PRIMARY KEY CLUSTERED 
(
	[CompanyUserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [administration].[CompetencyCertificates]    Script Date: 7/7/2024 12:39:37 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [administration].[CompetencyCertificates](
	[CompetencyCertificateId] [int] IDENTITY(1,1) NOT NULL,
	[ApplicantId] [int] NULL,
	[CertificateId] [int] NULL,
	[COCNumber] [varchar](50) NULL,
	[Details] [varchar](100) NULL,
	[Grade] [varchar](100) NULL,
	[Board] [varchar](200) NULL,
	[Institution] [varchar](200) NULL,
	[YearOfPassing] [varchar](50) NULL,
	[LastUpdatedBy] [varchar](50) NULL,
	[LastUpdatedTime] [datetime] NULL,
 CONSTRAINT [PK_Table_1_1] PRIMARY KEY CLUSTERED 
(
	[CompetencyCertificateId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [administration].[Departments]    Script Date: 7/7/2024 12:39:37 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [administration].[Departments](
	[DepartmentId] [int] IDENTITY(1,1) NOT NULL,
	[DepartmentName] [varchar](50) NULL,
	[IsActive] [bit] NULL,
	[LastUpdatedBy] [varchar](50) NULL,
	[LastUpdatedTime] [datetime] NULL,
 CONSTRAINT [PK_Table_1_2] PRIMARY KEY CLUSTERED 
(
	[DepartmentId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [administration].[JobApplicationDocuments]    Script Date: 7/7/2024 12:39:37 AM ******/
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
/****** Object:  Table [administration].[JobApplications]    Script Date: 7/7/2024 12:39:37 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [administration].[JobApplications](
	[JobApplicationId] [int] IDENTITY(1,1) NOT NULL,
	[ApplicantId] [int] NULL,
	[JobApplicationCode]  AS (concat('APP',[JobApplicationId])),
	[ApplicationNumber]  AS (concat('APP',[JobApplicationId])),
	[JobPositionId] [int] NULL,
	[StatusId] [int] NULL,
	[IsActive] [bit] NULL,
	[AppliedDate] [datetime] NULL,
	[AppliedToCompany] [bit] NULL,
	[InterviewDate] [datetime] NULL,
	[ExpiryDate] [datetime] NULL,
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
/****** Object:  Table [administration].[JobPositionCategories]    Script Date: 7/7/2024 12:39:37 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [administration].[JobPositionCategories](
	[JobPositionCategoryId] [int] IDENTITY(1,1) NOT NULL,
	[CategoryName] [varchar](100) NULL,
	[Description] [varchar](200) NULL,
	[LastUpdatedDate] [datetime] NULL,
	[LastUpdatedBy] [varchar](50) NULL,
 CONSTRAINT [PK_Table_1] PRIMARY KEY CLUSTERED 
(
	[JobPositionCategoryId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [administration].[JobPositionDocuments]    Script Date: 7/7/2024 12:39:37 AM ******/
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
/****** Object:  Table [administration].[JobPositionFeatures]    Script Date: 7/7/2024 12:39:37 AM ******/
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
/****** Object:  Table [administration].[JobPositionRanks]    Script Date: 7/7/2024 12:39:37 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [administration].[JobPositionRanks](
	[JobPositionRankId] [int] IDENTITY(1,1) NOT NULL,
	[RankName] [varchar](100) NULL,
	[RankCode] [varchar](100) NULL,
	[DepartmentId] [int] NULL,
	[RoleId] [int] NULL,
	[LastUpdatedBy] [varchar](50) NULL,
	[LastUpdatedDate] [datetime] NULL,
 CONSTRAINT [PK_JobPositionGrades] PRIMARY KEY CLUSTERED 
(
	[JobPositionRankId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [administration].[JobPositionRequirements]    Script Date: 7/7/2024 12:39:37 AM ******/
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
/****** Object:  Table [administration].[JobPositions]    Script Date: 7/7/2024 12:39:37 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [administration].[JobPositions](
	[JobPositionId] [int] IDENTITY(1,1) NOT NULL,
	[JobCode]  AS (concat('JP',[JobPositionId])),
	[CompanyId] [int] NULL,
	[CompanyJobCode] [varchar](50) NULL,
	[PostedOn] [datetime] NULL,
	[SalaryRange] [varchar](100) NULL,
	[CurrencyId] [int] NULL,
	[NumberOfPositions] [int] NULL,
	[MinExperience] [decimal](18, 2) NULL,
	[MaxExperience] [decimal](18, 2) NULL,
	[InterviewDate] [datetime] NULL,
	[ExpiryDate] [datetime] NULL,
	[InterviewLocation] [varchar](200) NULL,
	[DepartmentId] [int] NULL,
	[RankId] [int] NULL,
	[VesselTypeId] [int] NULL,
	[CategoryId] [int] NULL,
	[LocationTypeId] [int] NULL,
	[PositionTitle] [varchar](100) NULL,
	[JDSummary] [varchar](100) NULL,
	[Location] [varchar](100) NULL,
	[StatusId] [int] NULL,
	[StaffRemarks] [varchar](200) NULL,
	[IsActive] [bit] NULL,
	[PostedBy] [varchar](50) NULL,
	[IsRecommended] [bit] NULL,
	[LastDateOfApplication] [datetime] NULL,
	[LastUpdatedBy] [varchar](50) NULL,
	[LastUpdatedTime] [datetime] NULL,
 CONSTRAINT [PK_JobPositions] PRIMARY KEY CLUSTERED 
(
	[JobPositionId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [administration].[JobPositionStatus]    Script Date: 7/7/2024 12:39:37 AM ******/
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
/****** Object:  Table [administration].[JobPositionTags]    Script Date: 7/7/2024 12:39:37 AM ******/
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
/****** Object:  Table [administration].[MJPLOVItems]    Script Date: 7/7/2024 12:39:37 AM ******/
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
/****** Object:  Table [administration].[Roles]    Script Date: 7/7/2024 12:39:37 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [administration].[Roles](
	[RoleId] [int] IDENTITY(1,1) NOT NULL,
	[RoleName] [varchar](50) NULL,
	[IsBHPRequired] [bit] NULL,
	[IsCertificateRequired] [bit] NULL,
	[LastUpdatedBy] [varchar](50) NULL,
	[LastUpdatedTime] [datetime] NULL,
 CONSTRAINT [PK_Table_1_4] PRIMARY KEY CLUSTERED 
(
	[RoleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [administration].[RPSL]    Script Date: 7/7/2024 12:39:37 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [administration].[RPSL](
	[RPSLId] [int] IDENTITY(1,1) NOT NULL,
	[RPSLNumber] [varchar](50) NULL,
	[CompanyName] [varchar](100) NULL,
	[Address1] [varchar](500) NULL,
	[Address2] [varchar](150) NULL,
	[Address3] [varchar](150) NULL,
	[City] [varchar](50) NULL,
	[StateId] [int] NULL,
	[Pincode] [varchar](50) NULL,
	[LastUpdatedBy] [varchar](50) NULL,
	[LastUpdatedDate] [datetime] NULL,
 CONSTRAINT [PK_Table_1_5] PRIMARY KEY CLUSTERED 
(
	[RPSLId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [administration].[SEAExperience]    Script Date: 7/7/2024 12:39:37 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [administration].[SEAExperience](
	[SEAExperienceId] [int] IDENTITY(1,1) NOT NULL,
	[ApplicantId] [int] NULL,
	[CompanyName] [varchar](100) NULL,
	[VesselName] [varchar](100) NULL,
	[Type] [varchar](100) NULL,
	[GRT] [varchar](100) NULL,
	[BHP] [varchar](100) NULL,
	[Rank] [varchar](100) NULL,
	[FromDate] [datetime] NULL,
	[ToDate] [datetime] NULL,
	[LastUpdatedBy] [varchar](50) NULL,
	[LastUpdatedTime] [datetime] NULL,
 CONSTRAINT [PK_SEAExperience] PRIMARY KEY CLUSTERED 
(
	[SEAExperienceId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [administration].[States]    Script Date: 7/7/2024 12:39:37 AM ******/
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
/****** Object:  Table [administration].[Users]    Script Date: 7/7/2024 12:39:37 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [administration].[Users](
	[UserId] [int] IDENTITY(1,1) NOT NULL,
	[UserName] [varchar](50) NULL,
	[Password] [varchar](50) NULL,
	[DisplayName] [varchar](100) NULL,
	[FirstName] [varchar](100) NULL,
	[LastName] [varchar](100) NULL,
	[Email] [varchar](100) NULL,
	[MobileNumber] [varchar](100) NULL,
	[Role] [int] NULL,
	[CompanyId] [int] NULL,
	[LastUpdatedBy] [varchar](50) NULL,
	[LastUpdatedTime] [datetime] NULL,
 CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED 
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [administration].[VesselTypes]    Script Date: 7/7/2024 12:39:37 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [administration].[VesselTypes](
	[VesselTypeId] [int] IDENTITY(1,1) NOT NULL,
	[VesselTypeName] [varchar](100) NULL,
	[IsActive] [bit] NULL,
	[LastUpdatedBy] [varchar](50) NULL,
	[LastUpdatedTime] [datetime] NULL,
 CONSTRAINT [PK_Table_1_3] PRIMARY KEY CLUSTERED 
(
	[VesselTypeId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [administration].[Applicants] ADD  CONSTRAINT [DF_Applicants_StatusId]  DEFAULT ((0)) FOR [StatusId]
GO
ALTER TABLE [administration].[Applicants] ADD  CONSTRAINT [DF_Applicants_AvailabilityStatusId]  DEFAULT ((2)) FOR [AvailabilityStatusId]
GO
ALTER TABLE [administration].[Applicants] ADD  CONSTRAINT [DF_Applicants_PersonalInfoCompleted]  DEFAULT ((0)) FOR [PersonalInfoCompleted]
GO
ALTER TABLE [administration].[Applicants] ADD  CONSTRAINT [DF_Applicants_DocumentsCompleted]  DEFAULT ((0)) FOR [DocumentsCompleted]
GO
ALTER TABLE [administration].[Companies] ADD  CONSTRAINT [DF_Companies_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [administration].[JobApplications] ADD  CONSTRAINT [DF_JobApplications_AppliedToCompany]  DEFAULT ((0)) FOR [AppliedToCompany]
GO
ALTER TABLE [administration].[JobPositions] ADD  CONSTRAINT [DF_JobPositions_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [administration].[ApplicantDocuments]  WITH CHECK ADD  CONSTRAINT [FK_ApplicantDocuments_MJPLOVItems] FOREIGN KEY([DocumentTypeId])
REFERENCES [administration].[MJPLOVItems] ([LOVItemId])
GO
ALTER TABLE [administration].[ApplicantDocuments] CHECK CONSTRAINT [FK_ApplicantDocuments_MJPLOVItems]
GO
ALTER TABLE [administration].[ApplicantDocuments]  WITH CHECK ADD  CONSTRAINT [FK_Table_1_Applicants] FOREIGN KEY([ApplicantId])
REFERENCES [administration].[Applicants] ([ApplicantId])
GO
ALTER TABLE [administration].[ApplicantDocuments] CHECK CONSTRAINT [FK_Table_1_Applicants]
GO
ALTER TABLE [administration].[ApplicantFiles]  WITH CHECK ADD  CONSTRAINT [FK_ApplicantFiles_Applicants] FOREIGN KEY([ApplicantId])
REFERENCES [administration].[Applicants] ([ApplicantId])
GO
ALTER TABLE [administration].[ApplicantFiles] CHECK CONSTRAINT [FK_ApplicantFiles_Applicants]
GO
ALTER TABLE [administration].[ApplicantPersonalDetails]  WITH CHECK ADD  CONSTRAINT [FK_ApplicantPersonalDetails_Departments] FOREIGN KEY([DepartmentId])
REFERENCES [administration].[Departments] ([DepartmentId])
GO
ALTER TABLE [administration].[ApplicantPersonalDetails] CHECK CONSTRAINT [FK_ApplicantPersonalDetails_Departments]
GO
ALTER TABLE [administration].[ApplicantPersonalDetails]  WITH CHECK ADD  CONSTRAINT [FK_ApplicantPersonalDetails_JobPositionCategories] FOREIGN KEY([CategoryId])
REFERENCES [administration].[JobPositionCategories] ([JobPositionCategoryId])
GO
ALTER TABLE [administration].[ApplicantPersonalDetails] CHECK CONSTRAINT [FK_ApplicantPersonalDetails_JobPositionCategories]
GO
ALTER TABLE [administration].[ApplicantPersonalDetails]  WITH CHECK ADD  CONSTRAINT [FK_ApplicantProfile_Applicants] FOREIGN KEY([RankId])
REFERENCES [administration].[JobPositionRanks] ([JobPositionRankId])
GO
ALTER TABLE [administration].[ApplicantPersonalDetails] CHECK CONSTRAINT [FK_ApplicantProfile_Applicants]
GO
ALTER TABLE [administration].[ApplicantPositionDocuments]  WITH CHECK ADD  CONSTRAINT [FK_ApplicantPositionDocuments_ApplicantPositions] FOREIGN KEY([ApplicantPositionId])
REFERENCES [administration].[JobApplications] ([JobApplicationId])
GO
ALTER TABLE [administration].[ApplicantPositionDocuments] CHECK CONSTRAINT [FK_ApplicantPositionDocuments_ApplicantPositions]
GO
ALTER TABLE [administration].[ApplicantSTCWCourses]  WITH CHECK ADD  CONSTRAINT [FK_ApplicantSTCWCourses_Applicants] FOREIGN KEY([ApplicantId])
REFERENCES [administration].[Applicants] ([ApplicantId])
GO
ALTER TABLE [administration].[ApplicantSTCWCourses] CHECK CONSTRAINT [FK_ApplicantSTCWCourses_Applicants]
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
ALTER TABLE [administration].[CompetencyCertificates]  WITH CHECK ADD  CONSTRAINT [FK_Table_1_Applicants1] FOREIGN KEY([CertificateId])
REFERENCES [administration].[MJPLOVItems] ([LOVItemId])
GO
ALTER TABLE [administration].[CompetencyCertificates] CHECK CONSTRAINT [FK_Table_1_Applicants1]
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
ALTER TABLE [administration].[JobApplications]  WITH CHECK ADD  CONSTRAINT [FK_JobApplications_JobPositions] FOREIGN KEY([JobPositionId])
REFERENCES [administration].[JobPositions] ([JobPositionId])
GO
ALTER TABLE [administration].[JobApplications] CHECK CONSTRAINT [FK_JobApplications_JobPositions]
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
ALTER TABLE [administration].[JobPositionRanks]  WITH CHECK ADD  CONSTRAINT [FK_JobPositionGrades_JobPositionCategories] FOREIGN KEY([DepartmentId])
REFERENCES [administration].[Departments] ([DepartmentId])
GO
ALTER TABLE [administration].[JobPositionRanks] CHECK CONSTRAINT [FK_JobPositionGrades_JobPositionCategories]
GO
ALTER TABLE [administration].[JobPositionRanks]  WITH CHECK ADD  CONSTRAINT [FK_JobPositionRanks_Roles] FOREIGN KEY([RoleId])
REFERENCES [administration].[Roles] ([RoleId])
GO
ALTER TABLE [administration].[JobPositionRanks] CHECK CONSTRAINT [FK_JobPositionRanks_Roles]
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
ALTER TABLE [administration].[JobPositions]  WITH CHECK ADD  CONSTRAINT [FK_JobPositions_Departments] FOREIGN KEY([DepartmentId])
REFERENCES [administration].[Departments] ([DepartmentId])
GO
ALTER TABLE [administration].[JobPositions] CHECK CONSTRAINT [FK_JobPositions_Departments]
GO
ALTER TABLE [administration].[JobPositions]  WITH CHECK ADD  CONSTRAINT [FK_JobPositions_JobPositionCategories] FOREIGN KEY([CategoryId])
REFERENCES [administration].[JobPositionCategories] ([JobPositionCategoryId])
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
