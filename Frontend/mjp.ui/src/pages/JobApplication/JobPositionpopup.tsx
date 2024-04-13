 import React from "react";
// // import { JobPositionApplyModel, JobPositionInformation } from "../../models/JobPositions";
// // import { Button, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
// // import { DateField, DialogResult, DropdownList,  ProcessingMessage, Status, StatusElement, TextBox } from "common";
// // import { MJPUserRoles, UserContext } from "../../authentication/UserContext";
// // import { MJPConstants } from "../../MJPConstants";
// // import { ListItem } from "common";
// // import { ApplicationStatus } from "../../models/JobPositionModels";
// // import { Formik, FormikProps } from "formik";
// // import { TextField } from "@mui/material";
// // import { FormikHelpers } from "formik/dist/types";
// // import { JobPositionService } from "../../services/JobPositionService";
// // import { UserService } from "../../services/UserService";
// // import { MJPCommonUtils } from "../../common/CommonUtils";
// // import { APIResult } from "../../models/CommonModels";
// // import { JobApplicationService } from "../../services/JobApplicationService";

// // export class StatusPopupResult {

// //   //ApplicationJobId. IN case of status->Applied, this will be the new job id
// //   jobApplicationId: number;

// //   failureMessage: string;

// //   isSuccess: boolean;
// // }


// // class PropsModel {

// //   //B
// //   closePopup?: (dialogResult: DialogResult, result: StatusPopupResult) => Promise<void>;

// //   isOpen: boolean;

// //   //current statusId
// //   newStatusId: number;

// //   jobApplicationId?: number;

// //   jobPositionId: number;
// // }


// // class StateModel {

// //     status: Status;

// //     statusMessage: string;
// // }




// // export class StatusChangePopup extends React.Component<PropsModel, StateModel> {


// //   private formState: FormikProps<ApplicationStatus>;


// //   private jobService: JobApplicationService;


// //   private jobApplicationId?: number;

// //   constructor(props: any) {
// //     super(props);

// //     this.jobService = new JobApplicationService();

// //     this.state = {
// //       status: Status.None,
// //       statusMessage: ""
// //     };

// //     this.jobApplicationId = this.props.jobApplicationId;
// //   }


// //  private closePopup(dialogResult: DialogResult) {

// //     var result = new StatusPopupResult();
// //     result.jobApplicationId = this.jobApplicationId;
// //     result.isSuccess = true;

// //     this.setState({ status: Status.None });
// //     this.props.closePopup(dialogResult, result);
// //   }


  

// //   renderCloseButton() {
// //     return (<button className="close" onClick={(e) => this.closePopup(DialogResult.Cancel)} type="button">
// //       &times;
// //     </button>);
// //   }


 


// //   // renderInterviewFields() {
    
// //   //   return (this.formState.values.statusId == MJPConstants.APPLICATION_STATUS_INTERVIEW_SCHEDULED) &&
// //   //     (<>
// //   //       <div className="py-1">
// //   //         <DateField fieldName="interviewDate"
// //   //           label="Interview Date" date={this.formState.values.interviewDate}
// //   //           onChange={ this.formState.handleChange }
// //   //           errorMessage={this.formState.errors.interviewDate as string} />
// //   //       </div>

// //   //       <div className="py-1">
// //   //         <TextBox value={this.formState.values.interviewInstructions} rows={2} type="textarea"
// //   //           label="Interview Instructions" 
// //   //           onChange={ this.formState.handleChange }
// //   //           fieldName="interviewInstructions" errorMessage={this.formState.errors.interviewInstructions as string} />
// //   //       </div>

// //   //     </>);
// //   // }


// //   renderFooter() {
// //     return (<div>
     
// //       <div className="float-right">
// //         <Button color="teal" size="sm" outline onClick={async (e) => await this.updateStatus()}>
// //           Confirm
// //         </Button>
// //         <Button color="teal" className="mx-2" size="sm" outline onClick={(e) => this.closePopup(DialogResult.Cancel)}>
// //           Cancel
// //         </Button> 
// //       </div>
// //     </div>);
// //   }


// //   renderBody() {
// //     return (<>

// //       {
// //         (this.state.status == Status.Processing) && 
// //            <div className="px-2 py-2"> <ProcessingMessage statusMessage="Processing..."/> </div>
// //       }
// //       {
// //         /* Gloabl error will be in JobPositonId */
// //         (this.formState.errors.jobApplicationId) && (<div className="failure">
// //            { this.formState.errors.jobApplicationId }
// //         </div>)
// //       }
// //       { (this.isReferBackStatus() && this.renderReferBackToFields()) }
// //       {
// //         <TextBox value={this.formState.values.remarks} rows={2} type="textarea"
// //                   label="Remarks" 
// //                   onChange={ this.formState.handleChange }
// //                   fieldName="remarks" errorMessage={this.formState.errors.remarks as string} />
// //       }
 
// //     </>);
// //   }


// //   private async applyForPosition() : Promise<void> {

// //     this.setState({ status: Status.Processing });
// //     var model: JobPositionApplyModel;
// //       model = {
// //         jobPositionId: this.props.jobPositionId,
// //         remarks : this.formState.values.remarks
// //     };

// //     //Set the new Job ApplicationID
// //     var result = await this.jobService.applyForPosition(model);

// //     var status = new StatusPopupResult();

// //     debugger;
// //     if(result.success){
// //       //Just close the Popup with sucess
// //       status.jobApplicationId = this.jobApplicationId;
// //       status.isSuccess = true;
// //       //close the popup
// //       this.props.closePopup(DialogResult.Ok, status);
// //     }
// //     else
// //     { //Failure..
// //        //Don't close the popup. Show the rror
// //       status.isSuccess = false;
// //       status.failureMessage = result.errors["jobPositionId"];
     
// //     }
    
    
// //   }


// //   private async updateStatus(): Promise<void> {

// //       this.setState({ status: Status.Processing });
// //       //Clear the errors
// //       MJPCommonUtils.clearErrors(this.formState);
// //       //Update status
// //       var result: APIResult;
      
// //       if(this.props.newStatusId == MJPConstants.APPLICATION_STATUS_APPLIED){
// //         //Applied status.. Applyfor job
// //         await this.applyForPosition();
// //       }
// //       else {
// //         result = await this.jobService.updateApplicationStatus(this.formState.values);

// //         if (!result.success) {

// //           //set the errors
// //           MJPCommonUtils.updateErrors(result, this.formState);
          
// //           //failure
// //           //Don't close the popup
// //         }   
// //         else {
// //           //success close the popup
// //           this.closePopup(DialogResult.Ok);
// //         }

// //         this.setState({ status: Status.None });
// //     }
// //   }

// //   renderStatusForm() {
// //     return (<div className="pd10">
// //       <Formik
// //         initialValues={this.getDefaultValue()}
// //         validateOnChange={false}
// //         validateOnBlur={false}
// //         onSubmit={(e) => { }}>
// //         {
// //           (props) => {
// //             this.formState = props;
// //             return this.renderBody();
// //           }
// //         }
// //       </Formik></div>);
// //   }

// //   getTitle(){
// //     switch(this.props.newStatusId){
// //       case MJPConstants.APPLICATION_STATUS_APPLIED: return "Apply for Position"; break;
// //       case MJPConstants.APPLICATION_STATUS_CANCELLED: return "Cancel Application"; break;
// //       default:
// //               return "Refer back"; break;
// //     }
// //   }

// //   render() {
// //     return (<Modal isOpen={this.props.isOpen}>
// //       <ModalHeader className="bklightblue" close={this.renderCloseButton()}><h6>{ this.getTitle() }</h6></ModalHeader>
// //       <ModalBody>
// //         {this.renderStatusForm()}
// //         {this.renderFooter()}
// //       </ModalBody>
// //     </Modal>);
// //   }

// // }