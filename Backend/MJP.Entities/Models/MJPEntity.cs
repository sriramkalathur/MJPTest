using System;
using System.Text.Json.Serialization;
using Newtonsoft.Json;

namespace MJP.Entities.Models
{
    
    public class MJPEntity {

        public string LastUpdatedBy { get; set;}


        [JsonProperty("lastUpdatedDate")]
        public DateTime? LastUpdatedTime { get; set;}

        public virtual bool? IsActive { get; set;}
    }
    
}
