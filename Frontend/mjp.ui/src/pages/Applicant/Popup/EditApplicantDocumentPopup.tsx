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

class PropsModel {
     
    //Close Popup
    closePopup?: (dialogResult: DialogResult) => Promise<void>;

    isOpen: boolean;

    model: ApplicantDocument;
    
    documentTypes: ListItem[];
}

class StateModel {

    status: Status;

    statusMessage: string;

    model: ApplicantDocument;
}


export class EditApplicantDocumentPopup extends React.Component<PropsModel, StateModel> {

   
    formState: FormikProps<ApplicantDocument>;

    service: ApplicantService;

    DOCUMENT_YELLOW_FEVER = "YELLOW FEVER";
    DOCUMENT_INDOS = "INDOS NO"; 


    requiredDateNonApplicableItems: Array<number>;

    constructor(props: any){
        super(props);

        this.state = {
           status: Status.None,
           statusMessage: "",
           model: null
        };

        this.service = new ApplicantService(); 

        //Yellow Fever/Indos doesn't have requireddate fields
        this.requiredDateNonApplicableItems = this.props.documentTypes.filter(item => ((item.displayText == this.DOCUMENT_YELLOW_FEVER)
          || (item.displayText == this.DOCUMENT_INDOS))).map(d => d.itemId);
        
    }

    
   
    renderCloseButton() {
        return (<button className="close" 
            onClick={(e) => this.closePopup(DialogResult.Cancel)} type="button">
          &times;
        </button>);
    }


    
    renderFields() {

        //Somehow docTypeId is stored as string. So typecast it to int
        var docTypeId = (this.formState.values.documentTypeId) == null ? 0:
            Number.parseInt(this.formState.values.documentTypeId.toString());

        var renderExpiryDate = (!this.requiredDateNonApplicableItems.includes(docTypeId));

        return (<> 
            <div>
                <DropdownList labelText="Document" fieldName="documentTypeId" 
                    onChange={this.formState.handleChange} addDefaultSelect={true} isMandatory={true}
                    errorMessage={ this.formState.errors.documentTypeId }
                    value={this.formState.values.documentTypeId}
                    options={this.props.documentTypes}
                    displayMember="displayText" valueMember="itemId" />
            </div>
            <div>
                <TextBox  label="Document Number"  fieldName="documentNumber"
                    onChange={ this.formState.handleChange } isMandatory={true}
                    errorMessage={ this.formState.errors.documentNumber }
                    value = {this.formState.values.documentNumber} />
            </div>   
            <Row>
              <Col xs="6">
                <DateField label="Issue Date"  fieldName="issueDate"
                    date={ this.formState.values.issueDate} isMandatory={true}
                    onChange={ this.formState.handleChange } 
                    errorMessage={ this.formState.errors.issueDate as string }/>
              </Col>  
              
              { /* Do't render expiry date for non-equired fields */ }
              {  renderExpiryDate &&
              <Col xs="6">
                <DateField label="Expiry Date"  fieldName="expiryDate"
                    date={ this.formState.values.expiryDate} isMandatory={true}
                    onChange={ this.formState.handleChange }
                    errorMessage={ this.formState.errors.expiryDate as string }/>
              </Col>
              }
            </Row> 
            <div>
                <TextBox label="Issue Place"  fieldName="issuePlace"
                    value={ this.formState.values.issuePlace} isMandatory={true}
                    onChange={ this.formState.handleChange }
                    errorMessage={ this.formState.errors.issuePlace }/>
            </div>      
        </>);
    }

    renderBody() {
        return (<>
          {
            (this.state.status == Status.Processing) && 
               <div className="px-2 py-2"> <ProcessingMessage statusMessage={ this.state.statusMessage }/> </div>
          }
          { this.renderFields() }
        </>);
    }


    renderForm() {
       
       const clonedObj =  this.props.model;

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
                Update Document</ModalHeader>
            <ModalBody>
                {this.renderForm()}
                {this.renderActionButtons()}
            </ModalBody>
          </Modal>);
    }

    private async closePopup(dialogResult: DialogResult) {

        this.setState({ status: Status.None,
          model: this.formState.values });
      
        await this.props.closePopup(dialogResult);
        //this.props.closePopup(dialogResult);
    }



    private async UpdateApplicantDocument() : Promise<void>{
      //Clear the errors..
      debugger;
      MJPCommonUtils.clearErrors(this.formState);

      this.setState({
         status: Status.Processing,
         statusMessage: "Updating Document" 
      });

      //Call job feature
      var result = await this.service.updateApplicantDocument(this.formState.values);

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

  

    renderActionButtons() {
        return (<div>
         
          <div className="float-right py-2"> 
           
            <Button color="teal" className="mx-2" size="sm" outline onClick={async (e) => await this.UpdateApplicantDocument()}>
            <FiCheck />&nbsp;Confirm
            </Button>
            <Button color="teal" className="mx-2" size="sm" outline onClick={async (e) => await this.closePopup(DialogResult.Cancel)}>
             <AiOutlineClose /> Cancel  
            </Button> 
          </div>
        </div>);
      }
    
}
