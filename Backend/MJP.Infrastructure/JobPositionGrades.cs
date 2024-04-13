using System;
using System.Collections.Generic;

#nullable disable

namespace MJP.Infrastructure
{
    public partial class JobPositionGrades
    {
        public int JobPositionGradeId { get; set; }
        public string GradeName { get; set; }
        public string GradeCode { get; set; }
        public int? CategoryId { get; set; }
        public string LastUpdatedBy { get; set; }
        public DateTime? LastUpdatedDate { get; set; }

        public virtual JobPositionCategories Category { get; set; }
    }
}
