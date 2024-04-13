using System;
using System.Collections.Generic;

#nullable disable

namespace MJP.Infrastructure
{
    public partial class JobApplications
    {
        public JobApplications()
        {
            ApplicantPositionDocuments = new HashSet<ApplicantPositionDocuments>();
            ApplicationStatusHistory = new HashSet<ApplicationStatusHistory>();
            JobApplicationDocuments = new HashSet<JobApplicationDocuments>();
        }

        public int JobApplicationId { get; set; }
        public int? ApplicantId { get; set; }
        public string JobApplicationCode { get; set; }
        public string ApplicationNumber { get; set; }
        public int? JobPositionId { get; set; }
        public int? StatusId { get; set; }
        public bool? IsActive { get; set; }
        public DateTime? AppliedDate { get; set; }
        public bool? AppliedToCompany { get; set; }
        public DateTime? InterviewDate { get; set; }
        public DateTime? ExpiryDate { get; set; }
        public int? InterviewType { get; set; }
        public string InterviewUrl { get; set; }
        public string InterviewInstrutions { get; set; }
        public int? InterviewStatusId { get; set; }
        public string ApplicantRemarks { get; set; }
        public string StaffRemarks { get; set; }
        public string LastUpdatedBy { get; set; }
        public DateTime? LastUpdatedDate { get; set; }

        public virtual Applicants Applicant { get; set; }
        public virtual JobPositions JobPosition { get; set; }
        public virtual ICollection<ApplicantPositionDocuments> ApplicantPositionDocuments { get; set; }
        public virtual ICollection<ApplicationStatusHistory> ApplicationStatusHistory { get; set; }
        public virtual ICollection<JobApplicationDocuments> JobApplicationDocuments { get; set; }
    }
}
