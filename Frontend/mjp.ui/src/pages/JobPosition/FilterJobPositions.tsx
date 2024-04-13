import React from "react";
import { Company } from "../../models/Company";
import { CommonUtils, FilteredResult, ListItem, MultiSelectList, Paginator, Status, TextBox } from "common";
import { MasterService } from "../../services/MasterService";
import { JobPositionFilter, JobPositionFilterMasters } from "../../models/JobPositionModels";
import { MJPConstants } from "../../MJPConstants";
import { Button, Col, Row } from "reactstrap";
import { ApplicantJobPosition, JobApplication, JobPositionInformation } from "../../models/JobPositions";
import { JobPositionService } from "../../services/JobPositionService";
import { MJPCommonUtils } from "../../common/CommonUtils";
import { PageLoader } from "../../common/MJPCommon";
import { JobApplicationService } from "../../services/JobApplicationService";
import { PageTitle } from "../MJPComponents";
import { JobPositionsView } from "./JobPositionsView";
import { MJPRouteUtils } from "../../common/MJPRouteUtils";
import { IoIosAdd } from "react-icons/io";
import { AiOutlineSearch } from "react-icons/ai";
import { UserContext } from "../../authentication/UserContext";


class PropsModel {
   
}

class StateModel {
    filter: JobPositionFilter;

    status: Status;

    statusMessage: string;

    jobPositions: FilteredResult<JobPositionInformation>;
}

export class FilterJobPositions extends React.Component<PropsModel, StateModel> {

   
    private masters: JobPositionFilterMasters;

    private masterService: MasterService;


    private jobService: JobPositionService;

    private allJobStatus: ListItem[];

    constructor(props: any) {
        super(props);

        this.state = {
            status: Status.Loading,
            filter: this.createDefaultFilter(),
            jobPositions: new FilteredResult<JobPositionInformation>(),
            statusMessage: ""
        };

        this.masterService = new MasterService();
        this.jobService = new JobPositionService();
    }


    async componentDidMount() {

        //By default load masters & filter applications
        this.setState({
            status: Status.Loading,
            statusMessage: "Loading Job Positions.."
        });


        this.masters = await this.masterService.selectJobPositionFilterMasters();
        this.allJobStatus = await this.masterService.selectJobPositionStatus();

        await this.filterJobPositions();

        this.setState({
            status: Status.None
        });

    }


    async filterJobPositions(page: number = 1) {

        this.setState({
            status: Status.Processing,
            statusMessage: "Refreshing applications.."
        });

        //this.state.filter.page = page;
        var result = await this.jobService.filterJobPositions(this.state.filter, page);

        this.setState({
            status: Status.None,
            jobPositions: result
        });
    }

  

    private createDefaultFilter() {
        var filter = new JobPositionFilter();
        //filter.categories = [MJPConstants.FILTER_VALUE_ALL];
        filter.companies = [MJPConstants.FILTER_VALUE_ALL];
        filter.jobStatus = [MJPConstants.FILTER_VALUE_ALL];
        filter.filterText = "";

        return filter;
    }


    renderActionButtons(){
        return (     
            <div>
                  <Button outline  color="teal" className="ml-2"
                      onClick={ async (e)=> {
                        //save the details
                       MJPRouteUtils.navigateToNewPosition();
                    }}> <IoIosAdd color="teal"/> &nbsp;New Position</Button>
             
            </div>);
    }
    
    
    renderPaginationBar() {
        return (
            <Paginator
                result={this.state.jobPositions}
                loadPage={async (page) => {

                    this.filterJobPositions(page);
                }} />
        );
    }

    renderFilters() {

        return (
            <Row>
                <Col xs="3">
                <TextBox fieldName="filterText" label="Search Text"
                    placeHolder="Position Title/Company Job Code/MJP Job Code"
                    onChange={(e) => {
                        this.state.filter.filterText = e.target.value;
                        this.filterJobPositions();
                        //Notify filter
                        //this.notifyFilterChanged();   
                    }}
                    value={this.state.filter.filterText}></TextBox>
                </Col>

                 { /* Company filter is only for staff. For compnay users it will be handled in backend
                 to return only that compnay data. No compnayId to be passed */}
               { (UserContext.isStaffRole()) && 
                <Col xs="3">
                    <MultiSelectList options={this.masters.companies}
                        selectedItems={this.state.filter.companies}
                        label="Company" displayField="displayName"
                        valueField="companyId"

                        onSelectionChanged={(items: number[]) => {
                            this.state.filter.companies = items;
                            this.filterJobPositions();
                            //Notify filter
                            //this.notifyFilterChanged();
                        }} noItemsText={"Select"}></MultiSelectList>
                </Col>
                }

                <Col xs="3"> 
                    <MultiSelectList options={this.allJobStatus}
                        selectedItems={this.state.filter.jobStatus}
                        label="Status"
                        displayField="displayText"
                        valueField="itemId"
                        onSelectionChanged={(items: number[]) => {
                            this.state.filter.jobStatus = items;
                            this.filterJobPositions();
                            //Notify filter
                            //this.notifyFilterChanged(); 
                        }} noItemsText={"Select"} ></MultiSelectList>
                </Col>
                
                <Col xs="2"> 
                    <Button size="small" outline color="teal" className="my-4"
                        onClick={async (e) => { await this.filterJobPositions() }}>
                        <AiOutlineSearch />
                        <span className="px-2">Filter</span> 
                    </Button>
                </Col> 

            </Row>
        );
    }


    renderJobPositions() {
      return <JobPositionsView  positions={ this.state.jobPositions.items } />;

    }

    render() {
        return (<>
            <PageTitle title="Job Positions" actionButtons={ this.renderActionButtons()} />
           
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
                            {  this.renderJobPositions()}
                        </div>
                    }
            </div>
            }
        </>);
    }       
}