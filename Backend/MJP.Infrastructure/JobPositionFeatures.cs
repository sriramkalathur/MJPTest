using System;
using System.Collections.Generic;

#nullable disable

namespace MJP.Infrastructure
{
    public partial class JobPositionFeatures
    {
        public int JobPositionFeatureId { get; set; }
        public int JobPositionId { get; set; }
        public string Description { get; set; }
        public string TextColor { get; set; }
        public string TextStyle { get; set; }
        public string Size { get; set; }
        public bool? IsBold { get; set; }
        public bool? IsItalic { get; set; }
        public bool IsActive { get; set; }
        public string LastUpdatdBy { get; set; }
        public DateTime? LastUpdatedTime { get; set; }

        public virtual JobPositions JobPosition { get; set; }
    }
}
