import { ApplicantInfo } from "./ApplicantModels";
import { Company } from "./Company";
import { MJPDocument } from "./DocumentModel";
import { JobPositionFeature, JobPositionProfile, JobPositionRequirement } from "./JobPositionModels";


///Application related Information
export class ApplicationInfo {

    applicantName: string;

    contactNumber : string;

    jobApplicationId: number;
    
    applicantId: string;

    applicantUserName: string;

    applicationStatusId : number;

    jobApplicationCode : string;

    applicationNumber: string;

    appliedDate: Date;

    interviewDate?: Date;

    interviewInstructions: string;

    interviewURL: string;

    
    staffRemarks: string;

    applicantRemarks : string;
}

///Filter item 
export class ApplicantJobPosition {

    jobPositionId: number;

    jobApplicationId?: number;

    applicationNumber: string;


    isRecommended: boolean;
    
    statusId: number;

    applicationStatusId?: number;

    jobCode: string;

    companyName: string;

    companyRating?: number;

    postedOn?: Date;

    jdSummary: string;

    positionTitle: string;


    lastUpdatedDate: Date;

    department: string;

    rank : string;

     minExperience : number;

     maxExperience : number;

    salaryRange : string;

    locationType: string;

    appliedDate?: Date;

    expiryDate?: Date;

    interviewDate?: Date;

    companyLogo: string;
}


//Job Position Detials
export class JobPositionInformation {

    constructor(){
        this.tags = [];
    }
    
    jobPositionId: number;

    statusId: number;

    jobCode: string;

    companyJobCode: string;

    companyId: number;

    postedOn?: Date;

    expiryDate: Date;
     
    jdSummary: string;

    positionTitle: string;

    company: Company;

    lastUpdatedDate: Date;

    category: string;

    vesselType: string;

    categoryId: number;

    department: string;

    rank : string;

    minExperience: number;

    maxExperience: number;

    rankId:number;
 
    salaryRange: string;

    locationType: string;

    locationTypeId: number;

    applicationsCount: number;

    numberOfPositions?: number;
     
    lastDateOfApplication: Date;

    interviewDate: Date; 

    interviewLocation: string;

    tags: Array<JobPositionTag>;

    documents: Array<MJPDocument>;
}




//Job Position Detials
export class EditJobPositionInformation {

    constructor(){
        this.tags = [];
    }
    
    jobPositionId: number;

    statusId: number;

    staffRemarks: string;

    jobCode: string;

    companyId: number;

    postedOn?: Date;

    jdSummary: string;

    expiryDate: Date;

    minExperience: number;

    maxExperience: number;

    positionTitle: string;

    interviewDate: Date;

    interviewLocation: string;

    categoryId: number;

    vesselTypeId: number;
    
    departmentId: number;
    
    rankId:number;

    companyJobCode: string;
 
    locationTypeId: number;

    numberOfPositions?: number;
    
    lastDateOfApplication: Date;

    salaryRange: string;

    currencyId: number;
    
    tags: Array<JobPositionTag>;

    isRecommended: boolean;
}




export class JobPositionTag {
    tagName: string;
}



//Job Position Detials
export class JobPositionDetails {

    jobPositionId: number;

    positionInfo: JobPositionInformation;

    features: JobPositionFeature[]

    requirements: JobPositionRequirement[]
}


// export class ApplicantJobPosition extends JobPosition {

   
//     applicantJobPositionId?: number;

//     applicantStatus?: number;

//     appliedDate: Date;
// }


/// Application Detals
export class JobApplicationDetails  {

    
    features: JobPositionFeature[];

    requirements: JobPositionRequirement[];

    statusHistory: Array<StatusHistoryItem>;

    jobApplicationId: number;

    jobPositionId: number;

    positionDetails: JobPositionInformation;

    applicationDetails: ApplicationInfo;

}

export class JobApplication {

    jobPositionId: number;

    jobApplicationId?: number;

    positionDetails: JobPositionInformation;

    applicationInfo: ApplicationInfo;

    lastUpdatedTime: Date;
}

export class JobPositionApplyModel {

    jobPositionId: number;

    remarks: string;
}


export class StatusHistoryItem {

    statusId: number;

    status: string;

    statusDate? : Date;

    remarks: string;

    updatedBy: string;

    constructor(statusId: number, description: string, updatedBy: string, statusDate?: Date){
        this.statusId = statusId;
        this.statusDate = statusDate;
        this.remarks = description; 
        this.updatedBy = updatedBy;
    }
}

// export class ApplicantJobPositionDetails extends JobPositionDetails {

   
//     applicantJobPositionId?: number;

//     applicantStatus?: number;

    
//     interviewDate?: Date;

//     statusHistory: Array<StatusHistoryItem>;

//     constructor(){
//         super();
//         this.features = [];
//         this.requirements=[];

//         this.statusHistory = [];
//     }
// }


export class BulkJobPositionApplyModel {

    
    jobPositionId: number;

    remarks: string;

    profiles: Array<JobPositionProfile>;

    //This will be used only during SAVE. So this can nbe NULL when initialization
    applicants?: Array<number>;
}


//Model for changing Application status
// export class ApplicationStatusChangeModel {

//     applicationNumber: string;

//     remarks: string;

//     jobApplicationId: number;

//     statusId: number;
// }