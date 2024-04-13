using System;
using Newtonsoft.Json;
using System.Collections.Generic;

namespace MJP.Entities.Models
{
    public class FilteredResult<T>
    {

        [JsonProperty("totalPages")]
        public int TotalPages { get; set; }

        [JsonProperty("totalRecords")]
        public int TotalRecords { get; set; }

        [JsonProperty("items")]
        public IEnumerable<T> Items { get; set; }

        [JsonProperty("currentPage")]
        public int CurrentPage { get; set; }
    }
}