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
    public class JobFeatureService : IJobFeatureService
    {
        private MJPContext context;

        public JobFeatureService(MJPContext context){
            this.context = context;
        }

        public IEnumerable<JobPositionFeature> SelectJobFeatures(int jobPositionId)
        {
           var result = (from f in this.context.JobPositionFeatures
                            where f.JobPositionId == jobPositionId
                            select new JobPositionFeature(){
                                Description = f.Description,
                                IsActive = f.IsActive,
                                JobPositionFeatureId = f.JobPositionFeatureId,
                                JobPositionId = f.JobPositionId,
                                TextColor = f.TextColor,
                                Size = f.Size,
                                //If NULL, take default value as false
                                IsBold = (f.IsBold == null)? false: f.IsBold.Value,
                                IsItalic = (f.IsItalic == null)? false: f.IsItalic.Value,
                            }).ToArray();
                    
           return result;
        }

        private void UpdateDBModel(JobPositionFeatures dbItem, JobPositionFeature model){
            dbItem.Description = model.Description;
            dbItem.IsBold = model.IsBold;
            dbItem.IsItalic = model.IsItalic;
           
            dbItem.JobPositionId = model.JobPositionId;
            dbItem.TextColor = model.TextColor;
            dbItem.Size = model.Size;
            dbItem.LastUpdatdBy = model.LastUpdatedBy;
            dbItem.LastUpdatedTime = model.LastUpdatedTime;
        }


        public void UpdateJobFeature(JobPositionFeature model){
            
            JobPositionFeatures dbItem = new JobPositionFeatures();
            if(model.JobPositionFeatureId != 0){
                //There is an existing item.. 
                //Populate the DBdetails
                 dbItem = (from f in this.context.JobPositionFeatures
                        where f.JobPositionFeatureId == model.JobPositionFeatureId
                        select f).First();
            }
            this.UpdateDBModel(dbItem, model);

            if(model.JobPositionFeatureId == 0){
                //Add the item
                this.context.JobPositionFeatures.Add(dbItem);
            }
            else {
                //Update the item
                 this.context.JobPositionFeatures.Update(dbItem);
            }
            
            this.context.SaveChanges();
        }



        public void DeleteJobFeature(int jobFeatureId){

            var dbItem = (from f in this.context.JobPositionFeatures
                        where f.JobPositionFeatureId == jobFeatureId
                        select f).First();
            //Delete the item
            this.context.JobPositionFeatures.Remove(dbItem);

            //save
            this.context.SaveChanges();
        }
    }
}
