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
using Microsoft.EntityFrameworkCore.Scaffolding;
using Renci.SshNet.Security;
using System.Reflection.Metadata;


namespace MJP.Services
{
    public class ApplicantService : IApplicantService
    {
        private MJPContext context;

        public ApplicantService(MJPContext context)
        {
            this.context = context;
        }

        #region "Personal & Application Info"

        private Applicants SelectApplicant(int applicantId){
            var user = (from item in this.context.Applicants
                        where item.ApplicantId == applicantId
                        select item).FirstOrDefault();
            return user;

        }

        public ApplicantPersonalInfo SelectPersonalInfo(int applicantId)
        {
            //Select the basic details from user
            var user = SelectApplicant(applicantId);
            var result = new ApplicantPersonalInfo();
            
            result.ApplicantId = user.ApplicantId;
            result.FirstName = user.FirstName;
            result.LastName = user.LastName;
            result.DisplayName = user.DisplayName;
            result.Email = user.Email;
            result.MobileNumber = user.MobileNumber;
            result.StatusId = user.StatusId;
            result.AvailabilityStatusId = user.AvailabilityStatusId;
           
            //result.IsPersonalInfoCompleted = user.PersonalInfoCompleted.Value;
            //result.s
            
            ///Popualte lastUpdated. If there is an update in the personal details, it 
            //will be overwritten
            result.LastUpdatedBy = user.LastUpdatedBy;
            result.LastUpdatedTime = user.LastUpdatedTime;
    
            //Select the other personal details from other table
            var dbModel = (from item in this.context.ApplicantPersonalDetails
                           where item.ApplicantId == applicantId
                           select item).FirstOrDefault();
            

            if(dbModel != null)
            {   
                var lovItems = this.context.Mjplovitems;

                if(dbModel.Nationality != null){
                    result.Nationality = (from lv in lovItems
                                            where lv.LovitemId == dbModel.Nationality
                                            select lv.DisplayText).FirstOrDefault();
                }

                if(dbModel.MaritalStatus != null){
                    result.MaritalStatus = (from lv in lovItems
                                            where lv.LovitemId == dbModel.MaritalStatus
                                            select lv.DisplayText).FirstOrDefault();
                }

                 if(dbModel.RankId != null){
                    //slect only the rank & category
                    var tmp = (from rk in this.context.JobPositionRanks
                            join ct in this.context.Departments on rk.DepartmentId.Value equals ct.DepartmentId
                                where rk.JobPositionRankId == dbModel.RankId
                                select new {
                                    ct.DepartmentName,
                                    rk.RankName,
                                    
                                }).FirstOrDefault();
                    result.RankId= dbModel.RankId;

                    result.Department = tmp.DepartmentName;
                    result.DepartmentId = dbModel.DepartmentId;
                    result.Rank = tmp.RankName;
                }

                result.CategoryId = dbModel.CategoryId;
                result.VesselTypeId = dbModel.VesselTypeId;
                    
                //Calcualte age
                result.Age = (int)(DateTime.Now.Subtract(dbModel.DateOfBirth.Value).TotalDays/365);

                result.ApplicantPersonalInfoId = dbModel.ApplicantPersonalDetailId;
                result.DateOfBirth = dbModel.DateOfBirth;
                result.FatherName = dbModel.FatherName;
          
                result.EducationalQualification = dbModel.EducationalQualification;
                result.TechnicalQualification = dbModel.TechnicalQualification;
                result.ApplicantPersonalInfoId = dbModel.ApplicantPersonalDetailId;
                result.LanguagesKnown = dbModel.LanguagesKnown;
                result.MaritalStatusId = dbModel.MaritalStatus;
                result.NationalityId = dbModel.Nationality;

                result.CurrentAddress = new Address()
                {
                    Address1 = dbModel.CurrentAddress1,
                    Address2 = dbModel.CurrentAddress2,
                    City = dbModel.CurrentCity,
                    Pincode = dbModel.CurrentPincode,
                    //StateId = dbModel.CurrentStateId
                };

                result.PermanentAddressSameAsCurrent = dbModel.PermanentAddressSameAsCurrent.Value;
                result.AlternateContactNumber = dbModel.AlternateContactNumber;
                result.AlternateEmail = dbModel.AlternateEmail;

                result.AnnualSalaryCurrencyId = dbModel.AnnualSalaryCurrencyId;
                result.AnnualSalary = dbModel.AnnualSalary;

                result.ExpectedSalary = dbModel.ExpectedSalary;
                result.ExpectedSalaryCurrencyId = dbModel.ExpectedSalaryCurrencyId;
                
                result.RankId = dbModel.RankId;
                result.ExperienceYrs = dbModel.ExperienceYrs;
                result.ExperienceMonths = dbModel.ExperienceMonths??0;

                if (!result.PermanentAddressSameAsCurrent)
                {
                    //If the permanent is same as current, don't populate that
                    result.PermanentAddress = new Address()
                    {
                        Address1 = dbModel.PermanantAddress1,
                        Address2 = dbModel.PermanentAddress2,
                        City = dbModel.PermanentCity,
                        Pincode = dbModel.PermanentPincode,
                        //StateId = dbModel.PermanentStateId
                    };
                }

                result.LastUpdatedBy = dbModel.LastUpdatedBy;
                result.LastUpdatedTime = dbModel.LastUpdatedTime;
            }

            return result;
        }


        private void PopulateDBValues(ApplicantPersonalDetails dbItem,
               ApplicantPersonalInfo model){
            
            dbItem.LanguagesKnown = model.LanguagesKnown;
            dbItem.MaritalStatus = model.MaritalStatusId;
            dbItem.Nationality = model.NationalityId;
            dbItem.DateOfBirth = model.DateOfBirth;
            dbItem.FatherName = model.FatherName;
            dbItem.ExperienceYrs = model.ExperienceYrs;
            dbItem.ExperienceMonths = model.ExperienceMonths;

            dbItem.TechnicalQualification = model.TechnicalQualification;
            dbItem.EducationalQualification = model.EducationalQualification;
            
            dbItem.AnnualSalary = model.AnnualSalary;
            dbItem.AnnualSalaryCurrencyId = model.AnnualSalaryCurrencyId;
            dbItem.ExpectedSalary = model.ExpectedSalary;
            dbItem.ExpectedSalaryCurrencyId = model.ExpectedSalaryCurrencyId;

            dbItem.CategoryId = model.CategoryId;
            dbItem.VesselTypeId = model.VesselTypeId;
            
            dbItem.DepartmentId = model.DepartmentId;
            //dbItem.SalaryCurrencyId = model.SalaryCurrencyId;
            dbItem.RankId = model.RankId;

            dbItem.ExperienceYrs = model.ExperienceYrs;
            dbItem.ExperienceMonths = model.ExperienceMonths;
            dbItem.AlternateContactNumber = model.AlternateContactNumber;
            dbItem.AlternateEmail = model.AlternateEmail;
          
            dbItem.CurrentAddress1 = model.CurrentAddress.Address1;
            dbItem.CurrentAddress2 = model.CurrentAddress.Address2;
            dbItem.CurrentCity = model.CurrentAddress.City;
            dbItem.CurrentPincode = model.CurrentAddress.Pincode;
            //dbItem.CurrentStateId = model.CurrentAddress.StateId;

            dbItem.PermanentAddressSameAsCurrent = model.PermanentAddressSameAsCurrent;

            if(!model.PermanentAddressSameAsCurrent) {
                //If permanent and current addres are same, no need to populate permanent adderess
                dbItem.PermanantAddress1 = model.PermanentAddress.Address1;
                dbItem.PermanentAddress2 = model.PermanentAddress.Address2;
                dbItem.PermanentCity = model.PermanentAddress.City;
                dbItem.PermanentPincode = model.PermanentAddress.Pincode;
                //dbItem.PermanentStateId = model.PermanentAddress.StateId;
            }

            dbItem.LastUpdatedBy = model.LastUpdatedBy;
            dbItem.LastUpdatedTime = model.LastUpdatedTime;
        }


        public ApplicantInfo SelectApplicantInfo(int applicantId){
            //Select basic Info
            var user = SelectApplicant(applicantId);

            var result = new ApplicantInfo(){
                ApplicantId = user.ApplicantId,
                FirstName = user.FirstName,
                LastName = user.LastName,
                LastUpdatedBy = user.LastUpdatedBy,
                LastUpdatedTime = user.LastUpdatedTime,
                DisplayName= user.DisplayName,
                Email = user.Email,
                MobileNumber = user.MobileNumber,               
            };
            
     
            return result;
        }


        public void UpdatePersonalInformation(ApplicantPersonalInfo model)
        {
            //Find the applicant first
            var applicant = SelectApplicant(model.ApplicantId.Value);
            //Update the basic detials
            //Don't update email. Email should not be changed
            applicant.ApplicantId = model.ApplicantId.Value;
            applicant.FirstName = model.FirstName;
            applicant.LastName = model.LastName;
            applicant.LastUpdatedBy = model.LastUpdatedBy;
            applicant.LastUpdatedTime = model.LastUpdatedTime;
            applicant.MobileNumber = model.MobileNumber;
            
            //Update the personalInforCmpleted as the user has updated the details
            applicant.PersonalInfoCompleted = true;
            applicant.StatusId = model.StatusId;
            applicant.AvailabilityStatusId = model.AvailabilityStatusId;
            
            //Add to update
            this.context.Applicants.Update(applicant);

            var dbItem = new ApplicantPersonalDetails();

            //Update dbitem from model
            if (model.ApplicantPersonalInfoId != 0)
            {
                //There is existing record. Select that and update against that
                //select the exising detials
                dbItem = (from item in this.context.ApplicantPersonalDetails
                          where item.ApplicantId == model.ApplicantId
                          select item).FirstOrDefault();
            }

            PopulateDBValues(dbItem, model);

            if(model.ApplicantPersonalInfoId == 0) {
                //New record. Add
                dbItem.ApplicantId = model.ApplicantId;
                this.context.ApplicantPersonalDetails.Add(dbItem);
            }
            else {
                //Exisitng update
                this.context.ApplicantPersonalDetails.Update(dbItem);
            }
            //Save the context
            this.context.SaveChanges();
            //Update experience
            //this.context.UpdateExperience(model.ApplicantId.Value);
        }

        #endregion

        #region "Application Documents"

        public ApplicantDocument[] SelectApplicantDocuments(int applicantId) {

            var list = (from doc in this.context.ApplicantDocuments
                        join dt in this.context.Mjplovitems on doc.DocumentTypeId equals dt.LovitemId
                        where doc.ApplicantId == applicantId
                          && dt.Lovgroup == MJPConstants.LOV_GROUP_APPLICANT_DOCUMENT
                        select new ApplicantDocument(){
                            ApplicantDocumentId = doc.ApplicantDocumentId,
                            ApplicantId = doc.ApplicantId.Value,

                            DocumentName = dt.DisplayText,
                            DocumentNumber = doc.DocumentNumber,
                            DocumentTypeId = doc.DocumentTypeId,
                        
                            IssueDate = doc.IssueDate,
                            ExpiryDate = doc.ExpiryDate,
                            PlaceOfIssue = doc.IssuePlace,
                            Grade = doc.Grade
                        }).ToArray();
            return list;
        }


        public void UpdateApplicationDocument(ApplicantDocument model) {

            var dbItem = (from doc in this.context.ApplicantDocuments
                        where doc.ApplicantDocumentId == model.ApplicantDocumentId
                        select doc).FirstOrDefault();
                        
             if(model.ApplicantDocumentId == 0) {
                //New item.. Update only applicantId
                dbItem = new ApplicantDocuments();
                dbItem.ApplicantId = model.ApplicantId;
            }

            dbItem.DocumentNumber = model.DocumentNumber;
            dbItem.DocumentTypeId = model.DocumentTypeId;
            dbItem.IssueDate = model.IssueDate;

            dbItem.IssuePlace = model.PlaceOfIssue;
            dbItem.ExpiryDate = model.ExpiryDate;
            dbItem.Grade = model.Grade;
            
            dbItem.LastUpdatedBy = model.LastUpdatedBy;
            dbItem.LastUpdatedTime = model.LastUpdatedTime;

            if(dbItem.ApplicantDocumentId == 0) {
                //New item.. Update only applicantId
                this.context.ApplicantDocuments.Add(dbItem);
            }
            else {
                //Update
                this.context.ApplicantDocuments.Update(dbItem);
            }
            this.context.SaveChanges();
        }



        private void ValidateExpiryDate(ApplicantDocument model, List<ValidationError> errors){
            //Yellowfever & Indos Number doesn't have expiry Date

            const string DOCUMENT_TYPE_YELLOW_FEVER = "YELLOW FEVER";
            const string DOCUMENT_TYPE_INDOS_NO = "INDOS NO";

            var docType = (from dt in this.context.Mjplovitems
                        where dt.LovitemId == model.DocumentTypeId
                        select dt).FirstOrDefault();

            //For yellowdever/indos, required date is not required
            var isExpiryDateRequired = (docType.DisplayText != DOCUMENT_TYPE_INDOS_NO &&
                docType.DisplayText != DOCUMENT_TYPE_YELLOW_FEVER);

            if(isExpiryDateRequired && model.ExpiryDate == null) {
                //Expiry date is mandatory and not provided
                errors.Add(new ValidationError(){
                    ErrorMessage = "Expiry date is required",
                    FieldName = "ExpiryDate"
                });
            }

            if(model.ExpiryDate != null){
                //Validate expirydate
                errors.ValidateDateRange(model.IssueDate.Value, model.ExpiryDate.Value, "ExpiryDate" ,"Expiry Date should be after Issue date");
            }
        }


        public ValidationError[] ValidateApplicantDocument(ApplicantDocument model)
        {
            List<ValidationError> errors = new List<ValidationError>();
            //Validate if the documentType already exist
            int count = 0;

            // Jul 07 2024: As per the chat from Densingh, user can have different 
            // docunment with the same document type. So that validation is removed
            /* if(model.ApplicantDocumentId == 0) {
                //New item. Check if document with the same type exists
                count = this.context.ApplicantDocuments.Count((doc) => doc.ApplicantId == model.ApplicantId
                    && doc.DocumentTypeId == model.DocumentTypeId);
            }
            else {
                //Existing item. Check if there is another dociment of the same type
                //in a different docId
                count = this.context.ApplicantDocuments.Count((doc) => doc.ApplicantId == model.ApplicantId
                    && doc.DocumentTypeId == model.DocumentTypeId &&
                    doc.ApplicantDocumentId != model.ApplicantDocumentId);
            } */
            if(count > 0){
                //There is a duplicate item
                errors.Add(new ValidationError(){
                    ErrorMessage = "Document type already selected",
                    FieldName = "DocumentTypeId"
                });
            }

            if(model.DocumentTypeId != null){
                //Validate ExpiryDate
                ValidateExpiryDate(model, errors);
            }

            //Validate dates
            errors.ValidateIfFutureDate(model.IssueDate, "IssueDate" ,"Issue date cannot be in future");
            
            return errors.ToArray();
        }

        public void DeleteApplicantDocument(int documentId)
        {
            var dbItem =(from d in this.context.ApplicantDocuments
                    where d.ApplicantDocumentId == documentId
                    select d).FirstOrDefault();
            this.context.ApplicantDocuments.Remove(dbItem);
            this.context.SaveChanges();
        }

        #endregion

        #region "Experience"


        public SEAExperience[] SelectExperiences(int applicantId) {

            var list = (from exp in this.context.Seaexperience
                        where exp.ApplicantId == applicantId
                      
                        select new SEAExperience(){
                            SEAExperienceId = exp.SeaexperienceId,
                            ApplicantId = exp.ApplicantId.Value,

                            CompanyName = exp.CompanyName,
                            VesselName = exp.VesselName,
                            Type = exp.Type,
                            GRT = exp.Grt,
                            BHP = exp.Bhp,
                            Rank = exp.Rank,

                            FromDate = exp.FromDate,
                            ToDate = exp.ToDate
                        }).ToArray();
            return list;
        }

        public void DeleteExperience(int experienceId){
            var dbItem =(from d in this.context.Seaexperience
                    where d.SeaexperienceId == experienceId
                    select d).FirstOrDefault();

            this.context.Seaexperience.Remove(dbItem);
            this.context.SaveChanges();
        }


        public void UpdateExperience(SEAExperience model) {

            var dbItem = (from doc in this.context.Seaexperience
                        where doc.SeaexperienceId == model.SEAExperienceId
                        select doc).FirstOrDefault();
                        
             if(model.SEAExperienceId == 0) {
                //New item.. Update only applicantId
                dbItem = new Seaexperience();
                dbItem.ApplicantId = model.ApplicantId;
            }

            dbItem.CompanyName = model.CompanyName;
            dbItem.VesselName = model.VesselName;
            dbItem.Type = model.Type;
            dbItem.Grt = model.GRT;
            
            dbItem.Bhp = model.BHP;
            dbItem.Rank = model.Rank;
            dbItem.FromDate = model.FromDate;
            dbItem.ToDate = model.ToDate;

            dbItem.LastUpdatedBy = model.LastUpdatedBy;
            dbItem.LastUpdatedTime = model.LastUpdatedTime;

            if(dbItem.SeaexperienceId == 0) {
                //New item.. Update only applicantId
                this.context.Seaexperience.Add(dbItem);
            }
            else {
                //Update
                this.context.Seaexperience.Update(dbItem);
            }
            this.context.SaveChanges();
            //Update experience
            //this.context.UpdateExperience(model.ApplicantId);
        }

        public FilteredResult<Applicant> FilterApplicants(ApplicantFilters filter, int currentPage, int itemsPerPage = 5)
        {
            var result = new FilteredResult<Applicant>();
            var list = new List<Applicant>();

            using (var cmd = context.Database.GetDbConnection().CreateCommand())
            {
                cmd.CommandText = "[administration].[FilterApplicants]";
                cmd.CommandType = System.Data.CommandType.StoredProcedure;

                cmd.AddParameter("@searchText", filter.SearchText);
                cmd.AddParameter("@statusId", filter.StatusId);

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
                        list.Add(new Applicant(){
                            ApplicantId = reader.ReadInteger("ApplicantId"),
                            ApplicantName = reader.ReadString("ApplicantName"),
                            Rank = reader.ReadString("Rank"),
                            Category = reader.ReadString("Category"),

                            StatusId = reader.ReadInteger("StatusId"),
                            Email = reader.ReadString("Email"),
                            MobileNumber = reader.ReadString("MobileNumber"),
                            Experience = reader.ReadNullableDecimal("Experience"),
                            AvailabilityStatusId = reader.ReadInteger("AvailabilityStatusId")
                        });
                    }
                });
            }

            result.Items = list;
            return result;
        }


        #endregion


        public FilteredResult<JobPositionProfile> FilterProfiles(ProfileFilters filter, int currentPage, int itemsPerPage = 5)
        {
            var result = new FilteredResult<JobPositionProfile>();
            var list = new List<JobPositionProfile>();

            using (var cmd = context.Database.GetDbConnection().CreateCommand())
            {
                cmd.CommandText = "[administration].[FilterProfiles]";
                cmd.CommandType = System.Data.CommandType.StoredProcedure;

                cmd.AddParameter("@searchText", filter.SearchText);
                cmd.AddParameter("@jobPositionId", filter.JobPositionId);
                cmd.AddParameter("@rankId", filter.RankId);
                cmd.AddParameter("@availabilityStatus", filter.AvailabilityStatusId);
                cmd.AddParameter("@salaryFrom", filter.SalaryFrom);
                cmd.AddParameter("@salaryTo", filter.SalaryTo);

                cmd.AddParameter("@experienceFrom",filter.ExperienceFrom);
                cmd.AddParameter("@experienceTo",filter.ExperienceTo);

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
                        list.Add(new JobPositionProfile(){
                            ApplicantId = reader.ReadInteger("ApplicantId"),
                            ApplicantName = reader.ReadString("ApplicantName"),
                            Rank = reader.ReadString("Rank"),

                            Salary = reader.ReadDouble("Salary"),
                            Email = reader.ReadString("Email"),
                            MobileNumber = reader.ReadString("MobileNumber"),
                            Experience = reader.ReadNullableDecimal("Experience"),

                            JobApplicationId = reader.ReadNullableInteger("JobApplicationId"),
                            ApplicationNumber = reader.ReadString("ApplicantNumber"),
                            ApplicationStatusId = reader.ReadNullableInteger("ApplicationStatusId"),
                            AvailabilityStatus = reader.ReadInteger("AvailabilityStatusId")
                        });
                    }
                });
            }

            result.Items = list;
            return result;
        }


       


        public ValidationError[] ValidateExperience(SEAExperience model)
        {
            var errors = new List<ValidationError>();
            //Validate dates
            errors.ValidateIfFutureDate(model.FromDate, "FromDate" ,"From date cannot be in future");
            if(model.ToDate != null){
                errors.ValidateDateRange(model.FromDate.Value, model.ToDate.Value, "ToDate" ,"To Date should be after From date");
            }

            const string DEPARTMENT_ENGINE = "ENGINE";

           
            var dpt = (from ap in this.context.ApplicantPersonalDetails
                        join rk in this.context.JobPositionRanks on ap.RankId equals rk.JobPositionRankId
                        join dp in this.context.Departments on rk.DepartmentId equals dp.DepartmentId
                        where ap.ApplicantId == model.ApplicantId
                        select dp).FirstOrDefault();

            if(dpt != null){
                //BHP is required only for Dept ENGINE
                if(string.Compare(dpt.DepartmentName, DEPARTMENT_ENGINE, true) == 0){

                    if(string.IsNullOrEmpty(model.BHP)){
                        errors.Add(new ValidationError(){
                            ErrorMessage = "BHP is required",
                            FieldName = "BHP"
                        });
                    }
                }
            }

            return errors.ToArray();
        }


        public void SubmitProfile(int applicantId, string updatedBy){

            var dbItem = (from a in this.context.Applicants
                        where a.ApplicantId == applicantId
                        select a).FirstOrDefault();
            //Update only status
            dbItem.StatusId = MJPConstants.APPLICANT_STATUS_PROFILE_SUBMITTED;
            dbItem.LastUpdatedBy = updatedBy;

            this.context.SaveChanges();
        }
    }
}