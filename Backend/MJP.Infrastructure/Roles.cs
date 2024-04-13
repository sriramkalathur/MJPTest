using System;
using System.Collections.Generic;

#nullable disable

namespace MJP.Infrastructure
{
    public partial class Roles
    {
        public Roles()
        {
            JobPositionRanks = new HashSet<JobPositionRanks>();
        }

        public int RoleId { get; set; }
        public string RoleName { get; set; }
        public bool? IsBhprequired { get; set; }
        public bool? IsCertificateRequired { get; set; }
        public string LastUpdatedBy { get; set; }
        public DateTime? LastUpdatedTime { get; set; }

        public virtual ICollection<JobPositionRanks> JobPositionRanks { get; set; }
    }
}
