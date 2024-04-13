using System;
using System.Collections.Generic;

#nullable disable

namespace MJP.Infrastructure
{
    public partial class ApplicantProfile
    {
        public int ApplicantProfileId { get; set; }
        public int? ApplicantId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string DisplayName { get; set; }
        public DateTime? DatefBirth { get; set; }
        public string FatherName { get; set; }
        public int? Nationality { get; set; }
        public int? MaritalStatus { get; set; }
        public string ProfileSummary { get; set; }
        public string LanguagesKnown { get; set; }
        public string EducationalQualification { get; set; }
        public string TechnicalQualification { get; set; }
        public bool? CurrentAddressSameAsPermanent { get; set; }
        public string PermanantAddress1 { get; set; }
        public string PermanentAddress2 { get; set; }
        public string PermanentCity { get; set; }
        public int? PermanentStateId { get; set; }
        public string PermanentPincode { get; set; }
        public string CurrentAddress1 { get; set; }
        public string CurrentAddress2 { get; set; }
        public string CurrentCity { get; set; }
        public int? CurrentStateId { get; set; }
        public string CurrentPincode { get; set; }
        public string ContactNumber1 { get; set; }
        public string ContactNumber2 { get; set; }
        public string EmailAddress1 { get; set; }
        public string EmailAddress2 { get; set; }
        public string LastUpdatedBy { get; set; }
        public DateTime? LastUpdatedTime { get; set; }

        public virtual Applicants Applicant { get; set; }
    }
}
