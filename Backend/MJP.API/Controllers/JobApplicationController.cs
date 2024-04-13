using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Collections;
using MJP.Entities.Models;
using System.Collections.Generic;
using System.Linq;
using MJP.Entities.Contracts;
using Microsoft.AspNetCore.Authorization;

using MJP.API.Extensions;
using MJP.API.Common;
using MJP.Entities;
using MJP.API.Validations;
using Microsoft.AspNetCore.Http;

namespace MJP.API.Controllers
{


    [Authorize()]
    [ApiController()]
    [Route("api/[controller]")]
    public class JobApplicationController : ControllerBase
    {

        private IJobApplicationService jobApplicationService;
        
        private ILogger<JobApplicationController> logger;
        public  JobApplicationController(ILogger<JobApplicationController> logger, IJobApplicationService jobApplicationService){
            this.logger = logger;
            this.jobApplicationService = jobApplicationService;
        }

      


        [HttpGet("details/{jobApplicationId?}")]
        public JobApplicationDetails SelectJobApplicationDetails(
                                   [FromRoute]int jobApplicationId) 
        {
            var user = this.HttpContext.GetLoggedInUser();
            return this.jobApplicationService.SelectJobApplicationDetails(jobApplicationId);
        }


        [HttpGet("detailsByPositionId/{jobPositionId}")]
        public JobApplicationDetails SelectApplicationDetailsByPositionId(
                                   [FromRoute]int jobPositionId) 
        {
            var user = this.HttpContext.GetLoggedInUser();
            //Pass the Applicant Id. If the user has applied to it, applicationDetials 
            //will be populated
            int? applicantId = (user.UserRole == MJPUserRole.Applicant) ? user.UserId: null;
            return this.jobApplicationService.SelectJobApplicationDetails(jobPositionId, applicantId);
        }


        [HttpPost("applyForPosition")]
        public IActionResult ApplyForPosition([FromBody]JobPositionApplyModel model) 
        {
            var user = this.HttpContext.GetLoggedInUser();
            if(! this.ModelState.IsValid){
               
                //Invalid. Return validtion failure result
                return this.ApiValiationFailureResult(typeof(JobPositionApplyModel));
            }
            //Proceed with update..
            model.SetLastUpatedBy(user);
            // set the applicant id from the current user
            model.ApplicantId = user.UserId;

            var errors = this.jobApplicationService.ApplyForJobPosition(model);
            if(errors.Length > 0){
                //There are no errors and Job applied..
                //Add the errors
                 this.AddModelErrors(errors);
            }

            if(! this.ModelState.IsValid){
                //Invalid. Return validtion failure result
                return this.ApiValiationFailureResult(typeof(JobPositionApplyModel));
            }
            else {
                //Job applied
                return this.ApiSuccessResult();
            }
            
        }



        [HttpPost("bulkApplyForPosition")]
        public IActionResult BulkApplyForPosition([FromBody]BulkJobPositionApplyModel model) 
        {
            var user = this.HttpContext.GetLoggedInUser();
            if(model != null && this.ModelState.IsValid){
               
                //Invalid. Do further validation
                this.AddModelErrors(this.jobApplicationService.Validate(model));
            }

            if(! this.ModelState.IsValid){
                //Return failure
                return this.ApiValiationFailureResult(typeof(BulkJobPositionApplyModel));
            }
            //Proceed with update..
            model.SetLastUpatedBy(user);
         
            //validation OK.Proceed with apply
            this.jobApplicationService.ApplyForJobPosition(model);
            return this.ApiSuccessResult();
        }

        [HttpPost("updateApplicationStatus")]
        public IActionResult UpdateApplicationStatus([FromBody]ApplicationStatusItem status)
        {
             if(! this.ModelState.IsValid){
               
                //Invalid. Return validtion failure result
                return this.ApiValiationFailureResult(typeof(ApplicationStatusItem));
            }

            var user = this.HttpContext.GetLoggedInUser();
            //Proceed
            status.SetLastUpatedBy(user);

            this.jobApplicationService.UpdateApplicationStatus(status);
            return this.ApiSuccessResult();
        }


        [HttpPost("updateJobApplication")]
        public IActionResult UpdateJobApplication([FromBody]JobApplicationDetails model)
        {
            var user = this.HttpContext.GetLoggedInUser();
            
            //Validate status
            if(! this.ModelState.IsValid){
               
                //Invalid. Return validtion failure result
                return this.ApiValiationFailureResult(typeof(JobApplicationDetails));
            }
            //Proceed with update..
            
            model.SetLastUpatedBy(user);

            this.jobApplicationService.UpdateJobApplicationDetails(model);
            return this.ApiSuccessResult();
        }

        int? ALL_APPLICANTS = null;

        int ALL_COMPANIES = -1;

        [HttpPost("filterApplications")]
        public FilteredResult<JobApplication> FilterJobApplications([FromBody]ApplicationFilterModel model, 
                [FromQuery]int page = 1)
        {
            var user = this.HttpContext.GetLoggedInUser();

            //If this is companyUser, filter only that company
            if(user.UserRole == MJPUserRole.CompanyUser) {
                //Filter only the Jobs for that company user company.
                model.Companies = new int[]{ user.CompanyId.Value };
            }
            var result = this.jobApplicationService.FilterJobApplications(model, ALL_APPLICANTS, page);
            return result;
        }


        [HttpPost("searchPositions")]
        public FilteredResult<ApplicantJobPosition> SearchJobPositions([FromBody]JobSearchFilter model, 
                [FromQuery]int page = 1)
        {
            var user = this.HttpContext.GetLoggedInUser();

            int? applicantId = ALL_APPLICANTS;

            if(user.UserRole == MJPUserRole.Applicant){
                //If the currntuser is Applicant, pass applicantId to fill the 
                //application detials for the corresponding user & job
                applicantId = user.UserId;
            }
            var result = this.jobApplicationService.SearchJobPositions(model, applicantId, page);
            return result;
        }



        [HttpPost("myApplications")]
        public FilteredResult<JobApplication> SelectMyApplications(
                [FromQuery]int page = 1)
        {
            var user = this.HttpContext.GetLoggedInUser();
            // By default take the applicant Id as Logged In User Id
            int applicantId = user.UserId;
            
            var result = this.jobApplicationService.SelectJobsByApplicant(applicantId, page);
            return result;
        }

 

        // [HttpPost("filterApplicantJobPositions")]
        // public FilteredResult<ApplicantJobPosition> FilterApplicantJobPositions([FromBody]ApplicationFilterModel filter,
        //         [FromQuery]int page = 1 )
        // {
        //     var user = this.HttpContext.GetLoggedInUser();
        //      filter.ApplicantId = user.UserId;
             
        //     if(user.UserRole == MJPUserRole.Applicant){
        //         //Set the ApplicantID
        //          filter.ApplicantId = user.UserId;
        //     }
        //     else {
        //         //Don't set the applicantID. If we set the applicantId as UserId
        //         //it will match with the applicantId and give wrong result
        //         filter.ApplicantId = -1;
        //     }
            
        //     var result = this.jobApplicationService.FilterApplications(filter, page);
        //     //Set the 
        //     return result;
        // }

    }
}