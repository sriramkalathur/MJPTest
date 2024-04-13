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
using System.Runtime.CompilerServices;

namespace MJP.Services
{
    public class CompanyService : ICompanyService
    {
         private MJPContext context;

        private ILogger<CompanyService> logger;

        public CompanyService(MJPContext context, ILogger<CompanyService> logger){
            this.context = context;
            this.logger =logger;
        }


        private Company ReadCompany(DbDataReader reader){
            return new Company(){
                CompanyId = reader.ReadInteger("CompanyId"),
                CompanyCode = reader.ReadString("CompanyCode"),
                CompanyName = reader.ReadString("CompanyName"),
                
                Rating = reader.ReadNullableInteger("Rating"),
                DisplayName = reader.ReadString("DisplayName"),

                Address1 = reader.ReadString("Address1"),
                Address2 = reader.ReadString("Address2"),
                City = reader.ReadString("City"),
                //State = reader.ReadString("State"),
                Pincode = reader.ReadString("Pincode"),
                ContactNumber = reader.ReadString("ContactNumber"),

                Email = reader.ReadString("Email"),
                Url = reader.ReadString("Url"),
                IsActive = reader.ReadBoolean("IsActive")
            };
        }

        public FilteredResult<Company> FilterCompanies(CompanyFilterModel filter, int currentPage, 
                            int itemsPerPage = 5){

            var result = new FilteredResult<Company>();
            var list = new List<Company>();

            using (var cmd = context.Database.GetDbConnection().CreateCommand())
            {
                cmd.CommandText = "[administration].[FilterCompanies]";
                cmd.CommandType = System.Data.CommandType.StoredProcedure;

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
                        list.Add(this.ReadCompany(reader));
                    }
                });

                result.Items = list.ToArray();
                return result;
            }
        }





         public FilteredResult<Company> FilterRecommendedCompanies(int currentPage, 
                            int itemsPerPage = 5){

            var result = new FilteredResult<Company>();
            var list = new List<Company>();

            const int MINIMUM_RECOMMENDED_RATING = 3;

            using (var cmd = context.Database.GetDbConnection().CreateCommand())
            {
                cmd.CommandText = "[administration].[FilterRecommendedCompanies]";
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.AddParameter("@currentPage",currentPage);
                cmd.AddParameter("@itemsPerPage",itemsPerPage);
                cmd.AddParameter("@minRating",MINIMUM_RECOMMENDED_RATING);

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
                        var comp =this.ReadCompany(reader);
                        //Recommended company will have the companly Logo
                        //redd that
                        comp.CompanyLogo = reader.ReadString("CompanyLogo");
                        list.Add(comp);
                    }
                });

                result.Items = list.ToArray();
                return result;
            }
        }

        private void UpdateDBItem(Companies dbItem, EditCompany model){
            dbItem.Address1 = model.Address1;
            dbItem.Address2 = model.Address2;
            dbItem.IsActive = model.IsActive;

            dbItem.Rpslnumber = model.RPSLNumber;
            dbItem.IsRecommended = model.IsRecommended;
            dbItem.CompanyProfile = model.CompanyProfile;

            dbItem.Rating =model.Rating;
            dbItem.CompanyName = model.CompanyName;
            dbItem.DisplayName = model.DisplayName;
            dbItem.City = model.City;
            dbItem.Pincode = model.Pincode;
            //dbItem.StateId = model.StateId;

            dbItem.ContactNumber = model.ContactNumber;
            dbItem.Email = model.Email;
            dbItem.Url  = model.Url;
            dbItem.CompanyLogo = model.CompanyLogo;
            dbItem.LastUpdatedBy = model.LastUpdatedBy;
            dbItem.LastUpdatedTime = model.LastUpdatedTime;         
        }
      
        private void UpdateCompanyUser(EditCompany model, bool isNewCompany)  {
            
            //Update the admin user for that comapny
            Users dbItem = null;
            if(! isNewCompany) {
                //select the exisitng item only if it is not newcompany
                dbItem = (from usr in this.context.Users
                            where usr.CompanyId == model.CompanyId
                            select usr).FirstOrDefault();
            }
            else {
                 dbItem = new Users();
            }
               
            dbItem.UserName = model.UserName;
            dbItem.Password = model.Password;
            
            dbItem.Role = Convert.ToInt32(MJPUserRole.CompanyUser);
            dbItem.CompanyId = model.CompanyId;
            dbItem.FirstName = $"CMP{dbItem.CompanyId}";
            dbItem.LastName = "admin";
            dbItem.LastUpdatedBy = model.LastUpdatedBy;
            dbItem.LastUpdatedTime = model.LastUpdatedTime;
            
            //Update/inset
            if(isNewCompany) {
                //New compnay
                this.context.Users.Add(dbItem);
            }
            else {
                //Existing 
                this.context.Users.Update(dbItem);
            }
        }

        public void UpdateCompany(EditCompany model) {

            Companies dbItem;
            bool isNewCompany = (model.CompanyId == 0);

            if(model.CompanyId == 0){
                //New compnay
                dbItem = new Companies();
                 //Update the DBItem
                UpdateDBItem(dbItem, model);
                //Add the item
                this.context.Companies.Add(dbItem);
            }
            else {
                //Fethc the item
                dbItem = (from c in this.context.Companies
                        where c.CompanyId == model.CompanyId
                        select c).FirstOrDefault();
                 //Update the DBItem
                 UpdateDBItem(dbItem, model);
                 //Add the itme
                this.context.Companies.Update(dbItem);
            }
            this.context.SaveChanges();
           
            //Update admin user for the company
            model.CompanyId = dbItem.CompanyId;
            this.UpdateCompanyUser(model, isNewCompany);
            this.context.SaveChanges();
        }


        private bool IsValidRPSLNumber(string  rpslNumber){
            var count = this.context.Rpsl.Count(r => r.Rpslnumber == rpslNumber);
            return (count > 0 );
        }


        public RPSLDetails SelectRPSLDetails(string rpslNumber){
            var model =(from r in this.context.Rpsl
                        where r.Rpslnumber == rpslNumber
                        select new RPSLDetails(){
                            CompanyName = r.CompanyName,
                            Address1 = r.Address1,
                            Address2 = r.Address2,
                            Address3 = r.Address3,
                            Pincode = r.Pincode,
                            City = r.City,
                            //StateId = r.StateId.Value,
                            RPSLNumber = rpslNumber
                        } ).FirstOrDefault();
            return model;
        }


        public ValidationError[] ValidateCompany(EditCompany company){

            List<ValidationError> errors = new List<ValidationError>();
            var dbItem = this.context.Users.FirstOrDefault(usr => usr.UserName == company.UserName);

            if(dbItem != null)
            {   if(dbItem.CompanyId != company.CompanyId){
                    //There is already an user with that name
                    errors.Add(new ValidationError(){
                        ErrorMessage = $"User Name {company.UserName} is already used",
                        FieldName = "UserName"
                    });
                }
            }

            if(! IsValidRPSLNumber(company.RPSLNumber)){
                //Not valid number
                errors.Add(new ValidationError(){
                        ErrorMessage = $"Invalid RPSL Number",
                        FieldName = "RPSLNumber"
                    });
            }
            return errors.ToArray();
        }

        public EditCompany SelectCompany(int companyId) {
            var item = (from c in this.context.Companies
                    join usr in this.context.Users on c.CompanyId equals usr.CompanyId
                    where c.CompanyId == companyId
                    select new EditCompany(){
                        Address1= c.Address1,
                        Address2 = c.Address2,
                        City = c.City,
                        Pincode = c.Pincode,
                        Rating = c.Rating,

                        IsRecommended = c.IsRecommended.Value,
                        RPSLNumber = c.Rpslnumber,
                        CompanyProfile = c.CompanyProfile,
                        
                        IsActive = c.IsActive.Value,
                        CompanyId = c.CompanyId,
                        ContactNumber = c.ContactNumber,
                        Email =c.Email,
                        StateId = c.StateId.Value,

                        UserName = usr.UserName,
                        Password = usr.Password,

                        DisplayName = c.DisplayName,
                        CompanyCode = c.CompanyCode,
                        CompanyName = c.CompanyName,
                        CompanyLogo = c.CompanyLogo
                    }).FirstOrDefault();
                return item;
        }
    }
}