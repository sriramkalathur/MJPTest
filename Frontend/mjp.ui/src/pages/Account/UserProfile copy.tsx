 import { DateField, DropdownList, ListItem, Status, TextBox } from "common";
// import React from "react";
// import { UserProfile } from "../../models/ApplicantModels";
// import { UserService } from "../../services/UserService";
// import { Formik, FormikProps } from "formik";
// import { Button, Col, Row } from "reactstrap";
// import { MasterService } from "../../services/MasterService";
// import { MJPCommonUtils } from "../../common/CommonUtils";
// import { MJPRouteUtils } from "../../common/MJPRouteUtils";
// import { FiCheck } from "react-icons/fi";
// import { AiOutlineClose } from "react-icons/ai";
// import { PageProcessingStatus, PageTitle } from "../MJPComponents";
// import { PageLoader } from "../../common/MJPCommon";

// class PropsModel {
    
// }

// class StateModel {

//     status: Status;

//     statusMessage: string;
// }

// export class UserProfilePage extends React.Component<PropsModel, StateModel> {

//     private model: UserProfile;

//     private userService: UserService;

//     private masterService: MasterService;

//     private formState: FormikProps<UserProfile>;
    

//     private states: Array<ListItem>;

//     constructor(props: any){
//         super(props);
        
//         this.state = { status: Status.Loading, statusMessage: "" };
//         this.userService = new UserService();
//         this.masterService = new MasterService();
//     }

//     async componentDidMount() {
        
//         this.setState({ status: Status.Loading,
//             statusMessage: "Loading Company.."});

//         //Load the details
//         this.model = await this.userService.selectMyProfile();
    
//         this.states = await this.masterService.selectAllStates();

//         this.setState({ status: Status.None });
//     }

//     renderAddress(){
//         return(<>
//         </>);
//     }


//     renderFields() {

//         return (<>
//              <Row>
//                 <Col xs="4">
//                     <TextBox fieldName="mobileNumber"
//                         label="Mobile Number" isReadOnly={true}
//                         onChange={this.formState.handleChange}
//                         errorMessage={this.formState.errors.mobileNumber}
//                         value={this.formState.values.mobileNumber} />
//                 </Col>
            
//                 <Col xs="4">
//                     <TextBox fieldName="email"
//                         label="Email" isReadOnly={true}
//                         onChange={this.formState.handleChange}
//                         errorMessage={this.formState.errors.email}
//                         value={this.formState.values.email} />
//                 </Col>
//             </Row>
//             <Row>
//                 <Col xs="4">
//                     <TextBox fieldName="firstName"
//                         label="First Name"
//                         onChange={this.formState.handleChange}
//                         errorMessage={this.formState.errors.firstName}
//                         value={this.formState.values.firstName} />
//                 </Col>

//                 <Col xs="4">
//                     <TextBox fieldName="lastName"
//                         label="Last Name"
//                         onChange={this.formState.handleChange}
//                         errorMessage={this.formState.errors.lastName}
//                         value={this.formState.values.lastName} />
//                 </Col>
//                 </Row>
//                 <Row>
//                     <Col xs="4">
//                         <TextBox fieldName="displayName"
//                             label="Display Name"
//                             onChange={this.formState.handleChange}
//                             errorMessage={this.formState.errors.displayName}
//                             value={this.formState.values.displayName} />
//                     </Col>
//                     <Col xs="4">
//                         <TextBox fieldName="passportNumber"
//                             label="Passport #"
//                             onChange={this.formState.handleChange}
//                             errorMessage={this.formState.errors.passportNumber}
//                             value={this.formState.values.passportNumber} />
//                     </Col>
//                 </Row>
//                 <Row>
//                     <Col xs="2">
//                         <DateField fieldName="dateOfBirth"
//                             label="Date of Birth"
//                             onChange={this.formState.handleChange}
//                             errorMessage={this.formState.errors.dateOfBirth as string}
//                             date={this.formState.values.dateOfBirth} />
//                     </Col>
//                 </Row>
//         </>);
//     }

//     renderAddress(){
//         return (<>
//             <Row>
//                 <Col xs="4">
//                     <TextBox fieldName="address1"
//                         label="Address1" type="textarea" rows={2}
//                         onChange={this.formState.handleChange}
//                         errorMessage={this.formState.errors.address1}
//                         value={this.formState.values.address1} />
//                 </Col>

//                 <Col xs="4">
//                     <TextBox fieldName="address2"
//                         label="Address2" type="textarea" rows={2}
//                         onChange={this.formState.handleChange}
//                         errorMessage={this.formState.errors.address2}
//                         value={this.formState.values.address2} />
//                 </Col>

//             </Row>

//             <Row className="py-1">
                
//                 <Col xs="3">
//                     <TextBox fieldName="city"
//                         label="City"
//                         onChange={this.formState.handleChange}
//                         errorMessage={this.formState.errors.city}
//                         value={this.formState.values.city} />
//                 </Col>

//                 <Col xs="3">
//                     <DropdownList fieldName="stateId"
//                         labelText="State"
//                         addDefaultSelect={true}
//                         onChange={this.formState.handleChange}
//                         errorMessage={this.formState.errors.stateId as any}
//                         value={this.formState.values.stateId} 
//                         options={this.states} displayMember="displayText" valueMember="itemId" />
//                 </Col>
               
//                 <Col xs="2">
//                     <TextBox fieldName="pincode"
//                         label="Pincode"
//                         onChange={this.formState.handleChange}
//                         errorMessage={this.formState.errors.pincode}
//                         value={this.formState.values.pincode} />
//                 </Col>
//             </Row>
//         </>);
//     }


   
//     async updateProfile() {

//         MJPCommonUtils.clearErrors(this.formState);
//         this.formState.setErrors([] as any);

//         this.setState({
//             status: Status.Processing,
//             statusMessage: "Updating Profile.."
//         });

//         //Set the token..  
//         //AuthUtilities.signInUser(cmsUser);
//         var result = await this.userService.updateProfile(this.formState.values);
      
//         if (!result.success) {
//             //Invalid.Validation errors
//             MJPCommonUtils.updateErrors(result, this.formState);
//             //Set the failure status
//             this.setState({ status: Status.Failure,
//                statusMessage: "Save failed. Please fix the validation errors and try again" });
//         }
//         else {   
//             // User registration success...
//             //Navigate to LOGIN..
//             MJPRouteUtils.navigateToHome();
//         }
//     }

//     renderActionButtons(){
//         return (     
//             <div>
//                   <Button outline  color="teal" className="ml-2"
//                       onClick={ async (e)=> {
//                         //save the details
//                         await this.updateProfile();
//                     }}> <FiCheck />&nbsp;Confirm</Button>
             
//                     <Button outline color="teal" className="ml-2"
//                          onClick={ (e) => MJPRouteUtils.navigateToHome() } > 
//                     <AiOutlineClose /> Cancel</Button>
//             </div>);
//     }
    

//     renderDetails(){
//         return (<div>
//             <div>
//                 { this.renderFields() }
//             </div>
//             <hr />
//             <div>
//                 { this.renderAddress() }
//             </div>
//         </div>);
//     }

//     renderForm(){
//         return (  <Formik
//             initialValues={this.model }
//             validateOnChange={false}
//             validateOnBlur={false}
//             onSubmit={(e) => { }}>
//             {
//               (props) => { 
                
//                 this.formState = props;
//                 return this.renderDetails();
//               }
//             }
//           </Formik>);
//     }

//     renderBody() {

//         var title = "Update Profile";
        
//         return (<div>
//             <div>
//                 <PageTitle title={title} actionButtons= { this.renderActionButtons() } />
//             </div>
//             <PageProcessingStatus status={this.state.status} statusMessage={ this.state.statusMessage} />
//             <Row>
//                 <Col xs="11">
//                 { this.renderForm() }
//                 </Col>
               
//             </Row>
//         </div>);
//     }


//     render() {
//         return (this.state.status == Status.Loading)? 
//             <PageLoader loadingMessage="Loading Company.." />:
//             this.renderBody();
//     }

// }