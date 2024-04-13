using System;
using System.Collections.Generic;

#nullable disable

namespace MJP.Infrastructure
{
    public partial class Companies
    {
        public Companies()
        {
            JobPositions = new HashSet<JobPositions>();
        }

        public int CompanyId { get; set; }
        public string CompanyName { get; set; }
        public string CompanyCode { get; set; }
        public string DisplayName { get; set; }
        public int? Rating { get; set; }
        public string Rpslnumber { get; set; }
        public string CompanyProfile { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string Address3 { get; set; }
        public string City { get; set; }
        public string CompanyLogo { get; set; }
        public int? StateId { get; set; }
        public string Pincode { get; set; }
        public bool? IsRecommended { get; set; }
        public string Email { get; set; }
        public string Url { get; set; }
        public string ContactNumber { get; set; }
        public bool? IsActive { get; set; }
        public string LastUpdatedBy { get; set; }
        public DateTime? LastUpdatedTime { get; set; }

        public virtual States State { get; set; }
        public virtual ICollection<JobPositions> JobPositions { get; set; }
    }
}
