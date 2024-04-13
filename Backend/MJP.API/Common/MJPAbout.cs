using System;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Configuration;
using System.Collections.Generic;
using MJP.Entities.Models;
using Newtonsoft.Json;

namespace MJP.API.Models
{

    public class MJPInformation {

        public  AboutUs About { get; set; }

        public  ContactUs Contact { get; set; }
    }

    public class AboutUs {

        public string About1 { get; set; }

        public string About2 { get; set; }
    }


    public class ContactUs {

        public string Address1 { get; set; }

        public string Address2 { get; set; }

        public string City { get; set; }

        public string State { get; set; }

        public string Pincode { get; set; }

        public string Email { get; set; }

        public string URL { get; set; }

        public string ContactNumber { get; set; }
    }
}