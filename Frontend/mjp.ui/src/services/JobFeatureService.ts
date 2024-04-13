import { APIRequest, FilteredResult } from "common";
import { APIService } from "../authentication/APIService";
import { MJPConstants } from "../MJPConstants";
import { Company } from "../models/Company";
import { ApplicationStatus, JobPositionFeature, JobPositionFilter, JobPositionRequirement } from "../models/JobPositionModels";
import { JobApplicationDetails, JobPositionInformation,  ApplicantJobPosition, JobPositionDetails, JobPositionApplyModel, JobApplication } from "../models/JobPositions";

import axios from 'axios';
import { APIResult } from "../models/CommonModels";
   
export class JobFeatureService {
   
    private get AxiosInstance() {
        var instance = APIService.getInstance();  
        return instance.AxiosInstance;
    }

  
    async deleteJobFeature(jobFeatureId: number): Promise<void> {
        //If we just concatenate, null is passed as undefined. So use null 
        var url = "JobPositionFeature/delete/" + jobFeatureId;
        var result = await this.AxiosInstance.delete(url);

        // return response;     
        return result.data;  
    }
 
    async selectJobFeatures(jobPositionId: number): Promise<Array<JobPositionFeature>> {
        //If we just concatenate, null is passed as undefined. So use null 
        var url = "JobPositionFeature/features/" + jobPositionId;
        var result = await this.AxiosInstance.get(url);

        // return response;     
        return result.data;   
    }

    async updateJobFeature(model: JobPositionFeature): Promise<APIResult>{
        var url = "JobPositionFeature/update/";
        var result = await this.AxiosInstance.post(url, model);

        // return response;     
        return result.data;  
     }  
}    