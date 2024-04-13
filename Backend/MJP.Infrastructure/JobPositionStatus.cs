using System;
using System.Collections.Generic;

#nullable disable

namespace MJP.Infrastructure
{
    public partial class JobPositionStatus
    {
        public int JobPositionStatusId { get; set; }
        public int? StatusId { get; set; }
        public string DisplayText { get; set; }
        public string StatusType { get; set; }
        public string Role { get; set; }
        public string LastUpdatedBy { get; set; }
        public DateTime? LastUpdatedTime { get; set; }
    }
}
