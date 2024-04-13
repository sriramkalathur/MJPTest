using System;
using System.Collections.Generic;

#nullable disable

namespace MJP.Infrastructure
{
    public partial class JobPositionCategories
    {
        public JobPositionCategories()
        {
            ApplicantPersonalDetails = new HashSet<ApplicantPersonalDetails>();
            JobPositions = new HashSet<JobPositions>();
        }

        public int JobPositionCategoryId { get; set; }
        public string CategoryName { get; set; }
        public string Description { get; set; }
        public DateTime? LastUpdatedDate { get; set; }
        public string LastUpdatedBy { get; set; }

        public virtual ICollection<ApplicantPersonalDetails> ApplicantPersonalDetails { get; set; }
        public virtual ICollection<JobPositions> JobPositions { get; set; }
    }
}
