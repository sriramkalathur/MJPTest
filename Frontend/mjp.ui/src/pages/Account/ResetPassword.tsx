import React from "react";
import { Button, Row } from "reactstrap";

import { Formik, FormikProps } from "formik";
import { Redirect } from "react-router";
import { MJPUser, MJPUserRoles, UserContext } from "../../authentication/UserContext";
import { DropdownList, ListItem, ProcessingMessage, Status, TextBox } from "common";
import { UserService } from "../../services/UserService";
import { LoginType, UserLoginModel } from "../../models/AccountModels";
import { ResetPasswordModel } from "../../models/UserModels";
import { MJPCommonUtils } from "../../common/CommonUtils";
import { MJPRouteUtils } from "../../common/MJPRouteUtils";



class PropsModel { 

}


class StateModel {
    status: Status;

    statusMessage: string
}

export class ResetPasswordPage extends React.Component<PropsModel, StateModel> {

    userService: UserService;

    formState: FormikProps<ResetPasswordModel>;

   
    constructor(props: any) {
        super(props);

        this.userService = new UserService();

        this.state = {
            status: Status.None, 
            statusMessage: ""
        }
    }


    renderBody() {
        return (<div className="center-wd300">
            <Row className="border rounded titleBar pd10">

                <div className="align-text-bottom"> <h5> {process.env.REACT_APP_TITLE} </h5>
                    <h6> { process.env.REACT_APP_ENV } - { process.env.REACT_APP_VERSION } </h6></div>

            </Row>

            <div>
            {
                (this.state.status == Status.Processing) &&
                    <ProcessingMessage statusMessage= { this.state.statusMessage }   />
            }       
            {    (this.state.status == Status.Success) &&
                  <span className="success pd10"> { this.state.statusMessage }</span>
            }
            
            </div>
            <div className="pdTop10">
            <div className="col-11">
                <TextBox fieldName="email"
                    label="Email"
                    onChange={this.formState.handleChange}
                    errorMessage={this.formState.errors.email}
                    value={this.formState.values.email} />
            </div>

           
            <div className="pdTop10">
                <div className="float-right">

                    <Button color="teal" outline
                        onClick={async () => { await this.resetPassword(); }}>Reset</Button>
                </div>
                <div className="clear-right">&nbsp;</div>
            </div>
            </div>
        </div>);
    }

    STATUS_CODE_UNAUTHORISED = 401;

    async resetPassword() {

        this.setState({
            status: Status.Processing,
            statusMessage: "Processing.."
        });

        var result = await this.userService.resetPassword(this.formState.values);

        if (!result.success) {
            //Invalid.Validation errors
            MJPCommonUtils.updateErrors(result, this.formState);
            //Set the failure status
            this.setState({ status: Status.Failure,
               statusMessage: "Save failed. Please fix the validation errors and try again" });
        }
        else {   
            this.setState({
                status: Status.Success,
                statusMessage: "Password reset. Please check the email."
            });
        }
    }


    render() {
         return (<div>
        <Formik
            initialValues={  new ResetPasswordModel() }
            validateOnChange={false}
            validateOnBlur={false}
            onSubmit={(e) => { }}>
            {
                (props) => {
                    this.formState = props;
                    return this.renderBody();
                }
            }
        </Formik></div>);
    }
}