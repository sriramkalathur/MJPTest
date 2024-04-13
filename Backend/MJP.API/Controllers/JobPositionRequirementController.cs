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
    public class JobPositionRequirementController : ControllerBase
    {

        private IJobRequirementService requirementService;
        
        private ILogger<JobPositionRequirementController> logger;
        public  JobPositionRequirementController(ILogger<JobPositionRequirementController> logger, IJobRequirementService requirementService){
            this.logger = logger;
            this.requirementService = requirementService;
        }

      


        [HttpGet("requirements/{jobPositionId}")]
        public IEnumerable<JobPositionRequirement> SelectPositionFeatures(
                                   [FromRoute]int jobPositionId) 
        {
            var user = this.HttpContext.GetLoggedInUser();
            //Select all the features
            var result = this.requirementService.SelectJobRequirements(jobPositionId);
            return result;
        }


        [HttpPost("update")]
        public IActionResult UpdateJobRequirement([FromBody]JobPositionRequirement model) 
        {
            var user = this.HttpContext.GetLoggedInUser();
             if(! this.ModelState.IsValid){
               
                //Invalid. Return validtion failure result
                return this.ApiValiationFailureResult(typeof(JobPositionRequirement));
            }
            //Proceed with update..
            model.SetLastUpatedBy(user);
       
            //Update
            this.requirementService.UpdateJobRequirement(model);
            return this.ApiSuccessResult();
        }

        [HttpDelete("delete/{jobRequirementId}")]
        public IActionResult DeleteJobRequiement([FromRoute]int jobRequirementId)
        {
            var user = this.HttpContext.GetLoggedInUser();

            this.requirementService.DeleteJobRequirement(jobRequirementId);
            return this.ApiSuccessResult();
        }
    }
}