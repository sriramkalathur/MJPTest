import axios, { AxiosResponse } from "axios";
import { MJPUser } from "../authentication/UserContext";
import { MJPConstants } from "../MJPConstants";
import { UserLoginModel } from "../models/AccountModels";
import { APIResponse, FilteredResult } from "common";
import { ChangePasswordModel, ResetPasswordModel, UserRegistrationModel } from "../models/UserModels";
import { APIResult } from "../models/CommonModels";
import { APIService } from "../authentication/APIService";
import { MJPConfig } from "../MJPConfig";

import { Address, ApplicantDocument, ApplicantInfo, ApplicantProfile, PersonalInformation, SEAExperience } from "../models/ApplicantModels";
import { Applicant, ApplicantFilter, ProfileFilters } from "../models/ApplicantFilterModel";
import { JobPositionProfile } from "../models/JobPositionModels";

export class ApplicantService {

    private get AxiosInstance() {
        var instance = APIService.getInstance();
        return instance.AxiosInstance;
    }


    async selectPersonalInfo(userId: number): Promise<PersonalInformation> {

        var url = "applicant/personalInfo/" + userId;
        var result = (await this.AxiosInstance.get(url)).data;

        return result;
    }

    
    async selectProfileDetails(applicantId: number) :  Promise<ApplicantProfile> {
        var url = "applicant/profile/" + applicantId;
       
        var result = (await this.AxiosInstance.get(url)).data;

        return result;
    }

    async submitProfile(applicantId: number) :  Promise<void> {
        var url = "applicant/submitprofile/" + applicantId;
       
        var result = (await this.AxiosInstance.post(url)).data;

        return result;
    }

    async selectApplicantInfo(applicantId: number): Promise<ApplicantInfo> {

        var url = "applicant/applicantInfo/" + applicantId;
        var result = (await this.AxiosInstance.get(url)).data;

        return result;
    }

    async updatePersonalInfo(model: PersonalInformation): Promise<APIResult> {
        var url = "applicant/personalInfo/update";
        var result = (await this.AxiosInstance.post(url, model)).data;
        return result;
    }


    async selectDocuments(applicantId: number): Promise<ApplicantDocument[]> {
        var url = "applicant/documents/" + applicantId;
        var result = (await this.AxiosInstance.get(url)).data;
        return result;
    }


    async deleteApplicantDocument(documentId: number): Promise<APIResult> {
        var url = "applicant/document/" + documentId;
        var result = (await this.AxiosInstance.delete(url)).data;
        return result;
    }

    async updateApplicantDocument(model: ApplicantDocument): Promise<APIResult> {
        var url = "applicant/document/update";
        var result = (await this.AxiosInstance.post(url, model)).data;
        return result;
    }



    async selectExperience(applicantId: number): Promise<SEAExperience[]> {
        var url = "applicant/experiences/" + applicantId;
        var result = (await this.AxiosInstance.get(url)).data;
        return result;
    }


    async deleteExperience(documentId: number): Promise<APIResult> {
        var url = "applicant/experience/" + documentId;
        var result = (await this.AxiosInstance.delete(url)).data;
        return result;
    }

    
    async filterProfiles(filter: ProfileFilters, currentPage: number): Promise<FilteredResult<JobPositionProfile>> {
        //If we just concatenate, null is passed as undefined. So use null 
        var url = "applicant/filterProfiles?page=" + currentPage;
        var result = await this.AxiosInstance.post<FilteredResult<JobPositionProfile>>(url, filter);

        // return response;     
        return result.data;  
    }
 
 
    
    async updateSEAExperience(model: SEAExperience): Promise<APIResult> {
        var url = "applicant/experience/update";
        var result = (await this.AxiosInstance.post(url, model)).data;
        return result;
    }


    async filterApplicants(filter: ApplicantFilter, currentPage: number): Promise<FilteredResult<Applicant>> {
        
        var url = "applicant/filterApplicants?page=" + currentPage;
        var result = await this.AxiosInstance.post<FilteredResult<Applicant>>(url, filter);

       
        // return response;      
        return result.data;  
    }
 

    // //This will filtter applicants who are eligible for applications
    // async filterActiveApplicants(filter: ApplicantFilters, currentPage: number): Promise<FilteredResult<Applicant>> {
        
    //     var url = "applicant/filterApplicants?page=" + currentPage;
    //     var result = await this.AxiosInstance.post<FilteredResult<Applicant>>(url, filter);

    //     // return response;     
    //     return result.data;  
    // }


}