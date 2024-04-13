import { APIRequest, FilteredResult } from "common";
import { APIService } from "../authentication/APIService";

import axios from 'axios';
import { APIResult } from "../models/CommonModels";
import {  EditJobPositionInformation, JobPositionInformation } from "../models/JobPositions";
import { JobPositionFilter } from "../models/JobPositionModels";

   
export class JobPositionService {
   
    private get AxiosInstance() {
        var instance = APIService.getInstance();  
        return instance.AxiosInstance;
    }

 

    async  selectJobPosition(jobPositionId: number): Promise<EditJobPositionInformation> {
        var url = "jobposition/positionInfo/" + jobPositionId;

        //Call API
        return (await this.AxiosInstance.get(url)).data;
    }
  
    
    async  updateJobPosition(model: EditJobPositionInformation): Promise<APIResult> {
        var url = "jobposition/updatepositionInfo/";

        //Call API
        return (await this.AxiosInstance.post(url, model)).data;
    }
  

    async filterJobPositions(filter: JobPositionFilter, currentPage: number): Promise<FilteredResult<JobPositionInformation>> {
        
        var url = "jobposition/filterJobPositions?page=" + currentPage;
        var result = await this.AxiosInstance.post<FilteredResult<JobPositionInformation>>(url, filter);

        // return response;     
        return result.data;  
    }

    async selectBasicInfo(jobPositionId: number): Promise<JobPositionInformation>{

        var url = "jobposition/basicpositionInfo/" + jobPositionId;
        var response = (await this.AxiosInstance.get(url)).data as JobPositionInformation;
        return response;
     } 


    async selectRecommendedPositions(currentPage: number): Promise<FilteredResult<JobPositionInformation>> {
   
        var url = "jobposition/recommendedPositions?page=" + currentPage;
        var result = await this.AxiosInstance.get<FilteredResult<JobPositionInformation>>(url);

        // return response;     
        return result.data;  
    }
}    