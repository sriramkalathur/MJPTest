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

namespace MJP.API.Controllers
{


    [Authorize()]
    [ApiController()]
    [Route("api/[controller]")]
    public class JobPositionController : ControllerBase
    {

        private IJobPositionService jobPositionService;

        private ILogger<JobPositionController> logger;
        public JobPositionController(ILogger<JobPositionController> logger, IJobPositionService jobPositionService)
        {
            this.logger = logger;
            this.jobPositionService = jobPositionService;
        }


        [HttpGet("positionInfo/{jobPositionId}")]
        public EditJobPosition SelectJobPositionInfo([FromRoute] int jobPositionId)
        {
            var result = this.jobPositionService.SelectJobPositionEdit(jobPositionId);
            return result;
        }


        [HttpGet("basicpositionInfo/{jobPositionId}")]
        public JobPositionBasicInfo SelectJobPositionBasicInfo([FromRoute] int jobPositionId)
        {
            var result = this.jobPositionService.SelectJobPositionBasicInfo(jobPositionId);
            return result;
        }


        [HttpPost("updatepositionInfo")]
        public IActionResult UpdatePositionInfo([FromBody] EditJobPosition model)
        {

            if (model != null)
            {
                //Validate..
                this.AddModelErrors(JobPositionValidations.ValidateJobPosition(model));
            }

            if (!this.ModelState.IsValid)
            {

                //Invalid. Return validtion failure result
                return this.ApiValiationFailureResult(typeof(EditJobPosition));
            }
            //Vlaiditon OK.Proceed with update
            var user = this.HttpContext.GetLoggedInUser();

            model.SetLastUpatedBy(user);

            this.jobPositionService.UpdateJobpositionInfo(model);
            return this.ApiSuccessResult();
        }

    

        [HttpPost("filterJobPositions")]
        public FilteredResult<JobPosition> FilterJobPositions([FromBody] ApplicationFilterModel model,
               [FromQuery] int page = 1)
        {
            var user = this.HttpContext.GetLoggedInUser();

            if(user.UserRole == MJPUserRole.CompanyUser) {
                //For company users, just filter only the company
                model.Companies = new int[] {  user.CompanyId.Value };
            }
            
            var result = this.jobPositionService.FilterJobPositions(model,  page);
            return result;
        }


      


        const int ITEMS_PER_PAGE = 10;

        [HttpGet("recommendedPositions")]
        public FilteredResult<JobPosition> SelectRecommendedPositions(int page =1)
        {
            //var user = this.HttpContext.GetLoggedInUser();

            var result = this.jobPositionService.SelectRecommendedPositions(page, ITEMS_PER_PAGE);
            return result;
        }
    }

}