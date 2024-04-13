using System;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace MJP.Entities.Models
{
    public class EmailConfigSettings {
        
        public string SmtpServer { get; set; }

        public int SmtpPort { get; set; }

        public string UserName { get; set; }

        public string Password { get; set; }


        public string SenderEmail { get; set; }
    }
}