using System;
using System.Collections.Generic;

#nullable disable

namespace MJP.Infrastructure
{
    public partial class ApplicantPositionStatus
    {
        public int ApplicantPositionStatusId { get; set; }
        public int? ApplicationPositionId { get; set; }
        public int? StatusId { get; set; }
        public string ChangeDescription { get; set; }
        public string LastUpdatedBy { get; set; }
        public DateTime? LastUpdatedTime { get; set; }

        public virtual JobApplications ApplicationPosition { get; set; }
    }
}
