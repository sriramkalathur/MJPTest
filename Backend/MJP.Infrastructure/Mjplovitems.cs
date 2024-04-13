using System;
using System.Collections.Generic;

#nullable disable

namespace MJP.Infrastructure
{
    public partial class Mjplovitems
    {
        public Mjplovitems()
        {
            ApplicantDocuments = new HashSet<ApplicantDocuments>();
            CompetencyCertificates = new HashSet<CompetencyCertificates>();
            JobPositions = new HashSet<JobPositions>();
        }

        public int LovitemId { get; set; }
        public string Lovgroup { get; set; }
        public string DisplayText { get; set; }
        public string ItemCode { get; set; }
        public string LastUpdatedBy { get; set; }
        public DateTime? LastUpdatedDate { get; set; }

        public virtual ICollection<ApplicantDocuments> ApplicantDocuments { get; set; }
        public virtual ICollection<CompetencyCertificates> CompetencyCertificates { get; set; }
        public virtual ICollection<JobPositions> JobPositions { get; set; }
    }
}
