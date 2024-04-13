import { FieldLabel, ProcessingMessage, Status, TextBox } from "common";
import React from "react";
import { UserLoginModel } from "../../models/AccountModels";
import { Field, Formik, FormikProps } from "formik";
import { UserRegistrationModel } from "../../models/UserModels";
import { Button, Col, Row } from "reactstrap";
import { PageProcessingStatus, PageTitle } from "../MJPComponents";
import { FiCheck } from "react-icons/fi";
import { MJPRouteUtils } from "../../common/MJPRouteUtils";
import { AiOutlineClose } from "react-icons/ai";
import { UserService } from "../../services/UserService";
import { MJPCommonUtils } from "../../common/CommonUtils";
import { MJPUser, UserContext } from "../../authentication/UserContext";

class PropsModel {

}

class StateModel {
    status: Status;

    statusMessage: string
}

export class RegisterUser extends React.Component<PropsModel, StateModel>{

    private formState: FormikProps<UserRegistrationModel>;

    private userService: UserService;

    constructor(props: any) {
        super(props);

        this.state= {
            status: Status.None,
            statusMessage: ""
        };

        this.userService = new UserService();
    }

    renderFields() {

        return (
            <div>
                <TextBox fieldName="firstName"
                    label="First Name" isMandatory={true}
                    onChange={this.formState.handleChange}
                    errorMessage={this.formState.errors.firstName}
                    value={this.formState.values.firstName} />
              
                <TextBox fieldName="lastName"
                    label="Last Name" isMandatory={true}
                    onChange={this.formState.handleChange}
                    errorMessage={this.formState.errors.lastName}
                    value={this.formState.values.lastName} />
              
           
                <TextBox fieldName="mobileNumber"
                    label="Mobile Number" isMandatory={true}
                    onChange={this.formState.handleChange}
                    errorMessage={this.formState.errors.mobileNumber}
                    value={this.formState.values.mobileNumber} />
               
                <TextBox fieldName="email"
                    label="Email" isMandatory={true}
                    onChange={this.formState.handleChange}
                    errorMessage={this.formState.errors.email}
                    value={this.formState.values.email} />
           
                <TextBox fieldName="password" type="password"
                        label="Password"  isMandatory={true}
                        onChange={this.formState.handleChange}
                        errorMessage={this.formState.errors.password}
                        value={this.formState.values.password} />
             </div>);
    }



    async registerUser() {

        MJPCommonUtils.clearErrors(this.formState);
        this.formState.setErrors([] as any);

        this.setState({
            status: Status.Processing,
            statusMessage: "Registering User.."
        });

        //Set the token..  
        //AuthUtilities.signInUser(cmsUser);
        var result = await this.userService.registerUser(this.formState.values);
      
      
        if (!result.success) {
            //Invalid.Validation errors
            MJPCommonUtils.updateErrors(result, this.formState);
            //Set the failure status
            this.setState({ status: Status.Failure,
               statusMessage: "Save failed. Please fix the validation errors and try again" });
        } 
        else {   
            
            // User registration success... 
            // The response will contain the User token
            // Use that and login and navigate to edit profile
            UserContext.signInUser(result.response as any);
            MJPRouteUtils.navigateToEditProfile();
            // this.setState({ status: Status.Success,
            //     statusMessage: "User registration successful. Your profile will be reviewed and activated" });
        }
    }

    renderActionButtons(){
        return (     
            <div>
                  <Button outline  color="teal" className="ml-2"
                      onClick={ async (e)=> {
                        //save the details
                        await this.registerUser();
                    }}> <FiCheck />&nbsp;Register</Button>
             
                    <Button outline color="teal" className="ml-2"
                         onClick={ (e) => MJPRouteUtils.navigateToHome() } > 
                    <AiOutlineClose /> Cancel</Button>
            </div>);
    }

    renderBody() {
        return (<div>
            <div>
                <PageTitle title="New User Registration" actionButtons= { this.renderActionButtons() } />
            </div>
            <PageProcessingStatus status={this.state.status} statusMessage={ this.state.statusMessage} />
            <Row>
                <Col xs="4">
                { this.renderForm() }
                </Col>
               
            </Row>
        </div>);
    }

    renderForm() {
        return (<Formik
            initialValues={new UserRegistrationModel()}
            validateOnChange={false}
            validateOnBlur={false}
            onSubmit={(e) => { }}>
            {
                (props) => {
                    this.formState = props;
                    return this.renderFields();
                }
            }
        </Formik>);
    }

    render() {
        return this.renderBody();
    }
}
