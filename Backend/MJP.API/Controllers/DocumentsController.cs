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

namespace MJP.API.Controllers
{


    [Authorize()]
    [ApiController()]
    [Route("api/[controller]")]
    public class DocumentsController : ControllerBase
    {

        private IDocumentService documentService;
        
        private ILogger<DocumentsController> logger;
        
        public  DocumentsController(ILogger<DocumentsController> logger, IDocumentService documentService){
            this.logger = logger;
            this.documentService = documentService;
        }

      
        private byte[] ReadFile(IFormFile file){
           using (var stream = new MemoryStream())
            {
                file.CopyTo(stream);
                return stream.ToArray();
            }
        }

        [HttpPost("uploadJobPositionDocument")]
        public IActionResult UploadJobPositionDocument(
                                   [FromForm]DocumentUploadModel model) 
        {
             if(! this.ModelState.IsValid){
               
                //Invalid. Return validtion failure result
                return this.ApiValiationFailureResult(typeof(DocumentUploadModel));
            }

            //OK. Proceed
            var user = this.HttpContext.GetLoggedInUser();
            model.SetLastUpatedBy(user);

            var document = new MJPDocumentUploadModel()
            {
                Remarks = model.Remarks,
                Content = ReadFile(model.FileContent),
                FileName = model.FileContent.FileName,
                ItemId = model.ItemId,
                LastUpdatedBy =model.LastUpdatedBy,
                LastUpdatedTime = model.LastUpdatedTime
            };

            //Uplaod
            this.documentService.UploadJobPositionDocument(document);
            return this.ApiSuccessResult();
        }


         [HttpPost("uploadApplicantDocument")]
        public IActionResult UploadApplicantDocument(
                                   [FromForm]DocumentUploadModel model) 
        {
             if(! this.ModelState.IsValid){
               
                //Invalid. Return validtion failure result
                return this.ApiValiationFailureResult(typeof(DocumentUploadModel));
            }

            //OK. Proceed
            var user = this.HttpContext.GetLoggedInUser();
            model.SetLastUpatedBy(user);

            var document = new MJPDocumentUploadModel()
            {
                Remarks = model.Remarks,
                Content = ReadFile(model.FileContent),
                FileName = model.FileContent.FileName,
                ItemId = model.ItemId,
                LastUpdatedBy =model.LastUpdatedBy,
                LastUpdatedTime = model.LastUpdatedTime
            };

            //Uplaod
            this.documentService.UploadApplicantFile(document);
            return this.ApiSuccessResult();
        }

        [HttpPost("uploadJobApplicationDocument")]
        public IActionResult UploadJobApplicationDocument(
                                   [FromForm]DocumentUploadModel model) 
        {
             if(! this.ModelState.IsValid){
               
                //Invalid. Return validtion failure result
                return this.ApiValiationFailureResult(typeof(DocumentUploadModel));
            }

            //OK. Proceed
            var user = this.HttpContext.GetLoggedInUser();
            model.SetLastUpatedBy(user);
            
            var document = new MJPDocumentUploadModel()
            {
                Remarks = model.Remarks,
                Content = ReadFile(model.FileContent),
                FileName = model.FileContent.FileName,
                ItemId = model.ItemId,
                LastUpdatedBy =model.LastUpdatedBy,
                LastUpdatedTime = model.LastUpdatedTime
            };

            //Uplaod
            this.documentService.UploadApplicationDocument(document);
            return this.ApiSuccessResult();
        }


        [HttpGet("jobpositiondocuments/{jobPositionId}")]
        public MJPDocument[] SelectJobPositionDocuments(
                                   [FromRoute]int jobPositionId) {
            
            var docs = this.documentService.SelectJobPositionDocuments(jobPositionId);
            return docs;
        }


        [HttpGet("applicantDocuments/{applicantId}")]
        public MJPDocument[] SelectApplicantDocuments(
                                   [FromRoute]int applicantId) {
            
            var docs = this.documentService.SelectApplicantFiles(applicantId);
            return docs;
        }


        [HttpGet("jobapplicationdocuments/{jobApplicationId}")]
        public MJPDocument[] SelectJobApplicationDocuments(
                                   [FromRoute]int jobApplicationId) {
            
            var docs = this.documentService.SelectJobApplicationDocuments(jobApplicationId);
            return docs;
        }

        [HttpDelete("jobPosition/{documentId}")]
        public IActionResult DeleteJobDocument([FromRoute]int documentId)
        {
            var user = this.HttpContext.GetLoggedInUser();
          
            this.documentService.DeleteJobPositionDocument(documentId);
            return this.ApiSuccessResult();
        }

        [HttpDelete("applicantFile/{applicantFileId}")]
        public IActionResult DeleteApplicantFile([FromRoute]int applicantFileId)
        {
            var user = this.HttpContext.GetLoggedInUser();
          
            this.documentService.DeleteApplicantFile(applicantFileId);
            return this.ApiSuccessResult();
        }


        [HttpDelete("jobApplication/{documentId}")]
        public IActionResult DeleteApplicationDocument([FromRoute]int documentId)
        {
            var user = this.HttpContext.GetLoggedInUser();
          
            this.documentService.DeleteJobApplicationDocument(documentId);
            return this.ApiSuccessResult();
        }

     

        [HttpGet("jobDocument/{documentId}")]
        public IActionResult DownloadJobDocument([FromRoute]int documentId)
        {
            var attachment = this.documentService.SelectJobDocument(documentId);

            return new FileContentResult(attachment.Content, "application/octet-stream")
            {
                FileDownloadName = attachment.FileName
            };
        }


        [HttpGet("applicantDocument/{documentId}")]
        public IActionResult DownloadApplicantDocument([FromRoute]int documentId)
        {
            var attachment = this.documentService.SelectApplicantFile(documentId);

            return new FileContentResult(attachment.Content, "application/octet-stream")
            {
                FileDownloadName = attachment.FileName
            };
        }

        [HttpGet("applicationDocument/{documentId}")]
        public IActionResult DownloadJobApplicationDocument([FromRoute]int documentId)
        {
            var attachment = this.documentService.SelectApplicationDocument(documentId);

            return new FileContentResult(attachment.Content, "application/octet-stream")
            {
                FileDownloadName = attachment.FileName
            };
        }
    }
}