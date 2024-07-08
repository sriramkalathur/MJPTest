import { DateField, DialogResult, DropdownList, ListItem, ProcessingMessage, Status, TextBox } from "common";
import React from "react";
import { Formik, FormikProps } from "formik";
import { Button, Col, Dropdown, FormFeedback, Input, Label, Modal, ModalBody, ModalHeader, Row } from "reactstrap";

import { AiFillDelete, AiOutlineClose } from "react-icons/ai";
import { FiCheck } from "react-icons/fi";
import { AiOutlineCloudServer } from "react-icons/ai";
import { ApplicantDocument } from "../../../models/ApplicantModels";
import { ApplicantService } from "../../../services/ApplicantService";
import { MJPCommonUtils } from "../../../common/CommonUtils";
import { CompetencyCertificate, STCWCourse } from "../../../models/ApplicantCourses";
import { ApplicantCourseService } from "../../../services/ApplicantCourseService";

class PropsModel {

    //Close Popup
    closePopup?: (dialogResult: DialogResult) => Promise<void>;

    isOpen: boolean;

    model: STCWCourse;

    courses: ListItem[];
}

class StateModel {

    status: Status;

    statusMessage: string;

    model: STCWCourse;
}


export class EditSTCWCoursePopup extends React.Component<PropsModel, StateModel> {


    formState: FormikProps<STCWCourse>;

    service: ApplicantCourseService;


    expiryDateNonApplicableList: Array<number>;

    constructor(props: any) {
        super(props);

        this.state = {
            status: Status.None,
            statusMessage: "",
            model: null
        };

        this.service = new ApplicantCourseService();
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
                <DropdownList labelText="Course" fieldName="courseId"
                    onChange={this.formState.handleChange} addDefaultSelect={true} isMandatory={true}
                    errorMessage={this.formState.errors.courseId}
                    value={this.formState.values.courseId}
                    options={this.props.courses}
                    displayMember="displayText" valueMember="itemId" />
           </div>
           <Row>
                <TextBox label="Certificate Number" fieldName="certificateNumber"
                    onChange={this.formState.handleChange} isMandatory={true}
                    errorMessage={this.formState.errors.certificateNumber} class="col-6"
                    value={this.formState.values.certificateNumber} />
            </Row>
           
            <Row>
                <Col xs="6">
                    <DateField label="Issue Date" fieldName="issueDate"
                        date={this.formState.values.issueDate} isMandatory={true}
                        onChange={this.formState.handleChange}
                        errorMessage={this.formState.errors.issueDate as string} />
                </Col>
                <Col xs="6">
                    <DateField label="Expiry Date" fieldName="expiryDate"
                        date={this.formState.values.expiryDate} 
                        onChange={this.formState.handleChange}
                        errorMessage={this.formState.errors.expiryDate as string} />
                </Col>
            </Row>
            <div>
                <TextBox label="Issue Place" fieldName="issuePlace"
                    value={this.formState.values.issuePlace} isMandatory={true}
                    onChange={this.formState.handleChange}
                    errorMessage={this.formState.errors.issuePlace} />
            </div>
            <div>
                <TextBox label="Details" fieldName="details"
                    onChange={this.formState.handleChange} 
                    errorMessage={this.formState.errors.details}
                    value={this.formState.values.details} />
                
            </div>
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

        const clonedObj = this.props.model;

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
                Update Course
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
            model: this.formState.values
        });

        await this.props.closePopup(dialogResult);
        //this.props.closePopup(dialogResult);
    }



    private async UpdateCourse(): Promise<void> {
        //Clear the errors..
        debugger;
        MJPCommonUtils.clearErrors(this.formState);

        this.setState({
            status: Status.Processing,
            statusMessage: "Updating Document"
        });

        //Call job feature
        var result = await this.service.updateCourse(this.formState.values);

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

                <Button color="teal" className="mx-2" size="sm" outline onClick={async (e) => await this.UpdateCourse()}>
                    <FiCheck />&nbsp;Confirm
                </Button>
                <Button color="teal" className="mx-2" size="sm" outline onClick={async (e) => await this.closePopup(DialogResult.Cancel)}>
                    <AiOutlineClose /> Cancel
                </Button>
            </div>
        </div>);
    }

}
