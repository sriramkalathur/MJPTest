using System;
using System.Collections.Generic;

#nullable disable

namespace MJP.Infrastructure
{
    public partial class ApplicationStatusHistory
    {
        public int ApplicationStatusHistoryId { get; set; }
        public int? StatusId { get; set; }
        public DateTime? StatusDate { get; set; }
        public int? JobApplicationId { get; set; }
        public string LastUpdatedBy { get; set; }
        public DateTime? LastUpdatedTime { get; set; }
        public string Remarks { get; set; }

        public virtual JobApplications JobApplication { get; set; }
    }
}
