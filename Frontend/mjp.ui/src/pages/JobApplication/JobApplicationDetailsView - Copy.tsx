 import React from "react";
// import {  ApplicantInformation, JobApplicationDetails, StatusHistoryItem } from "../../models/JobPositions";
// import { CommonUtils, DateField, DialogResult, FieldLabel, ListItem, ProcessingMessage, Status, StatusElement, TextBox } from "common";
// import { JobPositionSearchFilter } from "../JobPosition/JobPositionSearchFilter";
// import { Button, Badge, ButtonGroup as RSBtnGroup, Card, CardBody, CardGroup, CardLink, CardSubtitle, CardText, CardTitle, Col, Row, CardHeader, UncontrolledAccordion, AccordionItem, AccordionHeader, AccordionBody, Spinner, Nav, NavItem, NavLink, TabContent, TabPane, ButtonGroup, Input, Label, FormGroup } from "reactstrap";
// import { JobApplicationService } from "../../services/JobApplicationService";

// import { Backdrop, Box, Checkbox, CircularProgress, Divider, LinearProgress, Rating, Skeleton, Step, StepContent, StepLabel, Stepper, Tab, Tabs, Typography } from "@mui/material";
// import { PageLoader, PageTitleActionBar } from "../../common/MJPCommon";
// import { TabContext, TabList, TabPanel } from "@mui/lab";
// import { MJPConstants } from "../../MJPConstants";

// import { BiEnvelope, BiPhoneCall } from "react-icons/bi";
// import { StatusChangePopup, StatusPopupResult  } from "./JobPositionpopup";
// import { MJPUserRoles, UserContext } from "../../authentication/UserContext";


// import { FiCheck, FiLogIn } from "react-icons/fi";
// import { AiOutlineClose } from "react-icons/ai";
// import { ChoiceList, ChoiceItem } from "../../common/ChoiceList";

// import { Formik, FormikProps } from "formik";
// import { CompanyDetails, JobApplicationStatus, JobApplicationStatusHistory, JobPositionDetails, JobPositionStatus, PageTitle } from "../MJPComponents";
// import { MJPCommonUtils } from "../../common/CommonUtils";
// import { MJPRouteUtils } from "../../common/MJPRouteUtils";


// import { JobPositionFeature } from "../../models/JobPositionModels";
// import { EditJobFeaturePopup } from "../JobPosition/Features/EditJobFeaturePopup";
// import { JobFeaturesList } from "../JobPosition/Features/JobFeaturesList";
// import { PopupContextProps } from "./JobApplicationContext";
// import { JobRequirementsList } from "../JobPosition/Requirements/JobRequirementsList";
// import { JobPositionFeaturesView, JobPositionRequirementsView } from "./JobApplicationCommonComponents";
 
// class PropsModel {
//     jobApplicationId?: number;

//     jobPositionId: number;
// }

// class StateModel {
//     jobPositionDetails: JobApplicationDetails;

//     status: Status;

//     statusMessage: string;

//     tabIndex: string;

//     isStateChangePopupOpen: boolean;

//     isFeaturePopupOpen: boolean;


// }


// export class JobApplicationDetailsView extends React.Component<PropsModel, StateModel> {

//     YESNO_OPTION_YES = 1;
//     YESNO_OPTION_NO = 2;
    

    
//     TAB_INDEX_DETAILS = "1";

//     TAB_INDEX_FEATURES = "2";
  
  
//     TAB_INDEX_REQUIREMENTS = "3";
  
//     TAB_INDEX_DOCUMENTS = "4";


//     private formState: FormikProps<JobApplicationDetails>;

//     private jobService: JobApplicationService;
  
//     private newStatusId: number;


//     //When the user changes something, it updates the state of applicationStatus
//     //so use this to render status
//     private applicationStatusId : number;

//     constructor(props: any) {
//         super(props);

//         var newItem = new JobApplicationDetails();
//         newItem.applicationDetails =new ApplicantInformation();
        
//         this.state = {
//             jobPositionDetails: newItem,
//             status: Status.Loading,
//             statusMessage: "Loading",
//             tabIndex: "1",
//             isStateChangePopupOpen: false,
//             isFeaturePopupOpen: false
//         };

//         this.jobService = new JobApplicationService();
//     }


//     async componentDidMount() {
//         await this.loadApplication();
//     }


    
//     renderRequirements() {

//         return (<div>

//             <span className="subHeading">Requirements & Certications</span>
//             <div className="py-3">
//                 <JobPositionRequirementsView  requirements={ this.model.requirements }/>
//             </div>
//         </div>
//         );
//     }
 

//     getPopupContext() {

//         var ctxt = new PopupContextProps<JobPositionFeature>();
//         ctxt.closePopup = ((result) => {
//             this.setState({ isFeaturePopupOpen : false});
//         });

//         ctxt.showPopup = ((item) => {
//             this.setState( { isFeaturePopupOpen: true} );
//             ctxt.currentItem = item;
//         });

//         return ctxt;
//     }

//     renderFeatures() {

//         return (<div>
//             <span className="subHeading">Highlights & Benefits</span>
//             <div className="py-3">
//                 <JobPositionFeaturesView features={ this.model.features }  />
//             </div>
//         </div>);

//     }

   
//     renderInterviewDate(){
      
//         return (<FieldLabel label="Interview Date">
//                 {
//                     // If disabled/applicant role, show as Label 
//                 (UserContext.isStaffRole() && !this.isStatusDisabled()) ?
//                     <DateField fieldName="interviewDate" isTimeField={true}
//                             onChange={ (e) => {
//                                 this.formState.setFieldValue("applicationDetails.interviewDate", e.target.value);
//                             } }
//                             date={this.formState.values.applicationDetails.interviewDate}
//                             errorMessage={ this.formState.errors.applicationDetails && this.formState.errors.applicationDetails.interviewDate as string} />:
//                     <span>  {CommonUtils.getDisplayDateTime(this.model.applicationDetails.interviewDate)} </span>
    
//                 }
//             </FieldLabel>);
//     }
//     renderInterviewInstructions(){
//         // Instrutions should be disbaled for Applicant and if the stutus is disbaled
//         return (  <FieldLabel label="Interview instructions">
//         {   (UserContext.isStaffRole() && !this.isStatusDisabled()) ?
//             <TextBox fieldName="applicationDetails.interviewInstructions"
//                     onChange={ this.formState.handleChange }
//                     type="textarea" rows={2}
//                     value={this.formState.values.applicationDetails.interviewInstructions}
//                     errorMessage={this.formState.errors.applicationDetails && this.formState.errors.applicationDetails.interviewInstructions as string} />:
//             <span>  { this.formState.values.applicationDetails.interviewInstructions } </span>
//         }
//         </FieldLabel>)
//     }

//     renderApplicationDetails() {

//         //applicanntUserName will be the email
//         return  (<div>          
//                  <Row>
//                  <Col xs="4">
//                     <FieldLabel label="Application #">
//                            <h6> { this.formState.values.applicationDetails.applicationNumber} </h6>
//                         </FieldLabel>
//                     </Col>
//                     <Col xs="4">
//                     <FieldLabel label="Applied Date">
//                             <span>{CommonUtils.getDisplayDateTime(this.model.applicationDetails.appliedDate)}</span>
//                         </FieldLabel>
//                     </Col>
//                     <Col xs="4">
//                         { /* If it is already applied to company, disable that */ }
//                         <ChoiceList choices={this.yesNoOptions} 
                           
//                             disabled={this.isStatusDisabled() || this.model.applicationDetails.appliedToCompany
//                                    ||  (!UserContext.isStaffRole()) } 
//                             onChoiceChanged={(itemId) => {
//                                 ;
//                                 this.formState.values.applicationDetails.appliedToCompany = (itemId == this.YESNO_OPTION_YES);
                                
//                             }} 
//                             selectedChoiceId={ (this.formState.values.applicationDetails.appliedToCompany) ?
//                                       this.YESNO_OPTION_YES: this.YESNO_OPTION_NO  } label={"Sent to Company"} />
//                      </Col>
                  
//                 </Row>
                                
//                 { this.renderApplicantDetails() }
               
//                 <Row>      
//                 {   // Interview details should be shown only after it is applied to compnay
//                     (this.model.applicationDetails.appliedToCompany) && 
                  
//                     <Col xs="4">
//                         { this.renderInterviewDate() }
//                     </Col>
//                 }
//                 {   (this.model.applicationDetails.appliedToCompany) && 
//                     (this.formState.values.applicationDetails.interviewDate) && 
                  
//                       <Col xs="8"> 
//                           { this.renderInterviewInstructions() }
//                         </Col>
//                     }
//                     </Row>
//                     <Row>
//                     { /* Render interview status only when there is a interview date */ }
//                     {   (this.model.applicationDetails.appliedToCompany) && 
//                         (this.model.applicationDetails.interviewDate) &&
//                         <Col xs="4">
//                             { this.renderInterviewStatus() }
//                         </Col> 
//                     }
//                         <Col xs="4">  
                           
//                             <ChoiceList choices={this.yesNoOptions} 
//                                 disabled={ (this.model.applicationDetails.applicationStatusId == MJPConstants.APPLICATION_STATUS_CLOSED) ||
//                                         (! UserContext.isStaffRole()) } 
//                                 onChoiceChanged={(choiceId): void => {
//                                     if(choiceId == this.YESNO_OPTION_YES) {
//                                         //YES>Closed. Set the status
//                                         this.formState.values.applicationDetails.applicationStatusId = MJPConstants.APPLICATION_STATUS_CLOSED;
//                                     }            
//                                 }} 
//                                 selectedChoiceId={ ( this.formState.values.applicationDetails.applicationStatusId == MJPConstants.APPLICATION_STATUS_CLOSED) ? 
//                                     this.YESNO_OPTION_YES:
//                                     this.YESNO_OPTION_NO} label={"Is Closed"} />
                               
//                         </Col>
                    
//                 </Row>
               
//             </div>);
//     }


//     renderStatus() {
//         return (<div>
//             <div className="py-1">
//                 <FieldLabel label="Position Status">
//                     {
//                         <JobPositionStatus statusId={this.model.positionDetails.statusId} />
//                     }
//                 </FieldLabel>
//             </div>

//             <div className="py-1">
//                 <FieldLabel label="Application Status">
//                     <>
//                         {(this.model.applicationDetails) &&
//                             <JobApplicationStatus applicationStatusId={this.model.applicationDetails.applicationStatusId} />
//                         }
                      
//                     </>
//                 </FieldLabel>
//             </div> 
//         </div>);
//     }


//     renderJobPositionPopup() {
//         return (<StatusChangePopup isOpen={this.state.isStateChangePopupOpen}
//             jobPositionId={ this.model.positionDetails.jobPositionId   }
//             jobApplicationId={this.model.jobApplicationId}
//             newStatusId={ this.newStatusId } 
//             closePopup={ (result, status) => this.onPopupClosed(result, status) }
//         />);
//     }

//     private async updateJobApplication() : Promise<void> {
//         this.setState({ status: Status.Processing });

//         MJPCommonUtils.clearErrors(this.formState);
//         //Update status
//         var result = await this.jobService.updateJobApplication(this.formState.values);
    
//         if (!result.success) {
    
//             //set the errors
//             MJPCommonUtils.updateErrors(result, this.formState);
//             //Set the failure status
//             this.setState({ status: Status.Failure });
//         }
//         else {
//             //success.
//             //this.state.status = Status.None,
//             //refresh application
//             this.loadApplication();
//         }
        
        
//     }

//     private showStatusPopup(show: boolean, newStatusId: number){
//         this.newStatusId = newStatusId;
//         this.setState({
//             isStateChangePopupOpen: show
//         });
//     }

   
//     private async loadApplication() : Promise<void>{
//         this.setState({ status: Status.Loading });
//         //Load
//         var model = await this.jobService.selectJobApplicationDetails(this.props.jobPositionId, this.props.jobApplicationId);

//         if(model.applicationDetails != null){
//             //set the ApplicationStatusId
//             this.applicationStatusId = model.applicationDetails.applicationStatusId;
//         }

//         this.setState({
//             jobPositionDetails: model,
//             isStateChangePopupOpen: false,
//             status: Status.None
//         });
//     }

//     private async onPopupClosed(dialogResult: DialogResult, result: StatusPopupResult) : Promise<void> {
//         //If dialogresult is OK, refresh the detials else not
//         ;
        
//         if(dialogResult == DialogResult.Ok){
           
//             //Check if it is success.
//             //If failure set error status
//             if(!result.isSuccess){
//                 //Fialure.
//                 this.setState({ statusMessage : result.failureMessage,
//                     status: Status.Failure });
//             } else{
//                 //Success..
//                 await this.loadApplication();
//             }
           
//         }
//         else {
//             //Just close the popup
//             this.setState({ isStateChangePopupOpen: false});
//         }
//     }


//     private showReferBackPopup(){
//         let newStatusId: number;
//         if(UserContext.loggedInUser.role != MJPUserRoles.Applicant){
//             //Staff role. Set that as REFERBACK to applicatnt by default.
//             //User will choosen that for applicant if he wants
//             newStatusId = MJPConstants.APPLICATION_STATUS_REFER_BACK_TO_APPLICANT;
//         }
//         else {
//             //Role Applicant. It is only REFER BACK TO STAFF
//             newStatusId = MJPConstants.APPLICATION_STATUS_REFER_BACK_TO_STAFF;
//         }

//         this.showStatusPopup(true, newStatusId);
//     }


//     private async applyForJobPosition(): Promise<void>{
//         //Just show the APPLY Job popup
//         var newStatusId = MJPConstants.APPLICATION_STATUS_APPLIED;
//         this.showStatusPopup(true, newStatusId);
//     }


//     private renderApplicantDetails(){
//         let mailTo = "mailto: " + this.formState.values.applicationDetails.applicantName;
//        return (<Row>
//                 <Col xs="4">
//                  <FieldLabel label="Applicant Name">
//                         <span>
//                             { this.formState.values.applicationDetails.applicantName } 
//                         </span>
//                     </FieldLabel>
//                 </Col>
//                 <Col xs="4">
//                  <FieldLabel label="Contact Number">
//                        <>
//                         <div> {this.formState.values.applicationDetails.contactNumber} </div>
                       
//                         </>
//                     </FieldLabel>
//                 </Col>
//                 <Col xs="4">
//                     <FieldLabel label="Email">
//                         <>
//                         <div><a href={mailTo}> {this.formState.values.applicationDetails.applicantName} </a></div>
//                         </>
//                     </FieldLabel>
//                 </Col>
//         </Row>)
//     }

//     private renderActionButtonsForNotApppliedJob(){
//         return (     
//             <div>
//                 { !UserContext.isStaffRole() &&
//                  <Button outline  color="teal" className="ml-2"
//                      onClick={ async (e)=> {
//                         //save the details
//                         this.applyForJobPosition();
//                     }}> <FiCheck />&nbsp;Apply</Button>
//                 }

//                 <Button outline color="teal" className="ml-2"
//                     onClick={ (e) => MJPRouteUtils.navigateToHome() } > <AiOutlineClose /> Cancel</Button>
//             </div>);
//     }

//     private renderActionButtonsForApppliedJob(){
//         return (
        
//         <div>
//             <Button outline  color="teal" 
//                     className="ml-2 pr-2"
//                     onClick={ async (e)=> {
//                         //save the details
//                         await this.updateJobApplication();
//                     }}>
//                     <FiCheck />&nbsp;Save</Button>
//             <Button outline  color="teal" className="ml-2"
//                  onClick={ async (e)=> {
//                     //save the details
//                     this.showReferBackPopup();
//                 }}>Refer Back</Button>
//             <Button outline  color="teal" className="ml-2" onClick={ async (e)=> {
//                     //save the details
//                     this.showStatusPopup(true, MJPConstants.APPLICATION_STATUS_CANCELLED);
//                 }}>Cancel Application</Button>
          
//             <Button outline color="teal" className="ml-2"
//                 onClick={ (e) => MJPRouteUtils.navigateToHome() } > <AiOutlineClose /> Cancel</Button>
//         </div>);
//     }
 
//     private renderActionButtonsForGuest(){
        
//         return (     
//             <div>
//                  <Button outline  color="teal" className="ml-2"
//                      onClick={ async (e)=> {
//                         //save the details
//                         window.location.href = "/login";
//                     }}> <FiLogIn />&nbsp;Login for details</Button>
               
//                 <Button outline color="teal" className="ml-2"
//                          onClick={ (e) => MJPRouteUtils.navigateToHome() }> <AiOutlineClose /> Cancel</Button>
//             </div>);
//     }

//     private renderActionButtons() {
//         return (! UserContext.isUserLoggedIn()) ?
//         this.renderActionButtonsForGuest() :
//         ((this.model.applicationDetails == null) ?
//                 this.renderActionButtonsForNotApppliedJob():
//                 this.renderActionButtonsForApppliedJob());
//     }
  
//     renderTitleBar() {

//         var title = (this.model.applicationDetails == null) ? ("Job Position " + this.model.positionDetails.jobCode):
//                 ("Job Application " +  this.model.applicationDetails.applicationNumber)

//         return (<PageTitle title={title} actionButtons={ this.renderActionButtons() } />);
//     }


//     renderDetails(){
//         return (<div>
//             { this.renderJobDetails() }
//             <hr />
//             {   (this.model.applicationDetails) &&  
//                 <>
//                 { this.renderApplicationDetails() }
         
//                 <Row>
//                     <Col xs="10"> 
//                         { this.renderStaffRemarks() }
//                     </Col>
//                 </Row>
            
//                 <Row>
//                     <Col xs="10">
//                         { this.renderApplicantRemarks() }
//                     </Col>
//                 </Row>
//                 </>
          
//             }       
//         </div>)
//     }



   

//     renderJobDetails() { 

//         var position = this.state.jobPositionDetails;

//         return (<div>
//             <Row className="py-2">
//                 <Col xs="9-5">
//                    { <CompanyDetails company={this.formState.values.positionDetails.company} /> }
//                 </Col>

//                 {(this.model.applicationDetails) &&
//                     <Col xs="2-5">
//                     {   <>
//                             <div>
                              
                            
//                             </div> 

//                             <div>
//                                 <FieldLabel label="Application Status">
//                                     {
//                                         <JobApplicationStatus applicationStatusId={this.applicationStatusId} />
//                                     }
//                                 </FieldLabel>

//                             </div>
//                         </>
//                     }
//                 </Col>
//                 } 
//             </Row>
    
//             <hr />
//             <div>
//                <JobPositionDetails position={ this.formState.values.positionDetails } />
//             </div>
//             </div>
//         );
//     }


//     private get model() {
//         return this.state.jobPositionDetails;
//     }


    

//     isStatusDisabled(){
//         var statusId = this.model.applicationDetails.applicationStatusId;
//         //Status cannot be EDIED further when the status is closed/cancelled
//         return ((statusId == MJPConstants.APPLICATION_STATUS_CLOSED) ||
//                 (statusId == MJPConstants.APPLICATION_STATUS_CANCELLED));
//     }



//     //Yes/NO choice options
//     yesNoOptions: Array<ChoiceItem> = [
//         { choiceId: this.YESNO_OPTION_YES, displayText: "Yes", color: "teal" },
//         { choiceId: this.YESNO_OPTION_NO, displayText: "No", color: "teal" }
//     ]
 
//     INTERVIEW_STATUS_NA = -1;
 
//      //Yes/NO choice options
//      interviewStatusOptions: Array<ChoiceItem> = [
//         { choiceId: null, displayText: "N/A", color: "teal" },
//         { choiceId: MJPConstants.APPLICATION_STATUS_SELECTED, displayText: "Selected", color: "teal" },
//         { choiceId: MJPConstants.APPLICATION_STATUS_REJECTED, displayText: "Rejected", color: "teal" }
//     ]


//     renderInterviewStatus() {   

//         //The application already applied. 
//         //So show the applied status as YES and date
       
//         return (this.model.applicationDetails.interviewDate)  &&
//             (<> 
//                 { /* Interview status should be edited only by staff */}
//                 <ChoiceList choices={this.interviewStatusOptions} 
//                     disabled={this.isStatusDisabled() || (!UserContext.isStaffRole())} 
//                     onChoiceChanged={(itemId: number) => {
//                         //Set the status directly 
//                          this.formState.values.applicationDetails.interviewStatusId = itemId;
//                 } } 
//                 selectedChoiceId={this.formState.values.applicationDetails.interviewStatusId} 
//                 label={"Interview status"} />
          
//         </>)
        
//     }

//     renderForm(){
//         return (  <Formik
//             initialValues={this.state.jobPositionDetails }
//             validateOnChange={false}
//             validateOnBlur={false}
//             onSubmit={(e) => { }}>
//             {
//               (props) => {
//                 this.formState = props;
//                 debugger;
//                 return this.renderDetails();
//               }
//             }
//           </Formik>);
//     }

 
//     renderStaffRemarks(){

//         /* If userRole is other than staff, show the staff remarks as readonly */
//         return (UserContext.isStaffRole() ?
//             (<TextBox fieldName="applicationDetails.staffRemarks"   
//                     value = { this.formState.values.applicationDetails.staffRemarks }
//                     rows={2} type="textarea" label="Staff Remarks"
//                     onChange={ this.formState.handleChange }
//                     errorMessage={ this.formState.errors.applicationDetails && 
//                                 this.formState.errors.applicationDetails.staffRemarks}  />):
//             <FieldLabel label="Staff Remarks">
//                 <span>{ (this.formState.values.applicationDetails.staffRemarks == null)? "N/A": this.formState.values.applicationDetails.staffRemarks }</span>
//             </FieldLabel>
//         );
//     }


//     renderApplicantRemarks(){

//         /* If userRole is other than staff, show the staff remarks as readonly */
//         return (UserContext.isStaffRole() ?
//             (<FieldLabel label="Applicant Remarks">
//                 <span>{  (this.formState.values.applicationDetails.applicantRemarks == null)? "N/A": this.formState.values.applicationDetails.applicantRemarks}</span>
//             </FieldLabel>):
//             (<TextBox fieldName="applicationDetails.applicantRemarks"   
//                     onChange={ this.formState.handleChange }
//                     value={ this.formState.values.applicationDetails.applicantRemarks }
//                     rows={2} type="textarea" label="Applicant Remarks"
//                     errorMessage={ this.formState.errors.applicationDetails && 
//                         this.formState.errors.applicationDetails.applicantRemarks}  />));
           
//     }

//     renderBody() {
//         return (<div>
//                 <Row>
//                     <Col xs="12">
//                         {this.renderTitleBar()}                        
//                     </Col>
//                 </Row>
//                 <div>
                   
//                     { this.renderProcessingStatus() } 
//                 </div>
//                 <div>
//                     { this.renderJobPositionPopup() }
//                 </div>
//                 <div>

//                     <div className="float-left max-w-30p min-w-20p px-1 py-3">
//                         <div>

//                             {this.renderRequirements()}
//                         </div>

//                         <div className="py-4">

//                             {this.renderFeatures()}

//                         </div>
//                     </div>

//                     <div>
//                         <Row>
//                             <Col xs="0-25">
//                                 <Divider orientation="vertical" variant="middle" />
//                             </Col>
//                             {  /* If applicantDetails is NULL, use the full col (Col-12) else (Col-7-5) as
//                             we need to show statusHistory in remaining */}
//                             <Col xs={(this.model.applicationDetails == null) ? "12" : "8"} className="px-3">
//                                 {this.renderForm()}
//                             </Col>

//                             <Col xs="3-75">
//                                 { /* Render status history only for applicant jobs */}
//                                 {
//                                     (this.model.applicationDetails) &&
//                                     <div className="pl-4 py-2">
//                                     <JobApplicationStatusHistory  
//                                             applicationStatusId={this.state.jobPositionDetails.applicationDetails.applicationStatusId}
//                                             statusHistory={ this.state.jobPositionDetails.statusHistory } />
//                                     </div>
//                                 }

//                             </Col>
//                         </Row>
//                     </div>
//                 </div>
//             </div>);
       
//     }

    
   
//     renderProcessingStatus(){

//         switch(this.state.status) {
//             case Status.Processing : {
//                 return (<div className="px-1 py-3"><ProcessingMessage statusMessage="Updating Job Application.." /></div>);
//             }
//             case Status.Failure : {
//                 return (<div className="px-1 py-2 error"> Save failed. Please fix the errors and try agin </div>);
//             }
            
//         }   
//     } 


//     renderTabs() {
//         return (<div>
//           <Nav tabs>
//             <NavItem>
//               <NavLink
//                 className={(this.state.tabIndex == this.TAB_INDEX_DETAILS) ? "active" : ""}
//                 onClick={(e) => this.setState({ tabIndex: this.TAB_INDEX_DETAILS })}>
//                 Details
//               </NavLink>    
//             </NavItem>
//             <NavItem>
//               <NavLink
//                 className={(this.state.tabIndex == this.TAB_INDEX_REQUIREMENTS) ? "active" : ""}
//                 onClick={(e) => this.setState({ tabIndex: this.TAB_INDEX_REQUIREMENTS })}>
//                 Requirements
//               </NavLink>
//             </NavItem>
//             <NavItem>
//                 <NavLink
//                   className={(this.state.tabIndex == this.TAB_INDEX_FEATURES) ? "active" : ""}
//                   onClick={(e) => this.setState({ tabIndex: this.TAB_INDEX_FEATURES })}>
//                   Features
//                 </NavLink>
//             </NavItem>
//             <NavItem>
//               <NavLink
//                 className={(this.state.tabIndex == this.TAB_INDEX_DOCUMENTS) ? "active" : ""}
//                 onClick={(e) => this.setState({ tabIndex: this.TAB_INDEX_DOCUMENTS })}>
//                 Documents
//               </NavLink>
//             </NavItem>
//           </Nav>
//           <TabContent activeTab={this.state.tabIndex}>
//             <TabPane tabId={ this.TAB_INDEX_DETAILS}>
//               <div className="py-3">
//                 {this.renderDetails()}
               
//               </div>
//             </TabPane>
//             <TabPane tabId={this.TAB_INDEX_REQUIREMENTS}>
//               <div> {this.renderRequirements()}
    
//               </div>
//             </TabPane>
//             <TabPane tabId={this.TAB_INDEX_FEATURES}>
//               <div> {this.renderFeatures()}
    
//               </div>
//             </TabPane>
//           </TabContent></div>);
//       }


//     render() {
//         return (this.state.status == Status.Loading) ?
//             <PageLoader loadingMessage="Loading Job Details.." /> :
//             <div className="pd15">
             
//                 {this.renderBody()}
//             </div>

//     }
// }