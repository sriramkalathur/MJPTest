import React from "react";
import { Button, Card, Nav, NavLink, Row } from "reactstrap";

import { Formik, FormikProps } from "formik";
import { Redirect } from "react-router";
import { MJPUser, MJPUserRoles, UserContext } from "../../authentication/UserContext";
import { DropdownList, ListItem, ProcessingMessage, Status, TextBox } from "common";
import { UserService } from "../../services/UserService";
import { LoginType, UserLoginModel } from "../../models/AccountModels";
import { MJPRouteUtils } from "../../common/MJPRouteUtils";
import { BiHome } from "react-icons/bi";
import { FiHome, FiLogIn } from "react-icons/fi";
import { AiOutlineHome, AiOutlineLogin, AiOutlineReload, AiOutlineRest, AiOutlineUser } from "react-icons/ai";
import { MdAddToHomeScreen } from "react-icons/md";

  
class PropsModel { 
    /* Type of User */
    loginType: LoginType;
}


class StateModel {
    status: Status; 

    statusMessage: string
}

export class LoginPage extends React.Component<PropsModel, StateModel> {

    userService: UserService;

    formState: FormikProps<UserLoginModel>;

    loginOptions: Array<ListItem>;

    constructor(props: any) {
        super(props);
 
        this.userService = new UserService();

        this.loginOptions = [
            new ListItem(LoginType.Staff, "Staff"),
            new ListItem(LoginType.Applicant, "Applicant"),
            new ListItem(LoginType.CompanyUser, "CompanyUser"),
        ];

        this.state = {
            status: Status.None, 
            statusMessage: ""
        }
    }

 
    getLoginType() {
        switch(this.props.loginType){
            case LoginType.Applicant : return "Applicant";
            case LoginType.CompanyUser : return "Company User";
            case LoginType.Staff : return "Staff";
            
        }
    }


    renderMenus(){
        return (<div className="py-2">
          
                <span className="px-2">
                <a href="home"> 
                <AiOutlineHome /><span className="px-1">Home</span>
                </a>
                </span>
                
                <span className="px-2">
                <a href="register">
                <AiOutlineUser /><span className="px-1">Register</span>
                </a>
                </span>

                <span className="px-2">
                <a href="resetpassword">
                <AiOutlineReload /><span className="px-1">Reset Password</span>
                </a>
                </span>
            </div>); 
    }

    renderBody() {
        return (<div className="center-wd300">
           
            {<div className="border rounded titleBar popup py-2">

                <div className="float-right">
                    <span> { this.getLoginType() } </span>
                </div>
                <div className="align-text-bottom"> <h5> {process.env.REACT_APP_TITLE} </h5>
                    <h6> { process.env.REACT_APP_ENV } - { process.env.REACT_APP_VERSION } </h6></div>

            </div>}

            { (this.props.loginType == LoginType.Applicant) && 
                ( <>
                <div className="float-right py-2">
                     { this.renderMenus() }
                     
                </div>
                <hr className="clear"/>
                </>
               )   
            }

            <div className="py-1">
            {
                (this.state.status == Status.Processing) &&
                <ProcessingMessage statusMessage="Logging In.."  />
            }
            
            </div>
         
            <div className="col-12">
               
                <TextBox fieldName="userName"
                    label={ (this.props.loginType == LoginType.Applicant) ? "Email": "User Name"}
                    onChange={this.formState.handleChange}
                    errorMessage={this.formState.errors.userName} 
                    value={this.formState.values.userName} />
            </div>

            <div className="col-12">
                <TextBox fieldName="password"
                    label="Password"
                    type="password"
                    onChange={this.formState.handleChange}
                    errorMessage={this.formState.errors.password}
                    value={this.formState.values.password} />
            </div>


            {/* <div className="col-8">
                <DropdownList
                    options={this.loginOptions}
                    fieldName="loginType" 
                    labelText="Login Type"
                    onChange={this.formState.handleChange}
                    value={ (this.formState.values.loginType as number).toString() }
                    addDefaultSelect={false}
                    displayMember="displayText" valueMember="itemId" />

            </div> */}

            <div className="pdTop10">
                <div className="float-right">
    

                <Button color="teal" outline className="mdleft10"
                        onClick={async () => { await this.loginUser(); }}><FiLogIn /> Login</Button>
                 </div>
            </div>
            <div className="clear" />
        </div>);
    }

    STATUS_CODE_UNAUTHORISED = 401;

    async loginUser() {

        this.setState({
            status: Status.Processing,
            statusMessage: "Logging In.."
        });

        //Set the token..  
        //AuthUtilities.signInUser(cmsUser);
        var result = await this.userService.getUserAPIToken(this.formState.values);
       
        this.setState({
            status: Status.None,
            statusMessage: null
        });

        if (result == null) {
            //Unauthrorized.. Just clear user name and password and stay in the same page.
            //this.formState.errors.userName = "Invalid User attempt";
            //this.formState.values.password = "";
            //To update the UI
            this.formState.setFieldError("userName", "Invalid User attempt");
        }
        else {   //Valid user
            //Sign with the user token
            UserContext.signInUser(result);
            window.location.href = "/home";
        }

    }


    render() {
        var initialState: UserLoginModel = {
            userName: "",
            password: "",
            loginType: LoginType.Staff
        };


        return (<div>
        <Formik
            initialValues={  new UserLoginModel() }
            validateOnChange={false}
            validateOnBlur={false}
            onSubmit={(e) => { }}>
            {
                (props) => {
                    this.formState = props;
                    this.formState.values.loginType = this.props.loginType;
                    return this.renderBody();
                }
            }
        </Formik></div>);
    }
}