import { TabContext, TabPanel } from "@mui/lab";
import { Box, Step, StepButton, StepContent, InputLabel, FormControl, StepLabel, Stepper, Select, Tab, Tabs, TextField } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import { DateField, DropdownList, ListItem, Status, TextBox } from "common";
import React from "react";
import { MdAddToHomeScreen } from "react-icons/md";
import { SiTrustedshops } from "react-icons/si";
import { Button, Card, Col, Nav, NavItem, NavLink, Row } from "reactstrap";

import { UserProfileMasters } from "../../models/UserModels";
import { PageLoader } from "../../common/MJPCommon";
import { Formik, FormikProps } from "formik";
import { PageProcessingStatus, PageTitle } from "../MJPComponents";
import { FiCheck, FiSend } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import { EditPersonalInformation } from "./EditPersonalInformation";
import { ApplicantService } from "../../services/ApplicantService";
import { ApplicantInfo, PersonalInformation } from "../../models/ApplicantModels";
import { ApplicantDocumentList } from "./ApplicantDocumentsList";
import { MasterService } from "../../services/MasterService";
import { ApplicantCertificatesList } from "./ApplicantCertificatesList";
import { STCWCoursesList } from "./STCWCoursesList";
import { SEAExperiencesList } from "./SEAExperiencesList";
import { DocumentsList } from "../DocumentList";
import { DocumentType } from "../../models/DocumentModel";
import { ProfileContextData , ApplicantProfileContext } from "./ProfileContext";

class PropsModel {
    applicantId: number;
}


class StateModel {

    status: Status;

    activeTab: string;

    statusMessage: string;
}


export class EditApplicantProfile extends React.Component<PropsModel, StateModel> {

    TAB_INDEX_BASIC_DETAILS = "1";

    TAB_INDEX_DOCUMENTS = "2";

    TAB_INDEX_COURSES = "3";

    TAB_CERTIFICATE_OF_COMPETENCY = "4";

    TAB_INDEX_EXPERIENCE = "5";

    TAB_INDEX_FILES = "6";

    //The applicant Basic Info will be in persomal inforamtin
    //When we load the page, we load the personal info and take that avoiding 2 individual loads
    private model: ApplicantInfo;

    private applicantService: ApplicantService;

    private masterService: MasterService;

    private masters: UserProfileMasters;
   

    //declare  context: React.ContextType<typeof ApplicantProfileContext>;

    constructor(props: any) {
        super(props);  

        this.applicantService = new ApplicantService();
        this.masterService = new MasterService();
        
        this.state = {
            activeTab: this.TAB_INDEX_BASIC_DETAILS,
            status: Status.Loading,
            statusMessage: "Loading.."
        };

       // this.context.TAB_CERTIFICATE_OF_COMPETENCY
    }

    async componentDidMount() {

        this.setState({ status: Status.Loading , statusMessage : "Loading Profile.."});
        this.model = await this.applicantService.selectApplicantInfo(this.props.applicantId);
        this.masters = await this.masterService.selectUserProfileMasters();

        this.setState({ status: Status.None });
    }
 
    async submitProfile(){
        this.setState({
            status: Status.Processing,
            statusMessage: "Submitting Profile"
        });
        //Submit profile
        await this.applicantService.submitProfile(this.props.applicantId);
        this.setState({
            status: Status.Success,
            statusMessage: "Profile Submitted Successfully. Your account will be activated once your profile is validated."
        })
    }

    renderSideMenus(){
    
        return (<Nav vertical pills className="noBorder">
            <NavItem>
              <NavLink className="sidemenu"
                active = { this.state.activeTab ==  this.TAB_INDEX_BASIC_DETAILS}
                onClick={ () => this.setState({ activeTab : this.TAB_INDEX_BASIC_DETAILS})}>
              
                Personal Information
              </NavLink>
            </NavItem>
            <NavItem>
            <NavLink className="sidemenu"
                active = { this.state.activeTab == this.TAB_INDEX_DOCUMENTS}
                onClick={ () => this.setState({ activeTab : this.TAB_INDEX_DOCUMENTS})}>
              
                Documents
              </NavLink>
            </NavItem>
            <NavItem>
            <NavLink className="sidemenu"
                active = { this.state.activeTab == this.TAB_INDEX_COURSES}
                onClick={ () => this.setState({ activeTab : this.TAB_INDEX_COURSES})}>
              
                Courses
              </NavLink>
            </NavItem>
            <NavItem>
            <NavLink className="sidemenu"
                active = { this.state.activeTab == this.TAB_CERTIFICATE_OF_COMPETENCY}
                onClick={ () => this.setState({ activeTab : this.TAB_CERTIFICATE_OF_COMPETENCY})}>
              
                Other Certificates
              </NavLink>
            </NavItem>
          
            <NavItem>
             <NavLink className="sidemenu"
                active = { this.state.activeTab == this.TAB_INDEX_EXPERIENCE}
                onClick={ () => this.setState({ activeTab : this.TAB_INDEX_EXPERIENCE})}>
                SEA Experience
              </NavLink> 
            </NavItem>

            <NavItem>
             <NavLink className="sidemenu"
                active = { this.state.activeTab == this.TAB_INDEX_FILES}
                onClick={ () => this.setState({ activeTab : this.TAB_INDEX_FILES})}>
               Files
              </NavLink> 
            </NavItem>
          </Nav>);   
    }
  


    renderSideNavBar(){
        return (<Card>
            <div className="text-center py-2"><h5>{ this.model.firstName.toUpperCase() }
        </h5> <h5> { this.model.lastName.toUpperCase() }</h5>
            </div>
            <hr />
            <div>
            { this.renderSideMenus()} 
            </ div>
        </Card>)
    }

    renderDocuments() {
        return (<>
            <PageTitle title="Files" /> 
            <DocumentsList allowDelete={true} documentType={DocumentType.Applicant} itemId={this.model.applicantId} />
        </>);
    }
   
    renderBody() {
        return (<div>
            <Row>
                <Col xs="2" md="3">
                    <div className="py-3">{ this.renderSideNavBar() } </div>
                    <div className="py-2 aligncenter">
                    <Button outline color="teal"
                        onClick={async (e) => {
                            //save the details
                            await this.submitProfile();
                        }}> <FiSend />&nbsp;Submit Profile</Button>

                    </div>
                </Col>
                <Col xs="10" md="9">
                    <PageProcessingStatus status={this.state.status}  statusMessage={this.state.statusMessage}/>
                    {(this.state.activeTab == this.TAB_INDEX_BASIC_DETAILS) &&
                        <div className="px-2">
                        <EditPersonalInformation applicantId={this.props.applicantId} masters={this.masters} />
                        </div>
                    }

                    {(this.state.activeTab == this.TAB_INDEX_DOCUMENTS) &&
                        <div className="px-2">
                        <ApplicantDocumentList applicantId={this.props.applicantId} 
                            documentTypes={this.masters.documentTypes}
                        />
                      </div>
                    }
                    {(this.state.activeTab == this.TAB_INDEX_COURSES) &&
                        <div className="px-2">
                        <STCWCoursesList applicantId={this.props.applicantId} 
                            masters={this.masters}
                        />
                      </div>
                    }

                    { (this.state.activeTab == this.TAB_CERTIFICATE_OF_COMPETENCY) &&

                        <div className="px-2">
                          
                            <ApplicantCertificatesList masters={this.masters} applicantId={this.props.applicantId} />
                        </div>
                    }
                    { (this.state.activeTab == this.TAB_INDEX_EXPERIENCE) &&
                        <div className="px-2">
                            <SEAExperiencesList applicantId={this.props.applicantId} masters={this.masters} />
                        </div>
                    }
                     { (this.state.activeTab == this.TAB_INDEX_FILES) &&
                        <div className="px-2">
                            { this.renderDocuments() }
                        </div>
                    }
            </Col>
            </Row> 
           
        </div>)
    }


    render() {

        return (this.state.status == Status.Loading) ?
            <PageLoader loadingMessage={ this.state.statusMessage } /> :
            this.renderBody();
    }
}

