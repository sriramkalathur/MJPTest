import { DialogResult, DropdownList, ListItem, ProcessingMessage, Status, TextBox } from "common";
import { JobPositionFeature } from "../../../models/JobPositionModels";
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

class PropsModel {
     
    //Close Popup
    closePopup?: (dialogResult: DialogResult) => Promise<void>;

    isOpen: boolean;

    feature: JobPositionFeature;
}

class StateModel {

    status: Status;

    statusMessage: string;

    feature: JobPositionFeature;
}

class SelectListItem {

    itemId : string;
    displayText: string;

    constructor(itemId:string, displayText:string){
        this.itemId = itemId;
        this.displayText = displayText;
    }
}

export class EditJobFeaturePopup extends React.Component<PropsModel, StateModel> {

    sizes: Array<SelectListItem>;

    colors: Array<SelectListItem>;

    formState: FormikProps<JobPositionFeature>;

    featureService: JobFeatureService;

    constructor(props: any){
        super(props);

        this.intialize();
     
        this.state = {
           status: Status.None,
           statusMessage: "",
           feature: null
        };

        this.featureService = new JobFeatureService(); 
    }


    private intialize(){

        var sizes = [ 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36];

        //The value will be size with px added. Ex:- csss property would be 32px
        this.sizes = sizes.map(s => new SelectListItem(s.toString(), s.toString()));
    }

    renderCloseButton() {
        return (<button className="close" 
            onClick={(e) => this.closePopup(DialogResult.Cancel)} type="button">
          &times;
        </button>);
    }


    renderPreview() {
    
        var styles = {
            fontSize: this.formState.values.size + "px",
            color:  this.formState.values.textColor,
            fontWeight: (this.formState.values.bold) ? "bold": "normal",
            fontStyle: (this.formState.values.italic) ? "italic": "",
       };  
       
       return (<div>
        <Label className="fieldLabel">Preview</Label>
        <div className="px-3 py-3 border" style={ styles }> 
        {  this.formState.values.description }
        </div>
       </div>
      );
    }

    renderFields() {

        return (<>

            <Row className="py-2">
              <Col xs="6">
                <DropdownList labelText="Size"  options={this.sizes}
                    displayMember="displayText" valueMember="itemId"
                    addDefaultSelect={true} fieldName="size"
                    onChange={ this.formState.handleChange }
                    errorMessage= { this.formState.errors.size}
                    value = {this.formState.values.size} />
              </Col>
              <Col xs="6">
              <Label className="fieldLabel">Color</Label>
                
                <div  style={{ height: 30 }}>
                  { /* Add invalid and set the error in formfedback */ }
                <Input type="color" labelText="Color" name="textColor"
                    style={{ height: "60px!important"}} 
                    invalid = { (this.formState.errors.textColor != null) }
                    onChange={ this.formState.handleChange }
                    value = {this.formState.values.textColor} />
                  
                  <FormFeedback>{this.formState.errors.textColor}</FormFeedback>
                  </div>
              </Col>
            </Row>

            <Row>
              <Col xs="12">
                <Button outline size="sm" className="togglebtn" active={ this.formState.values.bold}
                onClick={ (e) =>{
                   this.formState.setFieldValue("bold", !this.formState.values.bold);
                }}><FaBold /></Button>
          
                <span className="px-2">
                <Button outline size="sm" className="togglebtn" active={ this.formState.values.italic}
                  onClick={ (e) =>{
                   this.formState.setFieldValue("italic", !this.formState.values.italic);
                }}><FaItalic /></Button>
                </span>
              </Col>
            </Row>

           <Row className="py-2">
            <Col xs="12">
            <TextBox type="textarea" label="Description"  fieldName="description"
                    onChange={ this.formState.handleChange }
                    rows={2}
                    errorMessage={ this.formState.errors.description }
                    value = {this.formState.values.description} />
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
          { this.renderPreview() }
        </>);
    }


    renderForm() {
       
       const clonedObj =  this.props.feature;

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
          feature: this.formState.values });
      
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
      var result = await this.featureService.updateJobFeature(this.formState.values);

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
     var result = await this.featureService.deleteJobFeature(this.formState.values.jobPositionFeatureId);

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


EditJobFeaturePopup.contextType = JobFeatureContext;