// using System;
// using Microsoft.IdentityModel.Tokens;
// using System.IdentityModel.Tokens.Jwt;
// using System.Security.Claims;
// using System.Text;
// using System.Configuration;
// using System.Collections.Generic;
// using MJP.Entities.Models;
// using Newtonsoft.Json;

// namespace MJP.API.Authentication
// {

//     public class JWTTokenResponse {

//         [JsonProperty("authToken")]
//         public string Token { get; set;}

//         [JsonProperty("userName")]
//         public string UserName { get; set; }

//         [JsonProperty("firstName")]
//         public string FirstName { get;set; }


//         [JsonProperty("lastName")]
//         public string LastName { get; set; }


//          [JsonProperty("displayName")]
//         public string DisplayName { get;set; }


//          [JsonProperty("userId")]
//         public int UserId { get;set; }

//          [JsonProperty("role")]
//         public MJPUserRole Role { get;set; }
//     }

//     public class MJPJWTAuthenticationUtilities
//     {
//         private MJPJWTSettings jwtConfig;

//         public MJPJWTAuthenticationUtilities(MJPJWTSettings jwtConfig){
//             this.jwtConfig = jwtConfig;
//         }


//         public const string ONLY_MJP_STAFF = "MJP_STAFF_ONLY";


//         public static 

//         public string GenerateToken(User user){
            
//             var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtConfig.Secret));
//             var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

//             var token = new JwtSecurityToken(issuer: jwtConfig.Issuer, audience: jwtConfig.Audience, 
//                         claims: new List<Claim>() {
//                           new Claim("firstName", user.FirstName),
//                           new Claim("lastName", user.LastName),
//                           new Claim("userName", user.UserName),
//                           new Claim("userId", user.UserId.ToString()),
//                           new Claim("userRole", user.UserRole.ToString()),
                          
//                         },
//                         expires: DateTime.Now.AddMinutes(jwtConfig.ExpiryMinutes), signingCredentials: signinCredentials);
//             var tokenString = new JwtSecurityTokenHandler().WriteToken(token);

//             return tokenString;
//         }
//     }
// }
