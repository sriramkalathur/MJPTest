import React from "react";
import { ApplicationInfo, JobApplicationDetails, JobPositionApplyModel, StatusHistoryItem } from "../../models/JobPositions";
import { CommonUtils, DateField, DialogResult, DropdownList, FieldLabel, ListItem, ProcessingMessage, Status, StatusElement, TextBox } from "common";
import { JobPositionSearchFilter } from "./JobPositionSearchFilter";
import { Button, Badge, ButtonGroup as RSBtnGroup, Card, CardBody, CardGroup, CardLink, CardSubtitle, CardText, CardTitle, Col, Row, CardHeader, UncontrolledAccordion, AccordionItem, AccordionHeader, AccordionBody, Spinner, Nav, NavItem, NavLink, TabContent, TabPane, ButtonGroup, Input, Label, FormGroup, Offcanvas, OffcanvasHeader, OffcanvasBody } from "reactstrap";
import { JobApplicationService } from "../../services/JobApplicationService";

import { Backdrop, Box, Checkbox, Chip, CircularProgress, Divider, LinearProgress, Rating, Skeleton, Step, StepContent, StepLabel, Stepper, Tab, Tabs, Typography } from "@mui/material";
import { PageLoader, PageTitleActionBar } from "../../common/MJPCommon";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { MJPConstants } from "../../MJPConstants";

import { BiEnvelope, BiPhoneCall } from "react-icons/bi";
import { MJPUserRoles, UserContext } from "../../authentication/UserContext";


import { FiCheck, FiLogIn } from "react-icons/fi";
import { AiFillFilePdf, AiFillPhone, AiOutlineClose, AiOutlineCloudDownload, AiOutlineDown, AiOutlineDownCircle, AiOutlineDownload, AiOutlineMail } from "react-icons/ai";
import { ChoiceList, ChoiceItem } from "../../common/ChoiceList";

import { Formik, FormikProps } from "formik";
import { CompanyDetails, JobApplicationStatus, JobApplicationStatusHistory, JobPositionDetails, JobPositionStatus, PageProcessingStatus, PageTitle } from "../MJPComponents";
import { MJPCommonUtils } from "../../common/CommonUtils";
import { MJPRouteUtils } from "../../common/MJPRouteUtils";


import { JobPositionFeature } from "../../models/JobPositionModels";
import { EditJobFeaturePopup } from "../JobPosition/Features/EditJobFeaturePopup";
import { JobFeaturesList } from "../JobPosition/Features/JobFeaturesList";
import { PopupContextProps } from "./JobApplicationContext";
import { JobRequirementsList } from "../JobPosition/Requirements/JobRequirementsList";
import { JobPositionFeaturesView, JobPositionRequirementsView } from "./JobApplicationCommonComponents";
import { DocumentService } from "../../services/DocumentService";
import { DocumentType } from "../../models/DocumentModel";
import FileSaver from "../../assets/FileSaver";
import { DocumentsList } from "../DocumentList";
import { Company } from "../../models/Company";

class PropsModel {

    jobPositionId: number;

    jobApplicationId?: number;
}

class StateModel {
    jobPositionDetails: JobApplicationDetails;

    status: Status;

    statusMessage: string;

    tabIndex: string;

    isStateChangePopupOpen: boolean;

    isFeaturePopupOpen: boolean;

    isHistoryOpen: boolean;
}


export class JobApplicationDetailsView extends React.Component<PropsModel, StateModel> {

    YESNO_OPTION_YES = 1;
    YESNO_OPTION_NO = 2;



    TAB_INDEX_DETAILS = "1";

    TAB_INDEX_FEATURES = "2";


    TAB_INDEX_REQUIREMENTS = "3";

    TAB_INDEX_DOCUMENTS = "4";


    private formState: FormikProps<JobApplicationDetails>;

    private jobService: JobApplicationService;

    private newStatusId: number;

    private documentService: DocumentService;

    //When the user changes something, it updates the state of applicationStatus
    //so use this to render status
    private applicationStatusId: number;

    //Status which are used for Staff/Company
    private statusList: ListItem[];


    constructor(props: any) {
        super(props);

        var newItem = new JobApplicationDetails();
        newItem.applicationDetails = new ApplicationInfo();

        this.state = {
            jobPositionDetails: newItem,
            status: Status.Loading,
            statusMessage: "Loading",
            tabIndex: "1",
            isStateChangePopupOpen: false,
            isFeaturePopupOpen: false,
            isHistoryOpen: false
        };

        this.statusList = [
            new ListItem(MJPConstants.APPLICATION_STATUS_APPLIED, "Applied"),
            new ListItem(MJPConstants.APPLICATION_STATUS_SHORTLISTED, "Shortlisted"),
            new ListItem(MJPConstants.APPLICATION_STATUS_REJECTED, "Rejected"),

            new ListItem(MJPConstants.APPLICATION_STATUS_SELECTED, "Selected"),
            new ListItem(MJPConstants.APPLICATION_STATUS_NOT_SELECTED, "Not Selected"),

            new ListItem(MJPConstants.APPLICATION_STATUS_CANCELLED, "Cancelled"),
            new ListItem(MJPConstants.APPLICATION_STATUS_ONHOLD, "On Hold"),
        ];

        this.jobService = new JobApplicationService();
        this.documentService = new DocumentService();
    }


    async componentDidMount() {
        await this.loadApplication();
    }


    toggleHistory() {
        this.setState({
            isHistoryOpen: !this.state.isHistoryOpen
        });
    }


    renderRequirementsAndFeatures() {
        //return this.renderTest();
        return (<div>
            { (this.formState.values.requirements.length > 0) &&
                (<> <hr/>
                <div className="py-1">
                <div className="subtitle">Requirements</div>
                <div className="py-3">
                    <JobPositionRequirementsView requirements={this.formState.values.requirements} />
                </div>
               
                </div></>)
            }
            {
                (this.formState.values.features.length > 0) &&
                (<>  <hr /><div className="subtitle">Other Benefits</div>
                <div className="py-3">

                    <JobPositionFeaturesView features={this.formState.values.features} />
                </div>
                <hr />
                </>)

            }
            </div>
        );
    }


  


    // renderEditInterviewDate() {

    //     var date = (this.model.applicationDetails.interviewDate == null) ? "N/A" :
    //         CommonUtils.getDisplayDateTime(this.model.applicationDetails.interviewDate);

    //     return (<FieldLabel label="Interview Date">
    //         {
    //             // If disabled/applicant role, show as Label 
    //             (UserContext.isStaffRole() && !this.isApplicationStatusDisabled()) ?
    //                 <DateField fieldName="interviewDate" isTimeField={true}
    //                     class="col-8 nogutters"
    //                     onChange={(e) => {
    //                         this.formState.setFieldValue("applicationDetails.interviewDate", e.target.value);
    //                     }}
    //                     date={this.formState.values.applicationDetails.interviewDate}
    //                     errorMessage={this.formState.errors.applicationDetails && this.formState.errors.applicationDetails.interviewDate as string} /> :
    //                 <span>  {date} </span>

    //         }
    //     </FieldLabel>);
    // }

    // renderInterviewInstructions() {
    //     // Instrutions should be disbaled for Applicant and if the stutus is disbaled
    //     return (<FieldLabel label="Interview instructions">
    //         {(UserContext.isStaffRole() && !this.isApplicationStatusDisabled()) ?
    //             <TextBox fieldName="applicationDetails.interviewInstructions"
    //                 onChange={this.formState.handleChange}
    //                 type="textarea" rows={2}
    //                 value={this.formState.values.applicationDetails.interviewInstructions}
    //                 errorMessage={this.formState.errors.applicationDetails && this.formState.errors.applicationDetails.interviewInstructions as string} /> :
    //             <span>  {this.formState.values.applicationDetails.interviewInstructions} </span>
    //         }
    //     </FieldLabel>)
    // }



    // renderSideMenuDetails() {
    //     //If ther is an application details, render the detials
    //     return <>{((this.model.applicationDetails != null) &&
    //         <div className="py-4 px-3">
    //             <FieldLabel label="Applied On">
    //                 {CommonUtils.getDisplayDate(this.model.applicationDetails.appliedDate)
    //                 }
    //             </FieldLabel>
    //             <FieldLabel label="Application Status">
    //                 {
    //                     <JobApplicationStatus applicationStatusId={this.applicationStatusId} />
    //                 }
    //             </FieldLabel>
    //             {(this.model.applicationDetails.interviewDate) && <FieldLabel label="Interview Date">
    //                 {CommonUtils.getDisplayDate(this.model.applicationDetails.appliedDate)
    //                 }
    //             </FieldLabel>
    //             }

    //         </div>)
    //     }
    //     </>
    // }

    // renderSideMenus() {

    //     return (<div>
    //         <Nav vertical pills className="noBorder">
    //             <NavItem>
    //                 <NavLink className="sidemenu"
    //                     active={this.state.tabIndex == this.TAB_INDEX_DETAILS}
    //                     onClick={() => this.setState({ tabIndex: this.TAB_INDEX_DETAILS })}>
    //                     Job Summary
    //                 </NavLink>
    //             </NavItem>
    //             <NavItem>
    //                 <NavLink className="sidemenu"
    //                     active={this.state.tabIndex == this.TAB_INDEX_FEATURES}
    //                     onClick={() => this.setState({ tabIndex: this.TAB_INDEX_FEATURES })}>
    //                     Features & Requirements
    //                 </NavLink>
    //             </NavItem>
    //             <NavItem>
    //                 <NavLink className="sidemenu"
    //                     active={this.state.tabIndex == this.TAB_INDEX_DOCUMENTS}
    //                     onClick={() => this.setState({ tabIndex: this.TAB_INDEX_DOCUMENTS })}>

    //                     Documents
    //                 </NavLink>
    //             </NavItem>
    //         </Nav>
    //         {this.renderSideMenuDetails()}
    //     </div>);
    // }


    // renderApplicationDetails_old() {

    //     //applicanntUserName will be the email
    //     return (<div>
    //         <Row>
    //             <Col xs="4">
    //                 <FieldLabel label="Application #">
    //                     <h6> {this.formState.values.applicationDetails.applicationNumber} </h6>
    //                 </FieldLabel>
    //             </Col>
    //             <Col xs="4">
    //                 <FieldLabel label="Applied Date">
    //                     <span>{CommonUtils.getDisplayDateTime(this.model.applicationDetails.appliedDate)}</span>
    //                 </FieldLabel>
    //             </Col>
    //             <Col xs="4">
    //                 { /* If it is already applied to company, disable that */}
    //                 <ChoiceList choices={this.yesNoOptions}

    //                     disabled={this.isApplicationStatusDisabled() || this.model.applicationDetails.appliedToCompany
    //                         || (!UserContext.isStaffRole())}
    //                     onChoiceChanged={(itemId) => {
    //                         ;
    //                         this.formState.values.applicationDetails.appliedToCompany = (itemId == this.YESNO_OPTION_YES);

    //                     }}
    //                     selectedChoiceId={(this.formState.values.applicationDetails.appliedToCompany) ?
    //                         this.YESNO_OPTION_YES : this.YESNO_OPTION_NO} label={"Sent to Company"} />
    //             </Col>

    //         </Row>  

    //         {this.renderApplicantDetails()}

    //         <Row>
    //             {   // Interview details should be shown only after it is applied to compnay
    //                 (this.model.applicationDetails.appliedToCompany) &&

    //                 <Col xs="4">
    //                     {this.renderInterviewDate()}
    //                 </Col>
    //             }
    //             {(this.model.applicationDetails.appliedToCompany) &&
    //                 (this.formState.values.applicationDetails.interviewDate) &&

    //                 <Col xs="8">
    //                     {this.renderInterviewInstructions()}
    //                 </Col>
    //             }
    //         </Row>
    //         <Row>
    //             { /* Render interview status only when there is a interview date */}
    //             {(this.model.applicationDetails.appliedToCompany) &&
    //                 (this.model.applicationDetails.interviewDate) &&
    //                 <Col xs="4">
    //                     {this.renderInterviewStatus()}
    //                 </Col>
    //             }
    //             <Col xs="4">

    //                 <ChoiceList choices={this.yesNoOptions}
    //                     disabled={(this.model.applicationDetails.applicationStatusId == MJPConstants.APPLICATION_STATUS_CLOSED) ||
    //                         (!UserContext.isStaffRole())}
    //                     onChoiceChanged={(choiceId): void => {
    //                         if (choiceId == this.YESNO_OPTION_YES) {
    //                             //YES>Closed. Set the status
    //                             this.formState.values.applicationDetails.applicationStatusId = MJPConstants.APPLICATION_STATUS_CLOSED;
    //                         }
    //                     }}
    //                     selectedChoiceId={(this.formState.values.applicationDetails.applicationStatusId == MJPConstants.APPLICATION_STATUS_CLOSED) ?
    //                         this.YESNO_OPTION_YES :
    //                         this.YESNO_OPTION_NO} label={"Is Closed"} />

    //             </Col>

    //         </Row>

    //     </div>);
    // }

    renderApplicationFields() {

        //applicanntUserName will be the email
        return (<>
            <div className="py-2">
            {(UserContext.isStaffRole() ? this.renderStaffFields() :
                <Row>
                    <Col xs="4"> {this.renderStaffRemarks()} </Col>
                    <Col xs="4"> {this.renderApplicantRemarks()} </Col>
                </Row>
            )}
        </div></>);
    }




    // renderStatus() {
    //     return (<div>
    //         <div className="py-1">  
    //             <FieldLabel label="Position Status">
    //                 {
    //                     <JobPositionStatus statusId={this.model.positionDetails.statusId} />
    //                 }
    //             </FieldLabel>
    //         </div>

    //         <div className="py-1">
    //             <FieldLabel label="Application Status">
    //                 <>
    //                     {(this.model.applicationDetails) &&
    //                         <JobApplicationStatus applicationStatusId={this.model.applicationDetails.applicationStatusId} />
    //                     }

    //                 </>
    //             </FieldLabel>
    //         </div>
    //     </div>);
    // }


    renderStatus() {

        return (<div className="col-8 nogutters">
            <DropdownList labelText="Status" fieldName="applicationDetails.applicationStatusId"
                onChange={this.formState.handleChange} addDefaultSelect={true}
                errorMessage={MJPCommonUtils.getError(this.formState, "applicationDetails.applicationStatusId")}
                value={this.formState.values.applicationDetails.applicationStatusId?.toString()}
                options={this.statusList}
                displayMember="displayText" valueMember="itemId" />
        </div>);
    }


  

    private async updateJobApplication(): Promise<void> {
        this.setState({ status: Status.Processing });

        MJPCommonUtils.clearErrors(this.formState);
        //Update status
        var result = await this.jobService.updateJobApplication(this.formState.values);

        if (!result.success) {

            //set the errors
            MJPCommonUtils.updateErrors(result, this.formState);
            //Set the failure status
            this.setState({ status: Status.Failure });
        }
        else {
            //success.
            //this.state.status = Status.None,
            //refresh application
            this.loadApplication();
        }


    }

    private showStatusPopup(show: boolean, newStatusId: number) {
        this.newStatusId = newStatusId;
        this.setState({
            isStateChangePopupOpen: show
        });
    }


    private async loadApplication(): Promise<void> {
        this.setState({ status: Status.Loading });
        //Load
        //Don't use the ApplicationId as there is a possibility that the user will direclty 
        //pass the applicationid and access the details
        var model = await this.jobService.selectJobApplicationDetails(this.props.jobPositionId, this.props.jobApplicationId);

        if (model.applicationDetails != null) {
            //set the ApplicationStatusId
            this.applicationStatusId = model.applicationDetails.applicationStatusId;
        }

        this.setState({
            jobPositionDetails: model,
            isStateChangePopupOpen: false,
            status: Status.None
        });
    }

   
    // private showReferBackPopup() {
    //     let newStatusId: number;
    //     if (UserContext.loggedInUser.role != MJPUserRoles.Applicant) {
    //         //Staff role. Set that as REFERBACK to applicatnt by default.
    //         //User will choosen that for applicant if he wants
    //         newStatusId = MJPConstants.APPLICATION_STATUS_REFER_BACK_TO_APPLICANT;
    //     }
    //     else {
    //         //Role Applicant. It is only REFER BACK TO STAFF
    //         newStatusId = MJPConstants.APPLICATION_STATUS_REFER_BACK_TO_STAFF;
    //     }

    //     this.showStatusPopup(true, newStatusId);
    // }


    private async applyForJobPosition(): Promise<void> {
        //Just show the APPLY Job popup
        //var newStatusId = MJPConstants.APPLICATION_STATUS_APPLIED;
        //this.showStatusPopup(true, newStatusId);

        this.setState({
            status: Status.Processing,
            statusMessage: "Processing.."
        }); 

        var model = new JobPositionApplyModel();
        model.jobPositionId = this.props.jobPositionId;
        var result = await this.jobService.applyForPosition(model);

        //Clear the errors
        this.formState.setErrors([] as any);
        if (!result.success) {

            //There re errors. Set the errors
            MJPCommonUtils.updateErrors(result, this.formState);
            //Set the failure status
            var errMsg = result.errors["jobPositionId"] as string;
            this.setState({
                status: Status.Failure,
                //Just set the first error as status Message.
                statusMessage: errMsg
            });
        }
        else {
            this.setState({
                status: Status.Success,
                statusMessage: "Job Applied succesfully"
            });
        }
    }   
 

    private renderApplicantDetails() {
        return (<>
        
                <div> 
                    <div className="fieldLabel">Applicant Details</div>
                </div>
                <div>
                    <b>{this.formState.values.applicationDetails.applicantName}</b>
                </div>

                <div>
                    <AiFillPhone />
                    <span className="px-2"> {this.formState.values.applicationDetails.contactNumber}</span>
                </div>
                <div>
                    <AiOutlineMail />
                    <span className="px-2"> {this.formState.values.applicationDetails.applicantName}</span>
                </div>
            </>);
    }




    private renderActionButtonsForNotApppliedJob() {
        return (
            <div>
                { /* If the Jobs is cancelled/closed, user should not apply for the job */}
                {!UserContext.isStaffRole() &&
                    <Button outline color="teal" className="ml-2"
                        disabled={this.isJobStatusDisabled()}
                        onClick={async (e) => {
                            //save the details
                           
                            this.applyForJobPosition();
                        }}> <FiCheck />&nbsp;Apply</Button>
                }
            </div>);
    }

    private renderActionButtonsForGuest() {
        return (<Button outline color="teal" className="ml-2"
                         onClick={async (e) => {
                        //save the details
                        window.location.href ="/login";
                    }}> Login to Apply</Button>);
    }

    private renderJobTitle() {
        return (<>
            <div>
                <b>{this.formState.values.positionDetails.positionTitle} </b>
            </div>
            <div>
                <Rating size="small" readOnly={true}
                    className="py-2"
                    value={this.formState.values.positionDetails.company.rating} />
            </div>
            {    /* Company details should not be shown for Applicant */
                (UserContext.isUserLoggedIn() && UserContext.isStaffRole()) &&
                <div className="subtitle nogutters"> {this.model.positionDetails.company.displayName} </div>
            }
        </>);
    }





    // private renderStaffStatus() {
    //     return (<>
    //         <ChoiceList choices={this.statusListChoices}
    //             onChoiceChanged={(statusId: number) => {
    //                 //Just call the status change popup
    //                 this.showStatusPopup(true, statusId);
    //             }}
    //             label="Application Status" disabled={false} />
    //     </>);
    // }



    private renderActionButtonsForApppliedJob() {
        return (

            <div>
                <Button outline color="teal"
                    className="ml-2 pr-2"
                    onClick={async (e) => {
                        //save the details
                        await this.updateJobApplication();
                    }}> 
                    <FiCheck />&nbsp;Save</Button>

                <Button outline color="teal" className="ml-2"
                    onClick={(e) => MJPRouteUtils.navigateToMyApplications()} > <AiOutlineClose /> Cancel</Button>
            </div>);
        {/* <Button outline color="teal" className="ml-2"
                    onClick={async (e) => {
                        //save the details
                        this.showReferBackPopup();
                    }}>Refer Back</Button>
                <Button outline color="teal" className="ml-2" onClick={async (e) => {
                    //save the details
                    this.showStatusPopup(true, MJPConstants.APPLICATION_STATUS_CANCELLED);
                }}>Cancel Application</Button> */}
    }

    
    private renderActionButtons() {
        return (! UserContext.isUserLoggedIn()) ? this.renderActionButtonsForGuest() :
                ((this.model.applicationDetails == null) ?
                this.renderActionButtonsForNotApppliedJob():
                this.renderActionButtonsForApppliedJob());
    } 

    renderTitleBar() {

        var title = (this.model.applicationDetails == null) ? ("Job Position " + this.model.positionDetails.jobCode) :
            ("Job Application " + this.model.applicationDetails.applicationNumber)

        return (<PageTitle title={title} actionButtons={this.renderActionButtons()} />);
    }

    renderStaffFields() {
        return (<>
            <Row>
                <Col xs="4"> {this.renderApplicantRemarks()} </Col>
                <Col xs="4"> {this.renderStatus()} </Col>
                <Col xs="4"> {this.renderStaffRemarks()} </Col>
            </Row>
        </>);
    }

    renderHistory() { 
        return (<>
            
            <div className="px-5 py-5">
                <JobApplicationStatusHistory
                    statusHistory={this.state.jobPositionDetails.statusHistory} />
            </div>

        </>

        );
    }



    renderJobHeader() {
        var position = this.state.jobPositionDetails;
        return (<div>
            <Row>

                <Col xs="4">
                    <FieldLabel label="Job Code">
                        <h6>
                            {this.formState.values.positionDetails.jobCode}
                        </h6>
                    </FieldLabel>

                </Col>
                <Col xs="4">{this.renderJobTitle()}</Col>
                <Col xs="4">
                <FieldLabel label="Job Summary">
                    <span>{this.formState.values.positionDetails.jdSummary}</span>
                </FieldLabel>
            </Col>
            </Row>
            <hr />
        </div>);
    }


    renderJobDetails() {
        var position = this.state.jobPositionDetails;
        return (
            <div>
               
                { this.renderJobHeader() }
              
                {
                    (this.formState.values.applicationDetails) &&
                    <><Row className="py-2">
                    <Col xs="4"> {this.renderApplicantDetails()} </Col>
                    <Col xs="4">
                        <FieldLabel label="Applied On">
                            {CommonUtils.getDisplayDateTime(this.formState.values.applicationDetails.appliedDate)}
                        </FieldLabel>
                    </Col>
                    <Col xs="4">
                        <FieldLabel label="Application Status">
                            <JobApplicationStatus applicationStatusId={this.formState.values.applicationDetails.applicationStatusId} />
                        </FieldLabel>
                    </Col>
                    </Row> 
                    <hr />
                    </>
                }
                <div className="subtitle">Job Position Details</div>
                <JobPositionDetails position={this.formState.values}></JobPositionDetails>
               
                { this.renderRequirementsAndFeatures() }
               
                { this.renderDocuments() }

                {(this.model.applicationDetails) &&
                   <>
                    <hr />
                    { this.renderApplicationFields() }
                   </> 
                }
               
            </div>);
    }




    private renderDocuments() {


        return ((this.model.positionDetails.documents &&
            (this.model.positionDetails.documents.length > 0)) &&
            <>
                <div className="subtitle">Documents</div>
                <div className="py-3">
                    {this.model.positionDetails.documents.map((d, index) => {
                        return (<div className="py-1">
                            <Chip variant="outlined"
                                icon={<AiOutlineCloudDownload />}
                                label={d.fileName}
                                color={"primary"}

                                onClick={(e) => {
                                    this.documentService.downloadDocument(d.documentId, DocumentType.JobPosition);
                                    e.preventDefault();
                                }}></Chip></div>);
                    })

                    }</div></>);
    }



    private get model() {
        return this.state.jobPositionDetails;
    }




    // isApplicationStatusDisabled() {
    //     var statusId = this.model.applicationDetails.applicationStatusId;
    //     //Status cannot be EDIED further when the status is closed/cancelled
    //     return ((statusId == MJPConstants.APPLICATION_STATUS_CLOSED) ||
    //         (statusId == MJPConstants.APPLICATION_STATUS_CANCELLED));
    // }

    isJobStatusDisabled() {
        var statusId = this.model.positionDetails.statusId;
        //Status cannot be EDIED further when the status is closed/cancelled
        return ((statusId == MJPConstants.JOB_STATUS_EXPIRED) ||
            (statusId == MJPConstants.JOB_STATUS_CANCELLED));
    }


    //Yes/NO choice options
    yesNoOptions: Array<ChoiceItem> = [
        { choiceId: this.YESNO_OPTION_YES, displayText: "Yes", color: "teal" },
        { choiceId: this.YESNO_OPTION_NO, displayText: "No", color: "teal" }
    ]

    INTERVIEW_STATUS_NA = -1;

    //Yes/NO choice options
    interviewStatusOptions: Array<ChoiceItem> = [
        { choiceId: null, displayText: "N/A", color: "teal" },
        { choiceId: MJPConstants.APPLICATION_STATUS_SELECTED, displayText: "Selected", color: "teal" },
        { choiceId: MJPConstants.APPLICATION_STATUS_REJECTED, displayText: "Rejected", color: "teal" }
    ]


    // renderInterviewStatus() {

    //     //The application already applied. 
    //     //So show the applied status as YES and date

    //     return (this.model.applicationDetails.interviewDate) &&
    //         (<>
    //             { /* Interview status should be edited only by staff */}
    //             <ChoiceList choices={this.interviewStatusOptions}
    //                 disabled={this.isApplicationStatusDisabled() || (!UserContext.isStaffRole())}
    //                 onChoiceChanged={(itemId: number) => {
    //                     //Set the status directly 
    //                     this.formState.values.applicationDetails.interviewStatusId = itemId;
    //                 }}
    //                 selectedChoiceId={this.formState.values.applicationDetails.interviewStatusId}
    //                 label={"Interview status"} />

    //         </>)

    // }

    renderBody() {
        return (<>
             
                <Formik
                    initialValues={this.state.jobPositionDetails}
                    validateOnChange={false}
                    validateOnBlur={false}
                    onSubmit={(e) => { }}>
                    {(props) => {
                        this.formState = props;
                        return (<>
                            <Row>
                        
                                { /* If there is applicant info, show only 9 and use the reamaining for history */ }
                                <Col xs={(this.formState.values.applicationDetails == null) ? "12": "9"} className="nogutters">
                                { this.renderJobDetails() }
                                </Col>
                             
                                {
                                    (this.formState.values.applicationDetails) &&
                                    <>
                                    <Col  xs="0-25"><Divider orientation="vertical" variant="middle" /></Col>
                                    <Col xs="2-75"> {this.renderHistory()} </Col>
                                    </>
                                }
                            
                            </Row></>);
                    }}</Formik>
                    </>);
    }


    renderStaffRemarks() {

        /* If userRole is other than staff, show the staff remarks as readonly */
        return (this.formState.values.applicationDetails != null) &&

            ((UserContext.isStaffRole() ?
                (<TextBox fieldName="applicationDetails.staffRemarks"
                    value={this.formState.values.applicationDetails.staffRemarks}
                    rows={2} type="textarea" label="Staff Remarks"
                    onChange={this.formState.handleChange}
                    errorMessage={this.formState.errors.applicationDetails &&
                        this.formState.errors.applicationDetails.staffRemarks} />) :
                <FieldLabel label="Staff Remarks">
                    <span>{(this.formState.values.applicationDetails.staffRemarks == null) ? "N/A" : this.formState.values.applicationDetails.staffRemarks}</span>
                </FieldLabel>
            ));
    }


    renderApplicantRemarks() {

        /* If userRole is other than staff, show the staff remarks as readonly */
        return (UserContext.isStaffRole() ?
            (<FieldLabel label="Applicant Remarks">
                <span>{(this.formState.values.applicationDetails.applicantRemarks == null) ? "N/A" : this.formState.values.applicationDetails.applicantRemarks}</span>
            </FieldLabel>) :
            (<TextBox fieldName="applicationDetails.applicantRemarks"
                onChange={this.formState.handleChange}
                value={this.formState.values.applicationDetails.applicantRemarks}
                rows={2} type="textarea" label="Applicant Remarks"
                errorMessage={this.formState.errors.applicationDetails &&
                    this.formState.errors.applicationDetails.applicantRemarks} />));

    }

   
    

    renderCurrentTab() {
        return (<TabContent activeTab={this.state.tabIndex}>
            <TabPane tabId={this.TAB_INDEX_DETAILS}>
                {this.renderJobDetails()}
            </TabPane>
            <TabPane tabId={this.TAB_INDEX_DOCUMENTS}>
                {this.renderDocuments()}
            </TabPane>
            <TabPane tabId={this.TAB_INDEX_FEATURES}>
                <Row>
                    <Col xs="6"> 
                    {this.renderRequirementsAndFeatures()}
                    </Col>
                    <Col xs="6">
                        { this.renderDocuments() }
                    </Col>
                </Row>
              
            </TabPane>
        </TabContent>);
    }

    renderProcessingStatus() { 

        switch (this.state.status) {
            case Status.Processing: {
                return (<div className="px-1 py-3"><ProcessingMessage statusMessage={this.state.statusMessage} /></div>);
            }
            case Status.Failure: {
                return (<div className="px-1 py-2 error"><ProcessingMessage statusMessage={this.state.statusMessage} /></div>);
            }

        }
    }


    renderTabs() {
        return (<div>
            <Nav tabs>
                <NavItem>
                    <NavLink
                        className={(this.state.tabIndex == this.TAB_INDEX_DETAILS) ? "active" : ""}
                        onClick={(e) => this.setState({ tabIndex: this.TAB_INDEX_DETAILS })}>
                        Job Details
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={(this.state.tabIndex == this.TAB_INDEX_FEATURES) ? "active" : ""}
                        onClick={(e) => this.setState({ tabIndex: this.TAB_INDEX_FEATURES })}>
                        Requirements & Benefits
                    </NavLink>
                </NavItem> 
                <NavItem>
                    <NavLink
                        className={(this.state.tabIndex == this.TAB_INDEX_DOCUMENTS) ? "active" : ""}
                        onClick={(e) => this.setState({ tabIndex: this.TAB_INDEX_DOCUMENTS })}>
                        Documents
                    </NavLink>
                </NavItem>

            </Nav>
        </div>);
    }




    render() {
        return (this.state.status == Status.Loading) ?
            <PageLoader loadingMessage="Loading Job Details.." /> :
            <div>
                 <div>
                    {this.renderTitleBar()}
               </div>
               <div>
                <PageProcessingStatus status={this.state.status} statusMessage={this.state.statusMessage} />
                 
                </div>
            
                {this.renderBody()}
              
            </div>

    }
}