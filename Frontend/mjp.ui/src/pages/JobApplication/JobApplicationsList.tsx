import React from "react";
import { Company } from "../../models/Company";
import { CommonUtils, FilteredResult, ListItem, MultiSelectList, Paginator, Status, TextBox } from "common";
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

class PropsModel {

}

class StateModel {
    filter: JobApplicationFilter;

    status: Status;

    statusMessage: string;

    jobPositions: FilteredResult<JobApplication>;
}


export class JobApplicationsList extends React.Component<PropsModel, StateModel> {

   
    private masters: JobPositionFilterMasters;

    private masterService: MasterService;


    private jobService: JobApplicationService;


    private allJobStatus: ListItem[];

    private allApplicationStatus: ListItem[];

    constructor(props: any) {
        super(props);

        this.state = {
            status: Status.Loading,
            filter: this.createDefaultFilter(),
            jobPositions: new FilteredResult<JobApplication>(),
            statusMessage: ""
        };

        this.masterService = new MasterService();
        this.jobService = new JobApplicationService();
    }


    async componentDidMount() {

        //By default load masters & filter applications
        this.setState({
            status: Status.Loading,
            statusMessage: "Loading Applications.."
        });


        this.masters = await this.masterService.selectJobPositionFilterMasters();
        this.allApplicationStatus = await this.masterService.selectApplicationStatus();
        this.allJobStatus = await this.masterService.selectJobPositionStatus();

        await this.filterApplications();

        this.setState({
            status: Status.None
        });

    }


    async filterApplications(page: number = 1) {

        this.setState({
            status: Status.Processing,
            statusMessage: "Refreshing applications.."
        });

        //this.state.filter.page = page;
        var result = await this.jobService.filterApplications(this.state.filter, page);

        this.setState({
            status: Status.None,
            jobPositions: result
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
                result={this.state.jobPositions}
                loadPage={async (page) => {

                    this.filterApplications(page);
                }} />
        );
    }

    renderFilters() {

        return (
            <Row>
                <Col xs="3">
                <TextBox fieldName="filterText" label="Search Text"
                    placeHolder="Applicant Name/Title/Job Code"
                    onChange={(e) => {
                        this.state.filter.filterText = e.target.value;
                        this.filterApplications();
                        //Notify filter
                        //this.notifyFilterChanged();
                    }}
                    value={this.state.filter.filterText}></TextBox>
                </Col>

                <Col xs="3">
                    <MultiSelectList options={this.masters.companies}
                        selectedItems={this.state.filter.companies}
                        label="Company" displayField="displayName"
                        valueField="companyId"
                        renderFilter={true}
                        onSelectionChanged={(items: number[]) => {
                            this.state.filter.companies = items;
                            this.filterApplications();
                            //Notify filter
                            //this.notifyFilterChanged();
                        }} noItemsText={"Select"}></MultiSelectList>
                </Col>

                <Col xs="2"> 
                    <div className="smallmultiselect">
                    <MultiSelectList options={this.allJobStatus}
                        selectedItems={this.state.filter.jobStatus}
                        label="Job Position Status"
                        displayField="displayText"
                        valueField="itemId"
                        
                        renderFilter={false}
                        onSelectionChanged={(items: number[]) => {
                            this.state.filter.applicationStatus = items;
                            this.filterApplications();
                            //Notify filter
                            //this.notifyFilterChanged(); 
                        }} noItemsText={"Select"} ></MultiSelectList>
                        </div>
                </Col>

                <Col xs="2"> 
                <div className="smallmultiselect">
                    <MultiSelectList options={this.allApplicationStatus}
                        selectedItems={this.state.filter.applicationStatus}
                        label="Application Status"
                        displayField="displayText"
                        valueField="itemId"
                        renderFilter={false}
                        onSelectionChanged={(items: number[]) => {
                            this.state.filter.applicationStatus = items;
                            this.filterApplications();
                            //Notify filter
                            //this.notifyFilterChanged(); 
                        }} noItemsText={"Select"} ></MultiSelectList>
                        </div>
                </Col>
               
                <Col xs="2"> 
                    <Button size="small" outline color="teal" className="my-4"
                        onClick={async (e) => { await this.filterApplications() }}>
                       <AiOutlineSearch />  Filter
                    </Button>
                </Col> 

            </Row>
        );
    }


    renderApplications() {
      return <JobApplicationsView applications={ this.state.jobPositions.items } />
    }

    render() {
        return (<>
            <PageTitle title="Job Applications" />
           
            {(this.state.status == Status.Loading) ?
                <PageLoader loadingMessage={this.state.statusMessage} /> :
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
            }
        </>);
    }       
}