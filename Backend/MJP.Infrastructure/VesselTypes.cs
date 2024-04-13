using System;
using System.Collections.Generic;

#nullable disable

namespace MJP.Infrastructure
{
    public partial class VesselTypes
    {
        public int VesselTypeId { get; set; }
        public string VesselTypeName { get; set; }
        public bool? IsActive { get; set; }
        public string LastUpdatedBy { get; set; }
        public DateTime? LastUpdatedTime { get; set; }
    }
}
