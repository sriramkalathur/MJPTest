using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Linq;
using Microsoft.Data.SqlClient;
using MJP.Entities;
using MJP.Entities.Models;

namespace MJP.Services.Extensions
{
    public static class MJPValidationExtensions
    {

        public static void ValidateIfFutureDate(this List<ValidationError> errors, 
                DateTime? date, string fieldName, string errorMessage)
            
        {
           if(date > DateTime.Now) {
            // Issue date cannot be a future date
            errors.Add(new ValidationError(){
                ErrorMessage = errorMessage,
                FieldName = fieldName
            });
           }
        }


        public static int GetJobStatus(DateTime expiryDate, int currentStatusId){

            if(currentStatusId == MJPConstants.JOB_STATUS_OPEN){
                //If it is OPEN, check the expirydate is met/not.
                // If expired, return EXPIRED status else the current status
                //No need to check for ONHOLD/Cancelled cases
                return (DateTime.Now.Subtract(expiryDate).Days >0 ? MJPConstants.JOB_STATUS_EXPIRED: currentStatusId);
            }
           else {
            //Return the status as IS for other cases
            return currentStatusId;
           }
        }

        


        public static void ValidateDateRange(this List<ValidationError> errors, 
                DateTime fromDate, DateTime toDate, string fieldName , string errorMessage)
        {
         
           if(toDate.Subtract(fromDate).Days <= 0) {
            //Expiry date should be greater than issue date
             errors.Add(new ValidationError(){
                ErrorMessage = errorMessage,
                FieldName = fieldName
            });
           }
        }
    }
}