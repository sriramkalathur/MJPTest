using System;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace MJP.Entities.Models
{

    public class CompanyFilterModel {

        [JsonProperty("filterText")]
        public string FilterText { get; set;}
    }


    public class RPSLDetails {

        [JsonProperty("rpslId")]
        public int RPSLId { get; set; }

        [JsonProperty("companyName")]
        public string CompanyName { get; set; }


        [JsonProperty("rpslNumber")]
        public string RPSLNumber { get; set; }

        [JsonProperty("address1")]
        public string Address1 { get; set; }

        [JsonProperty("address2")]
        public string Address2 { get; set; }

        [JsonProperty("address3")]
        public string Address3 { get; set; }


        [JsonProperty("city")]
        public string City { get; set; }

        [JsonProperty("pincode")]
        public string Pincode { get; set; }


        [JsonProperty("stateId")]
        public int StateId  { get; set; }
    }


    public class EditCompany : MJPEntity
    {
        
        [JsonProperty("companyId")]
        public int CompanyId { get; set; }

        [JsonProperty("companyCode")]
        public string CompanyCode { get; set;}

        [Required(ErrorMessage = "Company name is required")]
        [JsonProperty("companyName")]
        public string CompanyName{ get; set;}

        [Required(ErrorMessage = "Display name is required")]
        [JsonProperty("displayName")]
        public string DisplayName { get; set;}

        [JsonProperty("rating")]
        public int? Rating { get;set;}


        [Required(ErrorMessage = "RPSL Number is required")]
        [JsonProperty("rpslNumber")]
        public string RPSLNumber { get; set;}

         [Required(ErrorMessage = "IsRecommended is required")]
        [JsonProperty("isRecommended")]
        public bool? IsRecommended { get; set; }
        
        [JsonProperty("url")]
        public string Url { get; set; }


        [Required(ErrorMessage = "Company Profile is required")]
        [JsonProperty("companyProfile")]
        public string CompanyProfile { get; set; }


        [Required(ErrorMessage = "Email is required")]
        [JsonProperty("email")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Address is required")]
        [JsonProperty("address1")]
        public string Address1 { get; set; }

        [JsonProperty("address2")]
        public string Address2 { get; set; }

        //[Required(ErrorMessage = "City is required")]
         [JsonProperty("city")]
        public string City { get; set; }


        [Required(ErrorMessage = "Contact Number is required")]
        [JsonProperty("contactNumber")]
        public string ContactNumber { get; set;}

        //[Required(ErrorMessage = "Pincode is required")]
        [JsonProperty("pincode")]
        public string Pincode { get; set;}

        [Required(ErrorMessage = "Status is required")]
        [JsonProperty("isActive")]
        public bool? IsActive { get; set;}

        //[Required(ErrorMessage = "State is required")]
        [JsonProperty("stateId")]
        public int? StateId { get; set;}

        [JsonProperty("companyLogo")]
        public string CompanyLogo { get; set;}


        [Required(ErrorMessage = "User name is required")]
        [JsonProperty("userName")]
        public string UserName { get; set; }


        [Required(ErrorMessage = "Password is required")]
        [JsonProperty("password")]
        public string Password { get; set;}

    }

    public class Company: MJPEntity
    {

        [JsonProperty("companyId")]
        public int CompanyId { get; set; }


        [JsonProperty("companyCode")]
        public string CompanyCode { get; set;}
     
        [JsonProperty("companyName")]
        public string CompanyName{ get; set;}

      
        [JsonProperty("displayName")]
        public string DisplayName { get; set;}

        [JsonProperty("rating")]
        public int? Rating { get;set;}

        [JsonProperty("url")]
        public string Url { get; set; }

        [JsonProperty("state")]
        public string State { get; set; }

        [JsonProperty("email")]
        public string Email { get; set; }

         [JsonProperty("pincode")]
        public string Pincode { get; set; }

         [JsonProperty("address1")]
        public string Address1 { get; set; }

         [JsonProperty("address2")]
        public string Address2 { get; set; }

         [JsonProperty("city")]
        public string City { get; set; }

         [JsonProperty("contactNumber")]
        public string ContactNumber { get; set;}

        [JsonProperty("companyLogo")]
        public string CompanyLogo { get; set;}
    }
}
