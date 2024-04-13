import React from "react";
import { JobPositionInformation, ApplicantJobPosition } from "../../models/JobPositions";
import { CommonUtils, FieldLabel, FilteredResult, ListItem, Paginator, Status } from "common";
import { JobPositionSearchFilter } from "./JobPositionSearchFilter";
import { Button as RSButton, Badge, ButtonGroup as RSBtnGroup, Card, CardBody, CardGroup, CardLink, CardSubtitle, CardText, CardTitle, Col, Row } from "reactstrap";

import searchIcon from "../../assets/images/search-icon-png-31.png";
import { Rating } from "@mui/material";
import { JobPositionService } from "../../services/JobPositionService";
import { MJPConstants } from "../../MJPConstants";
import { MdRestartAlt, MdOutlineSearch } from "react-icons/md";
import { Button } from '@mui/material';
import { JobPositionFilter, JobSearchFilter } from "../../models/JobPositionModels";
import { JobApplicationStatus, JobPositionStatus } from "../MJPComponents";
import { JobApplicationService } from "../../services/JobApplicationService";
import { PageLoader } from "../../common/MJPCommon";
import { MJPRouteUtils } from "../../common/MJPRouteUtils";
import { ApplicantPositionView } from "./ApplicantPositions";
import { MJPApp } from "../../MJPApp";
import { MJPUser, UserContext } from "../../authentication/UserContext";
import { AiFillCloseCircle, AiFillNotification, AiOutlineCloseCircle, AiOutlineDownCircle, AiOutlineFileSearch } from "react-icons/ai";


class PropsModel {
    companies: number[];

    rankId: number;
}


class StateModel {

    //filter: JobPositionFilter;

    status: Status;

    statusMessage: string;
}


///Job search
export class SearchJobPositions extends React.Component<PropsModel, StateModel>{


    private jobService: JobApplicationService;

    private filter: JobSearchFilter;

    private positions: FilteredResult<ApplicantJobPosition>;

    constructor(props: any) {
        super(props);

        this.state = {
            "status": Status.None,
            statusMessage: ""
        };

        this.filter = new JobSearchFilter();
        this.filter.rankId = this.props.rankId;
        //By default selet all
        //this.jobsFilter.categories = [MJPConstants.FILTER_VALUE_ALL];
        //If companies is NULL, select ALL else filter only the companies
        //As per the latest communication, company name is hidden from Applicants
        this.filter.companies =  [MJPConstants.FILTER_VALUE_ALL];

        //Always the status is ALL. Status will be used only in other seraches
        //this.jobsFilter.status = [MJPConstants.FILTER_VALUE_ALL];

        this.jobService = new JobApplicationService();

        this.positions = new FilteredResult<ApplicantJobPosition>;
    }

    async componentDidMount() {

        //By default load masters
        await this.filterJobPositions();
    }




    renderPaginationBar() {
        return (
         <Paginator  
            result = { this.positions} 
            loadPage = { async (page) => {
                
                this.filterJobPositions(page);
            }} />
        );
    }
    
    async filterJobPositions(page: number=1){
        
        this.setState({
            status: Status.Loading
        });

        //console.log("Filter : " + formState.values.collegeId);
        //this.state.filter.page = page;
        this.positions = await this.jobService.searchPositions(this.filter, page);
      
        this.setState({
            status: Status.None,
        });
    }



    // async refreshJobPositions(filter: JobPositionFilter, page: number = 1) {
    //     //Loads the job positions from server based on filter..

    //     //Set LOADING status
    //     this.setState({ status: Status.Loading });
    //     var jobPositions = await this.jobPositionService.filterJobPositions(filter, page);
    //     //Set state
    //     this.setState({
    //         jobPositions: jobPositions
    //     });
    //     this.setState({ status: Status.None });
    // }

    

    renderJobpositions() {

        return (<>
           
            {  (this.positions.items.map(jp => (
                <div className="linkitem" onClick={(e) => {

                    (UserContext.isStaffRole())?
                    MJPRouteUtils.navigateToEditJobPosition(jp.jobPositionId):
                    MJPRouteUtils.navigateToJobPosition(jp.jobPositionId);
                }} >
                  
                  <div className="py-1">
                  <ApplicantPositionView position={jp} />
                  </div>
                </div>
            )))
            }
        </>);
    }

 

    renderFilter() {
        return (<Card className="minimum">
            <CardBody>
                <Row>
                    <img src={searchIcon} width={30} height={30} className="ml-3" />
                    <h6 className="ml-3">Find your marine job!</h6>
                </Row>
                <hr />
                <JobPositionSearchFilter filter={this.filter}
                    onFilterChanged={async (filter) => {
                        //Set the curent fiter
                        this.filter = filter;
                        this.filterJobPositions(MJPConstants.FIRST_PAGE);
                    }} />
            </CardBody>
        </Card>);
    }


    renderNoJobs(){
        return (<Card><div className="px-5 py-5 aligncenter minheight300 minHeight450"> <AiOutlineFileSearch size={35} /> 
        <h6>No Job positions Found! </h6>
        <b>Please refine your search! </b> 
        </div></Card>);
    }

    render() {
        return ((this.state.status == Status.Loading) ? <PageLoader loadingMessage="Loading Jobs..." />:
        <div className="backgray">

            <CardGroup className="py-2">
                <Col xs="3" className="nogutters">
                    {this.renderFilter()}
                </Col>
             
                <Col xs="9"> 
               
                 <div>
                    { (this.positions.totalRecords == 0) ? this.renderNoJobs():
                    <>
                    <div className="float-right py-2 px-2">
                    { this.renderPaginationBar() }
                    </div> 
                    <Row className="py-2"> 
                        {
                        <> <span className="py-2">Found </span> <h6 className="pt-2 pl-2">{ this.positions.totalRecords } </h6>
                            <span className="py-2 px-2"> matching positions </span> </>
                       
                        }
                    </Row>
                    </>
                }
                </div>  
               
                <div className="clear-right">
                    {this.renderJobpositions()}
                </div>
             
                </Col>
              
            </CardGroup>
        </div>);
    }
}