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

namespace MJP.Services
{
    public class JobRequirementService : IJobRequirementService
    {
        private MJPContext context;

        public JobRequirementService(MJPContext context){
            this.context = context;
        }

        public IEnumerable<JobPositionRequirement> SelectJobRequirements(int jobPositionId)
        {
           var result = (from f in this.context.JobPositionRequirements
                            where f.JobPositionId == jobPositionId
                            select new JobPositionRequirement(){

                                JobPositionRequirementId = f.JobRequirementId,
                                Description = f.Description,
                                IsActive = f.IsActive,
                                IsMandatory= (f.IsMandatory == null)? false: true,
                                JobPositionId = f.JobPositionId
                               
                            }).ToArray();
                    
           return result;
        }


        public void DeleteJobRequirement(int jobRequirementId){

            var dbItem = (from f in this.context.JobPositionRequirements
                        where f.JobRequirementId == jobRequirementId
                        select f).First();
            //Delete the item
            this.context.JobPositionRequirements.Remove(dbItem);

            //save
            this.context.SaveChanges();
        }


        public void UpdateJobRequirement(JobPositionRequirement model){
            
            JobPositionRequirements dbItem = new JobPositionRequirements();
            if(model.JobPositionRequirementId != 0){
                //There is an existing item.. 
                //Populate the DBdetails
                 dbItem = (from f in this.context.JobPositionRequirements
                        where f.JobRequirementId == model.JobPositionRequirementId
                        select f).First();
            }
           
            //Set the fields
            dbItem.Description = model.Description;
            //dbItem.IsActive = model.IsActive.Value;
            dbItem.IsMandatory= model.IsMandatory;
            dbItem.JobPositionId = model.JobPositionId;
            
            dbItem.LastUpdatedBy = model.LastUpdatedBy;
            dbItem.LastUpdatedTime = model.LastUpdatedTime;

            if(model.JobPositionRequirementId == 0){
                //Add the item
                this.context.JobPositionRequirements.Add(dbItem);
            }
            else {
                //Update the item
                 this.context.JobPositionRequirements.Update(dbItem);
            }
            
            //Save
            this.context.SaveChanges();
        }

    }
}
