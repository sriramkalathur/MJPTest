using System;
using Microsoft.AspNetCore.Mvc;
using MJP.API.Common;
using MJP.Entities;
using MJP.Entities.Models;

using System.Collections.Generic;

namespace MJP.API.Validations
{
    public static class JobPositionValidations
    {


        public static ValidationError[] ValidateJobPosition(EditJobPosition model){

            List<ValidationError> errors = new List<ValidationError>();
            //Interview schedled. Validate date 
            if(model.Tags == null || model.Tags.Length == 0){
                errors.Add(new ValidationError(){
                    ErrorMessage = "Atleast a tag is required",
                    FieldName = "tags"
                });
            }

            if(! string.IsNullOrEmpty(model.SalaryRange)){
                //There is a salaryRange. Validate if currency is Not null
                if(model.CurrencyId == null){
                    errors.Add(new ValidationError(){
                        ErrorMessage = "Currency is required",
                        FieldName = "currencyId"
                    });
                }
            }
            
           return errors.ToArray();
        }

        public static ValidationError[] ValidateInterviewDetails(InterviewDetails model){

            List<ValidationError> errors = new List<ValidationError>();
            //Interview schedled. Validate date 
            if(model.InterviewDate == null){
                errors.Add(new ValidationError(){
                    ErrorMessage = "Interview date is required",
                    FieldName = "interviewDate"
                });
            }
           return errors.ToArray();
        }


        // public static ValidationError[] ValidateJobApplicationForStaff(JobApplicationDetails model){
        //     //Validate Interview date
        //      List<ValidationError> errors = new List<ValidationError>();

        //     if(model.ApplicationDetails.InterviewDate == null){
        //         errors.Add(new ValidationError(){
        //             ErrorMessage = "Interview date is required",
        //             FieldName = "interviewDate"
        //         });
        //     }

        // }
    }
}
