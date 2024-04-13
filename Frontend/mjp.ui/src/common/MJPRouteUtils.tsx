import { CommonUtils } from "common";
import { ApplicantJobPosition } from "../models/JobPositions";

export class MJPRouteUtils {

    static navigateToHome() {
        window.location.href = "home";
    }


    static navigateToEditProfile() {
        window.location.href = "/editmyprofile";
    }

    static navigateToCompanyPositions(companyId: number) {
        
        var url = "searchpositions?companyId=" + companyId;
        window.location.href = url;
    }

    static navigateToJobPosition(positionId: number) {
        let url = "/jobPosition?jobPositionId=" + positionId;
        //if (item.jobApplicationId != null) {
            //Job is applied.Add applicaionId
            //Don't use the applicationId in URL as the user may use that to
            //access the applciations not related to him
            //url = url + "&applicationId=" + item.jobApplicationId;
        //}
        CommonUtils.openInNewTab(url);
    }

    static navigateToEditJobPosition(positionId: number) {
        let url = "/jobPositiondetails?jobPositionId=" + positionId;
        CommonUtils.openInNewTab(url);
    }

    static navigateToCompanies() {
        window.location.href = "companies";
    }


    
    static navigateToApplicants() {
        window.location.href = "applicants";
    }

    static navigateToNewCompany() {
        window.location.href = "newcompany";
    }


    static navigateToNewPosition() {
        window.location.href = "newposition";
    }

    static navigateToJobPositions() {
        window.location.href = "jobpositions";
    }

    static navigateToError() {
        //window.location.href = "error";
    }

    static navigateToLogin() {
        window.location.href = "login";
    }

    static navigateToMyApplications() {
        window.location.href = "myapplications";
    }
}