import { CompetencyCertificate, STCWCourse } from "./ApplicantCourses";

export class Address {

    address1: string;

    address2: string;

    city: string;

    pincode: string;

    stateId: number;
}


///Basic Applicant Info
export class ApplicantInfo {

    applicantId: number;

    firstName: string;

    lastName: string;

    email: string;

    mobileNumber: string;

    //Whether Personal Info is completed in profile
    personalInfoCompleted: boolean;

    profileCompleted: boolean;

    lastUpdatedDate:Date;

    //Indicates whether the other certiicates are Mandaory
    isCertificateMandatory: boolean;
}

export class PersonalInformation {

    applicantPersonalInfoId: number;

    isPersonalInfoCompleted: boolean;
    
    applicantId: number;

    age: number;

    languagesKnown: string;

    fatherName: string;

    firstName: string;

    lastName: string;

    nationality: string;

    nationalityId: number;

    maritalStatus: string;

    maritalStatusId: number;

    displayName : string;
    
    dateOfBirth: Date;

    statusId: number;

    //This is purely used for internal operations
    //This is used to store the category for the user to filter only the ranks for that
    categoryId: number;

    category: string; 

    vesselTypeId : number;

    availabilityStatusId: number;

    technicalQualification: string;

    educationalQualification: string;

    currentAddress: Address;

    permanentAddress: Address;

    mobileNumber: string;

    alternateContactNumber: string;

    email: string;

    alernateEmail: string;

    permanentAddressSameAsCurrent: boolean;

    departmentId: number;

    department: string;

    rankId: number;

    rank: string;

    experienceYrs : number;

    experienceMonths : number;

    experience: number;

    //Annual salary
    annualSalary : number;

    salaryCurrencyId: number;

    //expected slary
    expectedSalary : number;

    expectedCurrencyId: number;

  
    lastUpdatedDate: Date;
}


export class ApplicantDocument {

    applicantDocumentId: number;

    applicantId: number;

    documentTypeId: number;

    documentName: string;

    documentNumber: string;

    grade: string;

    issueDate: Date;

    issuePlace: string;

    expiryDate: Date;
}


export class SEAExperience {
    seaExperienceId: number;

    applicantId: number;

    companyName: string;

    vesselName: string;

    type: string;

    grt: string;

    bhp: string;

    rank: string;

    fromDate: Date;

    toDate: Date;
}

export class ApplicantCertificatesList {
    isCertificateMandatory: boolean;

    certificates: Array<CompetencyCertificate>;
}


export class ApplicantProfile {

    personalInfo: PersonalInformation;

    courses: Array<STCWCourse>;

    certificates: ApplicantCertificatesList;

    documents: Array<ApplicantDocument>;

    experience: Array<SEAExperience>;

}