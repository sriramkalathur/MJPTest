import { DateField, DialogResult, DropdownList, ListItem, ProcessingMessage, Status, TextBox } from "common";
import React from "react";
import { Formik, FormikProps } from "formik";
import { Button, Col, Dropdown, FormFeedback, Input, Label, Modal, ModalBody, ModalHeader, Row } from "reactstrap";

import { AiFillDelete, AiOutlineClose } from "react-icons/ai";
import { FiCheck } from "react-icons/fi";
import { AiOutlineCloudServer } from "react-icons/ai";
import { ApplicantDocument, SEAExperience } from "../../../models/ApplicantModels";
import { ApplicantService } from "../../../services/ApplicantService";
import { MJPCommonUtils } from "../../../common/CommonUtils";
import { CompetencyCertificate, STCWCourse } from "../../../models/ApplicantCourses";
import { ApplicantCourseService } from "../../../services/ApplicantCourseService";

class PropsModel {

    //Close Popup
    closePopup?: (dialogResult: DialogResult) => Promise<void>;

    isOpen: boolean;

    model: SEAExperience;
}

class StateModel {

    status: Status;

    statusMessage: string;

    model: SEAExperience;
}
 

export class EditSEAExperiencePopup extends React.Component<PropsModel, StateModel> {


    formState: FormikProps<SEAExperience>;

    service: ApplicantService;

    constructor(props: any) {
        super(props);

        this.state = {
            status: Status.None,
            statusMessage: "",
            model: null
        };

        this.service = new ApplicantService();
    }



    renderCloseButton() {
        return (<button className="close"
            onClick={(e) => this.closePopup(DialogResult.Cancel)} type="button">
            &times;
        </button>);
    }



    renderFields() {
        return (<>
            <Row>
                <Col xs="6">
                    <TextBox label="Company Name" fieldName="companyName"
                        onChange={this.formState.handleChange} isMandatory={true}
                        errorMessage={this.formState.errors.companyName}
                        value={this.formState.values.companyName} />
                </Col>
                <Col xs="6">
                    <TextBox label="Vessel Name" fieldName="vesselName"
                        onChange={this.formState.handleChange} isMandatory={true}
                        errorMessage={this.formState.errors.vesselName}
                        value={this.formState.values.vesselName} />
                </Col>
            </Row>
            <Row>
                <Col xs="6">
                    <TextBox label="Type" fieldName="type"
                        onChange={this.formState.handleChange}  isMandatory={true}
                        errorMessage={this.formState.errors.type}
                        value={this.formState.values.type} />
                </Col>
           
                <Col xs="6">
                    <TextBox label="GRT" fieldName="grt"
                        onChange={this.formState.handleChange} isMandatory={true}
                        errorMessage={this.formState.errors.grt}
                        value={this.formState.values.grt} />
                </Col>
                </Row>
                <Row>
                <Col xs="6">
                    <TextBox label="BHP" fieldName="bhp"
                        onChange={this.formState.handleChange} isMandatory={false}
                        errorMessage={this.formState.errors.bhp}
                        value={this.formState.values.bhp} />
                </Col>
          
                <Col xs="6">
                    <TextBox label="Rank" fieldName="rank"
                        onChange={this.formState.handleChange}   isMandatory={true}
                        errorMessage={this.formState.errors.rank}
                        value={this.formState.values.rank} />
                </Col>
                </Row>
                <Row>
                <Col xs="6">
                    <DateField label="Sign On date" fieldName="fromDate"
                        date={this.formState.values.fromDate} isMandatory={true}
                        onChange={this.formState.handleChange}
                        errorMessage={this.formState.errors.fromDate as string} />
                </Col>
                <Col xs="6">
                    <DateField label="Sign Off date" fieldName="toDate"
                        date={this.formState.values.toDate} 
                        onChange={this.formState.handleChange}
                        errorMessage={this.formState.errors.toDate as string} />
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
        return (<Modal isOpen={this.props.isOpen} className="wd500">
            <ModalHeader className="bklightblue" close={this.renderCloseButton()}>
                Update SEA Experience
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
            statusMessage: "Updating Experience"
        });

        //Call job feature
        var result = await this.service.updateSEAExperience(this.formState.values);

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
