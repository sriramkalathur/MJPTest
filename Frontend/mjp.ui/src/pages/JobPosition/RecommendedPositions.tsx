import { CommonUtils, FilteredResult, Paginator, Status } from "common";
import React from "react";
import { CompanyService } from "../../services/CompanyService";
import { RecommendedCompany } from "../../models/Company";
import { Badge, Button, Card, Carousel, CarouselControl, CarouselIndicators, CarouselItem, Col, ListGroup, ListGroupItem, Pagination, PaginationItem, PaginationLink, Row } from "reactstrap";
import { PageLoader } from "../../common/MJPCommon";
import { Avatar, Rating } from "@mui/material";
import { deepPurple, green } from "@mui/material/colors";
import { SearchJobPositions } from "../JobApplication/SearchJobPositions";
import { MJPRouteUtils } from "../../common/MJPRouteUtils";

import { JobPositionInformation } from "../../models/JobPositions";
import { JobPositionService } from "../../services/JobPositionService";
import { NavLink } from "react-router-dom";

class PropsModel {
    
}

class StateModel {
    status: Status;

    statusMessage: string;
}

export class RecommendedPositionsList extends React.Component<PropsModel, StateModel>{
    
    service: JobPositionService;
  
    recommendedPositions: FilteredResult<JobPositionInformation>;

    constructor(props: any){
        super(props);

        this.state = {
            status: Status.Loading  ,
            statusMessage: ""
        };

        this.service = new JobPositionService();
        
    }

    async componentDidMount(){
        await this.refreshRecommendations();    
    }   

  

        
    ITEMS_PER_ROW = 3;


    renderPosition(index: number){

        if(index >= this.recommendedPositions.items.length) {
            //The index doesn't exist. return BLANK
            return (<></>)
        }
        else {

            let position = this.recommendedPositions.items[index];
            let jobUrl = "/jobPosition?jobPositionId=" + position.jobPositionId;
            let searchUrl = "/searchpositions?rankId=" + position.rankId;

            //If the index < lenght, it exists. If > length, it doesn't exist
            return (<Col xs="2-25">
                <Card outline className="py-1 px-2 recommendedJob">
                <div className="py-1">
                <b>{ position.positionTitle} </b>
                <span className="float-right">
                <small className="text-muted">
                <b> <NavLink 
                    onClick={  () => CommonUtils.openInNewTab(jobUrl)}
                    to={jobUrl} target="_blank"  className="small linkitem float-right">Details</NavLink></b>
                </small>
                </span>
                </div>
                <Row className="py-1"> 
                    
                <span className="pr-3">{ position.minExperience } - { position.maxExperience} yrs</span>
                <span className="px-3 onlyLeftBorder">{ (position.salaryRange  == "") ? "Salary not disclosed": position.salaryRange } </span>
                
                </Row>
            
            <div> 
            {/* <small className="text-muted">
            <b className="float-right py-1"> <NavLink  to={searchUrl} target="_blank"  className="small linkitem float-right">More..</NavLink></b>
             */}
            <span className="small">Posted on { CommonUtils.getDisplayDate(position.postedOn) }</span>
           
            </div>
            </Card></Col>);
        }  
    }
    

    renderPageBar() {
     
        return (
            <Paginator
                result={this.recommendedPositions}
                loadPage={async (page) => {

                    this.refreshRecommendations(page);
                }} />
        );
    }



    renderRecommendations(){

        var itemsCount = this.recommendedPositions.items.length;
        var positions = this.recommendedPositions.items;

        return (this.recommendedPositions.items.length == 0) ?
            <Row className="pdTop10">No Recommened Positions!</Row> :
            <div>

            <Row className="py-2">
                { this.renderPosition(0)} 
                { this.renderPosition(1)}
                { this.renderPosition(2)} 
                { this.renderPosition(3)} 
                { this.renderPosition(4)} 
            </Row>
           
        </div>;
          
    }

    async refreshRecommendations(page: number = 1) {

        this.setState({
            status: Status.Loading,
            statusMessage: "Loading recommended positions.."
        });

        //this.state.filter.page = page;
        this.recommendedPositions = await this.service.selectRecommendedPositions(page);

        this.setState({
            status: Status.None,
            statusMessage:""
        });
    }

  

    render() {
       
        return (  <>
               
            { (this.state.status == Status.Loading) ?
                <PageLoader loadingMessage="Loading.." />:
                <>

                <div className="clear">
                    {   (this.recommendedPositions.items.length >0) && 
                        <>
                        <hr />
                        <div className="px-2 py-2 subtitle">Recently Posted Jobs</div>
                        { this.renderRecommendations() }
                        </> 
                    }
                 </div> 
                </>
            }
           
        </>);
    }

}