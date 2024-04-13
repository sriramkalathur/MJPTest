using System;
using System.Net;
using Newtonsoft.Json;

namespace MJP.Entities.Models
{

    public class JobPositionCategory {

        public int CategoryId { get; set; }

        public string CategoryName { get; set; }
    }


    public class JobPositionRank {

        [JsonProperty("rankId")]
        public int RankId { get; set; }

        [JsonProperty("rankName")]
        public string RankName  { get; set; }

        [JsonProperty("departmentId")]
        public int DepartmentId { get; set; }


         [JsonProperty("categoryId")]
        public int CategoryId { get; set; }
    }


    public class JobPositionMasters {

        public JobPositionCategory[] Categories { get; set;}

        public JobPositionRank[] Ranks { get; set;}

        public ListItem[] Currencies { get; set; }

        public ListItem[] Departments { get; set;}


        [JsonProperty("certificates")]
        public ListItem[] OtherCertificates { get; set;}

        public ListItem[] VesselTypes { get; set;}

        public ListItem[] LocationTypes { get; set;}

        public ListItem[] Status { get; set;}

        public Company[] Companies { get; set;}
    }
}