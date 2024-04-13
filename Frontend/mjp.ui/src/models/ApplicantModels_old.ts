import { ListItem } from "common";

export class Address {
    address1: string;

    address2: string;

    city: string;
   
    pincode: string;
           
    stateId:number;       
}

export class UserProfile {
    applicantId: number;

    firstName?: string;

    lastName?: string;

    displayName: string;

    dateOfBirth?: Date;

    nationalityId?:number;

    maritalStatusId?: number;

    

    technicalQualification: string;

    educationalQualification: string;

    profileSummary: string;

    email: string;
    alernateEmail: string;

    contactNumber: string;
    alternateContactNumber: string;

    languagesKnown: string;
    fatherName: string;


    age: number;
    permanentAddress: Address;

    currentAddress: Address;

    currentAddressSameAsPermanent: boolean;

}