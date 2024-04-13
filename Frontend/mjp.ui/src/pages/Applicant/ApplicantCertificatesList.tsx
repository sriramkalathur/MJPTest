import { TabContext, TabPanel } from "@mui/lab";
import { Box, Step, StepButton, StepContent, InputLabel, FormControl, StepLabel, Stepper, Select, Tab, Tabs, TextField } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import { CommonUtils, DateField, DialogResult, DropdownList, ListItem, Status, TextBox } from "common";
import React from "react";
import { MdAddToHomeScreen } from "react-icons/md";
import { SiTrustedshops } from "react-icons/si";
import { Button, Card, Col, Nav, NavItem, NavLink, Row } from "reactstrap";

import { UserProfileMasters } from "../../models/UserModels";
import { PageLoader } from "../../common/MJPCommon";
import { Formik, FormikProps } from "formik";
import { PageProcessingStatus, PageTitle } from "../MJPComponents";
import { FiCheck } from "react-icons/fi";
import { AiFillDelete, AiOutlineClose } from "react-icons/ai";
import { EditPersonalInformation } from "./EditPersonalInformation";
import { ApplicantService } from "../../services/ApplicantService";
import { ApplicantDocument, ApplicantInfo, PersonalInformation } from "../../models/ApplicantModels";
import { MJPCommonUtils } from "../../common/CommonUtils";
import { IoIosAdd } from "react-icons/io";

import { FaRegEdit } from "react-icons/fa";
import { ApplicantCourseService } from "../../services/ApplicantCourseService";
import { CertificatesList, CompetencyCertificate } from "../../models/ApplicantCourses";
import { EditApplicantDocumentPopup } from "./Popup/EditApplicantDocumentPopup";
import { EditCertificatePopup } from "./Popup/EditCertificatePopup";

class PropsModel {
    applicantId: number;

    masters: UserProfileMasters;
}


class StateModel {

    status: Status;

    statusMessage: string;

    //Current Item selected
    currentItem: CompetencyCertificate;

    isPopupOpen: boolean;
}


export class ApplicantCertificatesList extends React.Component<PropsModel, StateModel> {

    private service: ApplicantCourseService;

    private model: CertificatesList;

    constructor(props: any) {
        super(props);

        this.service = new ApplicantCourseService();
        this.state = {
            status: Status.Loading,
            statusMessage: "Loading Certificates..",
            currentItem: null,
            isPopupOpen: false
        };
    }


    async loadCertificates() {

        this.setState({ status: Status.Loading });
        this.model = await this.service.selectCertificates(this.props.applicantId);
        this.setState({ status: Status.None });
    }

    async componentDidMount() {
        await this.loadCertificates();
    }


    private async deleteCertificate(certificateId: number): Promise<void> {

        this.setState({
            status: Status.Processing,
            statusMessage: "Deleting Certificate.."
        });
        await this.service.deleteCertificate(certificateId);
        await this.loadCertificates();
    }


    private renderCertificate(item: CompetencyCertificate) {
        return (<>
            <Row>
                <Col xs="2-5">{item.certificateName} </Col>
                <Col xs="2">{item.certificateNumber} </Col>
                <Col xs="1">{item.grade} </Col>

                <Col xs="1-5">{ item.yearOfPassing} </Col>
               
                <Col xs="2">{item.institution} </Col>
                <Col xs="2">{item.board} </Col>
                <Col xs="1">
                    <Button outline size="sm" color="teal" onClick={(e) => this.showPopup(item)}>
                        <FaRegEdit />
                    </Button>

                    <span className="px-1">
                        <Button outline size="sm" color="teal" onClick={(e) => this.deleteCertificate(item.competencyCertificateId)}>
                            <AiFillDelete />
                        </Button>
                    </span>
                </Col>
            </Row>
        </>);
    }


    private renderHeader() {
        return (<>
            <Row className="header">
                <Col xs="2-5">Certificate Name</Col>
                <Col xs="2">Certificate Number</Col>
                <Col xs="1">Grade</Col>

                <Col xs="1-5">Year Of Passing</Col>
                <Col xs="2">Board</Col>
                <Col xs="2">Institution</Col>
            </Row>
        </>);
    }


    showPopup(doc: CompetencyCertificate) {
        this.setState({
            currentItem: doc,
            isPopupOpen: true
        });
    }



    async closePopup(result: DialogResult) {
        this.setState({
            currentItem: null,
            isPopupOpen: false
        });

        //Refresh the features if resut = OK
        if (result == DialogResult.Ok) {
            await this.loadCertificates();
        }
    }


    renderEditPopup() {
        return <EditCertificatePopup isOpen={this.state.isPopupOpen}
            model={this.state.currentItem}
            certificates={ this.props.masters.certificates}
            closePopup={async (result) => await this.closePopup(result)} />;
    }

    renderAddButton() {

        return (<Button outline color="teal" onClick={(e) => {
            //Just set the Model.JobPositionFeatureId to 0
            var item = new CompetencyCertificate();
            item.applicantId = this.props.applicantId;

            this.showPopup(item);
        }}><IoIosAdd />&nbsp;Add Certificate</Button>);

    }



    renderBody() {
        return (<>
            <PageTitle title="Other Certificates" actionButtons={this.renderAddButton()} />
            {this.renderEditPopup()}

            {
                (this.model.isCertificateMandatory) && 
                <div className="py-2 red"> * Atleast a certificate is mandatory </div>
            }
            <div className="table white">
                {
                    this.renderHeader()
                }
                {(this.model.certificates.length == 0) ?
                    <Row className="pd15">No Certificates</Row> :
                    this.model.certificates.map(c => {
                        return this.renderCertificate(c);
                    })
                }
            </div></>);
    }

    render() {
        return (<>
            {(this.state.status == Status.Loading) ?
                <PageLoader loadingMessage={this.state.statusMessage} /> :
                this.renderBody()
            }
        </>);
    }
}


class ViewModel {
    certificates: Array<CompetencyCertificate>
}


export class CertificatesListView extends React.Component<ViewModel> {

    constructor(props: any){
        super(props);
    }

    renderHeader(){
        return (<>
            <Row className="header">
                <Col xs="3">Certificate Name</Col> 
                <Col xs="2">Certificate #</Col>
                <Col xs="3">Institution</Col>

                <Col xs="2">Grade</Col>
   
                <Col xs="2">Year Of Passing</Col>
                
            </Row>
        </>);
    }


    renderCourse(cert: CompetencyCertificate) {
        return (<>
            <Row>
                <Col xs="3">{ cert.certificateName }</Col>
                <Col xs="2">{ cert.certificateNumber }</Col>
                <Col xs="3">{  cert.institution}</Col>
                <Col xs="2">{ cert.grade }</Col>

                <Col xs="2">{ cert.yearOfPassing }</Col>

                
            </Row>
        </>);
    }

    renderBody() {
        debugger;
        return (<div className="table white">
            {
               this.renderHeader() 
            }
            {    this.props.certificates.map(c => {
                    return this.renderCourse(c);
                })       
            }
        </div>);
    }

    render(){
        return this.renderBody();
    }
}