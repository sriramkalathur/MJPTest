using System;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace MJP.Entities.Models
{
    public class InterviewDetails : MJPEntity {

        public int JobApplicationId { get; set;}

        public DateTime? InterviewDate { get; set; }

        public string InterviewInstructions { get; set; }

        public string Remarks { get; set;}
    }



    public class BulkJobPositionApplyModel: MJPEntity { 

        [Required(ErrorMessage = "Job PositionId required")]
        [JsonProperty("jobPositionId")]
        public int? JobPositionId { get; set;}


  
        [JsonProperty("remarks")]
        public string Remarks { get; set; }


        public int[] Applicants { get; set; }
    }



    public class JobPositionApplyModel: MJPEntity { 

        [JsonProperty("jobPositionId")]
        public int JobPositionId { get; set;}

        
        [JsonProperty("remarks")]
        public string Remarks { get; set; }


        public int ApplicantId { get; set; }
    }

    ///Application status change model
    public class ApplicationStatusItem : MJPEntity
    {
        public int JobApplicationId { get; set;}

       
        [Required(ErrorMessage = "Status is required")]
        [JsonProperty("statusId")]
        public int? StatusId { get; set;}



        
        [JsonProperty("remarks")]
        public string Remarks { get; set; }
    }
}
