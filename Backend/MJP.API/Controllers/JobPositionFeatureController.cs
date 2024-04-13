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
    public class JobPositionFeatureController : ControllerBase
    {

        private IJobFeatureService featureService;
        
        private ILogger<JobPositionFeatureController> logger;
        public  JobPositionFeatureController(ILogger<JobPositionFeatureController> logger, IJobFeatureService featureService){
            this.logger = logger;
            this.featureService = featureService;
        }

      


        [HttpGet("features/{jobPositionId}")]
        public IEnumerable<JobPositionFeature> SelectPositionFeatures(
                                   [FromRoute]int jobPositionId) 
        {
            var user = this.HttpContext.GetLoggedInUser();
            //Select all the features
            var result = this.featureService.SelectJobFeatures(jobPositionId);
            return result;
        }


        [HttpPost("update")]
        public IActionResult UpdateJobFeature([FromBody]JobPositionFeature model) 
        {
            var user = this.HttpContext.GetLoggedInUser();
             if(! this.ModelState.IsValid){
               
                //Invalid. Return validtion failure result
                return this.ApiValiationFailureResult(typeof(JobPositionFeature));
            }
            //Proceed with update..
            model.SetLastUpatedBy(user);
       
            //Update
            this.featureService.UpdateJobFeature(model);
            return this.ApiSuccessResult();
        }

        [HttpDelete("delete/{jobFeatureId}")]
        public IActionResult DeleteJobFeature([FromRoute]int jobFeatureId)
        {
            var user = this.HttpContext.GetLoggedInUser();
          
            this.featureService.DeleteJobFeature(jobFeatureId);
            return this.ApiSuccessResult();
        }
    }
}