import React from "react";
import { Company } from "../../models/Company";
import { CommonUtils, DialogResult, DropdownList, FieldLabel, FilteredResult, ListItem, MultiSelectList, Paginator, Status, TextBox } from "common";
import { MasterService } from "../../services/MasterService";
import { JobPositionFilter, JobPositionFilterMasters, JobPositionProfile } from "../../models/JobPositionModels";
import { MJPConstants } from "../../MJPConstants";
import { Button, Card, Col, Input, Label, Row } from "reactstrap";
import { ApplicantJobPosition, JobApplication, JobPositionInformation } from "../../models/JobPositions";
import { JobPositionService } from "../../services/JobPositionService";
import { MJPCommonUtils } from "../../common/CommonUtils";
import { PageLoader } from "../../common/MJPCommon";
import { JobApplicationService } from "../../services/JobApplicationService";
import { JobPositionStatus, PageProcessingStatus, PageTitle } from "../MJPComponents";

import {  Divider } from "@mui/material";

import { Applicant, ApplicantFilterMasters, ProfileFilters } from "../../models/ApplicantFilterModel";
import { ApplicantService } from "../../services/ApplicantService";
import { AiOutlineSearch } from "react-icons/ai";
import { FiCheck } from "react-icons/fi";
import { JobPositionApplyPopup } from "./Popup/JobPositionApplyPopup";
import { ApplicantInfo } from "../../models/ApplicantModels";
import { Formik, FormikProps, FormikState } from "formik";


class PropsModel {

    jobPositionId: number;
}

class StateModel {
    status: Status;

    statusMessage: string;

    isApplyPopupOpen: boolean;
}


export class JobPositionApply extends React.Component<PropsModel, StateModel> {

    //private service: JobApplicationService;

    private service: ApplicantService;

    private jobPositionService: JobPositionService;

    private masterService: MasterService;

    //private filter: ProfileFilters;

    private masters: ApplicantFilterMasters;
    
    private profiles: FilteredResult<JobPositionProfile>;

    private jobPosition: JobPositionInformation;

    //selected applicant Ids
    private selectedItems: Array<JobPositionProfile>;


    private formState:  FormikProps<ProfileFilters>;

    private availabilityStatus : Array<ListItem>;

    constructor(props: any) {
        super(props);

        this.service = new ApplicantService(); 
        this.jobPositionService = new JobPositionService(); 
        this.masterService = new MasterService();
        
        // this.filter = this.createDefaultFilter();
        // this.filter.jobPositionId = this.props.jobPositionId;

        this.profiles = new FilteredResult<JobPositionProfile>();

        this.selectedItems = new Array<JobPositionProfile>();

        this.availabilityStatus = [
            new ListItem(MJPConstants.JOB_AVAILABILTY_STATUS_AVAILABLE, "Available for Job"),
            new ListItem(MJPConstants.JOB_AVAILABILTY_STATUS_NOTAVAILABLE, "Not available"),
        ];

        this.state = {
            status: Status.Loading,
            statusMessage: "",
            isApplyPopupOpen: false
        };
       
    }


    async componentDidMount() {

        //By default load masters & filter applications
        this.setState({
            status: Status.Loading,
            statusMessage: "Loading Profiles.."
        });

        
        this.masters = await this.masterService.selectJobPositionFilterMasters();
        this.jobPosition = await this.jobPositionService.selectBasicInfo(this.props.jobPositionId);

        var filter = this.createDefaultFilter();
        filter.jobPositionId = this.props.jobPositionId;
        await this.filterProfiles(filter);
      
        this.setState({
            status: Status.None
        });

    }


    async filterProfiles(filter : ProfileFilters, page: number = 1) {

        this.setState({
            status: Status.Processing,
            statusMessage: "Refreshing Profiles.."
        });

        //this.state.filter.page = page;
        this.profiles = await this.service.filterProfiles(filter, page);

        this.setState({
            status: Status.None,
        });
    }

  

    private createDefaultFilter() {
        var filter = new ProfileFilters();
        filter.experienceFrom = null;
        filter.experienceTo = null;
        return filter;
    }

    renderPaginationBar() {
        return (
            <Paginator
                result={this.profiles}
                loadPage={async (page) => {

                    this.filterProfiles(this.formState.values);
                }} />
        );
    }

    renderFilters() {

        return (<>
        <Row>
            <Col xs="4">
                <DropdownList labelText="Rank" fieldName="rankId"
                    onChange={ this.formState.handleChange }
                    addDefaultSelect={true} class="col-10" defaultText="All"
                    value={this.formState.values.rankId}
                    options={this.masters.ranks}
                    displayMember="displayText" valueMember="itemId" />
              </Col>  
              <Col xs="4">
                <DropdownList labelText="Availability Status" fieldName="availabilityStatusId"
                    onChange={ this.formState.handleChange }
                    addDefaultSelect={true}  class="col-10" defaultText="All"
                    value={this.formState.values.availabilityStatusId}
                    options={this.availabilityStatus}
                    displayMember="displayText" valueMember="itemId" />
                </Col>
            </Row>
            <Row>
                <Col xs="4">
                    <div className="fieldLabel">Experience range</div>
                     <Row className="pt-1">
                    <TextBox fieldName="experienceFrom" 
                        type="number" placeHolder="Any" class="col-4"
                        onChange={ this.formState.handleChange }
                        value={this.formState.values.experienceFrom?.toString() }></TextBox>
                    
                    <span className="py-2 px-2">to</span>

                    <TextBox fieldName="experienceTo" type="number" 
                            placeHolder="Any"  class="col-3-5"
                            onChange={ this.formState.handleChange }
                            value={this.formState.values.experienceTo?.toString() } />

                        <span className="px-2 py-2">yrs</span>
                        </Row>  
                </Col>
                <Col xs="4">
                    <div className="fieldLabel">Salary Range</div>
                    <Row className="pt-1">
                        <TextBox fieldName="salary" type="number" 
                            class="col-4" placeHolder="Any"
                            onChange={ this.formState.handleChange }
                            value={this.formState.values.salaryFrom?.toString() }></TextBox>
                       
                        <span className="py-2 px-2">to</span>
                     
                        <TextBox fieldName="salaryTo" type="number" 
                            class="col-3-5"  placeHolder="Any"
                            onChange={ this.formState.handleChange }
                            value={this.formState.values.salaryTo?.toString() }></TextBox>

                        </Row>
                    </Col>
                    
                    <Col xs="1">
                        <div className="py-4">
                    <Button outline color="teal" 
                        onClick={async (e) => { await this.filterProfiles(this.formState.values) }}>
                        <AiOutlineSearch />
                        <span className="px-2">Filter</span>
                    </Button>
                    </div>
                    </Col>
               </Row>
               </>
        );
    }

    renderForm() {

        var filter = this.createDefaultFilter();
        filter.jobPositionId = this.props.jobPositionId;

        return (<Formik
            initialValues={filter}
            validateOnChange={false}
            validateOnBlur={false} 
            onSubmit={(e) => { }}>
            {
                (props) => {
                    this.formState = props;
                    return this.renderBody();
                }
            }
        </Formik>);
    }

    
    updateSelection(profile: JobPositionProfile, isSelected : boolean){
     
        var index = this.selectedItems.findIndex((item) => item.applicantId == profile.applicantId);
        if(isSelected){
            //Add to the slectedIds if it doesn't exist
            if(index ==-1){
                this.selectedItems.push(profile);
            }
        }
        else {
            //Applicant is deselected. Remove from the selection
            this.selectedItems.splice(index, 1);
        }
       
    }

    renderProfile(item: JobPositionProfile){
        var url = "applicantprofile?applicantId=" + item.applicantId;

        return (<>
        <Row> 
            <Col xs="0-5">
                <Input type="checkbox" className="ml-0" 
                    disabled={item.applicationStatusId != null}
                    onClick = {(e) => {
                    this.updateSelection(item, e.currentTarget.checked);
                }} />
            </Col>

            <Col xs="2">
                <a href={url}>{ item.applicantName} </a>
            </Col>

            <Col xs="1-5">
                { item.rank}
            </Col>
            <Col xs="1-5">
                { item.experience } years
            </Col>

            <Col xs="1">
                { item.salary} lacs
            </Col>

            <Col xs="1-5">
                { item.email}
            </Col>

            <Col xs="1-5">
                { item.mobileNumber}
            </Col>

            <Col xs="1-25">
                { (item.availabilityStatusId == MJPConstants.JOB_AVAILABILTY_STATUS_AVAILABLE) ? "Available":
                    "Not Available"
                }
            </Col>

            <Col xs="1-25">
                {  (item.applicationStatusId == null) ? "Not Applied":
                MJPCommonUtils.getApplicationStatusDisplayText(item.applicationStatusId)}
            </Col>
        </Row>
        </>);
    }
   

    renderJobPosition(){
       
        var jobUrl = "jobpositionDetails?jobPositionId=" + this.props.jobPositionId;
        return (<>
        <Row>
            <Col xs="2">
                <FieldLabel label="Job Code"> 
                    <a href={jobUrl}>{ this.jobPosition.jobCode} </a>
                </FieldLabel>
            </Col>

            <Col xs="3">
                <FieldLabel label="Rank"> { this.jobPosition.rank} </FieldLabel>
            </Col>

            <Col xs="3">
                <FieldLabel label="Experience"> 
                    { (this.jobPosition.maxExperience == null) ? this.jobPosition.maxExperience + " yrs":
                           (this.jobPosition.minExperience + " to " + this.jobPosition.maxExperience + " yrs") }
                 </FieldLabel>
            </Col>
        </Row>
        <Row>
            <Col xs="2">
                <FieldLabel label="No. Of Positions"> 
                    { this.jobPosition.numberOfPositions } (&nbsp;{ this.jobPosition.applicationsCount} applied &nbsp;)
                 </FieldLabel>
            </Col>

            <Col xs="3">
                <FieldLabel label="Salary Range"> 
                 { this.jobPosition.salaryRange ?? "N/A"}
                 </FieldLabel>
            </Col>

            <Col xs="3">
                <FieldLabel label="Status"> 
                 { <JobPositionStatus statusId={this.jobPosition.statusId} /> }
                 </FieldLabel>
            </Col>

            <Col xs="1-5">
                <FieldLabel label="Expiry Date"> 
                 { CommonUtils.getDisplayDate(this.jobPosition.expiryDate) }
                 </FieldLabel>
            </Col>
        </Row></>)
    }

    renderHeader(){

        return (<>
        <Row className="header">
            <Col xs="0-5"></Col>
            <Col xs="2">
               Applicant Name
            </Col>
            
            <Col xs="1-5">
               Rank
            </Col>
            <Col xs="1-5">
               Experience
            </Col>

            <Col xs="1">
                Salary
            </Col>

            <Col xs="1-5">
                Email
            </Col>

            <Col xs="1-5">
                Mobile #
            </Col> 

            <Col xs="1-25">
                Status
            </Col> 

            <Col xs="1-25">
                Available for Job
            </Col>
        </Row>
        </>);
    }

    renderProfiles() {
        return (<div className="table white">
            {
                this.renderHeader()
            }
            {(this.profiles.items.length == 0) ?
                <Row className="pd15">No Profiles</Row> :
                this.profiles.items.map(c => {
                    return this.renderProfile(c);
                })
            }
        </div>);

    }



    async closePopup(result: DialogResult) {
        this.setState({
          
            isApplyPopupOpen: false
        });
        //Just refresh the applications
        await this.filterProfiles(this.formState.values);
    } 
    
    renderApplyPopup(){
       
        return (<JobPositionApplyPopup  
                jobPosition={this.jobPosition}
                profiles={this.selectedItems} isOpen={this.state.isApplyPopupOpen}
                closePopup={async (result) => await this.closePopup(result)} />);
    }

    renderApplyButton(){
        return (<div className="float-right m-2">
            <Button outline className="ml-2" color="teal"
                    onClick={async (e) => {
                        //just show the popup

                        if(this.selectedItems.length == 0) {
                            //No items selected..
                            this.setState({
                               status: Status.Failure,
                               statusMessage : "Please select atleast 1 Profile"
                            });
                        }
                        else {
                            //Clear error
                            this.setState({
                                status: Status.None
                            });
                            this.setState({
                                isApplyPopupOpen: true,
                            
                            });
                        }
                    }}> <FiCheck />&nbsp;Apply Selected Profile(s)</Button>
        </div>)
    }


    renderActionButtons(){
        return (this.canApplyForJob() &&  this.renderApplyButton());
    }
  

    canApplyForJob() {
        //Cannot apply forExpired/cancelled job
        
        return ((this.jobPosition.statusId != MJPConstants.JOB_STATUS_CANCELLED) &&
                (this.jobPosition.statusId != MJPConstants.JOB_STATUS_EXPIRED));
    }


    renderBody(){

        var pageTitle = "Job Position " + this.jobPosition.jobCode;
        return (<> 
              <PageTitle title={pageTitle} />
              <div>
              
              { this.renderJobPosition() }
            </div>
            
        <hr />
       
        <div className="subtitle py-2">Filter Profiles</div>
        {this.renderFilters()}
        <div>
            <div className="float-right">
                { this.renderActionButtons() }
            </div>
        <div className="pd5"><h6> Profiles </h6></div>
        <PageProcessingStatus status={this.state.status} statusMessage={this.state.statusMessage } ></PageProcessingStatus>
            <div className="clear pd5">
                {  this.renderProfiles()}
                
            </div>
        </div>
            <div className="float-right">
            {this.renderPaginationBar()}
        </div>
        </>);
      
    }



    render() {
        return (<>
            {(this.state.status == Status.Loading) ?
                <PageLoader loadingMessage={this.state.statusMessage} /> :
             this.renderForm() 
            }
            { this.renderApplyPopup() }
        </>);
    }       
}