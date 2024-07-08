using System;
using System.Collections.Generic;

#nullable disable

namespace MJP.Infrastructure
{
    public partial class ApplicantStcwcourses
    {
        public int StcwcourseId { get; set; }
        public int? ApplicantId { get; set; }
        public int? CourseId { get; set; }
        public string CertificateNumber { get; set; }
        public string Grade { get; set; }
        public DateTime? IssueDate { get; set; }
        public string IssuePlace { get; set; }
        public DateTime? ValidTill { get; set; }
        public string Details { get; set; }
        public string LastUpdatedBy { get; set; }
        public DateTime? LastUpdatedTime { get; set; }

        public virtual Applicants Applicant { get; set; }
    }
}
