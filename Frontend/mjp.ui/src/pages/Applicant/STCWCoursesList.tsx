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
import { CompetencyCertificate, STCWCourse } from "../../models/ApplicantCourses";
import { EditApplicantDocumentPopup } from "./Popup/EditApplicantDocumentPopup";
import { EditCertificatePopup } from "./Popup/EditCertificatePopup";
import { EditSTCWCoursePopup } from "./Popup/EditSTCWCoursePopup";

class PropsModel {
    applicantId: number;

    masters: UserProfileMasters;
}


class StateModel {

    status: Status;

    statusMessage: string;

    //Current Item selected
    currentItem: STCWCourse;

    isPopupOpen: boolean;
}


export class STCWCoursesList extends React.Component<PropsModel, StateModel> {

    private service: ApplicantCourseService;

    private model: STCWCourse[];

    constructor(props: any) {
        super(props);

        this.service = new ApplicantCourseService();
        this.state = {
            status: Status.Loading,
            statusMessage: "Loading Courses..",
            currentItem: null,
            isPopupOpen: false
        };
    }


    async loadCourses() {

        this.setState({ status: Status.Loading });
        this.model = await this.service.selectCourses(this.props.applicantId);
        this.setState({ status: Status.None });
    }

    async componentDidMount() {
        await this.loadCourses();
    }


    private async deleteCourse(courseId: number): Promise<void> {

        this.setState({
            status: Status.Processing,
            statusMessage: "Deleting Course.."
        });
        await this.service.deleteCourse(courseId);
        await this.loadCourses();
    }


    private renderCertificate(item: STCWCourse) {
        return (<>
            <Row>
                <Col xs="4">{item.courseName} </Col>
                <Col xs="2">{item.certificateNumber} </Col>
                <Col xs="1-25">{CommonUtils.getDisplayDate(item.issueDate)} </Col>
                <Col xs="1-25">{CommonUtils.getDisplayDate(item.expiryDate)} </Col>

                <Col xs="2-5">{item.issuePlace} </Col>
                <Col xs="1">
                    <Button outline size="sm" color="teal" onClick={(e) => this.showPopup(item)}>
                        <FaRegEdit />
                    </Button>

                    <span className="px-2">
                        <Button outline size="sm" color="teal" onClick={(e) => this.deleteCourse(item.stcwCourseId)}>
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
                <Col xs="4">Course</Col>
                <Col xs="2">Certificate Number</Col>
              
                <Col xs="1-25">Issue Date</Col>
                <Col xs="1-25">Valid  Till</Col>
                <Col xs="2-5">Issue Place</Col>
            </Row>
        </>);
    }


    showPopup(item: STCWCourse) {
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
            await this.loadCourses();
        }
    }


    renderEditPopup() {
        return <EditSTCWCoursePopup isOpen={this.state.isPopupOpen}
        model={this.state.currentItem}
        closePopup={async (result) => await this.closePopup(result)} 
        courses={ this.props.masters.courses} />;
    }

    renderAddButton() {

        return (<Button outline color="teal" onClick={(e) => {
            //Just set the Model.JobPositionFeatureId to 0
            var item = new STCWCourse();
            item.applicantId = this.props.applicantId;

            this.showPopup(item);
        }}><IoIosAdd />&nbsp;Add Course</Button>);

    }



    renderBody() {
        return (<>
            <PageTitle title="STCW Courses" actionButtons={this.renderAddButton()} />
            {this.renderEditPopup()}
            <div className="table white">
                {
                    this.renderHeader()
                }
                {(this.model.length == 0) ?
                    <Row className="pd15">No Courses</Row> :
                    this.model.map(c => {
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
    courses: Array<STCWCourse>
}

export class STCWCourseListView extends React.Component<ViewModel> {

    constructor(props: any){
        super(props);
    }

    renderHeader(){
        return (<>
            <Row className="header">
                <Col xs="3">Course</Col>
                <Col xs="1-5">Certificate #</Col>
                <Col xs="3">Details</Col>

                <Col xs="1-25">Issue Date</Col>
                <Col xs="1-5">Valid  Till</Col>
                <Col xs="1-5">Issue Place</Col>
            </Row>
        </>);
    }


    renderCourse(course: STCWCourse) {
        return (<>
            <Row>
                <Col xs="3">{course.courseName}</Col>
                <Col xs="1-5">{course.certificateNumber}</Col>
                <Col xs="3">{course.details}</Col>

                <Col xs="1-25">{  CommonUtils.getDisplayDate(course.issueDate)}</Col>
                <Col xs="1-5">{  CommonUtils.getDisplayDate(course.expiryDate)}</Col>
                <Col xs="1-5">{  course.issuePlace }</Col>
            </Row>
        </>);
    }

    renderBody() {
        return (<div className="table white">
            {
                this.renderHeader()
            }
            {    this.props.courses.map(c => {
                    return this.renderCourse(c);
                })       
            }
        </div>);
    }

    render(){
        return this.renderBody();
    }
}