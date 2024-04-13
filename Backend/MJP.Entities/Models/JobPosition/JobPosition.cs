using System;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace MJP.Entities.Models
{

    /* This is used fr applying to Job */
    public class JobPositionBasicInfo {


        [JsonProperty("jobPositionId")]
        public int JobPositionId { get; set; }


         [JsonProperty("rank")]
        public string Rank { get; set; }

          [JsonProperty("numberOfPositions")]
        public int NumberOfPositions { get; set; }

         [JsonProperty("applicationsCount")]
        public int ApplicationsCount { get; set; }

         [JsonProperty("minExperience")]
        public decimal MinExperience { get; set;}

        [JsonProperty("maxExperience")]
        public decimal? MaxExperience { get; set;}

        [JsonProperty("expiryDate")]
        public DateTime ExpiryDate { get; set; }


         [JsonProperty("jobCode")]
        public string JobCode { get; set;}


         [JsonProperty("statusId")]
        public int JobStatusId { get; set; }

         [JsonProperty("salaryRange")]
        public string SalaryRange { get; set;}
    }



    public class JobPosition : MJPEntity
    {
        public int JobPositionId { get; set;}

        public string JobCode { get;set;}

         public string SalaryRange { get;set;}


        public DateTime ExpiryDate { get; set; }

        public int CompanyId { get; set;    }


        public string CompanyJobCode { get; set;}


        public DateTime PostedOn { get; set;}

        public int? NumberOfPositions { get; set;}

        public DateTime? LastDateOfApplication { get; set;}

        public string PositionTitle { get; set;}

        public string JDSummary { get; set;}


        public int? CurrencyId { get; set;}

        public int StatusId { get; set;}

        public string PostedBy { get; set;}


         public Company Company { get; set; }

         public string Category { get; set; }

         public int CategoryId { get; set; }

         
         public int RankId { get; set; }

        public string Department { get; set;}


         public string Rank { get; set; }


        public string VesselType { get; set; }


        public int VesselTypeId { get; set; }

         //public int LocationTypeId { get; set; }

         //public string LocationType { get; set; }


        public string InterviewLocation { get; set;}

        public DateTime? InterviewDate { get; set;}


        public bool IsExpired { get; set;}


        public decimal MinExperience  { get; set; }

        public decimal? MaxExperience { get; set; }


         public JobPositionTag[] Tags { get; set; }

         public MJPDocument[] Documents { get; set; }

         public bool IsRecommended { get; set; }

    }


    public class EditJobPosition : MJPEntity
    {
        public int JobPositionId { get; set;}

        public string JobCode { get;set;}

        [Required(ErrorMessage = "Company is required", AllowEmptyStrings = false)]
        [JsonProperty("companyId")]        
        public int? CompanyId { get; set;    }

         [Required(ErrorMessage = "Vessel Type is required", AllowEmptyStrings = false)]
        [JsonProperty("vesselTypeId")]        
        public int? VesselTypeId { get; set;    }

        //[Required(ErrorMessage = "Interview date is required", AllowEmptyStrings = false)]
        [JsonProperty("interviewDate")]        
        public DateTime? InterviewDate { get; set;    }


        [Required(ErrorMessage = "Expiry date is required", AllowEmptyStrings = false)]
        [JsonProperty("expiryDate")]        
        public DateTime? ExpiryDate { get; set;    }

         [JsonProperty("interviewLocation")]
        public string InterviewLocation { get; set;}

      
        [Range(minimum: 0.1, maximum:100, ErrorMessage = "Minimum experience should be between 1-100")]
        [Required(ErrorMessage = "Minimum experience is required", AllowEmptyStrings = false)]
        [JsonProperty("minExperience")]        
        public decimal? MinExperience { get; set;    }


        [Range(minimum: 0.1, maximum:100, ErrorMessage = "Maximum experience should be between 1-100")]
        [Required(ErrorMessage = "Maximum experience is required", AllowEmptyStrings = false)]
        [JsonProperty("maxExperience")]        
        public decimal? MaxExperience { get; set;    }

        [JsonProperty("postedOn")]
        public DateTime PostedOn { get; set;}

        [Range(minimum:1, maximum:1000, ErrorMessage = "No.Of Positions should be between 1-100")]
        [Required(ErrorMessage ="No of Positions is required")]
        [JsonProperty("numberOfPositions")]        
        public int? NumberOfPositions { get; set;}

        [JsonProperty("companyJobCode")]    
        public string CompanyJobCode { get; set; }


         [JsonProperty("staffRemarks")]    
        public string StaffRemarks { get; set; }



        [JsonProperty("salaryRange")]    
        public string SalaryRange { get; set; }


        [JsonProperty("currencyId")]    
        public int? CurrencyId { get; set; }

        [JsonProperty("lastDateOfApplication")]
        public DateTime? LastDateOfApplication { get; set;}


        [JsonProperty("positionTitle")]
        [Required(ErrorMessage = "Position Title is required", AllowEmptyStrings = false)]
        public string PositionTitle { get; set;}

        [JsonProperty("jdSummary")]
        [Required(ErrorMessage = "Job Summary is required", AllowEmptyStrings = false)]
        public string JDSummary { get; set;}


        [Required(ErrorMessage = "Status is required", AllowEmptyStrings = false)]
        [JsonProperty("statusId")]      
        public int? StatusId { get; set;}

        [Required(ErrorMessage = "Category is required", AllowEmptyStrings = false)]
        [JsonProperty("categoryId")]      
         public int? CategoryId { get; set; }


        [Required(ErrorMessage = "Department is required", AllowEmptyStrings = false)]
        [JsonProperty("departmentId")]       
        public int? DepartmentId { get; set; }


        [Required(ErrorMessage = "Rank is required", AllowEmptyStrings = false)]
        [JsonProperty("rankId")]       
         public int? RankId { get; set; }


        //[Required(ErrorMessage = "Location Type is required", AllowEmptyStrings = false)]
        //[JsonProperty("locationTypeId")]       
        //public int? LocationTypeId { get; set; }

        [Required(ErrorMessage = "Atleast a tag is required", AllowEmptyStrings = false)]
        [JsonProperty("tags")]      
         public JobPositionTag[] Tags { get; set; }

         [Required(ErrorMessage = "Is Recommended is required", AllowEmptyStrings = false)]
        [JsonProperty("isRecommended")]   
         public bool? IsRecommended { get; set;}
    }



    public class JobPositionDetails : MJPEntity
    {
        public int JobPositionId { get; set;}
       

        public JobPosition PositionDetails { get; set;}
        
         public  JobPositionFeature[] Features { get; set;}

        public JobPositionTag[] Tags { get;set; }

        public MJPDocument[] Documents { get; set; }

         public JobPositionRequirement[] Requirements { get; set; }

    }
}
