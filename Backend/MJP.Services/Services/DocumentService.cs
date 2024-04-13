using System;
using MJP.Entities.Contracts;
using MJP.Entities.Models;

using System.Linq;
using System.Collections;
using System.Collections.Generic;


using Microsoft.EntityFrameworkCore;
using MJP.Infrastructure;
using MJP.Services.Extensions;
using System.Data.Common;
using MJP.Entities;
using Microsoft.Extensions.Logging;

namespace MJP.Services
{
    public class DocumentService : IDocumentService
    {

        private MJPContext context;

        private ILogger<DocumentService> logger;
        
        public DocumentService(MJPContext context, ILogger<DocumentService> logger){
            this.context = context;
            this.logger =logger;
        }

        public MJPDocument[] SelectJobApplicationDocuments(int jobApplicationId)
        {
            var jobPositionId = (from jp in this.context.JobApplications
                        where jp.JobApplicationId == jobApplicationId
                        select jp.JobPositionId).FirstOrDefault();

              var docs = (from d in this.context.JobApplicationDocuments
                        where d.JobApplicationId ==jobApplicationId
                         select new  MJPDocument(){
                            //Content = d.DocumentContent,
                            FileName = d.FileName,
                            DocumentId = d.JobApplicationDocumentId,
                        
                            LastUpdatedBy = d.LastUpdatedBy,
                            LastUpdatedTime = d.LastUpdatedTime,
                            UploadedBy = d.LastUpdatedBy,
                            UploadedTime = d.LastUpdatedTime.Value,

                            Remarks = d.Remarks
                        }).ToList();
            
            //For job application, select the documents uploaded @ the Job position level also
              var jobDocs = (from d in this.context.JobPositionDocuments
                        where d.JobPositionId == jobPositionId
                        select new  MJPDocument(){
                            //Content = d.DocumentContent,
                            FileName = d.FileName,
                            DocumentId = d.JobPositionDocumentId,
                        
                            LastUpdatedBy = d.LastUpdatedBy,
                            LastUpdatedTime = d.LastUpdatedTime,
                            UploadedBy = d.LastUpdatedBy,
                            UploadedTime = d.LastUpdatedTime.Value,

                            Remarks = d.Remarks
                        }).ToList();

            docs.AddRange(jobDocs);
            return docs.ToArray();
        }

        public MJPDocument[] SelectJobPositionDocuments(int jobPositionId)
        {
            var docs = (from d in this.context.JobPositionDocuments
                        where d.JobPositionId ==jobPositionId
                        select new  MJPDocument(){
                            //Content = d.DocumentContent,
                            FileName = d.FileName,
                            DocumentId = d.JobPositionDocumentId,

                            LastUpdatedBy = d.LastUpdatedBy,
                            LastUpdatedTime = d.LastUpdatedTime,
                            UploadedBy = d.LastUpdatedBy,
                            UploadedTime = d.LastUpdatedTime.Value,

                            Remarks = d.Remarks
                        }).ToArray();
            return docs;
        }


        public void DeleteJobApplicationDocument(int documentId){
            var dbItem = (from d in this.context.JobApplicationDocuments
                    where d.JobApplicationDocumentId == documentId
                    select d).FirstOrDefault();
            this.context.JobApplicationDocuments.Remove(dbItem);
            this.context.SaveChanges();
        }



        public MJPDocument  SelectJobDocument(int documentId){
            var item = (from d in this.context.JobPositionDocuments
                    where d.JobPositionDocumentId == documentId
                    select new  MJPDocument(){
                        Content = d.DocumentContent,
                        FileName = d.FileName
                    }).FirstOrDefault();

           return item;
        }


         public MJPDocument  SelectApplicationDocument(int documentId){
            var item = (from d in this.context.JobApplicationDocuments
                    where d.JobApplicationDocumentId == documentId
                    select new  MJPDocument(){
                        Content = d.DocumentContent,
                        FileName = d.FileName
                    }).FirstOrDefault();

           return item;
        }


         public void DeleteJobPositionDocument(int documentId){
            var dbItem = (from d in this.context.JobPositionDocuments
                    where d.JobPositionDocumentId == documentId
                    select d).FirstOrDefault();

            this.context.JobPositionDocuments.Remove(dbItem);
            this.context.SaveChanges();
        }

        public void UploadApplicationDocument(MJPDocumentUploadModel document)
        {
            var dbItem = new JobApplicationDocuments();
            dbItem.LastUpdatedBy = document.LastUpdatedBy;
            dbItem.LastUpdatedTime = document.LastUpdatedTime;
            dbItem.DocumentContent = document.Content;
            dbItem.DocumentTitle = document.FileName;
            dbItem.Remarks = document.Remarks;
            dbItem.JobApplicationId = document.ItemId;
            dbItem.FileName = document.FileName;

            this.context.JobApplicationDocuments.Add(dbItem);
            this.context.SaveChanges();
        }

        public void UploadJobPositionDocument(MJPDocumentUploadModel document)
        {
             var dbItem = new JobPositionDocuments();
            dbItem.LastUpdatedBy = document.LastUpdatedBy;
            dbItem.LastUpdatedTime = document.LastUpdatedTime;
            dbItem.DocumentContent = document.Content;
            dbItem.DocumentTitle = document.FileName;
            dbItem.JobPositionId = document.ItemId;
            dbItem.FileName = document.FileName;
            dbItem.Remarks = document.Remarks;

            this.context.JobPositionDocuments.Add(dbItem);
            this.context.SaveChanges();
        }

        public void UploadApplicantFile(MJPDocumentUploadModel document)
        {
             var dbItem = new ApplicantFiles();
            dbItem.LastUpdatedBy = document.LastUpdatedBy;
            dbItem.LastUpdatedTime = document.LastUpdatedTime;
            dbItem.DocumentContent = document.Content;
            dbItem.DocumentTitle = document.FileName;
            dbItem.Remarks = document.Remarks;
            dbItem.ApplicantId = document.ItemId;
            dbItem.FileName = document.FileName;

            this.context.ApplicantFiles.Add(dbItem);
            this.context.SaveChanges();
        }

        public MJPDocument[] SelectApplicantFiles(int applicantId)
        {
            var docs = (from d in this.context.ApplicantFiles
                        where d.ApplicantId ==applicantId
                        select new  MJPDocument(){
                            //Content = d.DocumentContent,
                            FileName = d.FileName,
                            DocumentId = d.ApplicantFileId,

                            LastUpdatedBy = d.LastUpdatedBy,
                            LastUpdatedTime = d.LastUpdatedTime,
                            UploadedBy = d.LastUpdatedBy,
                            UploadedTime = d.LastUpdatedTime.Value,

                            Remarks = d.Remarks
                        }).ToArray();
            return docs;
        }

        public void DeleteApplicantFile(int applicantFileId)
        {
           var dbItem = (from d in this.context.ApplicantFiles
                    where d.ApplicantFileId == applicantFileId
                    select d).FirstOrDefault();
            this.context.ApplicantFiles.Remove(dbItem);
            this.context.SaveChanges();
        }

        public MJPDocument SelectApplicantFile(int applicantFileId)
        {
             var item = (from d in this.context.ApplicantFiles
                    where d.ApplicantFileId == applicantFileId
                    select new  MJPDocument(){
                        Content = d.DocumentContent,
                        FileName = d.FileName
                    }).FirstOrDefault();

           return item;
        }
    }
}
