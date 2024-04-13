using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Collections;
using MJP.Entities.Models;
using System.Collections.Generic;
using System.Linq;
using MJP.Entities.Contracts;

using Microsoft.AspNetCore.Authorization;
using MJP.API.Models;
using System;
using System.IO;
using MJP.API.Common;
using MJP.API.Extensions;

namespace MJP.API.Controllers
{

    [Authorize]
    [ApiController()]
    [Route("api/[controller]")]
    public class ReportController : ControllerBase
    {

        private ILogger<ReportController> logger;
        private IReportService reportService;

        public ReportController(ILogger<ReportController> logger, 
               IReportService reportService)
        {
            this.logger = logger;
            this.reportService = reportService;
        }


        [AllowAnonymous]
        [HttpGet("pdftest")]
        public IActionResult ExportPdf(){
            var obj = new PDFExportTest();
            const string filename = @"D:\Sriram\Projects\Samples\Dotnet\HelloWorld.pdf";
            obj.TestExport(filename);
            
            return File(filename, "application/pdf");
        }

        [HttpPost("applicationsreport")]
        public FilteredResult<ApplicationReportItem> FilterApplicationsReport([FromBody] ApplicationReportParams filter,
                [FromQuery] int page = 1)
        {
            var result = this.reportService.FilterReport(filter, page);
            return result;
        }

        string CONTENT_TYPE_EXCEL = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";


        [HttpPost("exportapplicationsreport")]
        public IActionResult ExportApplicationsReport([FromBody] ApplicationReportParams filter)
        {
           
            var result = this.reportService.ExportApplicationsReport(filter);
            
            string fileName = $"ApplicationsReport-{DateTime.Now.ToString("dd_MMM_yyyy")}.xlsx";

            using (var stream = new MemoryStream())
            {
                MJPReportExtensions.ExportApplicationsReport(result, stream);

               var content = stream.ToArray();
                return File(content, CONTENT_TYPE_EXCEL, fileName);
            }   
           
        }
    }
}