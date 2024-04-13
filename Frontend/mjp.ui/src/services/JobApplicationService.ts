import { APIRequest, FilteredResult } from "common";
import { APIService } from "../authentication/APIService";
import { MJPConstants } from "../MJPConstants";
import { Company } from "../models/Company";
import { ApplicationStatus, JobApplicationFilter, JobPositionFilter, JobPositionProfile, JobPositionRequirement, JobSearchFilter } from "../models/JobPositionModels";
import { JobApplicationDetails,  JobPositionApplyModel, JobApplication, BulkJobPositionApplyModel, ApplicantJobPosition } from "../models/JobPositions";

import axios from 'axios';
import { APIResult } from "../models/CommonModels";
import { ProfileFilters } from "../models/ApplicantFilterModel";

     
export class JobApplicationService {
   
    private get AxiosInstance() {
        var instance = APIService.getInstance();  
        return instance.AxiosInstance;
    }

  
    async filterJobPositions(filter: JobPositionFilter, currentPage: number): Promise<FilteredResult<ApplicantJobPosition>> {
        //If we just concatenate, null is passed as undefined. So use null 
        var url = "jobposition/filterPositions?page=" + currentPage;
        var result = await this.AxiosInstance.post<FilteredResult<ApplicantJobPosition>>(url, filter);

        // return response;     
        return result.data;  
    }
 
 


    async updateApplicationStatus(status: ApplicationStatus) : Promise<APIResult>{
        var url = "jobapplication/updateApplicationStatus";

        var body =status;
        //Call API
        return (await this.AxiosInstance.post(url, body)).data;
    }

    async selectJobApplicationDetails(jobPositionId: number, jobApplicationId?: number): Promise<JobApplicationDetails>{

        //If there is a JoBApplicationId use that directly else use the JobPositioId
        let url = (jobApplicationId == null) ? "jobapplication/detailsByPositionId/"+ jobPositionId:
                        "jobapplication/details/" +jobApplicationId;

        var job = (await this.AxiosInstance.get(url)).data;

        return job;
     }  


    async updateJobApplication(model: JobApplicationDetails): Promise<APIResult>{

        var url = "jobapplication/updateJobApplication";
        var result = (await this.AxiosInstance.post(url, model)).data;

        return result;
     }  

   

     async applyForPosition(model: JobPositionApplyModel): Promise<APIResult>{

        var url = "jobapplication/applyForPosition";
        var response = (await this.AxiosInstance.post(url, model)).data as APIResult;
        return response;
     } 

    

     async bulkApplyForPosition(model: BulkJobPositionApplyModel): Promise<APIResult>{

        debugger;
        var url = "jobapplication/bulkApplyForPosition";
        var response = (await this.AxiosInstance.post(url, model)).data as APIResult;
        return response;
     } 


    //  async filterApplicantJobPositions(filter: JobPositionFilter, currentPage: number): Promise<FilteredResult<ApplicantJobPosition>> {
    //     //If we just concatenate, null is passed as undefined. So use null 
    //     var url = "jobapplication/filterApplicantJobPositions?page=" + currentPage;
    //     var result = await this.AxiosInstance.post<FilteredResult<ApplicantJobPosition>>(url, filter);

    //     // return response;     
    //     return result.data;  
    // }

//     private getAPIStatus(status: Array<number>): Array<number> {
//         var result = new Array<number>;
      
//         status.forEach((s) => {
            
//             if(s == MJPConstants.STATUS_REFER_BACK){
//                //Add ALL Refer back status
//                result.push(MJPConstants.APPLICATION_STATUS_REFER_BACK_TO_APPLICANT);
//                result.push(MJPConstants.APPLICATION_STATUS_REFER_BACK);
//                result.push(MJPConstants.APPLICATION_STATUS_REFER_BACK_TO_STAFF);
//             }
//             else if(s == MJPConstants.STATUS_INTERVIEW_SCHEDULED){
//                 //Add Interview sccheudle
//                 result.push(MJPConstants.APPLICATION_STATUS_INTERVIEW_RESCHEDULED);
//                result.push(MJPConstants.APPLICATION_STATUS_INTERVIEW_SCHEDULED);
//             }
//             else {
//                 //Some other status. Add as it is
//                 result.push(s);
//             }
            
//         });
//         return result;
//    }

//     async filterApplications(filter: JobPositionFilter, currentPage: number): Promise<FilteredResult<JobApplication>> {
        
  
//         if(filter.status){ 
//             //There is status. Get the status that needs to be sent to server..
//             //If we just concatenate, null is passed as undefined. So use null 
//             //There will be a single status ReferBack.
//             //If that is selected, add all the REFERBACK status 
//             filter.status = this.getAPIStatus(filter.status);
//         }
        
 
//         var url = "jobapplication/filterApplications?page=" + currentPage;
//         var result = await this.AxiosInstance.post<FilteredResult<JobApplication>>(url, filter);

//         // return response;     
//         return result.data;  
//     }



    async filterApplications(filter: JobApplicationFilter, currentPage: number): Promise<FilteredResult<JobApplication>> {
        var url = "jobapplication/filterApplications?page=" + currentPage;
        var result = await this.AxiosInstance.post<FilteredResult<JobApplication>>(url, filter);

        // return response;     
        return result.data;  
    }
    
    async searchPositions(filter: JobSearchFilter, currentPage: number): Promise<FilteredResult<ApplicantJobPosition>> {
        var url = "jobapplication/searchPositions?page=" + currentPage;
        var result = await this.AxiosInstance.post<FilteredResult<ApplicantJobPosition>>(url, filter);

        // return response;     
        return result.data;  
    }

    async selectMyApplications(currentPage: number): Promise<FilteredResult<JobApplication>> {
        
        //By default
        var url = "jobapplication/myapplications?page=" + currentPage;
        var result = await this.AxiosInstance.post<FilteredResult<JobApplication>>(url);

        // return response;     
        return result.data;  
    }
}    