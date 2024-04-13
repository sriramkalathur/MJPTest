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
import { ApplicationInfo, BulkJobPositionApplyModel, JobPositionInformation } from "../../../models/JobPositions";
import { JobApplicationService } from "../../../services/JobApplicationService";
import { JobPositionProfile } from "../../../models/JobPositionModels";

class PropsModel {

    //Close Popup
    closePopup?: (dialogResult: DialogResult) => Promise<void>;

    //Indicates whether the popup is Open
    isOpen: boolean;

    //Selected ApplicantIds
    
    profiles: Array<JobPositionProfile>;

    //The position for which to Apply
    jobPosition: JobPositionInformation;
}

class StateModel {

    status: Status;

    statusMessage: string;
}


export class JobPositionApplyPopup extends React.Component<PropsModel, StateModel> {


    formState: FormikProps<BulkJobPositionApplyModel>;

    service: JobApplicationService;

    //position: JobPositionInformation;

    model: BulkJobPositionApplyModel;

    constructor(props: any) {
        super(props);

        this.state = {
            status: Status.None,
            statusMessage: ""
        };

       
        this.service = new JobApplicationService();
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
                <FieldLabel label="Job Code">
                    <b> { this.props.jobPosition.jobCode} </b>
                </FieldLabel>
            </div>
             <div>
                <FieldLabel label="Job Code">
                    { this.props.jobPosition.rank}
                </FieldLabel>
            </div>

            <div>
                 <FieldLabel label="Applicants">
                    <> {
                      <span>{  this.props.profiles.map((item) => item.email + ",") }</span>
                       
                    }</>
                </FieldLabel>
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
                <div className="px-2 py-2"> <ProcessingMessage statusMessage={this.state.statusMessage} /> </div>
            }
            {this.renderFields()}
        </>);
    }


    renderForm() {

       // const clonedObj = this.props.model;
       var clonedObj = new BulkJobPositionApplyModel();
       clonedObj.applicants = this.props.profiles.map((item) => item.applicantId);

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



    private async applyToJob(): Promise<void> {
        //Clear the errors..
         MJPCommonUtils.clearErrors(this.formState);

        this.setState({
            status: Status.Processing,
            statusMessage: "Applying for Job"
        });

        //Call job feature
        //set the ids
        this.formState.values.applicants = this.props.profiles.map((item) => item.applicantId);
        this.formState.values.jobPositionId = this.props.jobPosition.jobPositionId;
        
        var result = await this.service.bulkApplyForPosition(this.formState.values);

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

                <Button color="teal" className="mx-2" size="sm" outline onClick={async (e) => await this.applyToJob()}>
                    <FiCheck />&nbsp;Apply
                </Button>
                <Button color="teal" className="mx-2" size="sm" outline onClick={async (e) => await this.closePopup(DialogResult.Cancel)}>
                    <AiOutlineClose /> Cancel
                </Button>
            </div>
        </div>);
    }

}
