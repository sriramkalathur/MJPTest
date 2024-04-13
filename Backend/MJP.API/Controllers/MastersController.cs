using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Collections;
using MJP.Entities.Models;
using System.Collections.Generic;
using System.Linq;
using MJP.Entities.Contracts;

using Microsoft.AspNetCore.Authorization;
using MJP.API.Models;
using MJP.Entities;

namespace MJP.API.Controllers
{
     [Authorize()]
    [ApiController()]
    [Route("api/[controller]")]
    public class MastersController : ControllerBase
    {

        private ILogger<MastersController> logger;
        private IMasterService masterService;

        public MastersController(ILogger<MastersController> logger, 
               IMasterService masterService)
        {
            this.logger = logger;
            this.masterService = masterService;
        }




        [HttpGet("selectCompanies")]
        public IEnumerable<Company> SelectAllCompanies()
        {
            var result = this.masterService.SelectCompanies();
            return result;
        }
        

        [HttpGet("selectStates")]
        public IEnumerable<ListItem> SelectAllStates()
        {
            var result = this.masterService.SelectAllStates();
            return result;
        }

        [HttpGet("profileMasters")]
        public UserProfileMasters SelectUserProfileMasters()
        {
            var result = this.masterService.SelectUserProfileMasters();
            return result;
        }


        [HttpGet("jobpositionfiltermasters")]
        public JobPositionFilterMasters SelectJobPositionFilterMasters()
        {
            var result = this.masterService.SelectJobpositionFilterMasters();
            return result;
        }


        [HttpGet("jobpositionmasters")]
        public JobPositionMasters SelectJobPositionMasters()
        {
            var result = this.masterService.SelectJobpositionMasters();
            return result;
        }
        

        // [HttpGet("applicantfiltermasters")]
        // public IActionResult SelectApplicantFilterMasters()
        // {
        //     var result = new {
        //         ranks =  this.masterService.SelectLOVItems(MJPConstants.LOV_GROUP_RANK)
        //     };
           
        //     return new OkObjectResult(result);
        // }
    }
}