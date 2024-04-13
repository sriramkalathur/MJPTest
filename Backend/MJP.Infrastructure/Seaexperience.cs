using System;
using System.Collections.Generic;

#nullable disable

namespace MJP.Infrastructure
{
    public partial class Seaexperience
    {
        public int SeaexperienceId { get; set; }
        public int? ApplicantId { get; set; }
        public string CompanyName { get; set; }
        public string VesselName { get; set; }
        public string Type { get; set; }
        public string Grt { get; set; }
        public string Bhp { get; set; }
        public string Rank { get; set; }
        public DateTime? FromDate { get; set; }
        public DateTime? ToDate { get; set; }
        public string LastUpdatedBy { get; set; }
        public DateTime? LastUpdatedTime { get; set; }
    }
}
