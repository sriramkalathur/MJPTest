import { ProcessingMessage, Status, TextBox } from "common";
import React from "react";
import { ChangePasswordModel } from "../../models/UserModels";
import { Formik, FormikProps } from "formik";
import { UserService } from "../../services/UserService";
import { Button, Col, Row } from "reactstrap";
import { MJPCommonUtils } from "../../common/CommonUtils";
import { UserContext } from "../../authentication/UserContext";
import { MJPRouteUtils } from "../../common/MJPRouteUtils";
import { PageTitle } from "../MJPComponents";

class PropsModel {

}

class StateModel {

    status: Status;

    statusMessage: string;
}

export class ChangePasswordPage extends React.Component<PropsModel,StateModel> {

    private userService: UserService;

    private formState: FormikProps<ChangePasswordModel>;

    constructor(props: any){
        super(props);

        this.state = { status: Status.None, statusMessage: ""};
        this.userService = new UserService();
    }


    async changePassword() {

        this.setState({
            status: Status.Processing,
            statusMessage: "Processing.."
        });

        //Set the token..  
        //AuthUtilities.signInUser(cmsUser);
        var result = await this.userService.changePassword(this.formState.values);
       
        this.setState({
            status: Status.None,
            statusMessage: null
        });

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

            UserContext.signOutUser();
            //Navigate to Home
            MJPRouteUtils.navigateToHome();
        }

    }

    renderBody(){
        return (<div className="pdTop10">
        <PageTitle title="Change Password" />
        <div>
            {
                (this.state.status == Status.Processing) &&
                <ProcessingMessage statusMessage={ this.state.statusMessage }  />
            }
        </div>
        <div >
            <TextBox fieldName="oldPassword"
                label="Old Password"
                type="password"
                onChange={this.formState.handleChange}
                errorMessage={this.formState.errors.oldPassword}
                value={this.formState.values.oldPassword} />
        </div>

        <div >
            <TextBox fieldName="newPassword"
                label="New Password"
                type="password"
                onChange={this.formState.handleChange}
                errorMessage={this.formState.errors.newPassword}
                value={this.formState.values.newPassword} />
        </div>
 
        <div className="py-2">
                <div className="float-right">

                    <Button color="teal" outline
                        onClick={async () => { await this.changePassword(); }}>Confirm</Button>
                </div>
                <div className="clear-right">&nbsp;</div>
            </div>
            
        </div>);
    }

    render() {
     
        return (<div>
            <Row>
                <Col xs="3">
                    <Formik
                        initialValues={  new ChangePasswordModel() }
                        validateOnChange={false}
                        validateOnBlur={false}
                        onSubmit={(e) => { }}>
                        {
                            (props) => {
                                this.formState = props;
                                return this.renderBody();
                            }
                        }
                    </Formik>
                </Col>
                </Row>
            </div>);
    }
}