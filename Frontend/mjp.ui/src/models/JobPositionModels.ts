import { ListItem } from "common";
import { Company } from "./Company";

export class JobPositionFilter {

    filterText: string;

    companies: Array<number>;

    jobStatus : Array<number>;
}


///Filters for searching Jobs
export class JobSearchFilter {

    filterText: string;

    companies: Array<number>;

    rankId: number;

    minExperience: number;

    maxExperience: number;
}


export class JobApplicationFilter {

    filterText: string;

    companies: Array<number>;

    applicationStatus : Array<number>;

    jobStatus : Array<number>;
}



export class JobPositionFeature {

    jobPositionFeatureId: number;

    jobPositionId : number;

    textColor: string;

    size: string;

    bold: boolean;

    italic: boolean;
    
    //box-shadow: inset -2px -2px 2px teal

    description: string
}


export class JobPositionRequirement {

    jobPositionId : number; 

    jobPositionRequirementId: number;

    description: string;

    isMandatory: boolean
}


///Application Statis change Popup
export class ApplicationStatus {
    jobApplicationId : number;

    statusId: number;

    remarks: string;
}


export class JobPositionRank {

    rankId: number;

    rankName: string;

    departmentId: number;

    categoryId: number;
}


export class JobPositionCategory {

    categoryId: number;

    categoryName: string;

}


export class JobPositionFilterMasters {
    categories: Array<JobPositionCategory>;

    companies: Array<Company>;

    ranks: Array<ListItem>;
}

export class JobPositionMasters {

    categories: Array<JobPositionCategory>;

    ranks: Array<JobPositionRank>;

    departments: Array<ListItem>;

    locationTypes: Array<ListItem>;

    companies: Array<Company>;

    currencies: Array<ListItem>;

    vesselTypes: Array<ListItem>;

    status: Array<ListItem>;
}


export class JobPositionProfile {

    applicantId: number;

    
    applicantName: string;

    email: string;

    mobileNumber: string;

    //Whether the profile is available for JOB
    availabilityStatusId: number;

    rank: string;

    salary: string;

    experience: string;

    //When this is NULL, it indicates that the job is already applied by the profile
    applicationStatusId: number;
    
}  




// export class JobPositionBasicInfo {

//     jobPositionId: number;

//     minExperience: string;

//     maxExperience: string;

//     rank: string;

//     expiryDate: string;
// }