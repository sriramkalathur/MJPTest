using System;
using MJP.Entities.Models;
using Newtonsoft.Json;

namespace MJP.API.Models
{


    public class JWTTokenResponse {

        [JsonProperty("authToken")]
        public string Token { get; set;}

        [JsonProperty("userName")]
        public string UserName { get; set; }

        [JsonProperty("firstName")]
        public string FirstName { get;set; }


        [JsonProperty("lastName")]
        public string LastName { get; set; }


         [JsonProperty("displayName")]
        public string DisplayName { get;set; }


         [JsonProperty("userId")]
        public int UserId { get;set; }



         [JsonProperty("companyId")]
        public int? CompanyId { get;set; }

        [JsonProperty("role")]
        public MJPUserRole Role { get;set; }
    }


    public enum LoginType {
        None,

        Staff =1,

        Applicant =2,

        CompanyUser = 3
    }

    public class UserLoginModel
    {
       
        public UserLoginModel(){
            this.LoginType = LoginType.None;
        }
        
        public string UserName { get; set; }

        public string password { get; set; }

        public LoginType LoginType { get; set;}
    }
}
