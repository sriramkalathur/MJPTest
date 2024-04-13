using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Collections;
using MJP.Entities.Models;
using System.Collections.Generic;
using System.Linq;
using MJP.Entities.Contracts;

using Microsoft.AspNetCore.Authorization;
using MJP.API.Models;
using MJP.API.Common;
using MJP.API.Extensions;

namespace MJP.API.Controllers
{


    [ApiController()]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {

        private ILogger<UserController> logger;

        private MJPJWTSettings jwtSettings;


        private IUserService userService;

        public UserController(ILogger<UserController> logger, MJPJWTSettings jwtSettings,
               IUserService userService)
        {
            this.logger = logger;
            this.jwtSettings = jwtSettings;
            this.userService = userService;
        }



        private JWTTokenResponse GenerateToken(User user){
            var result = MJPAuthExtensions.GenerateToken(user, jwtSettings);
            return new JWTTokenResponse
                {
                    //Add a Bearer
                    Token = $"Bearer {result}",
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    DisplayName = user.DisplayName,
                    UserName = user.UserName,
                    Role = user.UserRole,
                    CompanyId = user.CompanyId,
                    UserId = user.UserId
                };
        }


        private IActionResult SelectToken(User user)
        {
           // MJPJWTAuthenticationUtilities authUtilities = new MJPJWTAuthenticationUtilities(jwtSettings);

            if (user == null)
            {
                //Invalid User...
                return new UnauthorizedResult();
            }
            else
            {
                //Valid User
                var result = GenerateToken(user);
                return Ok(result);
            }
        }


        [HttpPost("getUserToken")]
        public IActionResult GenerateUserToken([FromBody] UserLoginModel model)
        {

            User user;
            if(model.LoginType == LoginType.Applicant) {
                //Slect applicant details
                user = this.userService.SelectApplicantDetails(model.UserName, model.password);
            }
            else {
                //select user detials. Both company user & staf user will be in the same DB
                user = this.userService.SelectUserDetails(model.UserName, model.password);
            }
            
            return SelectToken(user);
        }


         [HttpPost("register")]
        public IActionResult RegisterUser(UserRegistrationModel model){

            if(model != null){
                //There will be alreadty basic validtion..
                //In addition to that, do the further business validatins..
                var errors = this.userService.ValidateNewUser(model);

                this.AddModelErrors(errors);
            }

            if(! ModelState.IsValid){
                 return this.ApiValiationFailureResult(typeof(UserRegistrationModel));
            }
            //Validation OK. Proceed

            this.userService.RegisterUser(model);
            //Generate a new token for the user to navigte to Profile
            //UserName will be the email
            var user = this.userService.SelectApplicantDetails(model.Email, model.Password);
            var token = GenerateToken(user);
            //Send the token
            return this.ApiSuccessResult(token);
        }   


        [Authorize]
        [HttpPost("updateprofile")]
        public IActionResult UpdateProfile(UserProfile model){

            if(! ModelState.IsValid){
                 return this.ApiValiationFailureResult(typeof(UserRegistrationModel));
            }
            //Validation OK. Proceed

            this.userService.UpdateProfile(model);
            return this.ApiSuccessResult();
        }  

        [Authorize]
        [HttpGet("profile")]
        public UserProfile SelectProfile(){
            var user = this.HttpContext.GetLoggedInUser();
            return this.userService.SelectUserProfile(user.UserId);
        }   


        [Authorize]
        [HttpPost("changepassword")]
        public IActionResult ChangePassword([FromBody] ChangePasswordModel model){
            var user = this.HttpContext.GetLoggedInUser();

            //Set the UserId
            model.SetLastUpatedBy(user);
            model.ApplicantId = user.UserId;

             if(! ModelState.IsValid) {
                //Failure. Valdiations
                return this.ApiValiationFailureResult(typeof(ChangePasswordModel));
            }
            else {
                //Proceed with update
                var errors = this.userService.ChangePassword(model);

                this.AddModelErrors(errors);
                
                if(! ModelState.IsValid) {
                    //Failure. Valdiations
                    return this.ApiValiationFailureResult(typeof(ChangePasswordModel));
                }
                else {
                    //sucess.
                    return this.ApiSuccessResult();
                }
            }
          
        }   

        [HttpPost("resetpassword")]
        public IActionResult ResetPassword([FromBody] PasswordResetModel model){

            if(ModelState.IsValid){
                //Validate the email...
                if(!this.userService.IsValidApplicant(model.Email)){
                    //Invalid Email...
                    this.ModelState.AddModelError("email", "Email Id not registered");
                }
            }
            
            if(! ModelState.IsValid){
                 return this.ApiValiationFailureResult(typeof(PasswordResetModel));
            }


            //Valid
            this.userService.ResetPassword(model.Email);
            return this.ApiSuccessResult();
        }   
    }
}