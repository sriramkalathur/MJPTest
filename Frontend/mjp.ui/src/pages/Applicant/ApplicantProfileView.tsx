import { TabContext, TabPanel } from "@mui/lab";
import { Box, Step, StepButton, StepContent, InputLabel, FormControl, StepLabel, Stepper, Select, Tab, Tabs, TextField } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import { DateField, DropdownList, FieldLabel, ListItem, Status, TextBox } from "common";
import React from "react";
import { MdAddToHomeScreen } from "react-icons/md";
import { SiTrustedshops } from "react-icons/si";
import { Button, Card, Col, Nav, NavItem, NavLink, Row } from "reactstrap";

import { UserProfileMasters } from "../../models/UserModels";
import { PageLoader } from "../../common/MJPCommon";
import { Formik, FormikProps } from "formik";
import { PageProcessingStatus, PageTitle } from "../MJPComponents";
import { FiCheck } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import { EditPersonalInformation } from "./EditPersonalInformation";
import { ApplicantService } from "../../services/ApplicantService";
import { ApplicantInfo, ApplicantProfile, PersonalInformation } from "../../models/ApplicantModels";
import { ApplicantDocumentList, ApplicantDocumentsListView } from "./ApplicantDocumentsList";
import { MasterService } from "../../services/MasterService";
import { ApplicantCertificatesList, CertificatesListView } from "./ApplicantCertificatesList";
import { STCWCourseListView, STCWCoursesList } from "./STCWCoursesList";
import { ExperiencesView, SEAExperiencesList } from "./SEAExperiencesList";
import { EditApplicantProfile } from "./EditApplicantProfile";
import { Applicant } from "../../models/ApplicantFilterModel";

class PropsModel {
    applicantId: number;
}


class StateModel {

    status: Status;

    statusMessage: string;
}


export class ApplicantProfileView extends React.Component<PropsModel, StateModel> {

    //The applicant Basic Info will be in persomal inforamtin
    //When we load the page, we load the personal info and take that avoiding 2 individual loads
    private model: ApplicantProfile;

    private applicantService: ApplicantService;

    constructor(props: any) {
        super(props);

        this.applicantService = new ApplicantService();
        
        this.state = {
            status: Status.Loading,
            statusMessage: "Loading Profile.."
        };
    }

    async componentDidMount() {

        this.setState({ status: Status.Loading });
        this.model = await this.applicantService.selectProfileDetails(this.props.applicantId);
    
        this.setState({ status: Status.None });
    }

  
    renderPersonalInformation(){
        return (<>
            <Row>
                <Col xs="5">
                    <FieldLabel label="Applicant Name"> <h6>{ this.model.personalInfo.displayName}</h6> </FieldLabel>
                </Col>
                <Col>
                    <FieldLabel label="Father's Name"> { this.model.personalInfo.fatherName} </FieldLabel>
                </Col> 
            </Row>
            <Row>
                <Col xs="5"><FieldLabel label="Nationality"> { this.model.personalInfo.nationality} </FieldLabel>
                </Col>
                <Col xs="5"><FieldLabel label="Marital Status"> { this.model.personalInfo.maritalStatus} </FieldLabel>
                </Col>
            </Row>
            <Row>
                <Col xs="5"><FieldLabel label="Age"> { this.model.personalInfo.age} </FieldLabel>
                </Col>
                <Col xs="5"><FieldLabel label="Languages Known"> { this.model.personalInfo.languagesKnown} </FieldLabel>
                </Col>
            </Row>
            <Row>
                <Col xs="5"><FieldLabel label="Educational Qualification"> { this.model.personalInfo.educationalQualification} </FieldLabel>
                </Col>
                <Col xs="7"><FieldLabel label="Technical Qualification"> { this.model.personalInfo.technicalQualification} </FieldLabel>
                </Col>
            </Row>

            <Row>
                <Col xs="5"><FieldLabel label="Rank"> { this.model.personalInfo.rank} </FieldLabel>
                </Col>
                <Col xs="7"><FieldLabel label="Experience"> { this.model.personalInfo.experience} yrs </FieldLabel>
                </Col>
            </Row>
        </>);
    }


    renderSTCWCourses(){
        return ((this.model.courses.length > 0) && 
        <>
        
        <div className="py-2"><b>COURSES</b></div>
        <STCWCourseListView courses={this.model.courses} />
        </>);
    }


    renderSEAExperiences(){
        return ((this.model.experience.length > 0) && 
        <>
        
        <div className="py-2"><b>EXPERIENCE</b></div>
        <ExperiencesView experience={this.model.experience} />
        </>);
    }
 
    renderCertificates(){
       
        return ((this.model.certificates.certificates.length > 0) && 
        (<>
      
        <div className="py-2"><b>CERTIFICATES</b></div>
        <CertificatesListView certificates={this.model.certificates.certificates} />
        </>));
    }

    renderDocuments(){
       
        return ((this.model.documents.length > 0) && 
        (<>
      
        <div className="py-2"><b>DOCUMENTS</b></div>
        <ApplicantDocumentsListView documents={this.model.documents} />
        </>));
    }
    
    renderBody() {
        return (<div>
          <div>
            <PageTitle title="Applicant Profile" />
            { this.renderPersonalInformation() } 
            <hr />
            { this.renderDocuments() } 
            { this.renderSEAExperiences() } 
            { this.renderCertificates() } 
            { this.renderSTCWCourses() } 
            
          </div>
        </div>)
    }


    render() {

        return (this.state.status == Status.Loading) ?
            <PageLoader loadingMessage="Loading Profile.." /> :
            this.renderBody();
    }
}