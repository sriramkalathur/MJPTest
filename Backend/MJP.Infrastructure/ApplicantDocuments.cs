using System;
using System.Collections.Generic;

#nullable disable

namespace MJP.Infrastructure
{
    public partial class ApplicantDocuments
    {
        public int ApplicantDocumentId { get; set; }
        public int? ApplicantId { get; set; }
        public int? DocumentTypeId { get; set; }
        public string Grade { get; set; }
        public string DocumentName { get; set; }
        public string DocumentNumber { get; set; }
        public DateTime? IssueDate { get; set; }
        public DateTime? ExpiryDate { get; set; }
        public string IssuePlace { get; set; }
        public string LastUpdatedBy { get; set; }
        public DateTime? LastUpdatedTime { get; set; }

        public virtual Applicants Applicant { get; set; }
        public virtual Mjplovitems DocumentType { get; set; }
    }
}
