using System;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace MJP.Entities.Models
{

   
    public enum MJPUserRole {
        None,

        Guest = 1,

        Applicant = 2,

        Staff = 3,

        Admin = 4,

        CompanyUser = 5
    }

    public class User
    {
        public int UserId { get; set; }

        public int? CompanyId {get; set;}

        public string FirstName { get; set;}

        public string LastName { get; set;}

        public string DisplayName { get; set;}

        public string UserName { get; set; }

        public MJPUserRole UserRole { get; set;}
    }


    public class UserRegistrationModel {

        //The newly registered user
        public int UserId { get; set;}

        //[Required(ErrorMessage = "Display name is required")]
        [JsonProperty("displayName")]
        public string DisplayName { get; set;}


        [JsonProperty("userName")]
        public string UserName { get; set;}


       
         [JsonProperty("firstName")]
        [Required(ErrorMessage = "First name is required")]
        public string FirstName { get; set; }


         [JsonProperty("lastName")]
        [Required(ErrorMessage = "Last name is required")]
        public string LastName { get; set; }

         [EmailAddress(ErrorMessage = "Invalid email format")]
         [JsonProperty("email")]
        [Required(ErrorMessage = "Email is required")]
        public string Email { get; set; }

         [JsonProperty("mobileNumber")]
        [Required(ErrorMessage = "Mobile number is required")]
        public string MobileNumber { get; set; }

         [JsonProperty("password")]
        [MinLength(5, ErrorMessage = "Password requires minimum 5 characters")]
        [Required(ErrorMessage = "Password is required")]
        public string Password{ get; set; }
    }

    

    // public class UserProfile : MJPEntity {

    //     public int UserId { get; set; }


    //     [Required(ErrorMessage = "Contact Number is required")]
    //     [JsonProperty("contactNumber")]
    //     public string ContactNumber { get; set; }

    //     [JsonProperty("languagesKnown")]
    //     public string LanguagesKnown { get; set;}

    //     [JsonProperty("fatherName")]
    //     public string FatherName { get; set;}


    //     [JsonProperty("alternateContactNumber")]
    //     public string AlternateContactNumber { get; set; }


    //      [JsonProperty("email")]
    //     public string Email { get; set; }


    //      [JsonProperty("alernateEmail")]
    //     public string AlternateEmail { get; set; }

    //     [JsonProperty("displayName")]
    //     [Required(ErrorMessage = "Display name is required")]
    //     public string DisplayName { get; set; }

    //     [JsonProperty("firstName")]
    //     [Required(ErrorMessage = "First name is required")]
    //     public string FirstName { get; set; }


    //     [JsonProperty("lastName")]
    //     [Required(ErrorMessage = "Last name is required")]
    //     public string LastName { get; set; }
        
    //      [JsonProperty("nationalityId")]
    //     [Required(ErrorMessage = "Nationality is required")]
    //     public int? Nationality { get; set; }

    //      [JsonProperty("maritalStatusId")]
    //     [Required(ErrorMessage = "Marital status is required")]
    //     public int? MaritalStatus { get; set; }


    //      [JsonProperty("technicalQualification")]
    //      public string TechnicalQualification { get; set; }

    //      [JsonProperty("educationalQualification")]
    //     public string EducationalQualification { get; set; }
 
 
    //     [JsonProperty("profileSummary")]
    //     public string ProfileSummary { get; set; }

    //     [JsonProperty("permanentAddress")]
    //     public Address PermanentAddress { get; set;}

    //    [JsonProperty("currentAddress")]
    //     public Address CurrentAddress { get; set;}


    //     [JsonProperty("currentAddressSameAsPermanent")]
    //     public bool CurrentAddressSameAsPermanent { get; set;}

     

    //     [JsonProperty("dateOfBirth")]
    //     public DateTime? DateOfBirth { get; set; }


    //     [JsonProperty("preferences")]
    //     public UserPreferences Preferences { get; set; }


    //     [JsonProperty("certificates")]
    //     public CompetencyCertificate Certificates { get; set; }

    //      [JsonProperty("documents")]
    //     public ApplicantDocument[] Documents { get; set; }

    //      [JsonProperty("courses")]
    //     public ApplicantDocument[] Courses { get; set; }


    //       [JsonProperty("experience")]
    //     public SEAExperience[] Experience { get; set; }
    // }


    ///Search Filter preferences
    public class UserPreferences {

        public int[] Companies { get; set; }

        public int[] Categories { get; set; }


        public int[] Tags { get; set; }
    }



    public class ChangePasswordModel : MJPEntity {
        
        public int ApplicantId { get; set; }

        [Required(ErrorMessage = "Old Password is required")]
        [JsonProperty("oldPassword")]
        public string OldPassword { get; set; }

        [MinLength(length: 5, ErrorMessage = "Minimum 5 characters required")]
        [Required(ErrorMessage = "New Password is required")]
        [JsonProperty("newPassword")]
        public string NewPassword { get; set;}
    }
}
