using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using MJP.Entities.Models;

namespace MJP.API.Common
{
  
    public static class MJPAuthExtensions
    {
         public static string GenerateToken(User user, MJPJWTSettings jwtConfig){
            
            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtConfig.Secret));
            var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

            var claims = new List<Claim>() {
                          new Claim("firstName", user.FirstName),
                          new Claim("lastName", user.LastName),
                          new Claim("userName", user.UserName),
                          new Claim("userId", user.UserId.ToString()),
                           new Claim("userRole", user.UserRole.ToString())          
                        };
            if(user.CompanyId != null){
              //Add claim
              claims.Add(new Claim("companyId", user.CompanyId.Value.ToString()));
            }

            var token = new JwtSecurityToken(issuer: jwtConfig.Issuer, audience: jwtConfig.Audience, 
                        claims: claims,
                        expires: DateTime.Now.AddMinutes(jwtConfig.ExpiryMinutes), signingCredentials: signinCredentials);
            var tokenString = new JwtSecurityTokenHandler().WriteToken(token);

            return tokenString;
        }
    }
}
