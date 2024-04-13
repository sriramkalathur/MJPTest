using System;
using Newtonsoft.Json;

namespace MJP.Entities.Models
{
    
  //Job Position pertianing to an applicant
  //If the Positions is applied, it will have the application detials else not
  public class ApplicantJobPosition : MJPEntity {

         public int? JobApplicationId { get; set;}

         public bool IsRecommended { get; set;}

        [JsonProperty("applicationStatusId")]
        public int? JobApplicationStatusId { get; set;}

        public int JobPositionId { get; set;}

        public string JobCode { get;set;}

        public decimal MinExperience { get;set;}

        public decimal MaxExperience { get;set;}

        public string SalaryRange { get;set;}

        public DateTime PostedOn { get; set;}

        public DateTime ExpiryDate { get; set;}

        public DateTime? AppliedDate { get; set; }

        public DateTime? InterviewDate { get; set; }

        public string PositionTitle { get; set;}

        public string JDSummary { get; set;}


        public string ApplicationNumber {get; set;}

        public int StatusId { get; set;}

        public string PostedBy { get; set;}

        public string CompanyName { get; set; }
      
        public int? CompanyRating { get; set; }
      

        public string CompanyLogo { get; set; }

         public string Department { get; set; }

         
         public string Rank { get; set; }

         public string LocationType { get; set; }
  }
}
