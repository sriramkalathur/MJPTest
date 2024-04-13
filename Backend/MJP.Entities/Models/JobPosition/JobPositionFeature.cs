using System;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace MJP.Entities.Models
{
    public class JobPositionFeature : MJPEntity
    {
        public int JobPositionFeatureId { get; set;}


        [JsonProperty("description")]
        [Required(ErrorMessage = "Description is required", AllowEmptyStrings = false)]
        public string Description { get; set;}


        [JsonProperty("bold")]
        public bool IsBold { get; set; }

          [JsonProperty("italic")]
         public bool IsItalic { get; set; }


        [JsonProperty("textColor")]
        [Required(ErrorMessage = "Text Color is required", AllowEmptyStrings = false)]
        public string TextColor { get; set; }


        [JsonProperty("size")]
        [Required(ErrorMessage = "Text Size is required", AllowEmptyStrings = false)]
        public string Size { get; set; }
          
        public int JobPositionId { get; set;}

      
    }
}
