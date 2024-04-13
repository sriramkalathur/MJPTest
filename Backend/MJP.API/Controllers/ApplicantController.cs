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
using System.Net;
using MJP.API.Validations;
using MJP.Services.Extensions;
using MJP.Infrastructure;

namespace MJP.API.Controllers
{

    [Authorize()]
    [ApiController()]
    [Route("api/[controller]")]
    public class ApplicantController : ControllerBase
    {
        private ILogger<UserController> logger;

        private MJPJWTSettings jwtSettings;

        private IApplicantService applicantService;

        private IApplicantCourseService courseService;

        public ApplicantController(ILogger<UserController> logger, MJPJWTSettings jwtSettings,
               IApplicantService service, IApplicantCourseService courseService)
        {
            this.logger = logger;
            this.jwtSettings = jwtSettings;
            this.applicantService = service;
            this.courseService = courseService;
        }

        #region  "Personal Info"

        [HttpPost("personalInfo/update")]
        public IActionResult UpdatePersonalInformation(ApplicantPersonalInfo model){
            
            if(model != null){
                //Custom conditional validation
                this.AddModelErrors(ApplicantProfileValidations.ValidatePersonalInfo(model));
            }

            if(! ModelState.IsValid){

                //Custom validation
                 return this.ApiValiationFailureResult(typeof(ApplicantPersonalInfo));
            }
            //Validation OK. Proceed
            var user = this.HttpContext.GetLoggedInUser();
            model.SetLastUpatedBy(user);
            
            this.applicantService.UpdatePersonalInformation(model);
            return this.ApiSuccessResult();
        }  


        

        [HttpGet("applicantInfo/{applicantId?}")]
        public IActionResult SelectApplicantInfo([FromRoute]int? applicantId){
            var user = this.HttpContext.GetLoggedInUser();
            
            if(user.UserRole == MJPUserRole.Applicant) {
                //Always use the applicant's user Id
                applicantId = user.UserId;
            }

            var result = this.applicantService.SelectApplicantInfo(applicantId.Value);
            return Ok(result);
        } 


        [HttpPost("submitProfile/{applicantId?}")]
        public IActionResult SubmitProfile([FromRoute]int? applicantId){
            var user = this.HttpContext.GetLoggedInUser();
            
            if(user.UserRole == MJPUserRole.Applicant) {
                //Always use the applicant's user Id
                applicantId = user.UserId;
            }

           this.applicantService.SubmitProfile(applicantId.Value, user.UserName);
            return Ok();
        } 

        [HttpGet("personalInfo/{applicantId?}")]
        public IActionResult SelectPersonalInfo([FromRoute]int? applicantId){
            var user = this.HttpContext.GetLoggedInUser();
            
            if(user.UserRole == MJPUserRole.Applicant) {
                //Always use the applicant's user Id
                applicantId = user.UserId;
            }

            var result = this.applicantService.SelectPersonalInfo(applicantId.Value);
            return Ok(result);
        } 

        #endregion

        #region  "Documents"

        [HttpGet("documents/{applicantId?}")]
        public IActionResult SelectApplicantDocuments([FromRoute]int? applicantId){
            var user = this.HttpContext.GetLoggedInUser();
            
            if(user.UserRole == MJPUserRole.Applicant) {
                //Always use the applicant's user Id
                applicantId = user.UserId;
            }

            var result = this.applicantService.SelectApplicantDocuments(applicantId.Value);
            return Ok(result);
        } 


        [HttpPost("document/update")]
         public IActionResult UpdateApplicantDocument([FromBody]ApplicantDocument model){
            
            if(model != null && ModelState.IsValid){
               //var errors = new List<ValidationError>();
               //Validate dates
                  //Custom conditional validation
                this.AddModelErrors(this.applicantService.ValidateApplicantDocument(model));
            }
         

            if(! ModelState.IsValid){

                //Custom validation
                 return this.ApiValiationFailureResult(typeof(ApplicantDocument));
            }
            //Validation OK. Proceed
            var user = this.HttpContext.GetLoggedInUser();
            model.SetLastUpatedBy(user);
            
            this.applicantService.UpdateApplicationDocument(model);
            return this.ApiSuccessResult();
        }  

        [HttpDelete("document/{documentId}")]
        public IActionResult DeleteApplicationDocment([FromRoute]int documentId){
        
            this.applicantService.DeleteApplicantDocument(documentId);
            return this.ApiSuccessResult();
        }  

        #endregion

        #region "SEA Experience"

        [HttpGet("experiences/{applicantId?}")]
        public IActionResult SelectExperiences([FromRoute]int? applicantId){
            var user = this.HttpContext.GetLoggedInUser();
            
            if(user.UserRole == MJPUserRole.Applicant) {
                //Always use the applicant's user Id
                applicantId = user.UserId;
            }

            var result = this.applicantService.SelectExperiences(applicantId.Value);
            return Ok(result);
        } 


        [HttpPost("experience/update")]
         public IActionResult UpdateExperience([FromBody]SEAExperience model){
            
             if(model != null && ModelState.IsValid){
                 //Further validate
                var errors = this.applicantService.ValidateExperience(model);
                this.AddModelErrors(errors);
            }

            if(! ModelState.IsValid){

                //Custom validation
                 return this.ApiValiationFailureResult(typeof(SEAExperience));
            }
            //Validation OK. Proceed
            var user = this.HttpContext.GetLoggedInUser();
            model.SetLastUpatedBy(user);
            
            this.applicantService.UpdateExperience(model);
            return this.ApiSuccessResult();
        }  

        [HttpDelete("experience/{seaExperienceId}")]
        public IActionResult DeleteExperience([FromRoute]int seaExperienceId){
        
            this.applicantService.DeleteExperience(seaExperienceId);
            return this.ApiSuccessResult();
        }  

        #endregion

        [HttpPost("filterApplicants")]
        public IActionResult FilterApplicants([FromBody]ApplicantFilters filter, [FromQuery] int page = 1){
             var result = this.applicantService.FilterApplicants(filter, page);
            return Ok(result);
        } 


        [HttpPost("filterProfiles")]
        public FilteredResult<JobPositionProfile> FilterProfiles([FromBody] ProfileFilters model,
               [FromQuery] int page = 1)
        {
            var result = this.applicantService.FilterProfiles(model,  page);
            return result;
        }

        [HttpGet("profile/{applicantId}")]
        public  IActionResult SelectProfile([FromRoute]int applicantId){

            var user = this.HttpContext.GetLoggedInUser();
            if(user.UserRole == MJPUserRole.Applicant){
                //For applicant use the applicant Id (self loginId)
                applicantId = user.UserId;
            }
            var profile = new ApplicantProfileModel();
            profile.PersonalInfo = this.applicantService.SelectPersonalInfo(applicantId);
            profile.Certificates = this.courseService.SelectCertificates(applicantId);
            profile.Courses = this.courseService.SelectCourses(applicantId);
            profile.Experience = this.applicantService.SelectExperiences(applicantId);
            profile.Documents = this.applicantService.SelectApplicantDocuments(applicantId);

            return Ok(profile);
        }
        
    }
}