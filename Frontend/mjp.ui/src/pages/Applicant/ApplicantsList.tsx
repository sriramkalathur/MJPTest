import React from "react";
import { Company } from "../../models/Company";
import { CommonUtils, DialogResult, DropdownList, FieldLabel, FilteredResult, ListItem, MultiSelectList, Paginator, Status, TextBox } from "common";
import { MasterService } from "../../services/MasterService";
import { MJPConstants } from "../../MJPConstants";
import { Button, Card, Col, Input, Label, Row } from "reactstrap";
import { ApplicantJobPosition, JobApplication, JobPositionInformation } from "../../models/JobPositions";
import { JobPositionService } from "../../services/JobPositionService";
import { MJPCommonUtils } from "../../common/CommonUtils";
import { PageLoader } from "../../common/MJPCommon";
import { JobApplicationService } from "../../services/JobApplicationService";
import { JobPositionStatus, PageProcessingStatus, PageTitle } from "../MJPComponents";

import {  Divider } from "@mui/material";

import { Applicant, ApplicantFilter, ApplicantFilterMasters } from "../../models/ApplicantFilterModel";
import { ApplicantService } from "../../services/ApplicantService";
import { AiOutlineSearch } from "react-icons/ai";
import { FiCheck } from "react-icons/fi";
import { JobPositionApplyPopup } from "./Popup/JobPositionApplyPopup";
import { ApplicantInfo } from "../../models/ApplicantModels";
import { MdFollowTheSigns } from "react-icons/md";


class PropsModel {

}

class StateModel {
    status: Status;

    statusMessage: string;

}


export class ApplicantsList extends React.Component<PropsModel, StateModel> {

    private service: ApplicantService;

    //selected applicant Ids
    private allStatus : ListItem[];

    private applicants :  FilteredResult<Applicant>;


    private filter: ApplicantFilter;

    constructor(props: any) {
        super(props);

        this.service = new ApplicantService(); 
       
        this.state = {
            status: Status.Loading,
            statusMessage: "",
        };
        
        this.allStatus = MasterService.selectAllApplicantStatus();
        this.filter = this.createDefaultFilter();
    }


    async componentDidMount() {

        //By default load masters & filter applications
        this.setState({
            status: Status.Loading,
            statusMessage: "Loading Applicants.."
        });

        this.applicants = await this.service.filterApplicants(this.filter, 1);
      
        this.setState({
            status: Status.None
        });

    }


    async filterApplicants(page: number = 1) {

     
        this.setState({
            status: Status.Processing,
            statusMessage: "Refreshing Applicants.."
        });

        //this.state.filter.page = page;
    
        this.applicants = await this.service.filterApplicants(this.filter, page);
        
        this.setState({
            status: Status.None,
        });
    }

  

    private createDefaultFilter() {
        var filter = new ApplicantFilter();
        return filter;
    }

    renderPaginationBar() {
        return (
            <Paginator
                result={this.applicants}
                loadPage={async (page) => {

                    this.filterApplicants(page);
                }} />
        );
    }

    renderFilters() {

        return ( <Row>
                    <Col xs="4">
                    <TextBox fieldName="searchText"  label="Filter Text"
                        placeHolder="Applicant name/mobile number"
                        onChange={(e) => {
                            this.filter.searchText = e.target.value;
                            this.filterApplicants();
                    }} value={this.filter.searchText }></TextBox>
                    </Col>

                    <Col xs="2">
                    <DropdownList labelText="Status" fieldName="statusId"
                        defaultText="All" defaultValue={null}
                        onChange={ (e) => {
                            this.filter.statusId = e.target.value;
                            this.filterApplicants();
                        }} addDefaultSelect={true} 
                        
                        value={this.filter.statusId}
                        options={this.allStatus}
                        displayMember="displayText" valueMember="itemId" />
                        </Col>
                </Row>);
    }


   

    renderApplicant(item: Applicant){
        var editUrl = "editApplicantProfile?applicantId=" + item.applicantId;
        var profileUrl = "applicantProfile?applicantId=" + item.applicantId;

        return (<>
        <Row> 
           
            <Col xs="2"> 
                <a href={editUrl}>{ item.applicantName} </a>
            </Col>

            <Col xs="1-5">
                { (item.rank == "") ? "N/A" :  item.rank }
            </Col>   
   
            <Col xs="1-5">
                { (item.experience == null) ? "N/A" : item.experience + " yrs" }

            </Col>

            
            <Col xs="1-5">
                { item.email}
            </Col>

            <Col xs="1-5">
                { item.mobileNumber}
            </Col>

            <Col xs="1-5">
                { 
                MJPCommonUtils.getApplicantStatius(item.statusId)
                }
            </Col>

            <Col xs="1-5">
                { (item.availabilityStatusId == MJPConstants.JOB_AVAILABILTY_STATUS_AVAILABLE) ? "Available":
                    "Not Available" }
            </Col>

            <Col xs="0-5">
                <a href={profileUrl}>Profile </a>
            </Col>
            <Col> 
            </Col>
        </Row>
        </>);
    }
   
    renderHeader(){

        return (<>
        <Row className="header">
           
            <Col xs="2">
               Applicant Name
            </Col>
            
            <Col xs="1-5">
               Rank
            </Col>
            <Col xs="1-5">
               Experience
            </Col>

       
            <Col xs="1-5">
                Email
            </Col>

            <Col xs="1-5">
                Mobile #
            </Col>

            <Col xs="1-5">
                Status 
            </Col>

            <Col xs="1-5">
                Available for Job
            </Col>
        </Row>
        </>);
    }

    renderApplicants() {
       
        return (<div className="table white">
            {
                this.renderHeader()
            }
            {(this.applicants.items.length == 0) ?
                <Row className="pd15">No Applicants</Row> :
                this.applicants.items.map(c => {
                    return this.renderApplicant(c);
                })
            }
        </div>);

    }


    renderBody(){

       
        return (<> 
            <PageTitle title="Applicants"  />
           
            <PageProcessingStatus status={this.state.status} statusMessage={this.state.statusMessage } ></PageProcessingStatus>
            <div>
                <div className="float-right py-3">
                { this.renderPaginationBar() }
                </div>
                {this.renderFilters()}
            </div>
        
            <div>
                {  this.renderApplicants()}
                </div>
           
        </>);
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