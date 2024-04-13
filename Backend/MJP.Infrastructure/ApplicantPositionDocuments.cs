using System;
using System.Collections.Generic;

#nullable disable

namespace MJP.Infrastructure
{
    public partial class ApplicantPositionDocuments
    {
        public int ApplicantPositionDocumentId { get; set; }
        public int? ApplicantPositionId { get; set; }
        public int? DocumentType { get; set; }
        public byte[] DocumentContent { get; set; }
        public string LastUpdatedBy { get; set; }
        public DateTime? LastUpdtedTime { get; set; }

        public virtual JobApplications ApplicantPosition { get; set; }
    }
}
