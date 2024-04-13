import React from "react";
import { Company } from "../../models/Company";
import { CommonUtils, FilteredResult, ListItem, MultiSelectList, Paginator, Status, TextBox } from "common";
import { MasterService } from "../../services/MasterService";
import { JobPositionFilter } from "../../models/JobPositionModels";
import { MJPConstants } from "../../MJPConstants";
import { Button, Col, Row } from "reactstrap";
import { ApplicantJobPosition, JobApplication, JobPositionInformation } from "../../models/JobPositions";
import { JobPositionService } from "../../services/JobPositionService";
import { MJPCommonUtils } from "../../common/CommonUtils";
import { PageLoader } from "../../common/MJPCommon";
import { JobApplicationService } from "../../services/JobApplicationService";
import { PageTitle } from "../MJPComponents";
import { UserContext } from "../../authentication/UserContext";

class PropsModel {

    positions: Array<JobPositionInformation>;
}

class StateModel {
  
}


///Component for viewwing the List of applications
export class JobPositionsView extends React.Component<PropsModel, StateModel> {

    constructor(props: any) {
        super(props);
    }



    renderHeader() {
        return <Row className="header">
            <Col xs="1">
                Job Code
            </Col>
            <Col xs="1-25">
                Company Job Code
            </Col>

            <Col xs="1-5">
                Position Title
            </Col>

            <Col xs="1-5">
                Company
            </Col>

            <Col xs="1-25">
                Posted On
            </Col>
          

            <Col xs="1-5">
                Rank
            </Col>
          
            <Col xs="1">
                No. of Positions
            </Col>

            <Col xs="1-25">
               Expiry Date
            </Col> 

            <Col xs="1"> 
                Status
            </Col>
        </Row>
    }

    renderJobPosition(position: JobPositionInformation) {

        var applyUrl = "jobPositionApply?jobPositionId=" + position.jobPositionId;
        var url = (UserContext.isApplicant()) ? "jobPosition?jobPositionId=" + position.jobPositionId:
                    "jobpositiondetails?jobPositionId=" + position.jobPositionId;

        return (<Row>
            <Col xs="1">
                <a href={url}>
                {position.jobCode}
                </a>
            </Col>
            <Col xs="1-25">
                 {position.companyJobCode}
               
            </Col>
            <Col xs="1-5">
                { position.positionTitle }
            </Col>

            <Col xs="1-5">
                { position.company.companyName }
            </Col>

            <Col xs="1-25">
                { CommonUtils.getDisplayDate(position.postedOn) }
            </Col>

            <Col xs="1-5">
                 { position.rank }
            </Col>

            <Col xs="1">
              
                { position.numberOfPositions }
              
            </Col>

            <Col xs="1-25">
            { CommonUtils.getDisplayDate(position.expiryDate) }
            </Col>

            <Col xs="1">
            { MJPCommonUtils.getJobPositionStatusText(position.statusId)}
            </Col>

            { /* Apply should be shown only for Staff roles and not for compnay users */}
            { UserContext.isStaffRole() && <Col xs="0-75"> 
            <a href={applyUrl}>Apply </a>
            </Col>
            }
        </Row>);
    }

    renderJobPositions() {
        return (<div className="table white">
            {
                this.renderHeader()
            }
            {(this.props.positions.length == 0) ?
                <Row className="py-2 px-2">No Job Positions</Row> :
                this.props.positions.map(c => {
                    return this.renderJobPosition(c);
                })
            }
        </div>);

    }

    render() {
        return this.renderJobPositions();
    }       
}