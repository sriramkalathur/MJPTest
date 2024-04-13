export {} 
// import { TabContext, TabPanel, timelineSeparatorClasses } from "@mui/lab";
// import { Box, Step, StepButton, StepContent, InputLabel, FormControl, StepLabel, Stepper, Select, Tab, Tabs, TextField } from "@mui/material";
// import MenuItem from '@mui/material/MenuItem';
// import { CommonUtils, DateField, DropdownList, FieldLabel, ListItem, Status, TextBox } from "common";
// import React from "react";
// import { MdAddToHomeScreen, MdCheckBox } from "react-icons/md";
// import { SiTrustedshops } from "react-icons/si";
// import { Button, Card, Col, FormGroup, Input, Label, Row } from "reactstrap";

// import { UserProfileMasters } from "../../models/UserModels"; 
// import { PageLoader } from "../../common/MJPCommon";
// import { Formik, FormikProps } from "formik";
// import { PageProcessingStatus, PageTitle } from "../MJPComponents";
// import { FiCheck } from "react-icons/fi";
// import { AiOutlineClose } from "react-icons/ai";
// import { MasterService } from "../../services/MasterService";
// import {  ApplicantService } from "../../services/ApplicantService";
// import { Address, PersonalInformation } from "../../models/ApplicantModels";
// import { MJPCommonUtils } from "../../common/CommonUtils";

// class PropsModel {

//     //The model will be pre-populated in main profile info
//     applicantId : number;

//     masters: UserProfileMasters;
// }


// class StateModel {

//     status: Status;

//     statusMessage: string;
// }


// export class ViewPersonalInformation extends React.Component<PropsModel, StateModel> {

//     private formState: FormikProps<PersonalInformation>;

//     //private masters: UserProfileMasters;

//     private model : PersonalInformation;
  
//     private applicantService: ApplicantService; 

//     constructor(props: any) {
//         super(props);
//         this.applicantService = new ApplicantService();

//         this.state = {
//             status: Status.Loading,
//             statusMessage: "Loading Profile.."
//         };
//     }


//     async loadPersonalDetails() {
//         this.model = await this.applicantService.selectPersonalInfo(this.props.applicantId);

//         if(!this.model.isPersonalInfoCompleted) {
//             //Personal info not created.
//             //Create default values
//             this.model.currentAddress = new Address();
//             this.model.permanentAddressSameAsCurrent = true;
//         }
//     }

//     async componentDidMount() {

//         this.setState({ status: Status.Loading });
//         //this.masters = await this.masterService.selectUserProfileMasters();
       
//         await this.loadPersonalDetails();
//         this.setState({ status: Status.None });
//     }

//     renderEmailAndPhone() {
//         return (<>
//             <div className="subtitle">Contact Details</div>
//             <Row className="py-2">

//                 <Col xs="6">
//                     { /* EMail should be updted by user */}
//                     <FieldLabel label="Email">{ this.model.email} </FieldLabel>
                   
//                 </Col>
//                 <Col xs="6">
//                     <FieldLabel label="Email">{ this.model.alernateEmail} </FieldLabel>
//                 </Col>

//             </Row>
//             <Row>
//                 <Col xs="6">
//                     <FieldLabel label="Email">{ this.model.mobileNumber} </FieldLabel>
//                 </Col>
//                 <Col xs="6">
//                     <FieldLabel label="Email">{ this.model.alternateContactNumber} </FieldLabel>
//                 </Col>
//             </Row>
//         </>);
//     }

//     renderBasicInformation() {

//         return (<div>
//             <div className="subtitle">Personal Information</div>
//             <Row className="py-2">

//                 <Col xs="6">
//                     <FieldLabel label="First Name">{this.model.firstName} </FieldLabel>
//                 </Col>
//                 <Col xs="6">
//                     <FieldLabel label="Last Name">{this.model.lastName} </FieldLabel>
//                 </Col>

//             </Row>
//             <Row>
//                 <Col xs="6">
//                     <FieldLabel label="Father's Name">{this.model.fatherName} </FieldLabel>
//                 </Col>
//                 <Col xs="6">
//                     <FieldLabel label="Date Of Birth">{CommonUtils.getDisplayDate(this.model.dateOfBirth)} </FieldLabel>

//                 </Col>
//             </Row>
//             <Row>

//                 <Col xs="6">
//                     <DropdownList labelText="Nationality" fieldName="nationalityId" 
//                         onChange={this.formState.handleChange} addDefaultSelect={true}
//                         errorMessage={this.formState.errors.nationalityId} 
//                         value={this.formState.values.nationalityId}
//                         options={this.props.masters.nationality}
//                         displayMember="displayText" valueMember="itemId" />
//                 </Col>
//                 <Col xs="6">
//                     <DropdownList labelText="Marital Status" fieldName="maritalStatusId" 
//                         onChange={this.formState.handleChange} addDefaultSelect={true}
//                         errorMessage={this.formState.errors.maritalStatusId} 
//                         value={this.formState.values.maritalStatusId}
//                         options={this.props.masters.maritalStatus}
//                         displayMember="displayText" valueMember="itemId" />

//                 </Col>
//             </Row>
//             <Row>
//                 <Col xs="8">
//                     <TextBox label="Languages known"  fieldName="languagesKnown" 
//                         errorMessage={this.formState.errors.languagesKnown}
//                         onChange={this.formState.handleChange}
//                         value={this.formState.values.languagesKnown} />
//                 </Col>
//                 <Col xs="4">
//                     <DropdownList labelText="Current Status" fieldName="jobStatusId" isMandatory={true} 
//                         onChange={this.formState.handleChange} addDefaultSelect={true}
//                         errorMessage={this.formState.errors.jobStatusId} 
//                         value={this.formState.values.jobStatusId}
//                         options={this.props.masters.currentStatus}
//                         displayMember="displayText" valueMember="itemId" />

//                 </Col>
//             </Row>
//             <Row>
//                 <Col xs="11">
//                     <TextBox label="Educational Qualification"  fieldName="educationalQualification" 
//                         errorMessage={this.formState.errors.educationalQualification}
//                         onChange={this.formState.handleChange}
//                         value={this.formState.values.educationalQualification} />
//                 </Col>
//             </Row>
//             <Row>
//                 <Col xs="11">
//                     <TextBox label="Technical Qualification"  fieldName="technicalQualification" 
//                         errorMessage={this.formState.errors.technicalQualification}
//                         onChange={this.formState.handleChange}
//                         value={this.formState.values.technicalQualification} />
//                 </Col>


//             </Row>

//         </div>);
//     }


//     renderPermanentAddress() {
//         return (<>
//             <div className="subtitle">Permanent Address</div>
//             <div>
//                 <FormGroup check inline> 
//                  <Input type="checkbox"  checked={this.formState.values.permanentAddressSameAsCurrent} onChange={ (e)=> {
//                     this.formState.setFieldValue("permanentAddressSameAsCurrent", e.target.checked);
//                     this.setState({});
//                 }} />
//                 <Label>
//                   Same as current address
//                 </Label>
//                 </FormGroup> 
//             </div>
          
//             { !this.formState.values.permanentAddressSameAsCurrent && 
//             (<>
//             <Row className="py-2">
//                <Col xs="6">
//                    <TextBox label="Address Line1"  fieldName="permanentAddress.address1" 
//                         errorMessage={ MJPCommonUtils.getError(this.formState, "permanentAddress.address1")}
//                         onChange={this.formState.handleChange}
//                         value={this.model.permanentAddress.address1} />
//                 </Col>

//                 <Col xs="6">
//                     <TextBox label="Address Line2"  fieldName="permanentAddress.address2" 
//                          errorMessage={ MJPCommonUtils.getError(this.formState, "permanentAddress.address2")}
//                         onChange={this.formState.handleChange}
//                         value={this.model.permanentAddress.address2} />
//                 </Col>
//             </Row>
//             <Row>
//                 <Col xs="4">
//                     <TextBox label="City"  fieldName="permanentAddress.city" isMandatory={true}
//                          errorMessage={ MJPCommonUtils.getError(this.formState, "permanentAddress.city")}
//                         onChange={this.formState.handleChange}
//                         value={this.model.permanentAddress.city} />
//                 </Col>
//                 <Col xs="4">
//                     <DropdownList labelText="State" fieldName="permanentAddress.stateId" 
//                         onChange={this.formState.handleChange} addDefaultSelect={true} isMandatory={true}
//                         errorMessage={ MJPCommonUtils.getError(this.formState, "permanentAddress.stateId")}
//                         value={this.formState.values.permanentAddress.stateId}
//                         options={this.props.masters.states}
//                         displayMember="displayText" valueMember="itemId" />
//                 </Col>
//                 <Col xs="4">
//                     <TextBox label="Pincode"  fieldName="permanentAddress.pincode" isMandatory={true}
//                          errorMessage={ MJPCommonUtils.getError(this.formState, "permanentAddress.pincode")}
//                         onChange={this.formState.handleChange}
//                         value={this.model.permanentAddress.pincode} />
//                 </Col>
//             </Row>
//             </>)
//             }
//         </>);
//     }   


//     renderCurrentAddress() {    
//         return (<>
//             <div className="subtitle">Current Address</div>
//             <Row>

//                 <Col xs="6">
//                     <TextBox label="Address Line1" value={this.formState.values.currentAddress.address1}
//                         onChange={this.formState.handleChange} isMandatory={true}
//                         errorMessage={ MJPCommonUtils.getError(this.formState, "currentAddress.address1")}
//                         fieldName="currentAddress.address1" />
//                 </Col>

//                 <Col xs="6">
//                     <TextBox label="Address Line2" value={this.formState.values.currentAddress.address2}
//                         onChange={this.formState.handleChange}
//                         errorMessage={ MJPCommonUtils.getError(this.formState, "currentAddress.address2")}
//                         fieldName="currentAddress.address2" />
//                 </Col>
//             </Row>
//             <Row>
//                 <Col xs="4">
//                     <TextBox label="City"  fieldName="currentAddress.city" isMandatory={true}
//                         errorMessage={ MJPCommonUtils.getError(this.formState, "currentAddress.city")}
//                         onChange={this.formState.handleChange}
//                         value={this.model.currentAddress.city} />
//                 </Col>
//                 <Col xs="4">
//                     <DropdownList labelText="State" fieldName="currentAddress.stateId" 
//                         onChange={this.formState.handleChange} addDefaultSelect={true} isMandatory={true}
//                         errorMessage={ MJPCommonUtils.getError(this.formState, "currentAddress.stateId")}
//                         value={this.formState.values.currentAddress.stateId}
//                         options={this.props.masters.states}
//                         displayMember="displayText" valueMember="itemId" />
//                 </Col>
//                 <Col xs="4">
//                     <TextBox label="Pincode"  fieldName="currentAddress.pincode" isMandatory={true}
//                         errorMessage={ MJPCommonUtils.getError(this.formState, "currentAddress.pincode")}
//                         onChange={this.formState.handleChange}
//                         value={this.model.currentAddress.pincode} />
//                 </Col>
//             </Row>
//         </>);
//     }

//     renderForm() {
//         return (<Formik
//             initialValues={this.model}
//             validateOnChange={false}
//             validateOnBlur={false}
//             onSubmit={(e) => { }}>
//             {
//                 (props) => {
//                     this.formState = props;
//                     return this.renderProfileDetails();
//                 }
//             }
//         </Formik>);
//     }

//     private async updatePersonalInfo() : Promise<void> {
//         this.setState({ status: Status.Processing });
    
//         MJPCommonUtils.clearErrors(this.formState);
//         this.formState.setErrors([] as any);
    
//         //Update status
//         var result = await this.applicantService.updatePersonalInfo(this.formState.values);
//         if (!result.success) {

//             //set the errors
//             MJPCommonUtils.updateErrors(result, this.formState);
//             //Set the failure status
//             this.setState({ status: Status.Failure, 
//                 statusMessage : "Update failed. Please fix the errors and try again" });
//         }
//         else {
//             //success.
//             this.setState({ status: Status.Success, 
//                 statusMessage : "Personal Information updated successfully" });
//         }
//     }


//     renderActionButtons() {
//         return (
//             <div>
//                 <Button outline className="ml-2"
//                     onClick={async (e) => {
//                         //save the details
//                         await this.updatePersonalInfo();
//                     }}> <FiCheck />&nbsp;Confirm</Button>

//                 <Button outline className="ml-2" 
//                     onClick={async (e) => {
//                         //Load the details
//                         this.setState({ status: Status.Loading, statusMessage: "Loading Profile.."});
//                         await this.loadPersonalDetails();
//                         this.setState({status: Status.None});
//                     }}>

//                     <AiOutlineClose />Cancel</Button>
//             </div>);
//     }


//     renderContactInformation() {
//         return (<>
//             {this.renderEmailAndPhone()}
//             <hr />
            
//             {this.renderCurrentAddress()}
//             <hr />  
           
//             {
//                 this.renderPermanentAddress()
//             }
            
//         </>);
//     }

//     renderBody() {

//         var title = "Personal & Contact Information";

//         return (<div>
//             <div>
//                 <PageTitle title={title} actionButtons={this.renderActionButtons()} />
//             </div>
//             <PageProcessingStatus status={this.state.status} statusMessage={this.state.statusMessage} />

//             {this.renderForm()}

//         </div>);
//     }




//     renderProfileDetails() {
//         return (<Row>
//             <Col xs="6">
//                 <Card>
//                     {this.renderBasicInformation()}
                   
//                 </Card>
//             </Col>
//             <Col xs="6">
//                 <Card>
//                     {this.renderContactInformation()}
//                 </Card>
//             </Col>
//         </Row>);
//     }


//     render() {

//         return (this.state.status == Status.Loading) ?
//             <PageLoader loadingMessage="Loading Profile.." /> :
//             this.renderBody();
//     }
// }