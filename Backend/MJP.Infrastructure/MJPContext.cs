using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace MJP.Infrastructure
{
    public partial class MJPContext : DbContext
    {
        public MJPContext()
        {
        }

        public MJPContext(DbContextOptions<MJPContext> options)
            : base(options)
        {
        }

        public virtual DbSet<ApplicantDocuments> ApplicantDocuments { get; set; }
        public virtual DbSet<ApplicantFiles> ApplicantFiles { get; set; }
        public virtual DbSet<ApplicantPersonalDetails> ApplicantPersonalDetails { get; set; }
        public virtual DbSet<ApplicantPositionDocuments> ApplicantPositionDocuments { get; set; }
        public virtual DbSet<ApplicantStcwcourses> ApplicantStcwcourses { get; set; }
        public virtual DbSet<Applicants> Applicants { get; set; }
        public virtual DbSet<ApplicationStatusHistory> ApplicationStatusHistory { get; set; }
        public virtual DbSet<Companies> Companies { get; set; }
        public virtual DbSet<CompanyUsers> CompanyUsers { get; set; }
        public virtual DbSet<CompetencyCertificates> CompetencyCertificates { get; set; }
        public virtual DbSet<Departments> Departments { get; set; }
        public virtual DbSet<JobApplicationDocuments> JobApplicationDocuments { get; set; }
        public virtual DbSet<JobApplications> JobApplications { get; set; }
        public virtual DbSet<JobPositionCategories> JobPositionCategories { get; set; }
        public virtual DbSet<JobPositionDocuments> JobPositionDocuments { get; set; }
        public virtual DbSet<JobPositionFeatures> JobPositionFeatures { get; set; }
        public virtual DbSet<JobPositionRanks> JobPositionRanks { get; set; }
        public virtual DbSet<JobPositionRequirements> JobPositionRequirements { get; set; }
        public virtual DbSet<JobPositionStatus> JobPositionStatus { get; set; }
        public virtual DbSet<JobPositionTags> JobPositionTags { get; set; }
        public virtual DbSet<JobPositions> JobPositions { get; set; }
        public virtual DbSet<Mjplovitems> Mjplovitems { get; set; }
        public virtual DbSet<Roles> Roles { get; set; }
        public virtual DbSet<Rpsl> Rpsl { get; set; }
        public virtual DbSet<Seaexperience> Seaexperience { get; set; }
        public virtual DbSet<States> States { get; set; }
        public virtual DbSet<Users> Users { get; set; }
        public virtual DbSet<VesselTypes> VesselTypes { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("server=(localdb)\\MSSQLLocalDB;database=MJP;Trusted_Connection=True;Integrated Security=true;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");

            modelBuilder.Entity<ApplicantDocuments>(entity =>
            {
                entity.HasKey(e => e.ApplicantDocumentId);

                entity.ToTable("ApplicantDocuments", "administration");

                entity.Property(e => e.DocumentName)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.DocumentNumber)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.ExpiryDate).HasColumnType("datetime");

                entity.Property(e => e.Grade)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.IssueDate).HasColumnType("datetime");

                entity.Property(e => e.IssuePlace)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.LastUpdatedBy)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.LastUpdatedTime).HasColumnType("datetime");

                entity.HasOne(d => d.Applicant)
                    .WithMany(p => p.ApplicantDocuments)
                    .HasForeignKey(d => d.ApplicantId)
                    .HasConstraintName("FK_Table_1_Applicants");

                entity.HasOne(d => d.DocumentType)
                    .WithMany(p => p.ApplicantDocuments)
                    .HasForeignKey(d => d.DocumentTypeId)
                    .HasConstraintName("FK_ApplicantDocuments_MJPLOVItems");
            });

            modelBuilder.Entity<ApplicantFiles>(entity =>
            {
                entity.HasKey(e => e.ApplicantFileId)
                    .HasName("PK_JobApplicantFiles");

                entity.ToTable("ApplicantFiles", "administration");

                entity.Property(e => e.DocumentTitle)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.FileName)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.LastUpdatedBy)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.LastUpdatedTime).HasColumnType("datetime");

                entity.Property(e => e.Remarks)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.HasOne(d => d.Applicant)
                    .WithMany(p => p.ApplicantFiles)
                    .HasForeignKey(d => d.ApplicantId)
                    .HasConstraintName("FK_ApplicantFiles_Applicants");
            });

            modelBuilder.Entity<ApplicantPersonalDetails>(entity =>
            {
                entity.HasKey(e => e.ApplicantPersonalDetailId)
                    .HasName("PK_ApplicantProfile");

                entity.ToTable("ApplicantPersonalDetails", "administration");

                entity.Property(e => e.AlternateContactNumber)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.AlternateEmail)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.AnnualSalary).HasColumnType("decimal(18, 4)");

                entity.Property(e => e.CurrentAddress1)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.CurrentAddress2)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.CurrentCity)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.CurrentPincode)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.DateOfBirth).HasColumnType("datetime");

                entity.Property(e => e.DisplayName)
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.Property(e => e.EducationalQualification)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.ExpectedSalary).HasColumnType("decimal(18, 0)");

                entity.Property(e => e.Experience)
                    .IsRequired()
                    .HasMaxLength(25)
                    .IsUnicode(false)
                    .HasComputedColumnSql("(concat(isnull([ExperienceYrs],(0)),'.',isnull([ExperienceMonths],(0))))", false);

                entity.Property(e => e.FatherName)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.LanguagesKnown)
                    .HasMaxLength(300)
                    .IsUnicode(false);

                entity.Property(e => e.LastUpdatedBy)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.LastUpdatedTime).HasColumnType("datetime");

                entity.Property(e => e.PermanantAddress1)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.PermanentAddress2)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.PermanentCity)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.PermanentPincode)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.ProfileSummary)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.TechnicalQualification)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.HasOne(d => d.Category)
                    .WithMany(p => p.ApplicantPersonalDetails)
                    .HasForeignKey(d => d.CategoryId)
                    .HasConstraintName("FK_ApplicantPersonalDetails_JobPositionCategories");

                entity.HasOne(d => d.Department)
                    .WithMany(p => p.ApplicantPersonalDetails)
                    .HasForeignKey(d => d.DepartmentId)
                    .HasConstraintName("FK_ApplicantPersonalDetails_Departments");

                entity.HasOne(d => d.Rank)
                    .WithMany(p => p.ApplicantPersonalDetails)
                    .HasForeignKey(d => d.RankId)
                    .HasConstraintName("FK_ApplicantProfile_Applicants");
            });

            modelBuilder.Entity<ApplicantPositionDocuments>(entity =>
            {
                entity.HasKey(e => e.ApplicantPositionDocumentId)
                    .HasName("PK_ApplicantJobDocuments");

                entity.ToTable("ApplicantPositionDocuments", "administration");

                entity.Property(e => e.LastUpdatedBy)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.LastUpdtedTime).HasColumnType("datetime");

                entity.HasOne(d => d.ApplicantPosition)
                    .WithMany(p => p.ApplicantPositionDocuments)
                    .HasForeignKey(d => d.ApplicantPositionId)
                    .HasConstraintName("FK_ApplicantPositionDocuments_ApplicantPositions");
            });

            modelBuilder.Entity<ApplicantStcwcourses>(entity =>
            {
                entity.HasKey(e => e.StcwcourseId);

                entity.ToTable("ApplicantSTCWCourses", "administration");

                entity.Property(e => e.StcwcourseId).HasColumnName("STCWCourseId");

                entity.Property(e => e.CertificateNumber)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Details)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.Grade)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.IssueDate).HasColumnType("datetime");

                entity.Property(e => e.IssuePlace)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.LastUpdatedBy)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.LastUpdatedTime).HasColumnType("datetime");

                entity.Property(e => e.ValidTill).HasColumnType("datetime");

                entity.HasOne(d => d.Applicant)
                    .WithMany(p => p.ApplicantStcwcourses)
                    .HasForeignKey(d => d.ApplicantId)
                    .HasConstraintName("FK_ApplicantSTCWCourses_Applicants");
            });

            modelBuilder.Entity<Applicants>(entity =>
            {
                entity.HasKey(e => e.ApplicantId);

                entity.ToTable("Applicants", "administration");

                entity.Property(e => e.AvailabilityStatusId).HasDefaultValueSql("((2))");

                entity.Property(e => e.DisplayName)
                    .IsRequired()
                    .HasMaxLength(201)
                    .IsUnicode(false)
                    .HasComputedColumnSql("(concat([FirstName],',',[LastName]))", false);

                entity.Property(e => e.DocumentsCompleted).HasDefaultValueSql("((0))");

                entity.Property(e => e.Email)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.FirstName)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.LastName)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.LastUpdatedBy)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.LastUpdatedTime).HasColumnType("datetime");

                entity.Property(e => e.MobileNumber)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.Password)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.PersonalInfoCompleted).HasDefaultValueSql("((0))");

                entity.Property(e => e.StatusId).HasDefaultValueSql("((0))");

                entity.Property(e => e.UserName)
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<ApplicationStatusHistory>(entity =>
            {
                entity.ToTable("ApplicationStatusHistory", "administration");

                entity.Property(e => e.LastUpdatedBy)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.LastUpdatedTime).HasColumnType("datetime");

                entity.Property(e => e.Remarks)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.StatusDate).HasColumnType("datetime");

                entity.HasOne(d => d.JobApplication)
                    .WithMany(p => p.ApplicationStatusHistory)
                    .HasForeignKey(d => d.JobApplicationId)
                    .HasConstraintName("FK_ApplicationStatusHistory_JobApplications");
            });

            modelBuilder.Entity<Companies>(entity =>
            {
                entity.HasKey(e => e.CompanyId);

                entity.ToTable("Companies", "administration");

                entity.Property(e => e.Address1)
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.Property(e => e.Address2)
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.Property(e => e.Address3)
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.Property(e => e.City)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.CompanyCode)
                    .IsRequired()
                    .HasMaxLength(16)
                    .IsUnicode(false)
                    .HasComputedColumnSql("(concat('CMP-',[CompanyId]))", false);

                entity.Property(e => e.CompanyLogo).IsUnicode(false);

                entity.Property(e => e.CompanyName)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.CompanyProfile)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.ContactNumber)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.DisplayName)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Email)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.IsActive).HasDefaultValueSql("((1))");

                entity.Property(e => e.LastUpdatedBy)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.LastUpdatedTime).HasColumnType("datetime");

                entity.Property(e => e.Pincode)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Rpslnumber)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("RPSLNumber");

                entity.Property(e => e.Url)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("URL");

                entity.HasOne(d => d.State)
                    .WithMany(p => p.Companies)
                    .HasForeignKey(d => d.StateId)
                    .HasConstraintName("FK_Companies_States");
            });

            modelBuilder.Entity<CompanyUsers>(entity =>
            {
                entity.HasKey(e => e.CompanyUserId);

                entity.ToTable("CompanyUsers", "administration");

                entity.Property(e => e.LastUpdatedBy)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.LastUpdatedTime).HasColumnType("datetime");
            });

            modelBuilder.Entity<CompetencyCertificates>(entity =>
            {
                entity.HasKey(e => e.CompetencyCertificateId)
                    .HasName("PK_Table_1_1");

                entity.ToTable("CompetencyCertificates", "administration");

                entity.Property(e => e.Board)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.Cocnumber)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("COCNumber");

                entity.Property(e => e.Details)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Grade)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Institution)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.LastUpdatedBy)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.LastUpdatedTime).HasColumnType("datetime");

                entity.Property(e => e.YearOfPassing)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.HasOne(d => d.Certificate)
                    .WithMany(p => p.CompetencyCertificates)
                    .HasForeignKey(d => d.CertificateId)
                    .HasConstraintName("FK_Table_1_Applicants1");
            });

            modelBuilder.Entity<Departments>(entity =>
            {
                entity.HasKey(e => e.DepartmentId)
                    .HasName("PK_Table_1_2");

                entity.ToTable("Departments", "administration");

                entity.Property(e => e.DepartmentName)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.LastUpdatedBy)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.LastUpdatedTime).HasColumnType("datetime");
            });

            modelBuilder.Entity<JobApplicationDocuments>(entity =>
            {
                entity.HasKey(e => e.JobApplicationDocumentId);

                entity.ToTable("JobApplicationDocuments", "administration");

                entity.Property(e => e.DocumentTitle)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.FileName)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.LastUpdatedBy)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.LastUpdatedTime).HasColumnType("datetime");

                entity.Property(e => e.Remarks)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.HasOne(d => d.JobApplication)
                    .WithMany(p => p.JobApplicationDocuments)
                    .HasForeignKey(d => d.JobApplicationId)
                    .HasConstraintName("FK_JobApplicationDocuments_JobApplications");
            });

            modelBuilder.Entity<JobApplications>(entity =>
            {
                entity.HasKey(e => e.JobApplicationId)
                    .HasName("PK_ApplicantJobs");

                entity.ToTable("JobApplications", "administration");

                entity.Property(e => e.ApplicantRemarks)
                    .HasMaxLength(300)
                    .IsUnicode(false);

                entity.Property(e => e.ApplicationNumber)
                    .IsRequired()
                    .HasMaxLength(15)
                    .IsUnicode(false)
                    .HasComputedColumnSql("(concat('APP',[JobApplicationId]))", false);

                entity.Property(e => e.AppliedDate).HasColumnType("datetime");

                entity.Property(e => e.AppliedToCompany).HasDefaultValueSql("((0))");

                entity.Property(e => e.ExpiryDate).HasColumnType("datetime");

                entity.Property(e => e.InterviewDate).HasColumnType("datetime");

                entity.Property(e => e.InterviewInstrutions)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.InterviewUrl)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("InterviewURL");

                entity.Property(e => e.JobApplicationCode)
                    .IsRequired()
                    .HasMaxLength(15)
                    .IsUnicode(false)
                    .HasComputedColumnSql("(concat('APP',[JobApplicationId]))", false);

                entity.Property(e => e.LastUpdatedBy)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.LastUpdatedDate).HasColumnType("datetime");

                entity.Property(e => e.StaffRemarks)
                    .HasMaxLength(300)
                    .IsUnicode(false);

                entity.HasOne(d => d.Applicant)
                    .WithMany(p => p.JobApplications)
                    .HasForeignKey(d => d.ApplicantId)
                    .HasConstraintName("FK_ApplicantPositions_Applicants");

                entity.HasOne(d => d.JobPosition)
                    .WithMany(p => p.JobApplications)
                    .HasForeignKey(d => d.JobPositionId)
                    .HasConstraintName("FK_JobApplications_JobPositions");
            });

            modelBuilder.Entity<JobPositionCategories>(entity =>
            {
                entity.HasKey(e => e.JobPositionCategoryId)
                    .HasName("PK_Table_1");

                entity.ToTable("JobPositionCategories", "administration");

                entity.Property(e => e.CategoryName)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Description)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.LastUpdatedBy)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.LastUpdatedDate).HasColumnType("datetime");
            });

            modelBuilder.Entity<JobPositionDocuments>(entity =>
            {
                entity.HasKey(e => e.JobPositionDocumentId);

                entity.ToTable("JobPositionDocuments", "administration");

                entity.Property(e => e.DocumentTitle)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.FileName)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.LastUpdatedBy)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.LastUpdatedTime).HasColumnType("datetime");

                entity.Property(e => e.Remarks)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.HasOne(d => d.JobPosition)
                    .WithMany(p => p.JobPositionDocuments)
                    .HasForeignKey(d => d.JobPositionId)
                    .HasConstraintName("FK_JobPositionDocuments_JobPositions");
            });

            modelBuilder.Entity<JobPositionFeatures>(entity =>
            {
                entity.HasKey(e => e.JobPositionFeatureId)
                    .HasName("PK_JobPositionFeatureId");

                entity.ToTable("JobPositionFeatures", "administration");

                entity.Property(e => e.Description)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.LastUpdatdBy)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.LastUpdatedTime).HasColumnType("datetime");

                entity.Property(e => e.Size)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.TextColor)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.TextStyle)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.HasOne(d => d.JobPosition)
                    .WithMany(p => p.JobPositionFeatures)
                    .HasForeignKey(d => d.JobPositionId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_JobPositionFeatureId_JobPositions");
            });

            modelBuilder.Entity<JobPositionRanks>(entity =>
            {
                entity.HasKey(e => e.JobPositionRankId)
                    .HasName("PK_JobPositionGrades");

                entity.ToTable("JobPositionRanks", "administration");

                entity.Property(e => e.LastUpdatedBy)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.LastUpdatedDate).HasColumnType("datetime");

                entity.Property(e => e.RankCode)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.RankName)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.HasOne(d => d.Department)
                    .WithMany(p => p.JobPositionRanks)
                    .HasForeignKey(d => d.DepartmentId)
                    .HasConstraintName("FK_JobPositionGrades_JobPositionCategories");

                entity.HasOne(d => d.Role)
                    .WithMany(p => p.JobPositionRanks)
                    .HasForeignKey(d => d.RoleId)
                    .HasConstraintName("FK_JobPositionRanks_Roles");
            });

            modelBuilder.Entity<JobPositionRequirements>(entity =>
            {
                entity.HasKey(e => e.JobRequirementId)
                    .HasName("PK_JobRequirements");

                entity.ToTable("JobPositionRequirements", "administration");

                entity.Property(e => e.Description)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.LastUpdatedBy)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.LastUpdatedTime).HasColumnType("datetime");

                entity.HasOne(d => d.JobPosition)
                    .WithMany(p => p.JobPositionRequirements)
                    .HasForeignKey(d => d.JobPositionId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_JobPositionRequirements_JobPositions");
            });

            modelBuilder.Entity<JobPositionStatus>(entity =>
            {
                entity.ToTable("JobPositionStatus", "administration");

                entity.Property(e => e.DisplayText)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.LastUpdatedBy)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.LastUpdatedTime).HasColumnType("datetime");

                entity.Property(e => e.Role)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.StatusType)
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<JobPositionTags>(entity =>
            {
                entity.HasKey(e => e.JobPositionTagId)
                    .HasName("PK_JobTags");

                entity.ToTable("JobPositionTags", "administration");

                entity.Property(e => e.LastUpdatedBy)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.LastUpdatedTime).HasColumnType("datetime");

                entity.Property(e => e.Remarks)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.TagName)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.HasOne(d => d.JobPosition)
                    .WithMany(p => p.JobPositionTags)
                    .HasForeignKey(d => d.JobPositionId)
                    .HasConstraintName("FK_JobPositionTags_JobPositions");
            });

            modelBuilder.Entity<JobPositions>(entity =>
            {
                entity.HasKey(e => e.JobPositionId);

                entity.ToTable("JobPositions", "administration");

                entity.Property(e => e.CompanyJobCode)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.ExpiryDate).HasColumnType("datetime");

                entity.Property(e => e.InterviewDate).HasColumnType("datetime");

                entity.Property(e => e.InterviewLocation)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.IsActive).HasDefaultValueSql("((1))");

                entity.Property(e => e.Jdsummary)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("JDSummary");

                entity.Property(e => e.JobCode)
                    .IsRequired()
                    .HasMaxLength(14)
                    .IsUnicode(false)
                    .HasComputedColumnSql("(concat('JP',[JobPositionId]))", false);

                entity.Property(e => e.LastDateOfApplication).HasColumnType("datetime");

                entity.Property(e => e.LastUpdatedBy)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.LastUpdatedTime).HasColumnType("datetime");

                entity.Property(e => e.Location)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.MaxExperience).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.MinExperience).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.PositionTitle)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.PostedBy)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.PostedOn).HasColumnType("datetime");

                entity.Property(e => e.SalaryRange)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.StaffRemarks)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.HasOne(d => d.Category)
                    .WithMany(p => p.JobPositions)
                    .HasForeignKey(d => d.CategoryId)
                    .HasConstraintName("FK_JobPositions_JobPositionCategories");

                entity.HasOne(d => d.Company)
                    .WithMany(p => p.JobPositions)
                    .HasForeignKey(d => d.CompanyId)
                    .HasConstraintName("FK_JobPositions_Companies");

                entity.HasOne(d => d.Department)
                    .WithMany(p => p.JobPositions)
                    .HasForeignKey(d => d.DepartmentId)
                    .HasConstraintName("FK_JobPositions_Departments");

                entity.HasOne(d => d.LocationType)
                    .WithMany(p => p.JobPositions)
                    .HasForeignKey(d => d.LocationTypeId)
                    .HasConstraintName("FK_JobPositions_MJPLOVItems");
            });

            modelBuilder.Entity<Mjplovitems>(entity =>
            {
                entity.HasKey(e => e.LovitemId)
                    .HasName("PKMJPLOVItems");

                entity.ToTable("MJPLOVItems", "administration");

                entity.Property(e => e.LovitemId).HasColumnName("LOVItemId");

                entity.Property(e => e.DisplayText)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.ItemCode)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.LastUpdatedBy)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.LastUpdatedDate).HasColumnType("datetime");

                entity.Property(e => e.Lovgroup)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("LOVGroup");
            });

            modelBuilder.Entity<Roles>(entity =>
            {
                entity.HasKey(e => e.RoleId)
                    .HasName("PK_Table_1_4");

                entity.ToTable("Roles", "administration");

                entity.Property(e => e.IsBhprequired).HasColumnName("IsBHPRequired");

                entity.Property(e => e.LastUpdatedBy)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.LastUpdatedTime).HasColumnType("datetime");

                entity.Property(e => e.RoleName)
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Rpsl>(entity =>
            {
                entity.ToTable("RPSL", "administration");

                entity.Property(e => e.Rpslid).HasColumnName("RPSLId");

                entity.Property(e => e.Address1)
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.Address2)
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.Property(e => e.Address3)
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.Property(e => e.City)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.CompanyName)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.LastUpdatedBy)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.LastUpdatedDate).HasColumnType("datetime");

                entity.Property(e => e.Pincode)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Rpslnumber)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("RPSLNumber");
            });

            modelBuilder.Entity<Seaexperience>(entity =>
            {
                entity.ToTable("SEAExperience", "administration");

                entity.Property(e => e.SeaexperienceId).HasColumnName("SEAExperienceId");

                entity.Property(e => e.Bhp)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("BHP");

                entity.Property(e => e.CompanyName)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.FromDate).HasColumnType("datetime");

                entity.Property(e => e.Grt)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("GRT");

                entity.Property(e => e.LastUpdatedBy)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.LastUpdatedTime).HasColumnType("datetime");

                entity.Property(e => e.Rank)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.ToDate).HasColumnType("datetime");

                entity.Property(e => e.Type)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.VesselName)
                    .HasMaxLength(100)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<States>(entity =>
            {
                entity.HasKey(e => e.StateId);

                entity.ToTable("States", "administration");

                entity.Property(e => e.DisplayName)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.LastUpdatdBy)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.LastUpdatedTime).HasColumnType("datetime");

                entity.Property(e => e.StateName)
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Users>(entity =>
            {
                entity.HasKey(e => e.UserId);

                entity.ToTable("Users", "administration");

                entity.Property(e => e.DisplayName)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Email)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.FirstName)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.LastName)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.LastUpdatedBy)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.LastUpdatedTime).HasColumnType("datetime");

                entity.Property(e => e.MobileNumber)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Password)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.UserName)
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<VesselTypes>(entity =>
            {
                entity.HasKey(e => e.VesselTypeId)
                    .HasName("PK_Table_1_3");

                entity.ToTable("VesselTypes", "administration");

                entity.Property(e => e.LastUpdatedBy)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.LastUpdatedTime).HasColumnType("datetime");

                entity.Property(e => e.VesselTypeName)
                    .HasMaxLength(100)
                    .IsUnicode(false);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
