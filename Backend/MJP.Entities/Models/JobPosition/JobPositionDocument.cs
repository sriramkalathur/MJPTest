using System;
using Newtonsoft.Json;

namespace MJP.Entities.Models
{
    

    public class MJPDocument: MJPEntity
    {
        [JsonProperty("documentId")]
        public int DocumentId { get;set;}

        public string Remarks { get; set; }

        public string FileName { get; set; }

        public byte[] Content { get; set; }

        
        public DateTime UploadedTime { get; set; }

        public string UploadedBy { get; set; }
    }



    public class MJPDocumentUploadModel : MJPEntity
    {
        /// JobPosition/Job ApplicationId
        [JsonProperty("itemId")]
        public int ItemId { get;set;}

        public string Remarks { get; set; }

        public string FileName { get; set; }

        public byte[] Content { get; set; }

        
        public DateTime UploadedTime { get; set; }

        public string UploadedBy { get; set; }
    }


    // public class JobApplicationDocument: MJPEntity
    // {
    //     [JsonProperty("itemId")]
    //     public int JobApplicationDocumentId { get;set;}

    //     public int JobApplicationId { get; set; }

    //     public string Remarks { get; set; }

    //     public string FileName { get; set; }


    //     public byte[] Content { get; set; }


    // }
}
