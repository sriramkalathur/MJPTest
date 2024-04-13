import { DialogResult, DropdownList, ListItem, ProcessingMessage, Status, TextBox } from "common";
import { JobPositionFeature, JobPositionRequirement } from "../../../models/JobPositionModels";
import React from "react";
import { Formik, FormikProps } from "formik";
import { Button, Col, Dropdown, FormFeedback, Input, Label, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import { JobFeatureContext, PopupContextProps } from "../../JobApplication/JobApplicationContext";
import { FaBold, FaItalic } from "react-icons/fa";
import { JobFeatureService } from "../../../services/JobFeatureService";
import { MJPCommonUtils } from "../../../common/CommonUtils";
import { AiFillDelete, AiOutlineClose } from "react-icons/ai";
import { FiCheck } from "react-icons/fi";
import { AiOutlineCloudServer } from "react-icons/ai";
import { JobRequirementService } from "../../../services/JobRequirementService";

class PropsModel {
     
    //Close Popup
    closePopup?: (dialogResult: DialogResult) => Promise<void>;

    isOpen: boolean;

    requirement: JobPositionRequirement;
}

class StateModel {

    status: Status;

    statusMessage: string;

    requirement: JobPositionRequirement;
}

export class EditJobRequirementPopup extends React.Component<PropsModel, StateModel> {

   
    formState: FormikProps<JobPositionRequirement>;

    requirementService: JobRequirementService;

    constructor(props: any){
        super(props);

        this.state = {
           status: Status.None,
           statusMessage: "",
           requirement: null
        };

        this.requirementService = new JobRequirementService(); 
    }



    renderCloseButton() {
        return (<button className="close" 
            onClick={(e) => this.closePopup(DialogResult.Cancel)} type="button">
          &times;
        </button>);
    }


    
    renderFields() {

        var yesNoOptions = [
            { displayText: "Yes", value : true},
            { displayText: "No", value : false}
        ];

        return (<>
            <Row className="py-2">
                <Col xs="12">
                    <TextBox type="textarea" label="Decription"  fieldName="description"
                        onChange={ this.formState.handleChange }
                        rows={2}
                        errorMessage={ this.formState.errors.description }
                        value = {this.formState.values.description} />
                </Col>
           </Row>
            <Row className="py-2">
              <Col xs="6">
                <DropdownList labelText="Mandatory"  options={ yesNoOptions }
                    displayMember="displayText" valueMember="value"
                    addDefaultSelect={true} fieldName="isMandatory"
                    onChange={ this.formState.handleChange }
                    errorMessage= { this.formState.errors.isMandatory}
                    value = { (this.formState.values.isMandatory) ? "true": "false" } />
              </Col>
            </Row>      
        </>);
    }

    renderBody() {
        return (<>
          {
            (this.state.status == Status.Processing) && 
               <div className="px-2 py-2"> <ProcessingMessage statusMessage="Processing..."/> </div>
          }
          { this.renderFields() }
        </>);
    }


    renderForm() {
       
       const clonedObj =  this.props.requirement;

       return (<div className="pd10">
          <Formik
            initialValues={  clonedObj }
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
                <h6>Job Feature Edit</h6></ModalHeader>
            <ModalBody>
                {this.renderForm()}
                {this.renderActionButtons()}
            </ModalBody>
          </Modal>);
    }

    private async closePopup(dialogResult: DialogResult) {

        this.setState({ status: Status.None,
          requirement: this.formState.values });
      
        await this.props.closePopup(dialogResult);
        //this.props.closePopup(dialogResult);
    }



    private async UpdateJobFeature() : Promise<void>{
      //Clear the errors..
      debugger;
      MJPCommonUtils.clearErrors(this.formState);

      this.setState({
         status: Status.Processing,
         statusMessage: "Updating Job Feature" 
      });

      //Call job feature
      var result = await this.requirementService.updateJobFeature(this.formState.values);

      this.setState({
        status: Status.None,
      });

      if(!result.success){
        // Validation failure..
        //Set the errors
        this.formState.setErrors(result.errors);
      }
      else {
        //Sucesss. Close the Popup
        this.closePopup(DialogResult.Ok);
      }
      
    }

    async deleteFeature(): Promise<void> {
      
        this.setState({
          status: Status.Processing,
          statusMessage: "Deleteing Job Feature" 
      });

     //Call job feature
     var result = await this.requirementService.deleteJobRequirement(this.formState.values.jobPositionRequirementId);

     this.setState({
       status: Status.None,
     });

     //Close the popup..
     this.closePopup(DialogResult.Ok);
    }

    renderActionButtons() {
        return (<div>
         
          <div className="float-right py-2"> 
            <Button color="teal" size="sm" className="mx-2" outline onClick={async (e) => await this.deleteFeature()}>
              <AiFillDelete  />&nbsp;
              Delete
            </Button>
            <Button color="teal" className="mx-2" size="sm" outline onClick={async (e) => await this.UpdateJobFeature()}>
            <FiCheck />&nbsp;Confirm
            </Button>
            <Button color="teal" className="mx-2" size="sm" outline onClick={async (e) => await this.closePopup(DialogResult.Cancel)}>
             <AiOutlineClose /> Cancel  
            </Button> 
          </div>
        </div>);
      }
    
}
