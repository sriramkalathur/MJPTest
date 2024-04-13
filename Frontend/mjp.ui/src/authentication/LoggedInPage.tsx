import React from "react";
import { Route, Router } from "react-router";


import { AuthPolicy } from "../authentication/AuthPolicies";
import { RouteProps, RouterProps } from "react-router-dom";
import { AccessDenied } from "./AccessDenied";
import { UserContext } from "./UserContext";
import { LoginPage } from "../pages/Account/Login";
import { MJPLayout } from "../MJPLayout";
import { MJPCommonUtils } from "../common/CommonUtils";
import { Home } from "../pages/Home";
import { LoginType } from "../models/AccountModels";

class PropsModel {
    policy?: AuthPolicy; 
}

export class LoggedInRoute extends Route<PropsModel> {
 
    constructor(props: any){
        super(props);
    }

    render(){ 
        //For now return the same UI   
        if(! UserContext.isUserLoggedIn())    {
            //user not logged. Just login to home
            return <LoginPage loginType={LoginType.Applicant} />
        }
        else 
        {
            //Check authorization..
            var user = UserContext.loggedInUser;
            if(this.props.policy != null){
                //Validate the policy..
                if(! this.props.policy(user)){
                    //Authorization failed..
                    return (<MJPLayout>
                       <AccessDenied />
                    </MJPLayout>);
                }   
                else {
                    //Valid. render the content
                    return (<MJPLayout>
                    {   super.render() }
                     </MJPLayout>);
                }
            }
            else {
                //No auth policy..
                 //So Valid. render the content
                 return (<MJPLayout>
                    {   super.render() }
                     </MJPLayout>);
            }
        }
    }
}
