using System;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Configuration;
using System.Collections.Generic;
using MJP.Entities.Models;
using Microsoft.AspNetCore.Http;
using System.Linq;

namespace MJP.API.Extensions
{
    public static class MJPAPIExtensions {

         public static string GetClaimValue(this HttpContext context, string claimType){
            return (from c in context.User.Claims
                    where c.Type == claimType
                    select c.Value).FirstOrDefault();
         }

        public static User GetLoggedInUser(this HttpContext context)
        {
            string companyId =context.GetClaimValue("companyId");
            return new User(){
                UserId = Convert.ToInt32(context.GetClaimValue("userId")),
                FirstName = context.GetClaimValue("firstName"),
                LastName = context.GetClaimValue("lastName"),
                UserName = context.GetClaimValue("userName"),
                CompanyId = (companyId == null) ? null: Convert.ToInt32(companyId),
                UserRole = Enum.Parse<MJPUserRole>(context.GetClaimValue("userRole"))
            };
        }


        private static DateTime GetCurrentISTTime(){
            return  TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow,
                    TimeZoneInfo.FindSystemTimeZoneById("India Standard Time"));
        }

        public static void SetLastUpatedBy(this MJPEntity entity, User user)
        {
            entity.LastUpdatedBy = user.UserName;
            entity.LastUpdatedTime = GetCurrentISTTime();
        }

    }
}