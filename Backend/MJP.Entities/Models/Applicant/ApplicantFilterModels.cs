using System;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace MJP.Entities.Models
{
    ///Filters for searching applicants
    public class ApplicantFilters {
        [JsonProperty("searchText")]
        public string SearchText { get; set;}

        [JsonProperty("statusId")]
        public int? StatusId { get; set;}
    }



    public class ProfileFilters {

        [JsonProperty("jobPositionId")]
        public int? JobPositionId { get; set;}

        [JsonProperty("rankId")]
        public int? RankId { get; set;}


         [JsonProperty("availabilityStatusId")]
        public int? AvailabilityStatusId { get; set;}

        [JsonProperty("searchText")]
        public string SearchText { get; set;}

        [JsonProperty("experienceFrom")]
        public double? ExperienceFrom { get; set; }

        [JsonProperty("experienceTo")]
         public double? ExperienceTo { get; set; }
   

        [JsonProperty("salaryFrom")]
         public double? SalaryFrom { get; set;} 

        [JsonProperty("salaryTo")]
          public double? SalaryTo { get; set;} 
    }


    public class Applicant {

        [JsonProperty("applicantId")]
        public int ApplicantId { get; set; }

        [JsonProperty("applicantName")]
        public string ApplicantName { get; set; }

        [JsonProperty("mobileNumber")]
        public string MobileNumber { get; set; }

        [JsonProperty("availabilityStatusId")]
        public int AvailabilityStatusId { get; set; }

        [JsonProperty("email")]
        public string Email { get; set; }

        [JsonProperty("rank")]
        public string Rank { get; set;}


         [JsonProperty("category")]
        public string Category { get; set; }

        //Experiemce in years
        [JsonProperty("experience")]
        public decimal? Experience { get; set; }

        //Annual salary in LACS
        [JsonProperty("annualSalary")]
        public double AnnualSalary { get; set;}

        [JsonProperty("statusId")]
        public int StatusId { get; set;}
    }
}