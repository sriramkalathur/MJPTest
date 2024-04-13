using System;
using System.Collections.Generic;

#nullable disable

namespace MJP.Infrastructure
{
    public partial class JobPositions
    {
        public JobPositions()
        {
            JobApplications = new HashSet<JobApplications>();
            JobPositionDocuments = new HashSet<JobPositionDocuments>();
            JobPositionFeatures = new HashSet<JobPositionFeatures>();
            JobPositionRequirements = new HashSet<JobPositionRequirements>();
            JobPositionTags = new HashSet<JobPositionTags>();
        }

        public int JobPositionId { get; set; }
        public string JobCode { get; set; }
        public int? CompanyId { get; set; }
        public string CompanyJobCode { get; set; }
        public DateTime? PostedOn { get; set; }
        public string SalaryRange { get; set; }
        public int? CurrencyId { get; set; }
        public int? NumberOfPositions { get; set; }
        public decimal? MinExperience { get; set; }
        public decimal? MaxExperience { get; set; }
        public DateTime? InterviewDate { get; set; }
        public DateTime? ExpiryDate { get; set; }
        public string InterviewLocation { get; set; }
        public int? DepartmentId { get; set; }
        public int? RankId { get; set; }
        public int? VesselTypeId { get; set; }
        public int? CategoryId { get; set; }
        public int? LocationTypeId { get; set; }
        public string PositionTitle { get; set; }
        public string Jdsummary { get; set; }
        public string Location { get; set; }
        public int? StatusId { get; set; }
        public string StaffRemarks { get; set; }
        public bool? IsActive { get; set; }
        public string PostedBy { get; set; }
        public bool? IsRecommended { get; set; }
        public DateTime? LastDateOfApplication { get; set; }
        public string LastUpdatedBy { get; set; }
        public DateTime? LastUpdatedTime { get; set; }

        public virtual JobPositionCategories Category { get; set; }
        public virtual Companies Company { get; set; }
        public virtual Departments Department { get; set; }
        public virtual Mjplovitems LocationType { get; set; }
        public virtual ICollection<JobApplications> JobApplications { get; set; }
        public virtual ICollection<JobPositionDocuments> JobPositionDocuments { get; set; }
        public virtual ICollection<JobPositionFeatures> JobPositionFeatures { get; set; }
        public virtual ICollection<JobPositionRequirements> JobPositionRequirements { get; set; }
        public virtual ICollection<JobPositionTags> JobPositionTags { get; set; }
    }
}
