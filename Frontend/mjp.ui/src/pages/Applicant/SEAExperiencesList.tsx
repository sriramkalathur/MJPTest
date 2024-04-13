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
import { ApplicantDocument, ApplicantInfo, PersonalInformation, SEAExperience } from "../../models/ApplicantModels";
import { MJPCommonUtils } from "../../common/CommonUtils";
import { IoIosAdd } from "react-icons/io";

import { FaRegEdit } from "react-icons/fa";
import { ApplicantCourseService } from "../../services/ApplicantCourseService";
import { CompetencyCertificate, STCWCourse } from "../../models/ApplicantCourses";
import { EditApplicantDocumentPopup } from "./Popup/EditApplicantDocumentPopup";
import { EditCertificatePopup } from "./Popup/EditCertificatePopup";
import { EditSTCWCoursePopup } from "./Popup/EditSTCWCoursePopup";
import { EditSEAExperiencePopup } from "./Popup/EditSEAExperincePopup";

class PropsModel {
    applicantId: number;

    masters: UserProfileMasters;
}


class StateModel {

    status: Status;

    statusMessage: string;

    //Current Item selected
    currentItem: SEAExperience;

    isPopupOpen: boolean;
}


export class SEAExperiencesList extends React.Component<PropsModel, StateModel> {

    private service: ApplicantService;

    private model: SEAExperience[];

    constructor(props: any) {
        super(props);

        this.service = new ApplicantService();
        this.state = {
            status: Status.Loading,
            statusMessage: "Loading SEA Experiences..",
            currentItem: null,
            isPopupOpen: false
        };
    }


    async loadExperiences() {

        this.setState({ status: Status.Loading });
        this.model = await this.service.selectExperience(this.props.applicantId);
        this.setState({ status: Status.None });
    }

    async componentDidMount() {
        await this.loadExperiences();
    }


    private async deleteExperience(experienceId: number): Promise<void> {

        this.setState({
            status: Status.Processing,
            statusMessage: "Deleting Experience.."
        });
        await this.service.deleteExperience(experienceId);
        await this.loadExperiences();
    }


    private renderExperience(item: SEAExperience) {
        return (<>
            <Row>
                <Col xs="2">{item.companyName} </Col>
                <Col xs="1-5">{item.vesselName} </Col>

                <Col xs="1-25">{item.type} </Col> 
                <Col xs="1-25">{item.grt} </Col>
                <Col xs="1-25">{item.bhp} </Col>
                <Col xs="1-25">{item.rank} </Col>

                <Col xs="1-25">{CommonUtils.getDisplayDate(item.fromDate)} </Col>
                <Col xs="1-25">{ (item.toDate == null) ? "Till Date": CommonUtils.getDisplayDate(item.toDate) } </Col>
                <Col xs="1">
                    <Button outline size="sm" color="teal" onClick={(e) => this.showPopup(item)}>
                        <FaRegEdit />
                    </Button>

                    <span className="px-2">
                        <Button outline size="sm" color="teal" onClick={(e) => this.deleteExperience(item.seaExperienceId)}>
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
                <Col xs="2">Company Name</Col>
                <Col xs="1-5">Vessel Name</Col>
                <Col xs="1-25">Type</Col>

                <Col xs="1-25">GRT</Col>
                <Col xs="1-25">BHP</Col>
                <Col xs="1-25">Rank</Col>

                <Col xs="1-25">From Date</Col>
                <Col xs="1-25">To Date</Col>
            </Row>
        </>);
    }


    showPopup(item: SEAExperience) {
        this.setState({
            currentItem: item,
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
            await this.loadExperiences();
        }
    }


    renderEditPopup() {
        return <EditSEAExperiencePopup isOpen={this.state.isPopupOpen}
        model={this.state.currentItem}
        closePopup={async (result) => await this.closePopup(result)}  />;
    }

    renderAddButton() {

        return (<Button outline color="teal" onClick={(e) => {
            //Just set the Model.JobPositionFeatureId to 0
            var item = new SEAExperience();
            item.applicantId = this.props.applicantId;

            this.showPopup(item);
        }}><IoIosAdd />&nbsp;Add SEA Experience</Button>);

    }



    renderBody() {
        return (<>
            <PageTitle title="SEA Experiences" actionButtons={this.renderAddButton()} />
            {this.renderEditPopup()}
            <div className="table white">
                {
                    this.renderHeader()
                }
                {(this.model.length == 0) ?
                    <Row className="pd15">No Experience</Row> :
                    this.model.map(c => {
                        return this.renderExperience(c);
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
    experience: Array<SEAExperience>
}

export class ExperiencesView extends React.Component<ViewModel> {

    constructor(props: any){
        super(props);
    }

    renderHeader(){
        return (<>
            <Row className="header">
                <Col xs="2-25">Company Name</Col>
                <Col xs="1-75">Vessel Name</Col>
                <Col xs="1-25">Type</Col>

                <Col xs="1-25">GRT</Col>
                <Col xs="1-25">BHP</Col>
                <Col xs="1-5">Rank</Col>

                <Col xs="1-25">From Date</Col>
                <Col xs="1-25">To Date</Col>
            </Row>
        </>);
    }


    renderExperience(item: SEAExperience) {
        return (<>
            <Row>
                <Col xs="2-25">{item.companyName} </Col>
                <Col xs="1-75">{item.vesselName} </Col>

                <Col xs="1-25">{item.type} </Col> 
                <Col xs="1-25">{item.grt} </Col>
                <Col xs="1-25">{item.bhp} </Col>
                <Col xs="1-5">{item.rank} </Col>

                <Col xs="1-25">{CommonUtils.getDisplayDate(item.fromDate)} </Col>
                <Col xs="1-25">{ (item.toDate == null) ? "Till Date": CommonUtils.getDisplayDate(item.toDate) } </Col>
                
            </Row>
        </>);
    }

    renderBody() {
        return (<div className="table white">
            {
                this.renderHeader()
            }
            {    this.props.experience.map(c => {
                    return this.renderExperience(c);
                })       
            }
        </div>);
    }

    render(){
        return this.renderBody();
    }
}