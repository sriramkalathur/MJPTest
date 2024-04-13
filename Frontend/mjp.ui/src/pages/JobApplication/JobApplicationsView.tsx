import React from "react";
import { Company } from "../../models/Company";
import { CommonUtils, FilteredResult, ListItem, MultiSelectList, Paginator, Status, TextBox } from "common";
import { MasterService } from "../../services/MasterService";
import { JobPositionFilter } from "../../models/JobPositionModels";
import { MJPConstants } from "../../MJPConstants";
import { Button, Col, Row } from "reactstrap";
import { ApplicantJobPosition, JobApplication } from "../../models/JobPositions";
import { JobPositionService } from "../../services/JobPositionService";
import { MJPCommonUtils } from "../../common/CommonUtils";
import { PageLoader } from "../../common/MJPCommon";
import { JobApplicationService } from "../../services/JobApplicationService";
import { PageTitle } from "../MJPComponents";
import { UserContext } from "../../authentication/UserContext";

class PropsModel {

    applications: Array<JobApplication>;
}

class StateModel {
  
}


///Component for viewwing the List of applications
export class JobApplicationsView extends React.Component<PropsModel, StateModel> {

    constructor(props: any) {
        super(props);
    }



    renderHeader() {
       
        return <Row className="header">

            <Col xs="1">
                Application #
            </Col>

            <Col xs="1">
                Job Code
            </Col>


            <Col xs="1-75">
                Position Title
            </Col>

            <Col xs="1-75">
                Applicant Name
            </Col>


            <Col xs="1-75">
                Company
            </Col>

            <Col xs="1">
                Posted On
            </Col>

            <Col xs="1">
               Expiry Date
            </Col>


            <Col xs="1-5">
                Application Status
            </Col>

            <Col xs="1-25">
                Job Status
            </Col>
        </Row>
    }

    renderJobApplication(position: JobApplication) {

        var jobUrl = "";
        var applicationUrl =""
        
        if(UserContext.isApplicant()) {
            //Just pass the jobpositionId
            applicationUrl = "myapplication?jobPositionId=" + position.jobPositionId;
            jobUrl = "jobposition?jobPositionId=" + position.jobPositionId;
        }
        else {
            //Pass the APPLication Id
            applicationUrl = "application?jobPositionId=" + position.jobPositionId + "&jobAppicationId=" + position.jobApplicationId;
            jobUrl = "jobposition?jobPositionId=" + position.jobPositionId;
        }
        
        return (<Row>
           
            <Col xs="1">
                <a href={applicationUrl}>
                {position.applicationInfo.applicationNumber}
                </a>
            </Col>

            <Col xs="1">
                <a href={jobUrl}>
                {position.positionDetails.jobCode}
                </a>
            </Col>

            <Col xs="1-75">
                {position.positionDetails.positionTitle}
            </Col>

            <Col xs="1-75">
                {position.applicationInfo.applicantName}
            </Col>

            <Col xs="1-75">
                {position.positionDetails.company.companyName}
            </Col>

            <Col xs="1">
                {CommonUtils.getDisplayDate(position.positionDetails.postedOn)}
            </Col>

            <Col xs="1">
                {CommonUtils.getDisplayDate(position.positionDetails.expiryDate)}
            </Col>


            <Col xs="1-5">
                {MJPCommonUtils.getApplicationStatusDisplayText(position.applicationInfo.applicationStatusId)}
            </Col>

            <Col xs="1-25">
                {MJPCommonUtils.getJobPositionStatusText(position.positionDetails.statusId)}
            </Col>
        </Row>);
    }

    renderApplications() {
        return (<div className="table white">
            {
                this.renderHeader()
            }
            {(this.props.applications.length == 0) ?
                <Row className="pd15">No applications</Row> :
                this.props.applications.map(c => {
                    return this.renderJobApplication(c);
                })
            }
        </div>);

    }

    render() {
        return this.renderApplications();
    }       
}