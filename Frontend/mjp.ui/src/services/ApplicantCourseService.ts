import axios, { AxiosResponse } from "axios";
import { MJPUser } from "../authentication/UserContext";
import { MJPConstants } from "../MJPConstants";
import { UserLoginModel } from "../models/AccountModels";
import { APIResponse } from "common";
import { ChangePasswordModel, ResetPasswordModel, UserRegistrationModel } from "../models/UserModels";
import { APIResult } from "../models/CommonModels";
import { APIService } from "../authentication/APIService";
import { MJPConfig } from "../MJPConfig";

import { Address, ApplicantDocument, ApplicantInfo, PersonalInformation } from "../models/ApplicantModels";
import { CertificatesList, CompetencyCertificate, STCWCourse } from "../models/ApplicantCourses";

export class ApplicantCourseService {

    private get AxiosInstance() {
        var instance = APIService.getInstance();
        return instance.AxiosInstance;
    }


    async selectCertificates(applicantId: number): Promise<CertificatesList> {

        var url = "applicantcourse/certificates/" + applicantId;
        var result = (await this.AxiosInstance.get(url)).data;

        return result;
    }

    
    async updateCertificate(model: CompetencyCertificate): Promise<APIResult> {
        var url = "applicantcourse/certificate/update";
        var result = (await this.AxiosInstance.post(url, model)).data;
        return result;
    }



    async deleteCertificate(documentId: number): Promise<APIResult> {
        var url = "applicantcourse/certificate/" + documentId;
        var result = (await this.AxiosInstance.delete(url)).data;
        return result;
    }



    async selectCourses(applicantId: number): Promise<STCWCourse[]> {

        var url = "applicantcourse/stcwcourses/" + applicantId;
        var result = (await this.AxiosInstance.get(url)).data;

        return result;
    }

    
    async updateCourse(model: STCWCourse): Promise<APIResult> {
        var url = "applicantcourse/stcwcourse/update";
        var result = (await this.AxiosInstance.post(url, model)).data;
        return result;
    }



    async deleteCourse(courseId: number): Promise<APIResult> {
        var url = "applicantcourse/stcwcourse/" + courseId;
        var result = (await this.AxiosInstance.delete(url)).data;
        return result;
    }

}