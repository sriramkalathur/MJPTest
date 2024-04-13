using System;
using System.Collections.Generic;

#nullable disable

namespace MJP.Infrastructure
{
    public partial class JobPositionRanks
    {
        public JobPositionRanks()
        {
            ApplicantPersonalDetails = new HashSet<ApplicantPersonalDetails>();
        }

        public int JobPositionRankId { get; set; }
        public string RankName { get; set; }
        public string RankCode { get; set; }
        public int? DepartmentId { get; set; }
        public int? RoleId { get; set; }
        public string LastUpdatedBy { get; set; }
        public DateTime? LastUpdatedDate { get; set; }

        public virtual Departments Department { get; set; }
        public virtual Roles Role { get; set; }
        public virtual ICollection<ApplicantPersonalDetails> ApplicantPersonalDetails { get; set; }
    }
}
