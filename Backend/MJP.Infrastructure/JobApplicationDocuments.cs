using System;
using System.Collections.Generic;

#nullable disable

namespace MJP.Infrastructure
{
    public partial class JobApplicationDocuments
    {
        public int JobApplicationDocumentId { get; set; }
        public int? DocumentType { get; set; }
        public int? JobApplicationId { get; set; }
        public byte[] DocumentContent { get; set; }
        public string FileName { get; set; }
        public string Remarks { get; set; }
        public string DocumentTitle { get; set; }
        public string LastUpdatedBy { get; set; }
        public DateTime? LastUpdatedTime { get; set; }

        public virtual JobApplications JobApplication { get; set; }
    }
}
