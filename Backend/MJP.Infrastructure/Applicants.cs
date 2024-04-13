using System;
using System.Collections.Generic;

#nullable disable

namespace MJP.Infrastructure
{
    public partial class Applicants
    {
        public Applicants()
        {
            ApplicantDocuments = new HashSet<ApplicantDocuments>();
            ApplicantFiles = new HashSet<ApplicantFiles>();
            ApplicantStcwcourses = new HashSet<ApplicantStcwcourses>();
            JobApplications = new HashSet<JobApplications>();
        }

        public int ApplicantId { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string DisplayName { get; set; }
        public string Email { get; set; }
        public string MobileNumber { get; set; }
        public int? StatusId { get; set; }
        public int? AvailabilityStatusId { get; set; }
        public bool? PersonalInfoCompleted { get; set; }
        public bool? DocumentsCompleted { get; set; }
        public string LastUpdatedBy { get; set; }
        public DateTime? LastUpdatedTime { get; set; }

        public virtual ICollection<ApplicantDocuments> ApplicantDocuments { get; set; }
        public virtual ICollection<ApplicantFiles> ApplicantFiles { get; set; }
        public virtual ICollection<ApplicantStcwcourses> ApplicantStcwcourses { get; set; }
        public virtual ICollection<JobApplications> JobApplications { get; set; }
    }
}
