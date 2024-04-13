using System;
using System.Net;
using System.Net.Mail;
using System.Text;

using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using MJP.Entities.Contracts;
using MJP.Entities.Models;

namespace MJP.Services
{
    public class EMailService : IEmailService
    {
        EmailConfigSettings settings;

        ILogger<EMailService> logger;
        
        public EMailService(ILogger<EMailService> logger, EmailConfigSettings settings){
            this.settings = settings;
            this.logger = logger;
        }

      

        public void SendEmail(MailMessage message, bool throwExceptionOnFailure = false)
        {
            message.From = new MailAddress(settings.SenderEmail);
            message.IsBodyHtml = true;
            message.Body =  message.Body;

            System.Net.Mail.SmtpClient client = new SmtpClient();
            client.Host = this.settings.SmtpServer;
            client.Port = this.settings.SmtpPort;


            client.DeliveryMethod = SmtpDeliveryMethod.Network;
            client.UseDefaultCredentials = false;
            client.Credentials = new NetworkCredential(this.settings.UserName, this.settings.Password);
            client.EnableSsl = true;
            
            try{
                client.Send(message);
            }
            catch(Exception ex){

                logger.LogError("Exception when sending email: {0}", ex.ToString());
                if(throwExceptionOnFailure){
                    //Throw the exception back..
                    throw;
                }
            }
        }
    }
}
