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
using MJP.API.Models;
using System.IO;
using System.Net;

namespace MJP.API.Controllers
{
    [Authorize()]
    [ApiController()]
    [Route("api/[controller]")]
    public class CompanyController : ControllerBase
    {

        private ICompanyService companyService;
        
        private ILogger<CompanyController> logger;
        
        public  CompanyController(ILogger<CompanyController> logger, ICompanyService companyService){
            this.logger = logger;
            this.companyService = companyService;
        }

      

        [HttpPost("filterCompanies")]
        public FilteredResult<Company> FilterCompanies([FromBody] CompanyFilterModel  model,
               [FromQuery] int page = 1)
        {
            var user = this.HttpContext.GetLoggedInUser();

            var result = this.companyService.FilterCompanies(model,  page);
            return result;
        }


        [HttpPost("recommended")]
        public FilteredResult<Company> SelectRecommendedCompanies(
               [FromQuery] int page = 1)
        {
            var result = this.companyService.FilterRecommendedCompanies(page);
            return result;
        }


         [HttpGet("rpslDetails")]
        public IActionResult SelectRPSLDetails([FromQuery] string rpslNumber)
        {
            var result = this.companyService.SelectRPSLDetails(rpslNumber);
            if(result == null){
                //No RPSL return NOContent status
                return new StatusCodeResult((int)HttpStatusCode.NoContent);
            }
            else {
                //return the result
                return Ok(result);
            }
            
        }

        [HttpPost("update")]
        public IActionResult UpdateCompany([FromBody] EditCompany  model)
        {
            var user = this.HttpContext.GetLoggedInUser();

            if(model != null){
                //Valdiate
                var errors = this.companyService.ValidateCompany(model);
                this.AddModelErrors(errors);
            }

            if(! ModelState.IsValid){
                //Invlaid
                return this.ApiValiationFailureResult(typeof(EditCompany));
            }

            //Proceed with update
            model.SetLastUpatedBy(user);

            this.companyService.UpdateCompany(model);
            return this.ApiSuccessResult();
        }


        [HttpGet("details/{companyId}")]
        public EditCompany SelectCompany([FromRoute] int companyId)
        {
            var result = this.companyService.SelectCompany(companyId);
            return result;
        }
    }
}