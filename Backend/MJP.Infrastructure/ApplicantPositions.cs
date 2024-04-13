using System;
using System.Collections.Generic;

#nullable disable

namespace MJP.Infrastructure
{
    public partial class ApplicantPositions
    {
        public ApplicantPositions()
        {
            ApplicantPositionDocuments = new HashSet<ApplicantPositionDocuments>();
            ApplicantPositionStatus = new HashSet<ApplicantPositionStatus>();
        }

        public int ApplicantPositionId { get; set; }
        public int? ApplicantId { get; set; }
        public int? JobPositionId { get; set; }
        public int? StatusId { get; set; }
        public bool? IsActive { get; set; }
        public DateTime? AppliedDate { get; set; }
        public DateTime? InterviewDate { get; set; }
        public int? InterviewType { get; set; }
        public string InterviewUrl { get; set; }
        public string InterviewVenue { get; set; }
        public string ApplicantRemarks { get; set; }
        public string StaffRemarks { get; set; }
        public string LastUpdatedBy { get; set; }
        public DateTime? LastUpdatedDate { get; set; }

        public virtual Applicants Applicant { get; set; }
        public virtual ICollection<ApplicantPositionDocuments> ApplicantPositionDocuments { get; set; }
        public virtual ICollection<ApplicantPositionStatus> ApplicantPositionStatus { get; set; }
    }
}
