using System;
using System.IO;
using System.Text.Json.Serialization;
using Newtonsoft.Json;

namespace MJP.Entities.Models
{

    public class JobSearchFilter {


        [JsonProperty("filterText")]
        public string FilterText { get; set; }

        [JsonProperty("rankId")]
        public int? RankId { get; set;}


        [JsonProperty("minExperience")]
        public decimal? MinExperience { get; set;}

        [JsonProperty("maxExperience")]
        public decimal? MaxExperience { get; set;}
    }



    public class JobPositionFilterMasters {

        public Company[] Companies { get; set; }


        public ListItem[] Ranks { get; set; }

        public JobPositionCategory[] Categories { get; set;}
        
    }
}
