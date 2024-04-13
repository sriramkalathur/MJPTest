using System;
using System.Collections.Generic;

#nullable disable

namespace MJP.Infrastructure
{
    public partial class JobPositionTags
    {
        public int JobPositionTagId { get; set; }
        public int? JobPositionId { get; set; }
        public string TagName { get; set; }
        public string Remarks { get; set; }
        public string LastUpdatedBy { get; set; }
        public DateTime? LastUpdatedTime { get; set; }

        public virtual JobPositions JobPosition { get; set; }
    }
}
