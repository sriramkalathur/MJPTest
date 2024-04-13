import { APIRequest, FilteredResult } from "common";
import { APIService } from "../authentication/APIService";
import { MJPConstants } from "../MJPConstants";
import { Company } from "../models/Company";
import { ApplicationStatus, JobPositionFeature, JobPositionFilter, JobPositionRequirement } from "../models/JobPositionModels";
import { JobApplicationDetails, JobPositionInformation,  ApplicantJobPosition, JobPositionDetails, JobPositionApplyModel, JobApplication } from "../models/JobPositions";

import axios from 'axios';
import { APIResult } from "../models/CommonModels";
   
export class JobRequirementService {
   
    private get AxiosInstance() {
        var instance = APIService.getInstance();  
        return instance.AxiosInstance;
    }

  
    async deleteJobRequirement(jobRequirementId: number): Promise<void> {
        //If we just concatenate, null is passed as undefined. So use null 
        var url = "JobpositionRequirement/delete/" + jobRequirementId;
        var result = await this.AxiosInstance.delete(url);

        // return response;     
        return result.data;  
    }
 
    async selectJobRequirements(jobPositionId: number): Promise<Array<JobPositionRequirement>> {
        //If we just concatenate, null is passed as undefined. So use null 
        var url = "JobpositionRequirement/requirements/" + jobPositionId;
        var result = await this.AxiosInstance.get(url);

        // return response;     
        return result.data;   
    }

    async updateJobFeature(model: JobPositionRequirement): Promise<APIResult>{
        var url = "JobPositionRequirement/update/";
        var result = await this.AxiosInstance.post(url, model);

        // return response;     
        return result.data;  
     }  
}    