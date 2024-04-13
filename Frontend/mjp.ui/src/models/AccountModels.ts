import { MJPUserRoles } from "../authentication/UserContext";


export enum LoginType {

    None,
   
    Staff = 1,
    Applicant = 2,
    CompanyUser = 3
}

export class UserLoginModel {
    userName: string;

    password: string;
 
    loginType: LoginType 

    constructor(){
        this.loginType = LoginType.Applicant;
    }
}



