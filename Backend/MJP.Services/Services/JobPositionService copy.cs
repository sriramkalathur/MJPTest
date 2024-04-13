// using System;
// using MJP.Entities.Contracts;
// using MJP.Entities.Models;

// using System.Linq;
// using System.Collections;
// using System.Collections.Generic;


// using Microsoft.EntityFrameworkCore;
// using MJP.Infrastructure;
// using MJP.Services.Extensions;
// using System.Data.Common;
// using MJP.Entities;

// namespace MJP.Services
// {
//     public class JobPositionService : IJobPositionService
//     {

//         private MJPContext context;


//         private IJobFeatureService jobFeatureService;

//         private IJobRequirementService requirementService;


//         public JobPositionService(MJPContext context, IJobFeatureService jobFeatureService,
//                IJobRequirementService requirementService){
//             this.context = context;
//             this.jobFeatureService =jobFeatureService;
//             this.requirementService = requirementService;
//         }

//         private JobApplicationDetails ReadApplicationDetails(DbDataReader reader){
//             return new JobApplicationDetails(){
//                 JobApplicationId = reader.ReadInteger("JobApplicationId"),
//                 ApplicantUserName = reader.ReadString("ApplicantName"),
//                 ApplicantId = reader.ReadInteger("ApplicantId"),
//                 ApplicantName = reader.ReadString("ApplicantName"),

//                 AppliedDate = reader.ReadDateTime("AppliedDate"),
//                 InterviewDate = reader.ReadNullableDateTime("InterviewDate"),
//                 ApplicationStatusId = reader.ReadInteger("ApplicationStatusId"),
//                 StaffRemarks = reader.ReadString("StaffRemarks"),
//                 ApplicantRemarks = reader.ReadString("ApplicantRemarks"),
//             };
//         }


//         private void PopulateJobPositionFields(DbDataReader reader, JobPosition position) {
            
//             var applicantStatusId = reader.ReadNullableInteger("ApplicationStatusId");
//             position.JobPositionId = reader.ReadInteger("JobPositionId");
//             position.JDSummary = reader.ReadString("JDSummary");

//             position.StatusId = reader.ReadInteger("StatusId");
//             position.PositionTitle = reader.ReadString("PositionTitle");
//             position.PostedOn = reader.ReadDateTime("PostedOn");
//             position.JobCode = reader.ReadString("JobCode");
//             //position.ApplicantStatusId = reader.ReadNullableInteger("ApplicantStatusId");

//             position.NumberOfPositions = reader.ReadNullableInteger("NumberOfpositions");     
//            // position.LastDateOfApplication = reader.ReadNullableDateTime("LastDateOfApplication");      
//             position.LastUpdatedTime = reader.ReadNullableDateTime("LastUpdatedTime");          
//             position.Category  = reader.ReadString("CategoryName");
//             position.Grade  = reader.ReadString("GradeName");
            
//             position.CompanyId = reader.ReadInteger("CompanyId");
//             position.Company = new Company(){
//                 CompanyCode = reader.ReadString("CompanyCode"),
//                 Url = reader.ReadString("CompanyURL"),
//                 DisplayName = reader.ReadString("CompanyDisplayName"),
//                 Rating = reader.ReadNullableInteger("CompanyRating")
//             };

//             if(applicantStatusId != null){
//                 //There is applicant status. So LOAD applicant detials
//                 position.ApplicationDetails = ReadApplicationDetails(reader);
//             }

//         }


//          public IEnumerable<JobPositionFilterItem> FilterJobPositions(JobPositionFilterModel filter){
 
//             var list = new List<JobPositionFilterItem>();
        
//             using (var cmd = context.Database.GetDbConnection().CreateCommand())
//             {
//                 cmd.CommandText = "[administration].[FilterJobPositions]";
//                 cmd.CommandType = System.Data.CommandType.StoredProcedure;

//                 cmd.Parameters.Add(filter.Status.ConvertToTableParameter("@status", false));
//                 cmd.AddParameter("@filterText", filter.SearchText);
//                 cmd.Parameters.Add(filter.Companies.ConvertToTableParameter("@companies", false));
//                 cmd.Parameters.Add(filter.Companies.ConvertToTableParameter("@categories", false));
//                 cmd.AddParameter("@applicantId",filter.ApplicantId);

//                 cmd.Connection.Open();
//                //var reader = cmd.ExecuteReader();
//                 cmd.ExecuteDBReader((reader) =>
//                 {    //First result set contains the pagiantion data and the next contains the filtered d
//                     //data
//                     while (reader.Read())
//                     {
//                         var position = new JobPositionFilterItem();
//                         position.JobPositionId = reader.ReadInteger("JobPositionId");
//                          position.JDSummary = reader.ReadString("JDSummary");

//                         position.StatusId = reader.ReadInteger("StatusId");
//                         position.PositionTitle = reader.ReadString("PositionTitle");
//                         position.PostedOn = reader.ReadDateTime("PostedOn");
//                         position.JobCode = reader.ReadString("JobCode");
//                         //position.ApplicantStatusId = reader.ReadNullableInteger("ApplicantStatusId");

//                         position.Category  = reader.ReadString("CategoryName");
//                         position.Grade  = reader.ReadString("GradeName");
                        
//                         position.CompanyName = reader.ReadString("CompanyName");
//                         position.CompanyRating = reader.ReadNullableInteger("CompanyRating");

//                         //Apllication detials
//                         position.JobApplicationId = reader.ReadNullableInteger("JobApplicationId");
//                         position.JobApplicationStatusId = reader.ReadNullableInteger("JobApplicationStatusId");
//                         position.AppliedDate = reader.ReadNullableDateTime("AppliedDate");
//                         position.InterviewDate = reader.ReadNullableDateTime("InterviewDate");
                        
//                     }
//                 });
//             }

//             return list;
//         }


//         private JobPositionDetails SelectJobDetails(int jobPositionId){
//             var job = (from jp in this.context.JobPositions
//                       join jpc in this.context.JobPositionCategories on jp.CategoryId equals jpc.JobPositionCatgoryId
//                       join jpg in this.context.JobPositionGrades on jp.GradeId equals jpg.JobPositionGradeId
//                       join c in this.context.Companies on jp.CompanyId equals c.CompanyId
//                       join lc in this.context.Mjplovitems on jp.LocationTypeId equals lc.LovitemId
//                       where jp.JobPositionId ==jobPositionId
//                       select new JobPositionDetails(){
//                         JobPositionId = jp.JobPositionId,
//                         JobCode = jp.JobCode,
//                         StatusId = jp.StatusId.Value,
//                         PositionTitle = jp.PositionTitle,


//                         NumberOfPositions = jp.NumberOfPositions,
//                         LastDateOfApplication = jp.LastDateOfApplication,
                       
//                         LocationTypeId = jp.LocationTypeId.Value,
//                         LocationType = lc.DisplayText,

//                         JDSummary = jp.Jdsummary,
//                         Category = jpc.CategoryName,
//                         CategoryId = jpc.JobPositionCatgoryId,

//                         Grade = jpg.GradeName,
//                         GradeId = jpg.JobPositionGradeId,
                     
//                         Company = new Company(){
//                             CompanyCode = c.CompanyCode,
//                             CompanyId = c.CompanyId,
//                             DisplayName = c.DisplayName,

//                             CompanyName = c.CompanyName,
//                             Rating = c.Rating,
//                             Url = c.Url,

//                             Address1 = c.Address1,
//                             Address2 = c.Address2,
//                             City = c.City,
//                             ContactNumber = c.ContactNumber,
//                             EMail = c.Email,
//                         }
//                       }).FirstOrDefault();
//             return job;
//         }
        


//         private JobApplicationDetails SelectJobApplicationDetails(int jobApplicationId){
//             var result = (from ap in this.context.JobApplications
//                         join a in this.context.Applicants on ap.ApplicantId equals a.ApplicantId
//                         where ap.JobApplicationId == jobApplicationId
//                             select new  JobApplicationDetails()
//                             {
//                                 ApplicantId = a.ApplicantId,
//                                 JobApplicationId = ap.JobApplicationId,
//                                 ApplicantName = a.DisplayName,
//                                 JobApplicationCode = ap.JobApplicationCode,

//                                 ApplicantRemarks= ap.ApplicantRemarks,
//                                 StaffRemarks = ap.StaffRemarks,

//                                 InterviewDate = ap.InterviewDate,
//                                 InterviewInstructions = ap.InterviewInstrutions,
//                                 InterviewURL = ap.InterviewUrl,

//                                 ApplicationStatusId = ap.StatusId,
//                                 ApplicantUserName  = a.UserName,

//                                 AppliedDate = ap.AppliedDate
//                             }).FirstOrDefault();
//             return result; 
//         }   


//         private IEnumerable<StatusHistoryItem> SelectStatusHistory(int jobApplicationId){
//             var result =(from s in this.context.ApplicationStatusHistory
//                         where s.JobApplicationId == jobApplicationId
//                         select new StatusHistoryItem(){
//                             JobApplicationId = s.JobApplicationId.Value,
//                             Remarks = s.Remarks,
//                             StatusDate = s.StatusDate.Value,
//                             StatusId = s.StatusId.Value,
//                             UpdatedBy = s.LastUpdatedBy,
//                             LastUpdatedBy = s.LastUpdatedBy
//                         });
//             return result;
//         }

//         public JobPositionDetails SelectJobPositionDetails(int jobPositionId, int? applicationId){
           
//             //Select the JOB details
//             var result = this.SelectJobDetails(jobPositionId);

//             if(applicationId != null){
//                 //Fetch the applicant specific detials
//                   result.ApplicationDetails = SelectJobApplicationDetails(applicationId.Value);

//             }
          
//             //Populate features  requirements
//             result.Features = this.jobFeatureService.SelectJobFeatures(result.JobPositionId).ToArray();
//             result.Requirements = this.requirementService.SelectJobRequirements(result.JobPositionId).ToArray();
//             result.StatusHistory = this.SelectStatusHistory(result.JobPositionId).ToArray();
//             return result;
            
//         }


//         private void AddStatusHistory(ApplicationStatus item){

//             var newItem = new ApplicationStatusHistory();
//             newItem.JobApplicationId = item.JobApplicationId;
//             newItem.StatusDate = item.LastUpdatedTime;
//             newItem.StatusId = item.StatusId;
//             newItem.LastUpdatedBy = item.LastUpdatedBy;
//             newItem.LastUpdatedTime = item.LastUpdatedTime;
//             newItem.Remarks = item.Remarks;

//             this.context.ApplicationStatusHistory.Add(newItem);
//         }

//         public void UpdateApplicationStatus(ApplicationStatus status){

//             //Update the status
//             var item = (from a in this.context.JobApplications
//                     where a.JobApplicationId == status.JobApplicationId
//                     select a).FirstOrDefault();

//             item.LastUpdatedBy = status.LastUpdatedBy;
//             item.LastUpdatedDate = status.LastUpdatedTime;
//             item.StatusId = status.StatusId;

       
//             this.context.JobApplications.Update(item);
//             //Add to history
//             this.AddStatusHistory(status);

//             this.context.SaveChanges();
//         }



//         public void ScheduleInterview(InterviewDetails model)
//         {
//                //Update the status
//             var item = (from a in this.context.JobApplications
//                     where a.JobApplicationId == model.JobApplicationId
//                     select a).FirstOrDefault();

//             var statusId = MJPConstants.APPLICATION_STATUS_INTERVIEW_SCHEDULED;
//             if(item.InterviewDate != null){
//                 //There is already  an interview schedile. So the status is RESCHEDULED
//                 statusId = MJPConstants.APPLICATION_STATUS_INTERVIEW_RESCHEDULED;
//             }

//             //Update the details
//             this.context.JobApplications.Update(item);
//             //Add to history
//             var historyItem = new ApplicationStatus(){
//                 StatusId = statusId,
//                 LastUpdatedBy = model.LastUpdatedBy,
//                 LastUpdatedTime = model.LastUpdatedTime,
//                 Remarks = model.Remarks
//             };
            
//             this.AddStatusHistory(historyItem);

//             this.context.SaveChanges();
//         }
//     }
// }
