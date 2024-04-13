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
import { CompetencyCertificate } from "../../../models/ApplicantCourses";
import { ApplicantCourseService } from "../../../services/ApplicantCourseService";

class PropsModel {
     
    //Close Popup
    closePopup?: (dialogResult: DialogResult) => Promise<void>;

    isOpen: boolean;

    model: CompetencyCertificate;

    certificates: ListItem[];
}

class StateModel {

    status: Status;

    statusMessage: string;

    model: CompetencyCertificate;
}


export class EditCertificatePopup extends React.Component<PropsModel, StateModel> {

   
    formState: FormikProps<CompetencyCertificate>;

    service: ApplicantCourseService;

    yearOfPassing: Array<ListItem>;


    constructor(props: any){
        super(props);

        this.state = {
           status: Status.None,
           statusMessage: "",
           model: null
        };

        this.service = new ApplicantCourseService(); 

        const START_YEAR = 1960;
        
        var endYear = new Date().getFullYear();
        this.yearOfPassing = new Array<ListItem>();
        for(var year = 1960; year <=endYear; ++year){
          //Add till the current year
          this.yearOfPassing.push(new ListItem(year, year.toString()));
        }
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
                    <DropdownList labelText="Certificate" fieldName="certificateId"
                        onChange={this.formState.handleChange} addDefaultSelect={true} isMandatory={true}
                        errorMessage={this.formState.errors.certificateId}
                        value={this.formState.values.certificateId}
                        options={this.props.certificates}
                        displayMember="displayText" valueMember="itemId" />
            </div>   
            <Row>
              <Col xs="12">
                <TextBox  label="Certificate Number"  fieldName="certificateNumber"
                    onChange={ this.formState.handleChange } isMandatory={true}
                    errorMessage={ this.formState.errors.certificateNumber }
                    value = {this.formState.values.certificateNumber} />
              </Col>
            </Row>
            <Row>
            <Col xs="6">
                <DropdownList  labelText="Year Of Passing"  fieldName="yearOfPassing"
                    addDefaultSelect={true} isMandatory={true}
                    value={this.formState.values.yearOfPassing}
                    options={this.yearOfPassing}
                    displayMember="displayText" valueMember="itemId"
                    onChange={ this.formState.handleChange } 
                    errorMessage={ this.formState.errors.yearOfPassing } />
              </Col>  
              <Col xs="6">
                <TextBox  label="Percentage/CGPA"  fieldName="grade"
                    onChange={ this.formState.handleChange } 
                    errorMessage={ this.formState.errors.grade }
                    value = {this.formState.values.grade} />
              </Col>
          
            </Row> 
            <div>
                <TextBox label="University/board"  fieldName="board"
                    value={ this.formState.values.board} isMandatory={true}
                    onChange={ this.formState.handleChange }
                    errorMessage={ this.formState.errors.board }/>
            </div>     

            <div>
                <TextBox label="Institution"  fieldName="institution"
                    value={ this.formState.values.institution} isMandatory={true}
                    onChange={ this.formState.handleChange }
                    errorMessage={ this.formState.errors.institution }/>
            </div>  

              <div>
                <TextBox label="Details"  fieldName="details"
                    value={ this.formState.values.details} 
                    onChange={ this.formState.handleChange }
                    errorMessage={ this.formState.errors.details }/>
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
                Update Certificate</ModalHeader>
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



    private async UpdateCertificate() : Promise<void>{
      //Clear the errors..
      debugger;
      MJPCommonUtils.clearErrors(this.formState);

      this.setState({
         status: Status.Processing,
         statusMessage: "Updating Document" 
      });

      //Call job feature
      var result = await this.service.updateCertificate(this.formState.values);

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
           
            <Button color="teal" className="mx-2" size="sm" outline onClick={async (e) => await this.UpdateCertificate()}>
            <FiCheck />&nbsp;Confirm
            </Button>
            <Button color="teal" className="mx-2" size="sm" outline onClick={async (e) => await this.closePopup(DialogResult.Cancel)}>
             <AiOutlineClose /> Cancel  
            </Button> 
          </div>
        </div>);
      }
    
}
