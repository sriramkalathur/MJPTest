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

namespace MJP.API.Controllers
{

    [Authorize()]
    [ApiController()]
    [Route("api/[controller]")]
    public class ApplicantCourseController : ControllerBase
    {
        private ILogger<UserController> logger;

        private IApplicantCourseService service;

        public ApplicantCourseController(ILogger<UserController> logger,
               IApplicantCourseService service)
        {
            this.logger = logger;
            this.service = service;
        }

        #region  "Certificate"

        [HttpPost("certificate/update")]
        public IActionResult UpdateCertificate(CompetencyCertificate model)
        {
            if(model != null && ModelState.IsValid){
               var errors = new List<ValidationError>();
               //Validate dates
                //errors.ValidateIfFutureDate(model.FromDate, "FromDate" ,"From date cannot be in future");
                //errors.ValidateDateRange(model.FromDate.Value, model.ToDate.Value, "ToDate" ,"To Date should be after From date");
                //Add errors
                this.AddModelErrors(errors);
            }

            if (!ModelState.IsValid)
            {   //Custom validation
                return this.ApiValiationFailureResult(typeof(CompetencyCertificate));
            }
            //Validation OK. Proceed
            var user = this.HttpContext.GetLoggedInUser();
            model.SetLastUpatedBy(user);

            this.service.UpdateCertificate(model);
            return this.ApiSuccessResult();
        }


        [HttpGet("certificates/{applicantId?}")]
        public IActionResult SelectApplicantCertificates([FromRoute] int? applicantId)
        {
            //ApplicantId is NULL as for applicant it may not be passed
            var user = this.HttpContext.GetLoggedInUser();

            if (user.UserRole == MJPUserRole.Applicant)
            {
                //Always use the applicant's user Id
                applicantId = user.UserId;
            }

            var result = this.service.SelectCertificates(applicantId.Value);
            return Ok(result);
        }



        [HttpDelete("certificate/{certificateId}")]
        public IActionResult DeleteCertificate([FromRoute] int certificateId)
        {

            this.service.DeleteCertificate(certificateId);
            return this.ApiSuccessResult();
        }

        #endregion


        [HttpPost("stcwcourse/update")]
        public IActionResult UpdateSTCWCourse(ApplicantSTCWCourse model)
        {
            if(model != null && ModelState.IsValid){
               var errors = new List<ValidationError>();
               //Validate dates
                errors.ValidateIfFutureDate(model.IssueDate, "IssueDate" ,"Issue date cannot be in future");

                if(model.ExpiryDate.HasValue){
                    //Validate expiry date
                    errors.ValidateDateRange(model.IssueDate.Value, model.ExpiryDate.Value, "ExpiryDate" ,"Expiry Date should be after Issue date");
                }
                 //Add errors
                this.AddModelErrors(errors);
            }
            if (!ModelState.IsValid)
            {
                //Custom validation
                return this.ApiValiationFailureResult(typeof(ApplicantSTCWCourse));
            }
            //Validation OK. Proceed
            var user = this.HttpContext.GetLoggedInUser();
            model.SetLastUpatedBy(user);

            this.service.UpdateCourse(model);
            return this.ApiSuccessResult();
        }


        [HttpGet("stcwcourses/{applicantId?}")]
        public IActionResult SelectSTCWCourses([FromRoute] int? applicantId)
        {
            var user = this.HttpContext.GetLoggedInUser();

            if (user.UserRole == MJPUserRole.Applicant)
            {
                //Always use the applicant's user Id
                applicantId = user.UserId;
            }

            var result = this.service.SelectCourses(applicantId.Value);
            return Ok(result);
        }



        [HttpDelete("stcwcourse/{stcwCourseId}")]
        public IActionResult DeleteSTCWCourse([FromRoute] int stcwCourseId)
        {
            this.service.DeleteCourse(stcwCourseId);
            return this.ApiSuccessResult();
        }

    }
}