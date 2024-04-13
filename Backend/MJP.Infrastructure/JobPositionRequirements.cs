using System;
using System.Collections.Generic;

#nullable disable

namespace MJP.Infrastructure
{
    public partial class JobPositionRequirements
    {
        public int JobRequirementId { get; set; }
        public string Description { get; set; }
        public int JobPositionId { get; set; }
        public bool IsActive { get; set; }
        public bool? IsMandatory { get; set; }
        public string LastUpdatedBy { get; set; }
        public DateTime? LastUpdatedTime { get; set; }

        public virtual JobPositions JobPosition { get; set; }
    }
}
