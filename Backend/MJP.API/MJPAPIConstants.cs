using System;
using System.Configuration;

namespace MJP.API
{
    public  class MJPJWTSettings {

        public string Secret { get; set; }

        public string Issuer { get; set; }

        public string Audience { get; set; }

        public int  ExpiryMinutes { get; set;}
    }


    public class MJPAPIConstants {

        public const string LOGIN_TYPE_USER = "USER";

        public const string LOGIN_TYPE_APPLICANT = "APPLICANT";
    }
}