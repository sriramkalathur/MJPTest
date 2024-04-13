import { FormikProps } from "formik";
import { APIResult } from "../models/CommonModels";
import { MJPConstants } from "../MJPConstants";
import { JobPositionFeature } from "../models/JobPositionModels";
import { MdTransferWithinAStation } from "react-icons/md";

export class MJPCommonUtils {


    static getJobPositionStatusText(statusId: number): string {
        switch(statusId){
            case MJPConstants.JOB_STATUS_OPEN: return "Open";
            case MJPConstants.JOB_STATUS_CANCELLED: return "Cancelled";
            case MJPConstants.JOB_STATUS_ONHOLD: return "On HOLD";
            case MJPConstants.JOB_STATUS_EXPIRED: return "Expired";
            
            default : return ""
        }
    }
    
    static getCssStyles(feature: JobPositionFeature){
        var styles = {
            fontSize: feature.size + "px",
            color:  feature.textColor,
            fontWeight: (feature.bold) ? "bold": "normal",
            fontStyle: (feature.italic) ? "italic": "",
       };  

       return styles;
    }
    


    static getApplicantStatius(statusId: number){
        switch(statusId){
            case MJPConstants.APPLICANT_STATUS_ACTIVE1: return "Active"; break;
            case MJPConstants.APPLICANT_STATUS_NEW: return "New"; break;
            case MJPConstants.APPLICANT_STATUS_PROFILE_SUBMITTED: return "Profile Submitted"; break;
            case MJPConstants.APPLICANT_STATUS_INACTIVE: return "In Active"; break;
            
        }
    }

    static getApplicationStatusDisplayText(statusId: number): string {
        switch(statusId){
            case MJPConstants.APPLICATION_STATUS_APPLIED: return "Applied";
            case MJPConstants.APPLICATION_STATUS_CANCELLED: return "Cancelled";
            case MJPConstants.APPLICATION_STATUS_NOT_SELECTED: return "Not Selected";
            case MJPConstants.APPLICATION_STATUS_ONHOLD: return "On Hold";

            case MJPConstants.APPLICATION_STATUS_REJECTED: return "Profile Rejected";
            case MJPConstants.APPLICATION_STATUS_SELECTED: return "Selected";
            case MJPConstants.APPLICATION_STATUS_SHORTLISTED: return "Shortlisted";
          

            default : return ""
        }
    }


    static clearErrors<T>(formState: FormikProps<T>){

        //Clear the errors
        formState.setErrors({});
    }

    static updateErrors<T>(result: APIResult, formState: FormikProps<T>){

       
        var fieldNames = Object.keys(result.errors);
        //Validation failure. Update
        fieldNames.forEach((fieldName) => {
        
          var errMsg = result.errors[fieldName];
          //console.log(fieldName);
          (formState.errors as any)[fieldName] = errMsg;
        });
         
    }


    static getError<T>(formState: FormikProps<T>, fieldName: string): string{

        return ((formState.errors) &&
                (formState.errors as any)[fieldName]);
         
    }
    
}