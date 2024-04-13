

import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import { SearchJobPositions } from "./pages/JobApplication/SearchJobPositions";

import { MJPLayout } from "./MJPLayout";
import { JobApplicationDetailsView } from "./pages/JobApplication/JobApplicationDetailsView";
import { LoginPage } from "./pages/Account/Login";
import ErrorHandler from "./common/ErrorHandler";
import { JobApplication } from "./models/JobPositions";

import { MyJobApplicationsView } from "./pages/JobApplication/MyApplicationsView";
import { JobPositionDetails } from "./pages/MJPComponents";
import { EditJobPositionDetails } from "./pages/JobPosition/EditJobPositionDetails";
import { JobApplicationsList } from "./pages/JobApplication/JobApplicationsList";
import { FilterJobPositions } from "./pages/JobPosition/FilterJobPositions";
import { RegisterUser } from "./pages/Account/RegisterUser";
import { CompanyList } from "./pages/Company/CompanyList";
import { EditCompany } from "./pages/Company/EditCompany";
import { LoggedInRoute } from "./authentication/LoggedInPage";
import { MJPUser, UserContext } from "./authentication/UserContext";
import { ApplicantPolicy, CompanyPolicy, StaffPolicy } from "./authentication/AuthPolicies";
import { UserService } from "./services/UserService";

import { JobApplicationsReport } from "./pages/Reports/JobApplicationsReport";
import { RecommendedCompaniesList } from "./pages/Company/RecommendedCompanies";
import { ResetPasswordPage } from "./pages/Account/ResetPassword";
import { ChangePasswordPage } from "./pages/Account/ChangePassword";
import { Home } from "./pages/Home";
import Example from "./pages/TestPage";
import { EditApplicantProfile } from "./pages/Applicant/EditApplicantProfile";
import { JobPositionApply } from "./pages/Applicant/JobPositionApply";
import { CompanyApplications } from "./pages/JobApplication/CompanyApplications";
import { ApplicantProfileView } from "./pages/Applicant/ApplicantProfileView";
import { LoginType } from "./models/AccountModels";
import { ApplicantsList } from "./pages/Applicant/ApplicantsList";
import { OurServicesPage } from "./pages/OurServices";
import { ContactUs } from "./pages/ContactUs";


export class MJPApp extends React.Component { 

    componentDidMount(){
        document.title = "Mariners Job Portal";
    }
    

    renderApplicantRoutes(){
        return (<Switch>
                 <LoggedInRoute path="/myapplications" exact={true}
                    policy={ ApplicantPolicy }>
                    <MyJobApplicationsView />
                 </LoggedInRoute>
 

                 <LoggedInRoute path="/myapplication" exact={true}   
                     policy={ ApplicantPolicy } 
                     render={(props) => {
                        let queryString = new URLSearchParams(props.location.search);
                        var jobPositionId = parseInt(queryString.get("jobPositionId"));

                        //Always pass the applicationId as NULL so that the system
                        //autoteches the detias
                        return (<JobApplicationDetailsView jobPositionId={jobPositionId}
                                    jobApplicationId={null} />)
                    }} />

                 <LoggedInRoute path="/myprofile" exact={true}
                    policy={ ApplicantPolicy }>
                       <ApplicantProfileView  applicantId={UserContext.isUserLoggedIn()? UserContext.loggedInUser.userId: 0 }  /> 
                 </LoggedInRoute>


                 <LoggedInRoute path="/editmyprofile" exact={true}
                    policy={ ApplicantPolicy }>
                       <EditApplicantProfile  applicantId={UserContext.isUserLoggedIn()? UserContext.loggedInUser.userId: 0}  /> 
                 </LoggedInRoute>

                 <LoggedInRoute path="/changepassword" exact={true}
                    policy={ ApplicantPolicy }>
                    <ChangePasswordPage />  
                 </LoggedInRoute>
        </Switch>);
    }

    private NEW_ITEM_ID = 0;


    renderCompanyUserRoutes(){
        return (<Switch>
                <LoggedInRoute path="/jobapplications" exact={true} policy={ CompanyPolicy }>
                    <CompanyApplications   />
                </LoggedInRoute>

                <LoggedInRoute path="/jobpositions" exact={true} policy={ CompanyPolicy }>
                    <FilterJobPositions />
                </LoggedInRoute>

                <LoggedInRoute path="/jobpositiondetails" exact={true}   
                     policy={ CompanyPolicy }
                     render={(props) => {
                        let queryString = new URLSearchParams(props.location.search);
                        var jobPositionId = parseInt(queryString.get("jobPositionId"));

                        return (<EditJobPositionDetails jobPositionId={jobPositionId} />)
                    }} />

                <LoggedInRoute path="/newposition" exact={true} policy={ CompanyPolicy }>
                    <EditJobPositionDetails jobPositionId={this.NEW_ITEM_ID}  />
                </LoggedInRoute>


                <LoggedInRoute path="/applicantprofile" exact={true}   
                     policy={ CompanyPolicy } 
                     render={(props) => {
                        let queryString = new URLSearchParams(props.location.search);
                        var applicantId = parseInt(queryString.get("applicantId"));

                         //Always pass the applicationId as NULL so that the system
                        //autoteches the detias
                        return (<ApplicantProfileView applicantId={applicantId} />)
                    }} />

                </Switch>);
    }
 
    renderStaffRoutes(){
        return (<Switch>
                
                <LoggedInRoute path="/applicantprofile" exact={true}   
                     policy={ StaffPolicy } 
                     render={(props) => {
                        let queryString = new URLSearchParams(props.location.search);
                        var applicantId = parseInt(queryString.get("applicantId"));

                         //Always pass the applicationId as NULL so that the system
                        //autoteches the detias
                        return (<ApplicantProfileView applicantId={applicantId} />)
                    }} />

                <LoggedInRoute path="/editApplicantProfile" exact={true}   
                     policy={ StaffPolicy } 
                     render={(props) => {
                        let queryString = new URLSearchParams(props.location.search);
                        var applicantId = parseInt(queryString.get("applicantId"));

                         //Always pass the applicationId as NULL so that the system
                        //autoteches the detias
                        return (<EditApplicantProfile applicantId={applicantId} />)
                    }} />

                <LoggedInRoute path="/newposition" exact={true} policy={ StaffPolicy }>
                    <EditJobPositionDetails jobPositionId={this.NEW_ITEM_ID}  />
                </LoggedInRoute>

                <LoggedInRoute path="/application" exact={true}   
                     policy={ StaffPolicy }
                     render={(props) => {
                        let queryString = new URLSearchParams(props.location.search);
                        var jobPositionId = parseInt(queryString.get("jobPositionId"));
                        var jobAppicationId = parseInt(queryString.get("jobAppicationId"));

                        return (<JobApplicationDetailsView jobPositionId={jobPositionId}
                                    jobApplicationId={jobAppicationId} />)
                    }}>
                </LoggedInRoute>

                { <LoggedInRoute path="/applicants" exact={true} 
                    policy={ StaffPolicy }
                        render={(props) => {
                        return (<ApplicantsList /> )
                    
                    }}>
                    </LoggedInRoute> 
                }



                <LoggedInRoute path="/jobPositionApply" exact={true} 
                    policy={ StaffPolicy }
                    render={(props) => {
                        let queryString = new URLSearchParams(props.location.search);
                        var jobPositionId = parseInt(queryString.get("jobPositionId"));
                      
                        return (<JobPositionApply jobPositionId={jobPositionId} />);
                    }}>            
                </LoggedInRoute>

                <LoggedInRoute path="/jobpositions" exact={true} policy={ StaffPolicy }>
                    <FilterJobPositions />
                </LoggedInRoute>

                <LoggedInRoute path="/applications" exact={true} policy={ CompanyPolicy }>
                    <JobApplicationsList />
                </LoggedInRoute>

                <LoggedInRoute path="/companies" exact={true} policy={ StaffPolicy }>
                    <CompanyList />
                </LoggedInRoute>

                 <LoggedInRoute path="/jobpositiondetails" exact={true}   
                     policy={ StaffPolicy }
                     render={(props) => {
                        let queryString = new URLSearchParams(props.location.search);
                        var jobPositionId = parseInt(queryString.get("jobPositionId"));

                        return (<EditJobPositionDetails jobPositionId={jobPositionId} />)
                    }} />
                <LoggedInRoute path="/newcompany" exact={true} policy={ StaffPolicy }>
                    <EditCompany companyId={this.NEW_ITEM_ID}  />
                </LoggedInRoute>
                
                <LoggedInRoute path="/company" exact={true} policy={ StaffPolicy }
                         render={(props) => {
                       
                            let queryString = new URLSearchParams(props.location.search);
                            var companyId = parseInt(queryString.get("companyId"));

                           return (<EditCompany companyId={companyId}  />);
                            
                         }}> 
                </LoggedInRoute>

                <LoggedInRoute path="/applicationsreport" exact={true} policy={ StaffPolicy }>
                    <JobApplicationsReport />
                </LoggedInRoute>

                <LoggedInRoute path="/editprofile" exact={true} policy={ StaffPolicy }
                    render={(props) => {
                       
                       let queryString = new URLSearchParams(props.location.search);
                       var applicantId = parseInt(queryString.get("applicantId"));

                      return  (<EditApplicantProfile applicantId={applicantId} />);
                       
                    }}>
                </LoggedInRoute>
        </Switch>);  
    }


    renderAdminRoutes(){
        //Nothing special now for Admin
        return (<></>);
    }


    renderOtherRoutes() {
        //Routes that are accessible to all logged in & not logged in users
        return (

            <Switch>

               
                 <Route path="/login" exact={true}>
                    <LoginPage loginType={LoginType.Applicant} />
                 
                 </Route>

                 <Route path="/contact" exact={true}>
                 <MJPLayout>
                    <ContactUs />
                    </MJPLayout>
                </Route>

                <Route path="/" exact={true}
                        render={(props) => {
                            return (<MJPLayout><Home /> </MJPLayout>);
                        }}>
                </Route> 

 
                <Route path="/services" exact={true}
                        render={(props) => {
                            return (<MJPLayout><OurServicesPage /> </MJPLayout>);
                        }}>
                </Route> 

                <Route path="/contact" exact={true}
                        render={(props) => {
                            return (<MJPLayout><ContactUs /> </MJPLayout>);
                        }}>
                </Route> 

                <Route path="/stafflogin" exact={true}
                     render={(props) => {
                        return <LoginPage loginType={LoginType.Staff} />
                    }}>
                </Route>

                <Route path="/companylogin" exact={true}
                     render={(props) => {
                        return <LoginPage loginType={LoginType.CompanyUser} />
                    }}>
                </Route>

                <Route path="/resetpassword" exact={true}
                     render={(props) => {
                        return <ResetPasswordPage />
                    }}>
                </Route>

                <Route path="/recommended" exact={true}
                     render={(props) => {
                        return (<MJPLayout>
                                <RecommendedCompaniesList  />
                            </MJPLayout>);
                    }}>
                </Route>

            

                <Route path="/signout" exact={true} 
                     render={(props) => {

                        //Clear the token and call login..
                        //SigOut has no effect if the user hasnotlogged In
                        if(UserContext.isUserLoggedIn()) {
                            //Check the userrole and navigate to correpsonidng logins
                            if(UserContext.isApplicant()) {
                                //User .
                                UserContext.signOutUser();
                                return (<MJPLayout><Home /></MJPLayout>);
                            }
                            else if(UserContext.isStaffRole()) {
                                UserContext.signOutUser();
                                return (<LoginPage loginType={LoginType.Staff} />);
                            }
                            else if(UserContext.isCompanyUser()) {
                                UserContext.signOutUser();
                                return (<LoginPage loginType={LoginType.CompanyUser} />);
                            }
                        }
                        else {
                            //User has not logged in/forgot to signout..
                            UserContext.signOutUser();
                        }
                    }}>
                </Route>

                { /* JobPosition can be viewded by not logged in user also */}
                <Route path="/jobPosition" exact={true}
                     render={(props) => {
                       
                        let queryString = new URLSearchParams(props.location.search);
                        var jobPositionId = parseInt(queryString.get("jobPositionId"));

                        return (<MJPLayout>
                            <JobApplicationDetailsView  
                                    jobPositionId={jobPositionId} />
                            </MJPLayout>);
                    }}>         
                </Route>

                <Route path="/home" exact={true}   
                     render={(props) => {

                        if(UserContext.isUserLoggedIn()) {
                            //Return the corresponding page based on login
                            if(UserContext.isStaffRole()) {
                                return (<MJPLayout> <JobApplicationsList /> </MJPLayout>);
                            }
                             else if(UserContext.isCompanyUser()) {
                                return (<MJPLayout> <CompanyApplications /> </MJPLayout>);
                            }
                            else {   
                                //Applicant
                                return (<MJPLayout> <Home /> </MJPLayout>);
                            }
                        }
                        else {
                            //Not logged in user.. Show general HOME
                            return (<MJPLayout> <Home /> </MJPLayout>);
                        }
                      
                    }}>
                </Route>

                <Route path="/searchpositions" exact={true}   
                     render={(props) => {
                        let queryString = new URLSearchParams(props.location.search);
                        var companyId = queryString.get("companyId");
                        var rank = queryString.get("rankId");

                        var companies = (companyId == null)? null: [ parseInt(companyId) ];
                        var rankId = (rank == null) ? null: parseInt(rank);
                        
                        return (<MJPLayout>
                            <SearchJobPositions companies={companies} rankId={rankId} /> 
                        </MJPLayout>) 
                    }}>
                </Route>
  

                
                 <Route path="/register" exact={true}   
                     render={(props) => {
                        return (<MJPLayout>
                            { <RegisterUser /> }
                        </MJPLayout>)
                    }}>
                </Route>
            </Switch>);
    }

    render() {   
        return ( 
        <ErrorHandler>
        <div className="container-fluid">
            {this.renderOtherRoutes()}
            { UserContext.isStaffRole() && this.renderStaffRoutes()}
            { UserContext.isApplicant() && this.renderApplicantRoutes()}
            { UserContext.isCompanyUser() && this.renderCompanyUserRoutes()}
            
         </div>
         </ErrorHandler>);
    } 
}