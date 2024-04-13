import { FilteredResult } from "common";
import { ApplicantJobPosition } from "./JobPositions";

export class Company {

    companyId: number;

    companyCode: string;

    companyName: string;

    displayName: string;

    //Recommended/None/Featured
    companyType : number;

    //RPSL Number
    rpslNumber: string;

    rating?: number;

    //Admin user Name
    userName: string;

    //admin Password
    password: string;

    contactNumber: string;

    email: string;

    companyProfile: string;

    url: string; 

    address1: string;

    address2: string;

    city: string;

    state: string;

    pincode: string;

    isActive: boolean;

    isRecommended: boolean;

     //This is  the Base64 image format of the compnay sent to server
     companyLogo: string;
}




export class RPSLDetails {

    companyName: string;
    
    address1: string;

    address2: string;

    address3: string;

    city: string;

    stateId: number;

    pincode: string;
}

export class CompanyEditModel extends Company {

    stateId: number;

    //The file content as file. Thsi will be used only in form.
    companyLogoFile: File;
}


export class RecommendedCompany extends Company {

}

export class CompanyFilter {

    filterText: string;
}

export class CompanyJobPositions {

    positions: FilteredResult<ApplicantJobPosition>;

    company: Company;

}