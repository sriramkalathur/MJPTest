using System;
using System.Collections.Generic;

#nullable disable

namespace MJP.Infrastructure
{
    public partial class ApplicantFiles
    {
        public int ApplicantFileId { get; set; }
        public int? DocumentType { get; set; }
        public int? ApplicantId { get; set; }
        public byte[] DocumentContent { get; set; }
        public string DocumentTitle { get; set; }
        public string FileName { get; set; }
        public string Remarks { get; set; }
        public string LastUpdatedBy { get; set; }
        public DateTime? LastUpdatedTime { get; set; }

        public virtual Applicants Applicant { get; set; }
    }
}
