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
using System.Reflection;

namespace MJP.Services
{
    public class MasterService : IMasterService
    {
      
        private MJPContext context;

        public MasterService(MJPContext context){
            this.context = context;
        }

      

        public IEnumerable<Company> SelectCompanies() 
        {
            return (from c in this.context.Companies
                        select new Company(){
                            CompanyCode = c.CompanyCode,
                            CompanyId = c.CompanyId,
                            DisplayName = c.DisplayName,
                            Rating = c.Rating
                        }).ToArray();
        }

        public IEnumerable<JobPositionCategory> SelectJobpositionCategories() {
             return (from c in this.context.JobPositionCategories
                        select new JobPositionCategory(){
                           CategoryId = c.JobPositionCategoryId,
                           CategoryName = c.CategoryName
                        }).ToArray();
        }


        public IEnumerable<JobPositionRank> SelectAllRanks() {
             return (from c in this.context.JobPositionRanks
                        select new JobPositionRank(){
                           RankId = c.JobPositionRankId,
                           DepartmentId = c.DepartmentId.Value,
                           RankName = c.RankName,
                           //CategoryId = c.CategoryId.Value
                        }).ToArray();
        }


        private ListItem[] SelectAllStatus(){

            ListItem[] list = {
              new ListItem() { ItemId =  MJPConstants.JOB_STATUS_OPEN , DisplayText= "Open"},
              new ListItem() { ItemId =  MJPConstants.JOB_STATUS_CANCELLED, DisplayText= "Cancelled" },
              //new ListItem() { ItemId =  MJPConstants.JOB_STATUS_EXPU , DisplayText= "Closed"},
              new ListItem() { ItemId =  MJPConstants.JOB_STATUS_ONHOLD ,  DisplayText= "On HOLD"}
            };

            return list;
        }


        public ListItem[] SelectLOVItems(string lovGroup){
            var result =(from l in this.context.Mjplovitems
                    where l.Lovgroup == lovGroup
                    select new ListItem(){
                        DisplayText = l.DisplayText,
                        ItemId= l.LovitemId
                    }).ToArray();
            return result;
        }


        private ListItem[] SelectLocationTypes(){
            var result = SelectLOVItems(MJPConstants.LOV_GROUP_TYPE_LOCATIONS);
            return result;
        }

        public ListItem[] SelectAllCurrencies(){
            var result = SelectLOVItems(MJPConstants.LOV_GROUP_TYPE_CURRENCIES);
            return result;
        }

        public JobPositionMasters SelectJobpositionMasters() {
            var result = new JobPositionMasters();
            result.Categories = this.SelectJobpositionCategories().ToArray();
            result.Companies = this.SelectCompanies().ToArray();
            result.Ranks = this.SelectAllRanks().ToArray();

            result.Currencies = this.SelectAllCurrencies();
            result.LocationTypes = this.SelectLocationTypes();
            result.Departments = this.SelectAllDepartments().ToArray();

            result.Status = this.SelectAllStatus();
            result.VesselTypes = this.SelectAllVesselTypes();
            return result;
        }

        // private ListItem[] SelectAllRanks(){
        //     var result = (from rk in this.context.JobPositionRanks
        //                 select new ListItem(){
        //                     DisplayText = rk.RankName,
        //                     ItemId= rk.JobPositionRankId
        //                 }).ToArray();
        //     return result;
        // }




        public  JobPositionFilterMasters SelectJobpositionFilterMasters(){
             var result =new JobPositionFilterMasters();
            result.Categories = this.SelectJobpositionCategories().ToArray();
            result.Companies = this.SelectCompanies().ToArray();
            var ranks = this.SelectAllRanks();
            result.Ranks = (from r in ranks
                        select new ListItem(){
                            DisplayText = r.RankName,
                            ItemId = r.RankId
                        }).ToArray();
            
            return result;
        }


        public ListItem[] SelectAllStates() {
            var list = (from s in this.context.States
                        select new ListItem(){
                            DisplayText = s.DisplayName,
                            ItemId = s.StateId
                        }).ToArray();
            return list;
        }

        public UserProfileMasters SelectUserProfileMasters()
        {
           var result = new UserProfileMasters();
           result.States = SelectAllStates();
           result.MaritalStatus = SelectLOVItems(MJPConstants.LOV_GROUP_TYPE_MARITAL_STATUS);
           result.Nationality = SelectLOVItems(MJPConstants.LOV_GROUP_TYPE_NATIONALITY);
           
           result.CurrentStatus = SelectLOVItems(MJPConstants.LOV_GROUP_TYPE_PROFILE_STATUS);
           result.DocumentTypes = SelectLOVItems(MJPConstants.LOV_GROUP_APPLICANT_DOCUMENT);
           result.Courses = SelectLOVItems(MJPConstants.LOV_GROUP_APPLICANT_COURSES);
           
           result.Currencies = SelectLOVItems(MJPConstants.LOV_GROUP_CURRENCY);
           result.Departments = this.SelectAllDepartments().ToArray();
            result.Ranks = this.SelectAllRanks().ToArray();
            result.Certificates = SelectLOVItems(MJPConstants.LOV_GROUP_TYPE_OTHER_CERTIFICATES);
          
           return result;
        }

        public IEnumerable<ListItem> SelectAllDepartments()
        {
             var list = (from s in this.context.Departments
                        select new ListItem(){
                            DisplayText = s.DepartmentName,
                            ItemId = s.DepartmentId
                        }).ToArray();
            return list;
        }


        public ListItem[] SelectAllVesselTypes()
        {
             var list = (from s in this.context.VesselTypes
                        select new ListItem(){
                            DisplayText = s.VesselTypeName,
                            ItemId = s.VesselTypeId
                        }).ToArray();
            return list;
        }
    }
}
