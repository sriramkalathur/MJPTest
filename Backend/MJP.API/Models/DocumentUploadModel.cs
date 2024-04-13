using System;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;
using MJP.Entities.Models;
using Newtonsoft.Json;

namespace MJP.API.Models
{
    public class DocumentUploadModel: MJPEntity {

        [Required(ErrorMessage = "File is required")]
        [JsonProperty("fileContent")]        
        public IFormFile  FileContent { get; set;}


        ///Either Application/JobPositionId
        [JsonProperty("itemId")]
        public int ItemId { get; set; }

        [JsonProperty("remarks")]
        public string Remarks { get; set; }
    }

}
