import axios from "axios";
import { MJPConstants } from "../MJPConstants";

export enum MJPUserRoles {
    None = 0,

    Guest =1,

    Applicant = 2,

    Staff = 3, 

    Admin = 4,

    CompanyUser =5
}

export class MJPUser {

   
    userName: string;

    firstName: string;

    lastName: string;

    role: MJPUserRoles;

    authToken: string;

    userId: number;

    //Company assciated with the user. Valid ony for COMPANY USER role
    companyId: number;
}


export class UserContext {

    
 
    static get loggedInUser(): MJPUser {
       //Read from Local storage
    //    let authToken = localStorage.getItem("user.authToken");
    //    let userName = localStorage.getItem("user.userName");
    //    let role = (localStorage.getItem("user.userRole") as any as MJPUserRoles);
    //    let firstName = localStorage.getItem("user.firstName");
    //    let lastName = localStorage.getItem("user.lastName");
    //    let userId = localStorage.getItem("user.userId");
      
           let user = JSON.parse(sessionStorage.getItem("user"));
    //    user.firstName = firstName;
    //    user.lastName = lastName;
    //    user.role = role;
    //    user.userName = userName;
    //    user.authToken = authToken;

       return user; 
    }
 

    static isStaffRole(){
      
        return (!UserContext.isUserLoggedIn())? false:
            ((UserContext.loggedInUser.role == MJPUserRoles.Admin ||
            UserContext.loggedInUser.role == MJPUserRoles.Staff));
    
    }

    static isApplicant(){
      
        return (!UserContext.isUserLoggedIn())? false:
            (UserContext.loggedInUser.role == MJPUserRoles.Applicant);
    
    }


    static isCompanyUser(){
      
        return (!UserContext.isUserLoggedIn())? false:
            (UserContext.loggedInUser.role == MJPUserRoles.CompanyUser);
    
    }

    //Set Current Logged In User 
    static signInUser(user: MJPUser){

        sessionStorage.setItem("user", JSON.stringify(user));
    }

    static signOutUser(){
        sessionStorage.clear();
    } 

    //Update access TOKEN for guest
    //This will be updated only on Token expiry
    static updateGuestAuthToken(token: string){
        sessionStorage.setItem("guestToken",token);
    }

    static getGuestAuthToken() : string {
        //return the guet token
        return sessionStorage.getItem("guestToken");
    }

    static getAuthToken() : string {
        //return the guet token
        return (this.isUserLoggedIn()) ? this.getLoggedInUserToken():
                this.getGuestAuthToken();
    }

    static getLoggedInUserToken() {
        return this.loggedInUser.authToken;
        // var user = this.loggedInUser;
        // if(user == null){
        //     //There is no Logged in user...
        //     //return GUEST Token
        //     return localStorage.getItem("guestToken");
        // }
        // else {
        //     //User is loggeed Im. return his token
        //     return user.authToken;
        // }
    }


    static isUserLoggedIn() {
        return (UserContext.loggedInUser != null);
    }

}