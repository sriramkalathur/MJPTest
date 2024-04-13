import { ListItem } from "common";
import { JobPositionCategory } from "./JobPositionModels";
import { JobPositionTag } from "./JobPositions";
import { Company } from "./Company";

export class UserRegistrationModel {

    userName: string;

    displayName: string;

    firstName: string;

    lastName: string;

    password: string;

    email: string;

    mobileNumber: string;
}


// export class UserProfile {

//     userId: number;

//     firstName: string;

//     lastName: string;

//     passportNumber: string;

//     mobileNumber: string;

//     displayName: string;

//     email: string;

//     address1: string;

//     address2: string;

//     city: string;

//     pincode: string;

//     stateId?: number;

//     dateOfBirth?: Date;
// }



export class UserProfileMasters {

    states: Array<ListItem>;

    //categories : Array<JobPositionCategory>

    //companies: Array<Company>;

    //tags: Array<string>;

    nationality: Array<ListItem>;

    maritalStatus: Array<ListItem>;

    currentStatus: Array<ListItem>;

    documentTypes: Array<ListItem>;

    courses: Array<ListItem>;

    certificates: Array<ListItem>;

    ranks: Array<ListItem>;

    currencies: Array<ListItem>;
}

export class ResetPasswordModel {
    email: string;
}


export class ChangePasswordModel {

    oldPassword: string;
    
    newPassword: string;
}