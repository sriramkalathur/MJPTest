using System;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace MJP.Entities.Models
{
    public class JobPositionRequirement : MJPEntity
    {
        public int JobPositionRequirementId { get; set;}

        
        [JsonProperty("description")]
        [Required(ErrorMessage = "Description is required", AllowEmptyStrings = false)]
        public string Description { get; set;}

        public int RequirementType { get; set;}


        [Required(ErrorMessage = "Is Mandatory is required", AllowEmptyStrings = false)]
        [JsonProperty("isMandatory")]
        public bool? IsMandatory { get; set; }

        public int JobPositionId { get; set;}
  
    }
}
