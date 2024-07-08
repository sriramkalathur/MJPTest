using System;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace MJP.Entities.Models
{

    public class Address {

        //[Required(ErrorMessage = "Address1 is required")]
        [JsonProperty("address1")]
        public string Address1 { get;set; }

        [JsonProperty("address2")]
        public string Address2 { get;set; }

        
        //[Required(ErrorMessage = "City is required")]
        [JsonProperty("city")]
        public string City { get;set; }

        //[JsonProperty("stateName")]
        //public string StateName { get;set; }


        //[Required(ErrorMessage = "State is required")]
        //[JsonProperty("stateId")]
        //public int? StateId { get;set; }


        //[Required(ErrorMessage = "Pincode is required")]
        [JsonProperty("pincode")]
        public string Pincode { get;set; }
    }
    

    ///Basic details about an applicant
    public class ApplicantInfo : MJPEntity {
        

        [JsonProperty("applicantId")]
        public int ApplicantId { get; set; }

      
        [JsonProperty("displayName")]
        //[Required(ErrorMessage = "Display name is required")]
        public string DisplayName { get; set; }

        [JsonProperty("firstName")]
        public string FirstName { get; set; }


        [JsonProperty("lastName")]
        public string LastName { get; set; }


        [JsonProperty("email")]
        public string Email { get; set; }


        [JsonProperty("mobileNumber")]
        public string MobileNumber { get; set; }


        /// Indicates whether the Other certificate is mandatory
        [JsonProperty("isCertificateMandatory")]
        public bool? IsCertificateMandatory { get; set;}
        
    }

    public class ApplicantPersonalInfo : MJPEntity {

        [JsonProperty("applicantPersonalInfoId")]
        public int ApplicantPersonalInfoId { get; set; }

         [JsonProperty("applicantId")]
        public int? ApplicantId { get; set; }

        [Required(ErrorMessage = "Status is required")]
        [JsonProperty("statusId")]
        public int? StatusId { get; set;}


        [Required(ErrorMessage = "Availability is required")]
        [JsonProperty("availabilityStatusId")]
        public int? AvailabilityStatusId { get; set;}


        [JsonProperty("languagesKnown")]
        public string LanguagesKnown { get; set;}

        [JsonProperty("fatherName")]
        public string FatherName { get; set;}


        [JsonProperty("displayName")]
        //[Required(ErrorMessage = "Display name is required")]
        public string DisplayName { get; set; }

        [JsonProperty("firstName")]
        [Required(ErrorMessage = "First name is required")]
        public string FirstName { get; set; }


        [JsonProperty("lastName")]
        [Required(ErrorMessage = "Last name is required")]
        public string LastName { get; set; }
        
   
        // This will be populated from Rank Role
        [JsonProperty("isCertificateMandatory")]
        public bool? IsCertificateMandatory {get; set;}


        [JsonProperty("nationality")]
        public string Nationality { get; set; }

        [JsonProperty("nationalityId")]
        [Required(ErrorMessage = "Nationality is required")]
        public int? NationalityId { get; set; }


        //[Required(ErrorMessage = "Annual Salary is required")]
        [JsonProperty("annualSalary")]
        public decimal? AnnualSalary { get; set; }

        //[Required(ErrorMessage = "Currency is required")]
        [JsonProperty("salaryCurrencyId")]
        public int? AnnualSalaryCurrencyId { get; set; }



        //[Required(ErrorMessage = "Expected Salary is required")]
        [JsonProperty("expectedSalary")]
        public decimal? ExpectedSalary { get; set; }

        //[Required(ErrorMessage = "Currency is required")]
        [JsonProperty("expectedCurrencyId")]
        public int? ExpectedSalaryCurrencyId { get; set; }
       

        [JsonProperty("rank")]

        public string Rank { get; set;}

          [JsonProperty("category")]
         public string Category { get; set;}

        [Required(ErrorMessage = "Vessel Type is required")]
         [JsonProperty("vesselTypeId")]
        public int? VesselTypeId { get; set; }


        [JsonProperty("department")]
        public string Department { get; set;}

        [Required(ErrorMessage = "Department is required")]
        [JsonProperty("departmentId")]
        public int? DepartmentId { get; set;}


        

        [Required(ErrorMessage = "Category is required")]
        [JsonProperty("categoryId")]
        public int? CategoryId { get; set; }


        [Required(ErrorMessage = "Rank is required")]
        [JsonProperty("rankId")]
        public int? RankId { get; set; }

        [JsonProperty("maritalStatus")]
        public string MaritalStatus { get; set;}

        [JsonProperty("age")]
        public int Age { get; set; }


        [JsonProperty("maritalStatusId")]
        [Required(ErrorMessage = "Marital status is required")]
        public int? MaritalStatusId { get; set; }

      

         [JsonProperty("technicalQualification")]
         public string TechnicalQualification { get; set; }

        [JsonProperty("educationalQualification")]
        public string EducationalQualification { get; set; }


        
        //[Required(ErrorMessage = "Experience is required")]
        [Range(minimum: 0, maximum: 99, ErrorMessage = "Should be between 0-99")]
        [JsonProperty("experienceYrs")]
        public int? ExperienceYrs { get; set; }
 

        //[Required(ErrorMessage = "Experience is required")]
        [Range(minimum: 0, maximum: 12, ErrorMessage = "Should be between 0-12")]
        [JsonProperty("experienceMonths")]
        public int? ExperienceMonths { get; set; }

         [JsonProperty("experience")]
        public string Experience { get; set;}


        ///Indicates whether the personal data is updated in profile
         [JsonProperty("isPersonalInfoCompleted")]
        public bool IsPersonalInfoCompleted { get; set; }

        [JsonProperty("permanentAddress")]
        public Address PermanentAddress { get; set;}

       [JsonProperty("currentAddress")]
        public Address CurrentAddress { get; set;}


        [JsonProperty("permanentAddressSameAsCurrent")]
        public bool PermanentAddressSameAsCurrent { get; set;}


        [Required(ErrorMessage = "Date of Birth is required")]
        [JsonProperty("dateOfBirth")]
        public DateTime? DateOfBirth { get; set; }


         [Required(ErrorMessage = "Mobile Number is required")]
        [JsonProperty("mobileNumber")]
        public string MobileNumber { get; set; }

        [JsonProperty("alternateContactNumber")]
        public string AlternateContactNumber { get; set; }

        [Required(ErrorMessage = "Email is required")]
        [JsonProperty("email")]
        public string Email { get; set; }


         [JsonProperty("alernateEmail")]
        public string AlternateEmail { get; set; }
    }


    public class UserProfile : MJPEntity {
        
        [JsonProperty("userId")]
        public int UserId{ get; set;}


        [JsonProperty("personalInfo")]
        public ApplicantPersonalInfo PersonalInfo { get; set;}
        
        [JsonProperty("profileSummary")]
        public string ProfileSummary { get; set; }


        [JsonProperty("certificates")]
        public CompetencyCertificate[] Certificates { get; set; }

        [JsonProperty("documents")]
        public ApplicantDocument[] Documents { get; set; }

        [JsonProperty("courses")]
        public ApplicantDocument[] Courses { get; set; }


        [JsonProperty("experience")]
        public SEAExperience[] Experience { get; set; }
    }
}
