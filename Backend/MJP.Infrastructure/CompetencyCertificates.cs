using System;
using System.Collections.Generic;

#nullable disable

namespace MJP.Infrastructure
{
    public partial class CompetencyCertificates
    {
        public int CompetencyCertificateId { get; set; }
        public int? ApplicantId { get; set; }
        public int? CertificateId { get; set; }
        public string Cocnumber { get; set; }
        public string Details { get; set; }
        public string Grade { get; set; }
        public string Board { get; set; }
        public string Institution { get; set; }
        public string YearOfPassing { get; set; }
        public string LastUpdatedBy { get; set; }
        public DateTime? LastUpdatedTime { get; set; }

        public virtual Mjplovitems Certificate { get; set; }
    }
}
