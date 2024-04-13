using System;
using MJP.Entities.Contracts;
using MJP.Entities.Models;

using System.Linq;
using System.Collections;
using System.Collections.Generic;


using Microsoft.EntityFrameworkCore;
using MJP.Infrastructure;
using MJP.Services.Extensions;
using System.Data.Common;
using System.Text;
using System.Net.Mail;
using System.Net.Http.Headers;
using MJP.Entities;

namespace MJP.Services
{
    public class UserService : IUserService
    {
        private IEmailService emailService;
        private MJPContext context;

        public UserService(MJPContext context, IEmailService emailService){
            this.context = context;
            this.emailService  = emailService;
        }

      

        public User SelectUserDetails(string userName, string password)
        {
            var usr = (from u in this.context.Users
                where (u.UserName == userName
                 && u.Password == password)
                select new User(){
                    DisplayName = u.DisplayName,
                    FirstName = u.FirstName,
                    LastName = u.LastName,
                    UserId = u.UserId,
                    UserName = u.UserName,
                    UserRole = Enum.Parse<MJPUserRole>(u.Role.ToString()),
                    CompanyId = u.CompanyId
                }).FirstOrDefault();
            return usr;
           
        }

        public User SelectApplicantDetails(string userName, string password)
        {
            //Select only the Active applicants for LOGIN
            var usr = (from u in this.context.Applicants
                where ((u.UserName == userName)
                 && (u.Password == password))
                select new User(){
                    DisplayName = u.DisplayName,
                    FirstName = u.FirstName,
                    LastName = u.LastName,
                    UserId = u.ApplicantId,
                    UserName = u.UserName,
                    UserRole = MJPUserRole.Applicant
                }).FirstOrDefault();
            return usr;
           
        }


        public ValidationError[] ValidateNewUser(UserRegistrationModel model){

            //Validate duplicate UserName, email, mobilenumber
            //var count = this.context.Users.Count((usr) => usr.UserName == model.UserName);
            var count1 = this.context.Applicants.Count((usr) => usr.Email == model.Email);
            var count2 = this.context.Applicants.Count((usr) => usr.MobileNumber == model.MobileNumber);

            List<ValidationError> errors = new List<ValidationError>();
          

            if(count1 > 0){
                //Email  exiusts..
                errors.Add(new ValidationError(){
                    FieldName = "email",
                    ErrorMessage = "Email already exists"
                });
            }

             if(count2 > 0){
                //Mobile number exists
                errors.Add(new ValidationError(){
                    FieldName = "mobileNumber",
                    ErrorMessage = "Mobile Number already exists"
                });
            }

            return errors.ToArray();
        }



        

        public void RegisterUser(UserRegistrationModel model){
            //Add ther user
            var dbItem = new Applicants();

            dbItem.FirstName = model.FirstName;
            dbItem.LastName = model.LastName;
            
            dbItem.MobileNumber = model.MobileNumber;
            dbItem.Email = model.Email;
            
            //dbItem.DisplayName = model.DisplayName;
            //User EMail as user Name
            dbItem.UserName = model.Email;
            dbItem.Password = model.Password;
             //dbItem.FirstName = model.FirstName;
            //dbItem.LastName = model.LastName;
            dbItem.LastUpdatedBy = model.UserName;
            dbItem.LastUpdatedTime = DateTime.UtcNow;
            //When the user is registering, the initial statius is INACTIVE
            dbItem.StatusId = MJPConstants.APPLICANT_STATUS_NEW;
            dbItem.AvailabilityStatusId = MJPConstants.JOB_AVAILABILTY_STATUS_AVAILABLE;

            //Add
            this.context.Applicants.Add(dbItem);
            this.context.SaveChanges();
            //Set the UserId
            model.UserId = dbItem.ApplicantId;
        }
    


        public void UpdateProfile(UserProfile profile){
            var dbItem = (from a  in this.context.ApplicantPersonalDetails
                    where a.ApplicantId == profile.UserId
                    select a).FirstOrDefault();
            //Update
            //UpdateDbItem(dbItem, profile);
            // Update profile
            this.context.SaveChanges();
        }

       

        public UserProfile SelectUserProfile(int userId){
           
            var profile = new UserProfile();
          
            return profile;
        }   


        private void SendPasswordGenerationEmail(string email, string password){

            StringBuilder emailBody = new StringBuilder();
            emailBody.Append($"Hi, <br />");
            emailBody.Append("Your password has been reset as per your request. Please find the new password below <br /><br />");
            emailBody.AppendLine($"Login Email : {email} <br />");
            emailBody.AppendLine($"Password : {password} <br />");
            emailBody.Append("<br /><br />");
            emailBody.Append("Please change the password once you login to the system.");

            emailBody.Append("<br />This is an autogenerated email.");

            MailMessage msg = new MailMessage();
            msg.Body = emailBody.ToString();
            msg.Subject = "Password Reset";
            msg.IsBodyHtml = true;
            msg.To.Add(email);
            
            //Send email
            this.emailService.SendEmail(msg);
        }


         private string GenerateRandomPassword(){
            //Generate a random password
            char[] LOWER_CASE = "abcdefghijklmnopqrstuvwxyz".ToCharArray();
            char[] UPPER_CASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".ToCharArray();
            char[] NUMBER = "1234567890".ToCharArray();
            char[] SPECIAL_CHARS = "!@#$%^&*_-=+".ToCharArray();

            Random random = new Random();
            string password = $"{UPPER_CASE[random.Next(25)]}{LOWER_CASE[random.Next(26)]}{NUMBER[random.Next(9)]}";
            password += $"{SPECIAL_CHARS[random.Next(12)]}{NUMBER[random.Next(9)]}{UPPER_CASE[random.Next(25)]}";

            return password;
        }   

        private void ChangePassword(int applicantId, string newPassword){
            var dbModel = (from s in this.context.Applicants
                            where s.ApplicantId == applicantId
                            select s).First();
            //Update to DB Model
            dbModel.Password = newPassword;
            dbModel.LastUpdatedBy = "System";
            dbModel.LastUpdatedTime = DateTime.UtcNow;
            
            this.context.Applicants.Update(dbModel);
            this.context.SaveChanges();
        }


        public void ResetPassword(string email){
            //EmailAddress1 will be the userName
            var dbModel = (from s in this.context.Applicants
                            where s.UserName == email
                            select s).FirstOrDefault();
            //Update the password

            if(dbModel != null){
                //Valid EMail.
                //Update password
                var password = GenerateRandomPassword();
                ChangePassword(dbModel.ApplicantId, password);
                //Send password generated email
                //SendPasswordGenerationEmail(dbModel., password);
            }
        }



        public bool IsValidApplicant(string email){
             var dbModel = (from s in this.context.Applicants
                            where s.UserName == email
                            select s).FirstOrDefault();
            return (dbModel == null)? false: true;
        }

        public ValidationError[] ChangePassword(ChangePasswordModel model){
             var dbModel = (from a in this.context.Applicants
                    where a.ApplicantId == model.ApplicantId
                    select a).FirstOrDefault();
            
            List<ValidationError> errors = new List<ValidationError>();
            if(string.Compare(model.OldPassword ,dbModel.Password, true) != 0){
                //Password doesn't match
                errors.Add(new ValidationError(){
                    ErrorMessage = "Password doesn't match with the existing password",
                    FieldName = "oldPassword"
                });
            }
            else {
                //Update the password
                dbModel.Password = model.NewPassword;
                dbModel.LastUpdatedBy = model.LastUpdatedBy;
                dbModel.LastUpdatedTime = model.LastUpdatedTime;
                //Update
                this.context.Applicants.Update(dbModel);
                this.context.SaveChanges();
            }

            return errors.ToArray();
        }
    }
}
