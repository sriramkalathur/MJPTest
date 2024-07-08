using System;
using System.Collections.Generic;

#nullable disable

namespace MJP.Infrastructure
{
    public partial class ApplicantPersonalDetails
    {
        public int ApplicantPersonalDetailId { get; set; }
        public int? ApplicantId { get; set; }
        public string DisplayName { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string FatherName { get; set; }
        public int? Nationality { get; set; }
        public int? MaritalStatus { get; set; }
        public string ProfileSummary { get; set; }
        public int? JobStatus { get; set; }
        public int? CategoryId { get; set; }
        public int? VesselTypeId { get; set; }
        public int? DepartmentId { get; set; }
        public int? RankId { get; set; }
        public int? ExperienceYrs { get; set; }
        public int? ExperienceMonths { get; set; }
        public string Experience { get; set; }
        public decimal? AnnualSalary { get; set; }
        public int? AnnualSalaryCurrencyId { get; set; }
        public decimal? ExpectedSalary { get; set; }
        public int? ExpectedSalaryCurrencyId { get; set; }
        public string LanguagesKnown { get; set; }
        public string EducationalQualification { get; set; }
        public string TechnicalQualification { get; set; }
        public bool? PermanentAddressSameAsCurrent { get; set; }
        public string PermanantAddress1 { get; set; }
        public string PermanentAddress2 { get; set; }
        public string PermanentCity { get; set; }
        public string PermanentPincode { get; set; }
        public string CurrentAddress1 { get; set; }
        public string CurrentAddress2 { get; set; }
        public string CurrentCity { get; set; }
        public string CurrentPincode { get; set; }
        public string AlternateContactNumber { get; set; }
        public string AlternateEmail { get; set; }
        public bool? IsActive { get; set; }
        public string LastUpdatedBy { get; set; }
        public DateTime? LastUpdatedTime { get; set; }

        public virtual JobPositionCategories Category { get; set; }
        public virtual Departments Department { get; set; }
        public virtual JobPositionRanks Rank { get; set; }
    }
}
