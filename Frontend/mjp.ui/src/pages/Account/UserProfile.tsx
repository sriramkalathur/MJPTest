 export { }
// // import { CommonUtils, DateField, DropdownList, FieldLabel, ListItem, Status, TextBox } from "common";
// // import React from "react";
// // import { Address, UserProfile } from "../../models/ApplicantModels";
// // import { UserService } from "../../services/UserService";
// // import { Formik, FormikProps } from "formik";
// // import { Button, Col, Nav, NavItem, NavLink, Row, TabContent, TabPane } from "reactstrap";
// // import { MasterService } from "../../services/MasterService";
// // import { MJPCommonUtils } from "../../common/CommonUtils";
// // import { MJPRouteUtils } from "../../common/MJPRouteUtils";
// // import { FiCheck } from "react-icons/fi";
// // import { AiOutlineClose } from "react-icons/ai";
// // import { PageProcessingStatus, PageTitle } from "../MJPComponents";
// // import { PageLoader } from "../../common/MJPCommon";
// // import { UserProfileMasters } from "../../models/UserModels";
// // import { BiEnvelope, BiPhoneCall } from "react-icons/bi";

// // class PropsModel {

// //     applicantId: number;
// // }

// // class StateModel {

// //     status: Status;

// //     statusMessage: string;

// //     selectedTab: number;
// // }




// // export class UserProfilePage extends React.Component<PropsModel, StateModel> {

// //       private userService: UserService;

// //     private masterService: MasterService;

// //     //private formState: FormikProps<UserProfile>;


// //     private masters: UserProfileMasters;


// //     TAB_INDEX_BASIC_DETAILS = 1;

// //     TAB_INDEX_DOCUMENTS = 2;

// //     TAB_INDEX_COURSES = 3;

// //     TAB_INDEX_EXPERIENCE = 4;

// //     constructor(props: any) {
// //         super(props);

// //         this.state = { status: Status.Loading, statusMessage: "", selectedTab: this.TAB_INDEX_BASIC_DETAILS };
// //         this.userService = new UserService();
// //         this.masterService = new MasterService();
// //     }

// //     async componentDidMount() {

// //         this.setState({
// //             status: Status.Loading,
// //             statusMessage: "Loading Profile.."
// //         });   

      
// //         this.masters = await this.masterService.selectUserProfileMasters();

// //         this.setState({ status: Status.None });
// //     }  


// //     getDisplayText(items: Array<ListItem>, itemId: number) {
// //         var item = items.find((item) => {
// //             if (item.itemId == itemId) {
// //                 return item.displayText;
// //             }
// //         });

// //         //Find display Tet
// //         return (item == null) ? null : item.displayText;
// //     }


// //     renderAddress(address: Address) {
// //         return (<>
// //             <div> {address.address1} </div>
// //             {(address.address2) && (<div> {address.address2} </div>)}
// //             {(address.city) && (<div> {address.city} </div>)}
// //             {(<div>
// //                 {this.getDisplayText(this.masters.states, address.stateId)}
// //             </div>)}
// //             {<div> {address.pincode} </div>}
// //         </>);
// //     }

// //     renderFields(){
// //         return (<>
// //             <Row>
// //                 <Col xs="6">
// //                     <h4>{ this.model.displayName} </h4>
// //                 </Col>
// //                 <Col xs="4">
// //                 <div> <BiEnvelope /> 
// //                    <span className="px-2"> <a href="">{ this.model.email } </a> </span>
// //                 </div>
                
// //                 <div>
// //                 <BiPhoneCall />
// //                 <span className="px-2">  { this.model.contactNumber } </span>
// //                     </div>
// //                 </Col>
// //             </Row>
// //         </>);
// //     }

// //     renderBasicDetails() {
// //         return (<>
// //             <Row>
// //                 <Col xs="4">
// //                     <FieldLabel label="Father's name">
// //                         {this.model.fatherName}
// //                     </FieldLabel>
// //                 </Col>
// //                 <Col xs="4">
// //                     <FieldLabel label="Date Of Birth">
// //                         {CommonUtils.getDisplayDate(this.model.dateOfBirth)}
// //                     </FieldLabel>
// //                 </Col>
// //                 <Col xs="4">
// //                     <FieldLabel label="Age">
// //                         {this.model.age}
// //                     </FieldLabel>
// //                 </Col>
// //             </Row>

// //             <Row>
// //                 <Col xs="4">
// //                     <FieldLabel label="Nationality">
// //                         {this.getDisplayText(this.masters.nationality, this.model.nationalityId)}
// //                     </FieldLabel>
// //                 </Col>
// //                 <Col xs="4">
// //                     <FieldLabel label="Marital Status">
// //                         {this.getDisplayText(this.masters.maritalStatus, this.model.maritalStatusId)}
// //                     </FieldLabel>
// //                 </Col>
// //                 <Col xs="4">
// //                     <FieldLabel label="Languages Known">
// //                         {this.model.languagesKnown}
// //                     </FieldLabel>
// //                 </Col>
// //             </Row>

// //             <Row>
// //                 <Col xs="5">
// //                     <FieldLabel label="Education Qualification">
// //                         {  this.model.educationalQualification }
// //                     </FieldLabel>
// //                 </Col>
// //                 <Col xs="5">
// //                     <FieldLabel label="Techincal Qualification">
// //                     {  this.model.technicalQualification }
// //                     </FieldLabel>
// //                 </Col>
               
// //             </Row>
// //             <hr />
// //             <Row>
// //                 <Col xs="4">
// //                     <FieldLabel label="Permanent Address">
// //                     {this.renderAddress(this.model.permanentAddress)}
// //                     </FieldLabel>

// //                 </Col>
// //                 <Col xs="4">
// //                 <FieldLabel label="Current Address">
// //                     {
// //                         (this.model.currentAddressSameAsPermanent) ?
// //                             <span>Same as permanent address</span> : this.renderAddress(this.model.currentAddress)
// //                     }
// //                 </FieldLabel>
// //                 </Col>
// //             </Row>

// //         </>);
// //     }

// //     renderBody() {
// //         return (<div>
// //             <div className="py-2">{ this.renderFields() } </div>
            
// //             <Nav tabs>

// //                 <NavLink active={this.state.selectedTab == 1} onClick={() => this.setState({
// //                     selectedTab: this.TAB_INDEX_BASIC_DETAILS
// //                 })}>
// //                     Basic Details
// //                 </NavLink>
// //                 <NavLink active={this.state.selectedTab == 2} onClick={() => this.setState({
// //                     selectedTab: 2
// //                 })}>
// //                     Tab Title
// //                 </NavLink>

// //             </Nav>
// //             <TabContent activeTab={this.state.selectedTab}>
// //                 <TabPane tabId={this.TAB_INDEX_BASIC_DETAILS}>
// //                     { this.renderBasicDetails() }
// //                 </TabPane>
// //                 <TabPane tabId={2}>
// //                     <div style={{ backgroundColor: 'blue', padding: 20 }}>
// //                         Sample Tab Content
// //                     </div>
// //                 </TabPane>
// //             </TabContent>
// //         </div >);
// //     }


// //     render() {
// //         return (this.state.status == Status.Loading) ?
// //             <PageLoader loadingMessage="Loading Profile.." /> :
// //             this.renderBody();
// //     }

// // }