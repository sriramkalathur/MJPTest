using System;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace MJP.Entities.Models
{
    public class ApplicantDocument : MJPEntity {

        [JsonProperty("applicantDocumentId")]
        public int ApplicantDocumentId { get; set;}


         [JsonProperty("applicantId")]
        public int ApplicantId { get; set; }

         [Required(ErrorMessage = "Document Type is required")]
        [JsonProperty("documentTypeId")]
        public int? DocumentTypeId { get; set;}


        [JsonProperty("documentName")]
        public string DocumentName { get; set;}

        [Required(ErrorMessage = "Document number is required")]
        [JsonProperty("documentNumber")]
        public string DocumentNumber { get; set; }


        [Required(ErrorMessage = "Issue date is required")]
        [JsonProperty("issueDate")]
        public DateTime? IssueDate { get; set;}

        //[Required(ErrorMessage = "Expiry date is required")]
        [JsonProperty("expiryDate")]
        public DateTime? ExpiryDate { get; set; }

        [Required(ErrorMessage = "Place of Issue")]
        [JsonProperty("issuePlace")]
        public string PlaceOfIssue { get; set;}
    }


    public class ApplicantSTCWCourse : MJPEntity {

        [JsonProperty("stcwCourseId")]
        public int STCWCourseId { get; set;}


        [JsonProperty("applicantId")]
        public int ApplicantId { get; set; }


        [Required(ErrorMessage = "Course is required")]
        [JsonProperty("courseId")]
        public int? CourseId { get; set;}

        [JsonProperty("courseName")]
        public string CourseName { get; set;}

        [Required(ErrorMessage = "Course Completion Certificate is required")]
        [JsonProperty("certificateNumber")]
        public string CertificateNumer { get; set; }


        [Required(ErrorMessage = "Issue date is required")]
        [JsonProperty("issueDate")]
        public DateTime? IssueDate { get; set;}

        //[Required(ErrorMessage = "Validity end date is required")]
        [JsonProperty("expiryDate")]
        public DateTime? ExpiryDate { get; set; }

        [Required(ErrorMessage = "Place of issue is required")]
        [JsonProperty("issuePlace")]
        public string PlaceOfIssue { get; set;}


        [JsonProperty("details")]
        public string Details { get; set;}
    }



    public class ApplicantCertificatesList {

        //This will be populated based on Role
        [JsonProperty("isCertificateMandatory")]
        public bool IsCertificateMandatory { get; set;}

        [JsonProperty("certificates")]
        public CompetencyCertificate[] Certificates { get; set; }
    }


    public class CompetencyCertificate : MJPEntity {


        [JsonProperty("competencyCertificateId")]
        public int CompetencyCertificateId { get; set;}

         [JsonProperty("certificateName")]
        public string CertificateName { get; set;}


        [Required(ErrorMessage = "Certificate is required")]
        [JsonProperty("certificateId")]
        public int? CertificateId { get; set;}


          [JsonProperty("details")]
        public string Details { get; set;}

        [JsonProperty("applicantId")]
        public int ApplicantId { get; set; }

        //[Required(ErrorMessage = "Grade is required")]
        [JsonProperty("grade")]
        public string Grade { get; set;}

        [Required(ErrorMessage = "Board/University is required")]
        [JsonProperty("board")]
        public string Board { get; set;}


        [Required(ErrorMessage = "Certificate Number is required")]
        [JsonProperty("certificateNumber")]
        public string CertificateNumer { get; set;}

        // [Required(ErrorMessage = "From Date is required")]
        // [JsonProperty("fromDate")]
        // public DateTime? FromDate { get; set;}

        // [Required(ErrorMessage = "To Date is required")]
        // [JsonProperty("toDate")]
        // public DateTime? ToDate { get; set; }

        [Required(ErrorMessage = "Institution is required")]
        [JsonProperty("institution")]
        public string Institution { get; set;}

        [Required(ErrorMessage = "Year Of Passing is required")]
        [JsonProperty("yearOfPassing")]
        public string YearOfPassing { get; set;}
    }



    public class SEAExperience : MJPEntity {


        [JsonProperty("seaExperienceId")]
        public int SEAExperienceId { get; set;}

        [JsonProperty("applicantId")]
        public int ApplicantId { get; set; }


        [Required(ErrorMessage = "Company name is required")]
        [JsonProperty("companyName")]
        public string CompanyName { get; set;}

        [Required(ErrorMessage = "Vessel name is required")]
        [JsonProperty("vesselName")]
        public string VesselName     { get; set;}

        [Required(ErrorMessage = "Type is required")]
        [JsonProperty("type")]
        public string Type { get; set; }


        [Required(ErrorMessage = "GRT is required")]
        [JsonProperty("grt")]
        public string GRT { get; set;}

        //[Required(ErrorMessage = "BHP is required")]
        [JsonProperty("bhp")]
         public string BHP { get; set;}


        [Required(ErrorMessage = "Rank is required")]
        [JsonProperty("rank")]
        public string Rank { get; set;}


        [Required(ErrorMessage = "From Date is required")]
        [JsonProperty("fromDate")]
        public DateTime? FromDate { get; set;}


        [JsonProperty("toDate")]
        public DateTime? ToDate { get; set;}

    }


    public class UserProfileMasters 
    {

        [JsonProperty("states")]
        public ListItem[] States { get; set; }

        [JsonProperty("nationality")]
        public ListItem[] Nationality { get; set;}


        [JsonProperty("maritalStatus")]
        public ListItem[] MaritalStatus { get; set; }


        [JsonProperty("documentTypes")]
        public ListItem[] DocumentTypes { get; set; }

         [JsonProperty("currentStatus")]
        public ListItem[] CurrentStatus { get; set; }

         [JsonProperty("courses")]
        public ListItem[] Courses { get; set; }

        
        [JsonProperty("ranks")]
        public JobPositionRank[] Ranks { get; set; }
        

         [JsonProperty("departments")]
        public ListItem[] Departments { get; set; }

        [JsonProperty("currencies")]
        public ListItem[] Currencies { get; set; }


        [JsonProperty("certificates")]
        public ListItem[] Certificates { get; set; }
    }
}