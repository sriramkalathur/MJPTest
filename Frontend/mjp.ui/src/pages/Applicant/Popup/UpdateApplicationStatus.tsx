import { DateField, DialogResult, DropdownList, FieldLabel, ListItem, ProcessingMessage, Status, TextBox } from "common";
import React from "react";
import { Formik, FormikProps } from "formik";
import { Button, Col, Dropdown, FormFeedback, Input, Label, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
 
import { AiFillDelete, AiOutlineClose } from "react-icons/ai";
import { FiCheck } from "react-icons/fi";
import { AiOutlineCloudServer } from "react-icons/ai";
import { ApplicantDocument, ApplicantInfo } from "../../../models/ApplicantModels";
import { ApplicantService } from "../../../services/ApplicantService";
import { MJPCommonUtils } from "../../../common/CommonUtils";
import { CompetencyCertificate, STCWCourse } from "../../../models/ApplicantCourses";
import { ApplicantCourseService } from "../../../services/ApplicantCourseService";
import { ApplicationInfo, BulkJobPositionApplyModel, JobApplication, JobPositionInformation } from "../../../models/JobPositions";
import { JobApplicationService } from "../../../services/JobApplicationService";
import { ApplicationStatus, JobPositionProfile } from "../../../models/JobPositionModels";
import { MJPConstants } from "../../../MJPConstants";
import { ChoiceItem, ChoiceList } from "../../../common/ChoiceList";
import { MdAddToHomeScreen } from "react-icons/md";

class PropsModel {

    //Close Popup
    closePopup?: (dialogResult: DialogResult) => Promise<void>;

    //Indicates whether the popup is Open
    isOpen: boolean;

    //The position for which to Apply
    application: JobApplication;
}

class StateModel {

    status: Status;

    statusMessage: string;
}


export class UpdateApplicationStatus extends React.Component<PropsModel, StateModel> {


    formState: FormikProps<ApplicationStatus>;

    service: JobApplicationService;

    //position: JobPositionInformation;

    allStatus : ListItem[];

    model: ApplicationStatus;

    constructor(props: any) {
        super(props);

        this.state = {
            status: Status.None,
            statusMessage: ""
        };

        this.allStatus =[
            new ListItem(MJPConstants.APPLICATION_STATUS_SHORTLISTED, "Shortlisted"),
            new ListItem(MJPConstants.APPLICATION_STATUS_REJECTED, "Profile Rejected"),
            
            new ListItem(MJPConstants.APPLICATION_STATUS_CANCELLED, "Cancelled"),
            new ListItem(MJPConstants.APPLICATION_STATUS_ONHOLD, "On Hold"),

            new ListItem(MJPConstants.APPLICATION_STATUS_SELECTED, "Selected for Onboarding"),
            new ListItem(MJPConstants.APPLICATION_STATUS_NOT_SELECTED, "Not Selected"),
        ]
        this.service = new JobApplicationService();
    }


    shortlistedFields: Array<ChoiceItem> = [
        { choiceId: MJPConstants.APPLICATION_STATUS_SHORTLISTED, displayText: "Yes", color: "teal" },
        { choiceId: MJPConstants.APPLICATION_STATUS_REJECTED, displayText: "No", color: "teal" }
    ];

    selectedFields: Array<ChoiceItem> = [
        { choiceId: MJPConstants.APPLICATION_STATUS_SELECTED, displayText: "Yes", color: "teal" },
        { choiceId: MJPConstants.APPLICATION_STATUS_NOT_SELECTED, displayText: "No", color: "teal" }
    ];

    renderStatusFields(){

        //This field will be shown only for Applied/Shorlisted status
        //User con only change whether Shorlisted/Not (or) selected/not
        return (<div>
            {
              <DropdownList options={this.allStatus}
                    displayMember="displayText" valueMember="itemId" fieldName="statusId"
                    labelText="Application Status" isMandatory={true}
                    addDefaultSelect={true}
                    errorMessage={this.formState.errors.statusId as string}
                    value={this.formState.values.statusId as any}
                    onChange={this.formState.handleChange}  />
            }
        </div>);             
    }


    renderCloseButton() {
        return (<button className="close"
            onClick={(e) => this.closePopup(DialogResult.Cancel)} type="button">
            &times;
        </button>);
    }

 

    renderFields() {
       
        return (<>
          
            <div>
                <FieldLabel label="Application #">
                    <b> { this.props.application.applicationInfo.applicationNumber} </b>
                </FieldLabel>
            </div>
            
            <div>
                { this.renderStatusFields() }
            </div> 
            <Row>
                <Col xs="11">
                    <TextBox label="Remarks" fieldName="remarks"
                        type="textarea" rows={2}
                       
                        onChange={this.formState.handleChange}
                        errorMessage={this.formState.errors.remarks}
                        value={this.formState.values.remarks} />
                </Col>
            </Row>
           
        </>);
    }

    renderBody() {
        return (<>
            {
                (this.state.status == Status.Processing) &&
                 <ProcessingMessage statusMessage={this.state.statusMessage} /> 
            }
            {this.renderFields()}
        </>);
    }


    renderForm() {

       // const clonedObj = this.props.model;
       var clonedObj = new ApplicationStatus();
       clonedObj.jobApplicationId = this.props.application.jobApplicationId;
       
        return (<div className="pd10">
            <Formik
                initialValues={clonedObj}
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


    render() {
        return (<Modal isOpen={this.props.isOpen}>
            <ModalHeader className="bklightblue" close={this.renderCloseButton()}>
                Apply to Job
        </ModalHeader>
            <ModalBody>
                {this.renderForm()}
                {this.renderActionButtons()}
            </ModalBody>
        </Modal>);
    }

    private async closePopup(dialogResult: DialogResult) {

        this.setState({
            status: Status.None,
        });

        await this.props.closePopup(dialogResult);
        //this.props.closePopup(dialogResult);
    }



    private async updateApplication(): Promise<void> {
        //Clear the errors..
         MJPCommonUtils.clearErrors(this.formState);

        this.setState({
            status: Status.Processing,
            statusMessage: "Updating Application Details"
        });

        
        var result = await this.service.updateApplicationStatus(this.formState.values);

        this.setState({
            status: Status.None,
        });

        if (!result.success) {
            // Validation failure..
            //Set the errors
            this.formState.setErrors(result.errors);
        }
        else {
            //Sucesss. Close the Popup
            this.closePopup(DialogResult.Ok);
        }

    }



    renderActionButtons() {
        return (<div>

            <div className="float-right py-2">

                <Button color="teal" className="mx-2" size="sm" outline onClick={async (e) => await this.updateApplication()}>
                    <FiCheck />&nbsp;Confirm
                </Button>
                <Button color="teal" className="mx-2" size="sm" outline onClick={async (e) => await this.closePopup(DialogResult.Cancel)}>
                    <AiOutlineClose /> Cancel
                </Button>
            </div>
        </div>);
    }

}
