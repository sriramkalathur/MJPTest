using System;
using System.IO;
using Newtonsoft.Json;

namespace MJP.Entities.Models
{



    public class StatusHistoryItem: MJPEntity {

        public int JobApplicationId {get;set;}


        public int StatusId { get; set; }


        public string Remarks { get; set; }

        public string UpdatedBy { get; set;}

        public DateTime StatusDate { get; set;}
    }


    public class JobApplicationInformation {

        public int JobPositionId { get; set;}

        public int JobApplicationId { get; set; }

        public string JobApplicationCode { get; set; }

        public string ApplicationNumber { get; set; }

        public int? ApplicationStatusId { get; set; }

        public int ApplicantId { get; set; }


        public string ApplicantUserName { get; set;}

        public string ApplicantName { get; set; }


        public int? InterviewStatusId {get; set; }

        public DateTime? AppliedDate { get; set; }

        public DateTime? InterviewDate { get; set; }


        public bool AppliedToCompany { get; set; }

        public string InterviewURL { get; set; }


        public string InterviewInstructions { get; set; }


        public string ApplicantRemarks { get; set; }


        public string StaffRemarks  { get; set;}

    }
   


    public class JobApplication : MJPEntity {

        public int JobPositionId { get; set; }


        public int? JobApplicationId { get; set; }

        public JobApplicationInformation ApplicationInfo { get; set; }

        public JobPosition PositionDetails { get; set; }

    }


        public class ApplicationFilterModel
    {
      
        public int[] JobStatus { get; set; }


         public int[] ApplicationStatus { get; set; }

        //public DateTime? PostedBefore { get; set;}

        //public DateTime? PostedAfter { get; set;}

        public int[] Companies { get; set;}

        // public int[] Categories { get; set;}

        public string FilterText { get; set;}

        //This filter will be used to filter jobs only for an applicant
        //public int? ApplicantId { get; set; }

    }



    ///Details related to the applicant
    public class JobApplicationDetails : MJPEntity
    {
        public int JobPositionId { get; set;}
        
        public int JobApplicationId { get; set; }

        [JsonProperty("applicationDetails")]
        public JobApplicationInformation ApplicationDetails { get; set; }


        [JsonProperty("positionDetails")]
        public JobPosition PositionDetails { get; set;}
        
         public  JobPositionFeature[] Features { get; set;}

        public JobPositionTag[] Tags { get;set; }

        public MJPDocument[] Documents { get; set; }

        public JobPositionRequirement[] Requirements { get; set; }

        public StatusHistoryItem[] StatusHistory { get; set;}

    }


    public class JobPositionProfile {

        [JsonProperty("applicantId")]
        public int ApplicantId { get; set;}

        [JsonProperty("applicantName")]
        public string ApplicantName { get; set;}
       
         [JsonProperty("availabilityStatusId")]
        public int? AvailabilityStatus { get; set;}

        [JsonProperty("email")]
        public string Email { get; set;}


        [JsonProperty("mobileNumber")]
        public string MobileNumber { get; set; }
  

        [JsonProperty("rank")]
        public string Rank {get; set;}


        [JsonProperty("salary")]
        public double Salary { get; set; }


        [JsonProperty("experience")]
        public decimal? Experience { get; set; }

        [JsonProperty("applicationNumber")]
        public string ApplicationNumber { get; set; }


        [JsonProperty("applicationStatusId")]
        //When this is NULL, it indicates that the job is already applied by the profile
        public int?  ApplicationStatusId { get; set; }



        [JsonProperty("jobApplicationId")]
        //When this is NULL, it indicates that the job is already applied by the profile
        public int?  JobApplicationId { get; set; }


    }
}
