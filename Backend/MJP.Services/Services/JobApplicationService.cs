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
using Org.BouncyCastle.Bcpg;

namespace MJP.Services
{
    public class JobApplicationService : IJobApplicationService
    {
        private MJPContext context;


        private IJobFeatureService jobFeatureService;

        private IJobRequirementService requirementService;


        private IJobPositionService jobPositionService;

        public JobApplicationService(MJPContext context, IJobFeatureService jobFeatureService,
               IJobRequirementService requirementService, IJobPositionService jobPositionService){
            this.context = context;
            this.jobFeatureService =jobFeatureService;
            this.requirementService = requirementService;
            this.jobPositionService = jobPositionService;
        }

 

        private JobApplicationInformation SelectJobApplicationInformation(int jobApplicationId){
            var result = (from ap in this.context.JobApplications
                        join a in this.context.Applicants on ap.ApplicantId equals a.ApplicantId
                        where ap.JobApplicationId == jobApplicationId
                            select new  JobApplicationInformation()
                            {
                                JobPositionId = ap.JobPositionId.Value,
                                ApplicantId = a.ApplicantId,
                                JobApplicationId = ap.JobApplicationId,
                                
                                ApplicantUserName = a.UserName,
                                ApplicantName = a.UserName,
                                JobApplicationCode = ap.JobApplicationCode,

                                ApplicantRemarks= ap.ApplicantRemarks,
                                StaffRemarks = ap.StaffRemarks,
                                ApplicationNumber = ap.ApplicationNumber,

                                InterviewDate = ap.InterviewDate,
                                InterviewInstructions = ap.InterviewInstrutions,
                                InterviewURL = ap.InterviewUrl,
                            
                                ApplicationStatusId = ap.StatusId,
                                InterviewStatusId = ap.InterviewStatusId,
                                AppliedDate = ap.AppliedDate,
                                AppliedToCompany = ap.AppliedToCompany.Value,
                            }).FirstOrDefault();
            return result; 
        }   


        private IEnumerable<StatusHistoryItem> SelectStatusHistory(int jobApplicationId){
            var result =(from s in this.context.ApplicationStatusHistory
                        where s.JobApplicationId == jobApplicationId
                        select new StatusHistoryItem(){
                            JobApplicationId = s.JobApplicationId.Value,
                            Remarks = s.Remarks,
                            StatusDate =  s.StatusDate.Value,
                            StatusId = s.StatusId.Value,
                            UpdatedBy = s.LastUpdatedBy,
                            LastUpdatedBy = s.LastUpdatedBy
                        });
            return result;
        }



     

        public JobApplicationDetails SelectJobApplicationDetails(int jobPositionId, int? applicantId){
            
            if(applicantId == null){
                //There is no applicant. For eg:- it could be a GUEST/STAFF role..
                //So return only the Job position details
                return SelectJobPositionDetails(jobPositionId); 
            }
            else {
                //There is application id. 
                //Select the JobPositon for that applicant.
               //If exists selecct the JobApplicaiton details else nto
                int? jobApplicationId = (from ap in this.context.JobApplications
                            where  ap.ApplicantId == applicantId &&
                                ap.JobPositionId == jobPositionId
                                select ap.JobApplicationId).FirstOrDefault();
            
            //FirstOrrDefault() returns NULL if it doesn't exists
            if(jobApplicationId == 0){
                //There is no Job application Id. select only the Job Positon detioals
                return SelectJobPositionDetails(jobPositionId);
            }
            else {
                //Select Job application detials
                return SelectJobApplicationDetails(jobApplicationId.Value);
            }
            }
        }


        private JobApplicationDetails SelectJobPositionDetails(int jobPositionId){
            var result = new JobApplicationDetails();
            
            //Fetch Job position detials
            result.PositionDetails = this.jobPositionService.SelectJobPositionDetails(jobPositionId);
            //Populate features  requirements
            result.Features = this.jobFeatureService.SelectJobFeatures(jobPositionId).ToArray();
            result.Requirements = this.requirementService.SelectJobRequirements(jobPositionId).ToArray();
            return result;
        }

        public JobApplicationDetails SelectJobApplicationDetails(int jobApplicationId){
           
            //Select the JOB details
            var result = new JobApplicationDetails();
            result.ApplicationDetails = this.SelectJobApplicationInformation(jobApplicationId);
            result.JobApplicationId = result.ApplicationDetails.JobApplicationId;
            result.JobPositionId = result.ApplicationDetails.JobPositionId;
            
            //Fetch Job position detials
            result.PositionDetails = this.jobPositionService.SelectJobPositionDetails(result.JobPositionId);
            //Populate features  requirements
            result.Features = this.jobFeatureService.SelectJobFeatures(result.JobPositionId).ToArray();
            result.Requirements = this.requirementService.SelectJobRequirements(result.JobPositionId).ToArray();
            result.StatusHistory = this.SelectStatusHistory(result.ApplicationDetails.JobApplicationId).ToArray();
            return result;
            
        }


        private void AddToStatusHistory(ApplicationStatusItem item){

            var newItem = new ApplicationStatusHistory();
            newItem.JobApplicationId = item.JobApplicationId;
            newItem.StatusDate = item.LastUpdatedTime;
            newItem.StatusId = item.StatusId;
            newItem.LastUpdatedBy = item.LastUpdatedBy;
            newItem.LastUpdatedTime = item.LastUpdatedTime;
            newItem.Remarks = item.Remarks;

            this.context.ApplicationStatusHistory.Add(newItem);
        }

        public void UpdateApplicationStatus(ApplicationStatusItem status){

            //Update the status
            var item = (from a in this.context.JobApplications
                    where a.JobApplicationId == status.JobApplicationId
                    select a).FirstOrDefault();

            item.LastUpdatedBy = status.LastUpdatedBy;
            item.LastUpdatedDate = status.LastUpdatedTime;
            item.StatusId = status.StatusId;
       
            this.context.JobApplications.Update(item);
            //Add to history
            this.AddToStatusHistory(status);

            this.context.SaveChanges();
        }



        private int? GetJobApplicationId(int jobPositionId, int applicationId){

            int? jobApplicationId = (from ap in this.context.JobApplications
                    where ap.ApplicantId == applicationId &&
                    ap.JobPositionId == jobPositionId
                    select ap.JobApplicationId).FirstOrDefault();
            //FirstOrDefault() returns o if not exist
            return (jobApplicationId == 0) ? null: jobApplicationId;
        }


        private ValidationError[] ValidateForApply(JobPositionApplyModel model){
            
            List<ValidationError> errors = new List<ValidationError>();
            var applicationId = this.GetJobApplicationId(model.JobPositionId, model.ApplicantId);

            var item = (from app in this.context.Applicants
                        where app.ApplicantId == model.ApplicantId
                        select app).FirstOrDefault();
            if(item.StatusId != MJPConstants.APPLICANT_STATUS_ACTIVE) {
                //The applicant status is inactiveted. Either New/Inactive
                errors.Add(new ValidationError(){
                    ErrorMessage = "Applicant Profile is inactive. Job can be applied only from active profile.",
                    FieldName = "JobPositionId"
                });
            }
            if(applicationId != null){
                //The job is already applied..
                errors.Add(
                    new ValidationError(){
                        FieldName = "JobPositionId",
                        ErrorMessage = "Job Already Applied"
                    });
            }
            return errors.ToArray();
        }


         public ValidationError[]  ApplyForJobPosition(JobPositionApplyModel model){

            ValidationError[] errors = ValidateForApply(model);
            if(errors.Length > 0) {
                //There are validation errors. Just return the errors
                return errors;
            }
            else {
                //Proceed with update
                var dbItem = new JobApplications(){
                ApplicantId = model.ApplicantId,
                IsActive = true,

                AppliedDate = DateTime.Now,
                JobPositionId = model.JobPositionId,
                StatusId = MJPConstants.APPLICATION_STATUS_APPLIED,

                ApplicantRemarks = model.Remarks,
                LastUpdatedBy = model.LastUpdatedBy,
                LastUpdatedDate = model.LastUpdatedTime 
            };
            //Add
            this.context.JobApplications.Add(dbItem);
            //Save the context
            this.context.SaveChanges();

            //Add status history
            this.AddToStatusHistory(new ApplicationStatusItem(){
                JobApplicationId = dbItem.JobApplicationId,
                LastUpdatedBy = model.LastUpdatedBy,
                LastUpdatedTime = model.LastUpdatedTime,

                Remarks = model.Remarks,
                StatusId = MJPConstants.APPLICATION_STATUS_APPLIED
            });

            this.context.SaveChanges();
            }
            return errors.ToArray();
        }

        

        // public void UpdateInterviewDetails(InterviewDetails model)
        // {
        //        //Update the status
        //     var item = (from a in this.context.JobApplications
        //             where a.JobApplicationId == model.JobApplicationId
        //             select a).FirstOrDefault();

        //     var statusId = MJPConstants.APPLICATION_STATUS_INTERVIEW_SCHEDULED;
        //     if(item.InterviewDate != null){
        //         //There is already  an interview schedile. So the status is RESCHEDULED
        //         statusId = MJPConstants.APPLICATION_STATUS_INTERVIEW_RESCHEDULED;
        //     }

        //     //Update the details
        //     this.context.JobApplications.Update(item);
        //     //Add to history
        //     var historyItem = new ApplicationStatus(){
        //         StatusId = statusId,
        //         LastUpdatedBy = model.LastUpdatedBy,
        //         LastUpdatedTime = model.LastUpdatedTime,
        //         Remarks = model.Remarks
        //     };
            
        //     this.AddStatusHistory(historyItem);

        //     this.context.SaveChanges();
        // }

        // private int GetStatusId(JobApplications dbItem, JobApplicationDetails model){
            
        //     int? result = model.ApplicationDetails.ApplicationStatusId;

        //     if(dbItem.InterviewDate == null){
        //         //No interview date set before..
        //         //Check if it is set now
        //         if(model.ApplicationDetails.InterviewDate != null){
        //             //There is an interview date set now. So it is interview scheduled
        //             result = MJPConstants.APPLICATION_STATUS_INTERVIEW_SCHEDULED;
        //         }
        //     }
        //     else {
        //         //There is already an interview date. Check if that differs now..
        //         if(model.ApplicationDetails.InterviewDate != dbItem.InterviewDate){
        //             //There is a date and it date differs. So the status is reschedule
        //              result = MJPConstants.APPLICATION_STATUS_INTERVIEW_RESCHEDULED;
        //         }
        //     }

        //     if(model.ApplicationDetails.AppliedToCompany){
        //         //Check if it is already set. If not set that
        //         if(dbItem.AppliedToCompany == false){
        //             //It was not already set..set that
        //             result = MJPConstants.APPLICATION_STATUS_SENT_TO_COMPANY;
        //         }
        //     }
        //     return result.Value;
        // }


        private void UpdateDBItem(JobApplications dbItem, JobApplicationDetails model){
         
            dbItem.AppliedToCompany = model.ApplicationDetails.AppliedToCompany;
            dbItem.InterviewDate = model.ApplicationDetails.InterviewDate;
            dbItem.InterviewInstrutions = model.ApplicationDetails.InterviewInstructions;
            
            dbItem.ApplicantRemarks = model.ApplicationDetails.ApplicantRemarks;
            dbItem.StaffRemarks = model.ApplicationDetails.StaffRemarks;

            dbItem.InterviewStatusId =model.ApplicationDetails.InterviewStatusId;
            dbItem.LastUpdatedBy = model.LastUpdatedBy;
            dbItem.LastUpdatedDate = model.LastUpdatedTime;
            //Update the item
            this.context.JobApplications.Update(dbItem);
        }


        private void AddStatusHistory(JobApplications dbItem, JobApplicationDetails model, int newStatusId){
            
            if(dbItem.StatusId != newStatusId){

                //Add history only when there is a change in status
                var historyItem = new ApplicationStatusItem(){
                    StatusId = newStatusId,
                    LastUpdatedBy = model.LastUpdatedBy,
                    LastUpdatedTime = model.LastUpdatedTime,
                    Remarks = null,
                    JobApplicationId = model.ApplicationDetails.JobApplicationId
                };
                
                this.AddToStatusHistory(historyItem);
            }
        }

        public void UpdateJobApplicationDetails(JobApplicationDetails model){

            var dbItem = (from a in this.context.JobApplications
                    where a.JobApplicationId == model.JobApplicationId
                    select a).FirstOrDefault();

            //Initially set that from dbItem
            var newStatusId = model.ApplicationDetails.ApplicationStatusId.Value;
            
            this.AddStatusHistory(dbItem,model, newStatusId);
            dbItem.StatusId = newStatusId;
            this.UpdateDBItem(dbItem, model);

            //Update
            this.context.SaveChanges();
        }


        
        private JobApplication ReadJobApplication(DbDataReader reader){
            var result = new JobApplication();
            result.JobApplicationId = reader.ReadNullableInteger("JobApplicationId");
            result.JobPositionId = reader.ReadInteger("JobPositionId");
            result.LastUpdatedTime = reader.ReadDateTime("LastUpdatedTime");

            result.PositionDetails = new JobPosition(){
                JobPositionId = reader.ReadInteger("JobPositionId"),
                Company = new Company(){
                    CompanyId = reader.ReadInteger("CompanyId"),
                    CompanyName = reader.ReadString("CompanyName")
                },
                JobCode = reader.ReadString("JobCode"),
                PostedOn = reader.ReadDateTime("PostedOn"),
                PositionTitle = reader.ReadString("PositionTitle"),
                StatusId = reader.ReadInteger("StatusId"),
                ExpiryDate = reader.ReadDateTime("ExpiryDate"),
                Rank = reader.ReadString("Rank")
            };
            
            //Set the Job Status expiry date
            result.PositionDetails.StatusId = MJPValidationExtensions.GetJobStatus(result.PositionDetails.ExpiryDate, result.PositionDetails.StatusId);
            
            if(result.JobApplicationId != null){
                //Populate the Job Application detials
                result.ApplicationInfo = new JobApplicationInformation();
                result.ApplicationInfo.ApplicationNumber = reader.ReadString("ApplicationNumber");
                result.ApplicationInfo.ApplicantId = reader.ReadInteger("ApplicantId");

                result.ApplicationInfo.AppliedDate = reader.ReadNullableDateTime("AppliedDate");
                result.ApplicationInfo.InterviewDate = reader.ReadNullableDateTime("InterviewDate");
                result.ApplicationInfo.ApplicantName = reader.ReadString("ApplicantName");
                result.ApplicationInfo.ApplicationStatusId = reader.ReadInteger("ApplicationStatusId");
            }
           
           return result;
        }


         public  FilteredResult<JobApplication> FilterJobApplications(ApplicationFilterModel filter,
                            int? applicantId,
                            int currentPage, 
                            int itemsPerPage = 5){

            var result = new FilteredResult<JobApplication>();
            var list = new List<JobApplication>();

            using (var cmd = context.Database.GetDbConnection().CreateCommand())
            {
                cmd.CommandText = "[administration].[FilterJobApplications]";
                cmd.CommandType = System.Data.CommandType.StoredProcedure;

                cmd.Parameters.Add(filter.JobStatus.ConvertToTableParameter("@jobStatus", false));
                 cmd.Parameters.Add(filter.ApplicationStatus.ConvertToTableParameter("@applicationStatus", false));
                cmd.Parameters.Add(filter.Companies.ConvertToTableParameter("@companies", false));
                cmd.AddParameter("@filterText", filter.FilterText);
                cmd.AddParameter("@applicantId", applicantId);

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
                        list.Add(this.ReadJobApplication(reader));
                    }
                });
            }

            result.Items = list;
            return result;
        }

        private ApplicantJobPosition ReadApplicantJobPosition(DbDataReader reader){
            var position = new ApplicantJobPosition();
            position.JobPositionId = reader.ReadInteger("JobPositionId");
            position.JDSummary = reader.ReadString("JDSummary");

            position.StatusId = reader.ReadInteger("StatusId");
            position.PositionTitle = reader.ReadString("PositionTitle");
            position.PostedOn = reader.ReadDateTime("PostedOn");
            position.PostedBy = reader.ReadString("PostedBy");

            position.JobCode = reader.ReadString("JobCode");
            position.ExpiryDate = reader.ReadDateTime("ExpiryDate");
            //position.ApplicantStatusId = reader.ReadNullableInteger("ApplicantStatusId");

            position.MinExperience = reader.ReadDecimal("MinExperience");
            position.MaxExperience = reader.ReadDecimal("MaxExperience");
            position.SalaryRange = reader.ReadString("SalaryRange");
            
            position.Department  = reader.ReadString("DepartmentName");
            position.Rank  = reader.ReadString("RankName");
            
            position.CompanyName = reader.ReadString("CompanyName");
            position.CompanyRating = reader.ReadNullableInteger("CompanyRating");

            //Apllication detials
            position.JobApplicationId = reader.ReadNullableInteger("JobApplicationId");
            position.JobApplicationStatusId = reader.ReadNullableInteger("JobApplicationStatusId");
            position.AppliedDate = reader.ReadNullableDateTime("AppliedDate");
            position.InterviewDate = reader.ReadNullableDateTime("InterviewDate");
            position.InterviewDate = reader.ReadNullableDateTime("InterviewDate");
            position.ApplicationNumber = reader.ReadString("ApplicationNumber");
            position.IsRecommended = reader.ReadBoolean("IsRecommended");
            
            return position;
        }

       public FilteredResult<ApplicantJobPosition> SearchJobPositions(JobSearchFilter filter, int? applicantId, int currentPage, int itemsPerPage = 5)
        {
            var result = new FilteredResult<ApplicantJobPosition>();
            var list = new List<ApplicantJobPosition>();

            using (var cmd = context.Database.GetDbConnection().CreateCommand())
            {
                cmd.CommandText = "[administration].[SearchJobPositions]";
                cmd.CommandType = System.Data.CommandType.StoredProcedure;

                cmd.AddParameter("@filterText", filter.FilterText);
               // cmd.Parameters.Add(filter.Categories.ConvertToTableParameter("@categories", false));
                cmd.AddParameter("@applicantId", applicantId);
                cmd.AddParameter("@rankId", filter.RankId);
                cmd.AddParameter("@currentPage", currentPage);
                cmd.AddParameter("@itemsPerPage", itemsPerPage);
                cmd.AddParameter("@minExperience", filter.MinExperience);
                cmd.AddParameter("@maxExperience", filter.MaxExperience);

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
                        var jp = this.ReadApplicantJobPosition(reader);
                        //jp.CompanyLogo =  reader.ReadString("CompanyLogo");

                        list.Add(jp);
                    }
                });
            }

            result.Items = list;
            return result;
        }


        public FilteredResult<JobApplication> SelectJobsByApplicant(int applicantId,
                int currentPage, 
                int itemsPerPage = 5){
            //Use the same filter method by passing all values
            var filter = new ApplicationFilterModel();
            //filter.Categories = new int[]{ MJPDBExtensions.SELECT_ALL_VALUE };
            filter.Companies = new int[]{  MJPDBExtensions.SELECT_ALL_VALUE };
            filter.FilterText = null;
            filter.JobStatus = new int[]{  MJPDBExtensions.SELECT_ALL_VALUE };
            filter.ApplicationStatus = new int[]{  MJPDBExtensions.SELECT_ALL_VALUE };

            //Set only the applicant ID
            //filter.ApplicantId = applicantId;

            return this.FilterJobApplications(filter,  applicantId, currentPage, itemsPerPage);
        }

    


        public void ApplyForJobPosition(BulkJobPositionApplyModel model){

            var alreadyAppliedIds = (from app in this.context.JobApplications
                    where app.JobPositionId == model.JobPositionId
                    select app.ApplicantId).ToArray();
            
            foreach(var applicantId in model.Applicants){
                //If the user has already applied, leave it
                //if not applied
                if(! alreadyAppliedIds.Contains(applicantId)){
                    //Apply for the job
                    JobPositionApplyModel item = new JobPositionApplyModel(){
                        ApplicantId = applicantId,
                        JobPositionId = model.JobPositionId.Value,
                        Remarks = model.Remarks,
                        LastUpdatedBy = model.LastUpdatedBy,
                        LastUpdatedTime = model.LastUpdatedTime
                    };
                    this.ApplyForJobPosition(item);
                }
            }   
        }

        public ValidationError[] Validate(BulkJobPositionApplyModel model)
        {
            var item = (from jp in this.context.JobPositions
                        where jp.JobPositionId == model.JobPositionId
                        select jp).FirstOrDefault();

            var errors = new List<ValidationError>();
           
            //Validate if expired/cancelled
            bool isExpired = DateTime.Now.Subtract(item.ExpiryDate.Value).Days >0;
            bool isCancelled = (item.StatusId == MJPConstants.JOB_STATUS_CANCELLED);

            if(isExpired){
                errors.Add(new ValidationError(){
                FieldName = "JobCode",
                ErrorMessage = "Cannot apply for a Expired/Cancelled Job"
            });
                
            }
            return errors.ToArray();
        }


    }
}
