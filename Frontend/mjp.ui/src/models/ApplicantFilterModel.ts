import { ListItem } from "common";



export class ApplicantFilterMasters {

    ranks: ListItem[]
}

export class Applicant {
    applicantId : number;

    applicantName: string;

    mobileNumber: string;

    email: string;

    rank: string;

    category: string;

    availabilityStatusId:number;

    experience: number;

    annualSalary: number;

    statusId: number;
}

export class ApplicantFilter {

    searchText:string;

    statusId: number;
}





export class ProfileFilters {

    jobPositionId: number;

    rankId: number;

    searchText: string;

    availabilityStatusId :number;

    experienceFrom: number;

    experienceTo: number;

    salaryFrom: number;

    salaryTo: number;
    
}