using System;
using System.Net.Mail;
using MJP.Entities.Models;


namespace MJP.Entities.Contracts
{
    public interface IEmailService
    {
        void SendEmail(MailMessage message, bool throwExceptionOnFailure = false);
    }
}
