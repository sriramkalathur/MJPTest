using System;
using System.Collections.Generic;

#nullable disable

namespace MJP.Infrastructure
{
    public partial class Departments
    {
        public Departments()
        {
            ApplicantPersonalDetails = new HashSet<ApplicantPersonalDetails>();
            JobPositionRanks = new HashSet<JobPositionRanks>();
            JobPositions = new HashSet<JobPositions>();
        }

        public int DepartmentId { get; set; }
        public string DepartmentName { get; set; }
        public bool? IsActive { get; set; }
        public string LastUpdatedBy { get; set; }
        public DateTime? LastUpdatedTime { get; set; }

        public virtual ICollection<ApplicantPersonalDetails> ApplicantPersonalDetails { get; set; }
        public virtual ICollection<JobPositionRanks> JobPositionRanks { get; set; }
        public virtual ICollection<JobPositions> JobPositions { get; set; }
    }
}
