import React from "react";
import { Company } from "../../models/Company";
import { CommonUtils, DialogResult, FilteredResult, ListItem, MultiSelectList, Paginator, Status, TextBox } from "common";
import { MasterService } from "../../services/MasterService";
import { JobApplicationFilter, JobPositionFilter, JobPositionFilterMasters } from "../../models/JobPositionModels";
import { MJPConstants } from "../../MJPConstants";
import { Button, Col, Row } from "reactstrap";
import { ApplicantJobPosition, JobApplication } from "../../models/JobPositions";
import { JobPositionService } from "../../services/JobPositionService";
import { MJPCommonUtils } from "../../common/CommonUtils";
import { PageLoader } from "../../common/MJPCommon";
import { JobApplicationService } from "../../services/JobApplicationService";
import { PageTitle } from "../MJPComponents";
import { JobApplicationsView } from "./JobApplicationsView";
import { AiOutlineSearch } from "react-icons/ai";
import { UpdateApplicationStatus } from "../Applicant/Popup/UpdateApplicationStatus";
import { NavLink } from "react-router-dom";
import { UserContext } from "../../authentication/UserContext";
import { ApplicantFilterMasters } from "../../models/ApplicantFilterModel";

class PropsModel {

}

class StateModel {
    status: Status;

    statusMessage: string;

    currentItem: JobApplication;

    isPopupOpen : boolean;
}



export class CompanyApplications extends React.Component<PropsModel, StateModel> {

    private service: JobApplicationService;

    private filter: JobApplicationFilter;

    //applications 
    private applications: FilteredResult<JobApplication>;


    private allJobStatus: ListItem[];

    private allApplicationStatus: ListItem[];

    constructor(props: any) {
        super(props);

        this.state = {
            status: Status.Loading,
            statusMessage: "",
            isPopupOpen: false,
            currentItem: null
        };

        this.service = new JobApplicationService();
    }

    ALL_ITEMS = -1;

    async componentDidMount() {

        //By default load masters & filter applications
        this.setState({
            status: Status.Loading,
            statusMessage: "Loading Applications..",
            currentItem: new JobApplication()
        }); 
 
        var masterService =new MasterService();  
        this.allApplicationStatus = await masterService.selectApplicationStatus();
        this.allJobStatus = await masterService.selectJobPositionStatus();

        //Filter Only OPEN and SHORTLISTED applications   
        //FIler only the current compnay status
        //this.state.filter.page = page;
        this.filter = new JobApplicationFilter();
        this.filter.applicationStatus = [ this.ALL_ITEMS ];
        this.filter.jobStatus = [ this.ALL_ITEMS ];
        

        if(UserContext.isStaffRole()) {
            //If staff selet all companies
            this.filter.companies = [ this.ALL_ITEMS ]
        }


        this.applications = new FilteredResult<JobApplication>();
        
        await this.filterApplications();

        this.setState({
            status: Status.None
        });

    }

    
    renderUpdatePopup() {
     
        return (<UpdateApplicationStatus isOpen={this.state.isPopupOpen}
        application={this.state.currentItem}
        closePopup={async (result) => await this.closePopup(result)}  />);
    }


    async closePopup(result: DialogResult) {
        this.setState({
            //currentItem: null,
            isPopupOpen: false
        });

        //Refresh the features if resut = OK
        if (result == DialogResult.Ok) {
            await this.filterApplications();
        }
    }

    showPopup(item: JobApplication) {
        this.setState({
            currentItem: item,
            isPopupOpen: true
        });
    }

    async filterApplications(page: number = 1) {

        this.setState({
            status: Status.Processing,
            statusMessage: "Refreshing applications.."
        });

        
        this.applications = await this.service.filterApplications(this.filter, page);

        this.setState({
            status: Status.None,
        });
    }

  

    private createDefaultFilter() {
        var filter = new JobApplicationFilter();
        //filter.categories = [MJPConstants.FILTER_VALUE_ALL];
        filter.companies = [MJPConstants.FILTER_VALUE_ALL];
        filter.jobStatus = [MJPConstants.FILTER_VALUE_ALL];
        filter.applicationStatus = [MJPConstants.FILTER_VALUE_ALL];
        filter.filterText = "";

        return filter;
    }

    renderPaginationBar() {
        return (
            <Paginator
                result={this.applications}
                loadPage={async (page) => {

                    this.filterApplications(page);
                }} />
        );
    }

    renderFilters() {

         return (
            <Row>
                <Col xs="4">
                <TextBox fieldName="filterText" label="Search Text"
                    placeHolder="Applicant Name/Title/Job Code"
                    onChange={(e) => {
                        this.filter.filterText = e.target.value;
                        this.filterApplications();
                        //Notify filter
                        //this.notifyFilterChanged();
                    }}
                    value={this.filter.filterText}></TextBox>
                </Col>
                
                { <Col xs="2"> 
                    <div className="smallmultiselect">
                    <MultiSelectList options={this.allJobStatus}
                        selectedItems={this.filter.jobStatus}
                        label="Job Position Status"
                        displayField="displayText"
                        valueField="itemId"
                        
                        renderFilter={false}
                        onSelectionChanged={(items: number[]) => {
                            this.filter.jobStatus = items;
                            this.filterApplications();
                            //Notify filter
                            //this.notifyFilterChanged(); 
                        }} noItemsText={"Select"} ></MultiSelectList>
                        </div>
                </Col> }

                <Col xs="2"> 
                <div>
                    <MultiSelectList options={this.allApplicationStatus}
                        selectedItems={this.filter.applicationStatus}
                        label="Application Status"
                        displayField="displayText"
                        valueField="itemId"
                        renderFilter={false}
                        onSelectionChanged={(items: number[]) => {  
                            this.filter.applicationStatus = items;
                            this.filterApplications();
                            //Notify filter
                            //this.notifyFilterChanged(); 
                        }} noItemsText={"Select"} ></MultiSelectList>
                        </div>
                </Col>
            </Row>
        );
    }


    renderApplications() {
        return (<div className="table white">
        {
            this.renderHeader()
        }
        {(this.applications.items.length == 0) ?
            <Row className="pd15">No applications</Row> :
            this.applications.items.map(c => {
                return this.renderApplication(c);
            })
        }
    </div>);
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

            <Col xs="2">
                Applicant Name
            </Col>


            <Col xs="1-25">
                Posted On
            </Col>

            <Col xs="1-25">
                Posted Status
            </Col>

            <Col xs="1-25">
               Expiry Date
            </Col>


            <Col xs="1-25">
                Application Status
            </Col>
        </Row>
    }


    renderApplication(item: JobApplication){
        var profileUrl = "applicantprofile?applicantId=" +item.applicationInfo.applicantId;
  
        return ( <Row>
                <Col xs="1">
                { item.positionDetails.jobCode}
                </Col>

                <Col xs="1-25">
                { item.positionDetails.companyJobCode}
                </Col>


                <Col xs="1-5">
                { item.positionDetails.rank}
                </Col>

                <Col xs="2">
               <a href={profileUrl}>{ item.applicationInfo.applicantName}</a> 
                </Col>

                <Col xs="1-25">
                { CommonUtils.getDisplayDate(item.positionDetails.postedOn) }
                </Col>

                <Col xs="1-25">
                { MJPCommonUtils.getJobPositionStatusText(item.positionDetails.statusId) }
                </Col>

                <Col xs="1-25">
                { CommonUtils.getDisplayDate(item.positionDetails.expiryDate) }
                </Col>

                <Col xs="1-25">
                { MJPCommonUtils.getApplicationStatusDisplayText(item.applicationInfo.applicationStatusId) }
                </Col>

                <Col xs="1">
                    <Button outline color="teal" size="sm" className="link" onClick={() => {
                            this.showPopup(item);
                        }}>Update</Button>
                </Col>
            </Row>);    
    }

    renderBody() {
        return (<>
            { this.renderUpdatePopup() }
            <div className="py-1">
                <>
                <div className="float-right pt-4">
                    {this.renderPaginationBar()}
                </div>

                    {this.renderFilters()}
                </>
                {(this.state.status == Status.Processing) ?
                    <PageLoader loadingMessage={this.state.statusMessage} /> :
                    <div className="clear">
                        {  this.renderApplications()}
                    </div>
                }
            </div>
        </>);
    }     
   
    render(){
        return ((this.state.status == Status.Loading) ?
        <PageLoader loadingMessage={this.state.statusMessage} />:
            <div>
                <PageTitle title="Job Applications" />
                {  this.renderBody() }
              
            </div>);
       
    }
}  