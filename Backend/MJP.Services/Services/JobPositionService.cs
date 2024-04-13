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
using System.Threading.Tasks.Dataflow;
using Org.BouncyCastle.Asn1.Icao;

namespace MJP.Services
{
    public class JobPositionService : IJobPositionService
    {

        private MJPContext context;


        private IJobFeatureService jobFeatureService;

        private IJobRequirementService requirementService;


        public JobPositionService(MJPContext context, IJobFeatureService jobFeatureService,
               IJobRequirementService requirementService){
            this.context = context;
            this.jobFeatureService =jobFeatureService;
            this.requirementService = requirementService;
        }

    

        public EditJobPosition SelectJobPositionEdit(int jobPositionId){

                var result =(from jp in this.context.JobPositions
                        where jp.JobPositionId == jobPositionId
                        select new EditJobPosition(){
                            JobCode = jp.JobCode,
                            CategoryId = jp.CategoryId.Value,
                            CompanyId = jp.CompanyId.Value,

                            DepartmentId = jp.DepartmentId,
                            RankId = jp.RankId.Value,
                            JDSummary = jp.Jdsummary,
                            JobPositionId = jp.JobPositionId,
                            LastDateOfApplication = jp.LastDateOfApplication,
                            
                            VesselTypeId = jp.VesselTypeId,
                            NumberOfPositions = jp.NumberOfPositions,
                            PositionTitle = jp.PositionTitle,
                            StatusId =jp.StatusId.Value,

                            SalaryRange = jp.SalaryRange,
                            CurrencyId = jp.CurrencyId,
                            CompanyJobCode = jp.CompanyJobCode,
                            PostedOn = jp.PostedOn.Value,
                            IsRecommended = jp.IsRecommended != null && jp.IsRecommended.Value,

                            InterviewDate = jp.InterviewDate,
                            InterviewLocation = jp.InterviewLocation,
                            MinExperience = jp.MinExperience,
                            MaxExperience = jp.MaxExperience,
                            StaffRemarks = jp.StaffRemarks,
                            ExpiryDate = jp.ExpiryDate,

                        }).FirstOrDefault();
                //Only Tags is requird. Documents are no required
                result.Tags = this.SelectTags(jobPositionId);
                result.StatusId = MJPValidationExtensions.GetJobStatus(result.ExpiryDate.Value, result.StatusId.Value);

                return result;
        }


        public JobPositionTag[] SelectTags(int jobPositionId){
            var tags = (from t in this.context.JobPositionTags
                    where t.JobPositionId == jobPositionId
                    select new JobPositionTag(){
                        JobPositionId = jobPositionId,
                        JobPositionTagId = t.JobPositionTagId,
                        TagName = t.TagName
                    }).ToArray();
            return tags;
        }


        public MJPDocument[] SelectDocuments(int jobPositionId){
            var documents = (from d in this.context.JobPositionDocuments
                    where d.JobPositionId == jobPositionId
                    select new MJPDocument(){
                        FileName = d.FileName,
                        DocumentId = d.JobPositionDocumentId,
                    }).ToArray();
            return documents;
        }



       
        public JobPosition SelectJobPositionDetails(int jobPositionId){

               var job = (from jp in this.context.JobPositions
                   // join cur in this.context.Mjplovitems on jp.CurrencyId equals cur.LovitemId
                      join jpc in this.context.JobPositionCategories on jp.CategoryId equals jpc.JobPositionCategoryId
                      join jpg in this.context.JobPositionRanks on jp.RankId equals jpg.JobPositionRankId
                      join c in this.context.Companies on jp.CompanyId equals c.CompanyId
                      //join lc in this.context.Mjplovitems on jp.LocationTypeId equals lc.LovitemId
                      join vt in this.context.VesselTypes on jp.VesselTypeId equals vt.VesselTypeId
                      join dt in this.context.Departments on jp.DepartmentId equals dt.DepartmentId
                      where jp.JobPositionId ==jobPositionId
                      select new JobPosition(){
                        JobPositionId = jp.JobPositionId,
                        JobCode = jp.JobCode,
                        StatusId = jp.StatusId.Value,
                        PositionTitle = jp.PositionTitle,

                        PostedOn = jp.PostedOn.Value,
                        NumberOfPositions = jp.NumberOfPositions,
                        LastDateOfApplication = jp.LastDateOfApplication,
                       
                        Department = dt.DepartmentName,
                        VesselType = vt.VesselTypeName,
                        //LocationTypeId = jp.LocationTypeId.Value,
                        
                        CompanyJobCode = jp.CompanyJobCode,
                        //Append the currency calos
                        SalaryRange= $"{jp.SalaryRange}",
                        CurrencyId = jp.CurrencyId,

                        JDSummary = jp.Jdsummary,
                        Category = jpc.CategoryName,
                        CategoryId = jpc.JobPositionCategoryId,

                        Rank = jpg.RankName,
                        RankId = jpg.JobPositionRankId,
                        
                        InterviewDate = jp.InterviewDate,
                        InterviewLocation = jp.InterviewLocation,

                        MinExperience = jp.MinExperience.Value,
                        MaxExperience =jp.MaxExperience,
                        ExpiryDate = jp.ExpiryDate.Value,
                       
                        //If NULL, take false
                        IsRecommended = (jp.IsRecommended != null) && jp.IsRecommended.Value,
                        Company = new Company(){
                            CompanyCode = c.CompanyCode,
                            CompanyId = c.CompanyId,
                            DisplayName = c.DisplayName,

                            CompanyName = c.CompanyName,
                            Rating = c.Rating,
                            Url = c.Url,

                            Address1 = c.Address1,
                            Address2 = c.Address2,
                            City = c.City,
                            ContactNumber = c.ContactNumber,
                            Email = c.Email,
                        }
                      }).FirstOrDefault();
            
            if(job.CurrencyId != null) {
                //Select the currency text
                var currency = (from lv in this.context.Mjplovitems 
                            where lv.LovitemId == job.CurrencyId
                            select lv.DisplayText).FirstOrDefault();
                //set
                job.SalaryRange = $"{job.SalaryRange} {currency}";
            }
            //Select the tags
            job.Tags =  this.SelectTags(jobPositionId);
            job.StatusId =  MJPValidationExtensions.GetJobStatus(job.ExpiryDate,job.StatusId);
            
            //Select the documents
            job.Documents = this.SelectDocuments(jobPositionId);
            return job;
            
        }

        private void UpdateDBItem(JobPositions dbItem, EditJobPosition model){
            dbItem.CategoryId = model.CategoryId;
            dbItem.CategoryId = model.CategoryId;
            dbItem.RankId = model.RankId;
            dbItem.StatusId = model.StatusId;
            dbItem.VesselTypeId = model.VesselTypeId;
            dbItem.DepartmentId = model.DepartmentId;

            dbItem.CompanyId = model.CompanyId; 
            dbItem.NumberOfPositions = model.NumberOfPositions;
            dbItem.LastDateOfApplication = model.LastDateOfApplication;
            dbItem.CompanyJobCode = model.CompanyJobCode;
            dbItem.SalaryRange = model.SalaryRange;
            dbItem.CurrencyId = model.CurrencyId;

            dbItem.Jdsummary = model.JDSummary;
            dbItem.IsRecommended = model.IsRecommended;
            dbItem.PositionTitle = model.PositionTitle;
            dbItem.StaffRemarks = model.StaffRemarks;
            
            dbItem.InterviewDate = model.InterviewDate;
            dbItem.InterviewLocation = model.InterviewLocation;
            dbItem.MinExperience = model.MinExperience;
            dbItem.MaxExperience = model.MaxExperience;
            dbItem.ExpiryDate = model.ExpiryDate;
            
            dbItem.LastUpdatedTime = model.LastUpdatedTime;
            dbItem.LastUpdatedBy = model.LastUpdatedBy;
        }


        private void UpdateJobPositionTags(EditJobPosition model , int jobPositionId) {
            //Delete the tags first..
            var dbitems =(from t in this.context.JobPositionTags
                            where t.JobPositionId == jobPositionId
                         select t).ToArray();
            //Remove the items...
            this.context.JobPositionTags.RemoveRange(dbitems);
            //Add the new items.          
            this.context.JobPositionTags.AddRange((from t in model.Tags
                            select new JobPositionTags(){
                                JobPositionId = jobPositionId,
                                JobPositionTagId = t.JobPositionTagId,
                                LastUpdatedBy = model.LastUpdatedBy,
                                LastUpdatedTime = model.LastUpdatedTime,
                                TagName = t.TagName
                            }));
            this.context.SaveChanges();
        }

        public void UpdateJobpositionInfo(EditJobPosition model){
            JobPositions dbItem;

            if(model.JobPositionId == 0){
                //New Item...
                dbItem = new JobPositions();
                UpdateDBItem(dbItem, model);

                //Update PastedBy only for New item
                dbItem.PostedOn = model.LastUpdatedTime;
                dbItem.PostedBy = model.LastUpdatedBy; 
                
                //ADD to the list
                this.context.JobPositions.Add(dbItem);
            }
            else {
                //Exisitng..
                dbItem = (from jp in this.context.JobPositions 
                        where jp.JobPositionId == model.JobPositionId
                        select jp).FirstOrDefault();
                UpdateDBItem(dbItem, model);
                 //Update
                this.context.JobPositions.Update(dbItem);
            }
            this.context.SaveChanges();
            //Update tags..
            this.UpdateJobPositionTags(model, dbItem.JobPositionId);
    }
    
    private JobPosition ReadJobPosition(DbDataReader reader){
        return new JobPosition()
        {
            //Department = reader.ReadString("DepartmentName"),
            Category = reader.ReadString("Category"),
            Rank = reader.ReadString("RankName"),
            JobPositionId = reader.ReadInteger("JobPositionId"),

            JobCode = reader.ReadString("JobCode"),
            PostedOn = reader.ReadDateTime("PostedOn"),
            Company = new Company(){
                CompanyName = reader.ReadString("CompanyName"),
                Rating = reader.ReadNullableInteger("Rating")
            },
            CompanyJobCode = reader.ReadString("CompanyJobCode"),
            JDSummary = reader.ReadString("JDSummary"),
            PositionTitle = reader.ReadString("PositionTitle"),

            ExpiryDate = reader.ReadDateTime("ExpiryDate"),
            StatusId= reader.ReadInteger("StatusId"),
            NumberOfPositions = reader.ReadNullableInteger("NumberOfPositions"),
            LastDateOfApplication = reader.ReadNullableDateTime("LastDateOfApplication"),
            
        };
    }



    private JobPosition ReadRecommendedJobPosition(DbDataReader reader){
        return new JobPosition()
        {
            JobPositionId = reader.ReadInteger("JobPositionId"),

            JobCode = reader.ReadString("JobCode"),
            PostedOn = reader.ReadDateTime("PostedOn"),
            Company = new Company(){
                CompanyName = reader.ReadString("CompanyName"),
                Rating = reader.ReadNullableInteger("CompanyRating"),
               // CompanyLogo = reader.ReadString("CompanyLogo")
            },
            JDSummary = reader.ReadString("JDSummary"),
            PositionTitle = reader.ReadString("PositionTitle"),

            StatusId= reader.ReadInteger("StatusId"),
            ExpiryDate = reader.ReadDateTime("ExpiryDate"),
            SalaryRange = reader.ReadString("SalaryRange"),
            Rank = reader.ReadString("Rank"),

            MinExperience =reader.ReadDecimal("MinExperience"),
            MaxExperience = reader.ReadDecimal("MaxExperience"),
            LastDateOfApplication = reader.ReadNullableDateTime("LastDateOfApplication")
        };
    }


    public FilteredResult<JobPosition> FilterJobPositions(ApplicationFilterModel filter,
                            int currentPage, 
                            int itemsPerPage = 5) 
    {   var result = new FilteredResult<JobPosition>();
        var list = new List<JobPosition>();

        using (var cmd = context.Database.GetDbConnection().CreateCommand())
        {
            cmd.CommandText = "[administration].[FilterJobPositions]";
            cmd.CommandType = System.Data.CommandType.StoredProcedure;

            cmd.Parameters.Add(filter.JobStatus.ConvertToTableParameter("@status", false));
            cmd.Parameters.Add(filter.Companies.ConvertToTableParameter("@companies", false));
            cmd.AddParameter("@filterText", filter.FilterText);
           
            cmd.AddParameter("@currentPage",currentPage);
            cmd.AddParameter("@itemsPerPage",itemsPerPage);

            cmd.Connection.Open();
            //var reader = cmd.ExecuteReader();
            cmd.ExecuteDBReader((reader) =>
            {   
                //The first set will have the Pagination detials
                reader.Read();

                result.TotalPages = reader.ReadInteger("TotalPages");
                result.CurrentPage = currentPage;
                result.TotalRecords = reader.ReadInteger("TotalRecords");

                //Move to next result
                reader.NextResult();

                while (reader.Read())
                {
                    var job = this.ReadJobPosition(reader);
                    job.StatusId =  MJPValidationExtensions.GetJobStatus(job.ExpiryDate,job.StatusId);

                    list.Add(job);

                }
            });
        }

        result.Items = list;
        return result;
        }
     



     public FilteredResult<JobPosition> SelectRecommendedPositions(
                            int currentPage, 
                            int itemsPerPage = 10) 
    {   var result = new FilteredResult<JobPosition>();
        var list = new List<JobPosition>();

        using (var cmd = context.Database.GetDbConnection().CreateCommand())
        {
            cmd.CommandText = "[administration].[SelectRecommendedPositions]";
            cmd.CommandType = System.Data.CommandType.StoredProcedure;

            cmd.AddParameter("@recordCount", 10);
            cmd.Connection.Open();
            //var reader = cmd.ExecuteReader();
            cmd.ExecuteDBReader((reader) =>
            {
               while (reader.Read())
                {
                    list.Add(this.ReadRecommendedJobPosition(reader));
                }
            });
        }

        result.Items = list;
        return result;
        }

        public JobPositionBasicInfo SelectJobPositionBasicInfo(int jobPositionId)
        {
            var result = (from jp in this.context.JobPositions
                        join rk in this.context.JobPositionRanks on jp.RankId equals rk.JobPositionRankId
                        where jp.JobPositionId ==jobPositionId
                        select new JobPositionBasicInfo(){
                            ExpiryDate = jp.ExpiryDate.Value,
                            JobStatusId = jp.StatusId.Value,
                            JobCode = jp.JobCode,

                            JobPositionId = jp.JobPositionId,
                            Rank = rk.RankName,
                            MinExperience = jp.MinExperience.Value,
                            MaxExperience = jp.MaxExperience,
                            SalaryRange = jp.SalaryRange,
                            NumberOfPositions = jp.NumberOfPositions.Value

                        } ).FirstOrDefault();
                        //Set the exipred status
            result.JobStatusId = MJPValidationExtensions.GetJobStatus(result.ExpiryDate, result.JobStatusId);

            //select the number of applications for this job
            result.ApplicationsCount = this.context.JobApplications.Count(jp => jp.JobPositionId == jobPositionId);
            return result;
        }

    }
}
