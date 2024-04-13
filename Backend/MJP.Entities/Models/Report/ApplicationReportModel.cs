using System;
using Newtonsoft.Json;


namespace MJP.Entities.Models
{

    public class ApplicationReportParams {

        [JsonProperty("postedBefore")]
        public DateTime? PostedBefore { get; set; }

        [JsonProperty("postedAfter")]
        public DateTime? PostedAfter { get; set; }
    }

    public class ApplicationReportItem : MJPEntity
    {
        [JsonProperty("applicant")]
        public string Applicant { get; set; }

        [JsonProperty("category")]
        public string Category { get; set; }


        [JsonProperty("appliedDate")]
        public DateTime AppliedDate { get; set; }


        [JsonProperty("postedDate")]
        public DateTime PostedDate { get; set; }

        [JsonProperty("jobCode")]
        public string JobCode { get; set; }


        [JsonProperty("applicationNumber")]
        public string ApplicationNumber { get; set; }


        [JsonProperty("company")]
        public string Company { get; set;}

        [JsonProperty("positionTitle")]
        public string PositionTitle { get; set; }


        [JsonProperty("applicationStatusId")]
        public int ApplicationStatusId { get; set; }
    }


}
