import { ListItem } from "common";
import { APIService } from "../authentication/APIService";
import { Company } from "../models/Company";
import { MJPConstants } from "../MJPConstants";
import { JobPositionFilterMasters, JobPositionMasters } from "../models/JobPositionModels";
import { UserProfileMasters } from "../models/UserModels";
import { ApplicantFilterMasters } from "../models/ApplicantFilterModel";

export class MasterService {

    private get AxiosInstance() {
        var instance = APIService.getInstance();  
        return instance.AxiosInstance;
    }


    async selectAllStates(): Promise<Array<ListItem>> {
         var url = "masters/selectStates";

        var states = await this.AxiosInstance.get<Array<ListItem>>(url); 
        return states.data;
    }
    


    static  selectAllApplicantStatus(){
        return  [
            new ListItem(MJPConstants.APPLICANT_STATUS_NEW, "New"),
            new ListItem(MJPConstants.APPLICANT_STATUS_PROFILE_SUBMITTED, "Profile Submitted"),
            new ListItem(MJPConstants.APPLICANT_STATUS_INACTIVE, "In Active"),
            new ListItem(MJPConstants.APPLICANT_STATUS_ACTIVE1, "Active"),
        ];
    }

    static  selectCompanyTypes(){
        return  [
            new ListItem(MJPConstants.APPLICANT_STATUS_NEW, "New"),
            new ListItem(MJPConstants.APPLICANT_STATUS_INACTIVE, "In Active"),
            new ListItem(MJPConstants.APPLICANT_STATUS_ACTIVE1, "Active"),
        ];
    }

    async selectUserProfileMasters(): Promise<UserProfileMasters> {
        var url = "masters/profileMasters";

       var states = await this.AxiosInstance.get<UserProfileMasters>(url); 
       return states.data;
   }
    

//    async selectApplicantFilterMasters(): Promise<ApplicantFilterMasters> {
//     var url = "masters/applicantfiltermasters";

//    var result = await this.AxiosInstance.get<ApplicantFilterMasters>(url); 
//    return result.data;
// }  


    // async selectAllJobPositionCategories(): Promise<Array<ListItem>> {
    //     var instance = APIService.getInstance();
    //     var url = "masters/SelectJobPositionCategories";
    //     var categories = await this.AxiosInstance.get(url);
        
    //     return categories.data;
    // }  


    async selectApplicationStatus(): Promise<Array<ListItem>>{
        var result = [
            new ListItem(MJPConstants.APPLICATION_STATUS_APPLIED, "Applied"),
            new ListItem(MJPConstants.APPLICATION_STATUS_SHORTLISTED, "Shortlisted"),
            new ListItem(MJPConstants.APPLICATION_STATUS_REJECTED, "Profile Rejected"),
            new ListItem(MJPConstants.APPLICATION_STATUS_ONHOLD, "On Hold"),
            new ListItem(MJPConstants.APPLICATION_STATUS_CANCELLED, "Cancelled"),

            new ListItem(MJPConstants.APPLICATION_STATUS_SELECTED, "Selected"),
            new ListItem(MJPConstants.APPLICATION_STATUS_NOT_SELECTED, "Not Selected"),
        ];
        return result;
    }

    // async selectJobStatus(): Promise<Array<ListItem>>{
    //     var result = [
    //         new ListItem(MJPConstants.JOB_STATUS_OPEN, "Applied"),
    //         new ListItem(MJPConstants.JOB_STATUS_CANCELLED, "Cancelled"),
    //         new ListItem(MJPConstants.JOB_STATUS_ONHOLD, "On Hold"),
    //         new ListItem(MJPConstants.JOB_STATUS_EXPIRED, "Expired"),
    //     ];
    //     return result;
    // }


    async selectJobPositionStatus(): Promise<Array<ListItem>>{
        var result = [
            new ListItem(MJPConstants.JOB_STATUS_OPEN, "Open"),
            new ListItem(MJPConstants.JOB_STATUS_CANCELLED, "Cancelled"),
            new ListItem(MJPConstants.JOB_STATUS_ONHOLD, "On Hold"),
            new ListItem(MJPConstants.JOB_STATUS_EXPIRED, "Expired"),
            //new ListItem(MJPConstants.JOB_STATUS_CLOSED, "Closed"),
        ];
        return result;
    }



    async  selectJobPositionMasters(): Promise<JobPositionMasters> {
        var url = "masters/jobpositionmasters";

        //Call API
        return (await this.AxiosInstance.get(url)).data;
    }


    async  selectJobPositionFilterMasters(): Promise<JobPositionFilterMasters> {
        var url = "masters/jobpositionfiltermasters";

        //Call API
        return (await this.AxiosInstance.get(url)).data;
    }
}     