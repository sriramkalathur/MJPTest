
using System;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Configuration;
using System.Collections.Generic;
using MJP.Entities.Models;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace MJP.API.Models
{
    public class PasswordResetModel {


        [Required(ErrorMessage = "Email is required")]
        [JsonProperty("email")]
        public string Email { get; set;}
    }
}