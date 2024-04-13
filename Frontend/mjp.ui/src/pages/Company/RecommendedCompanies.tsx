import { FilteredResult, Status } from "common";
import React from "react";
import { CompanyService } from "../../services/CompanyService";
import { RecommendedCompany } from "../../models/Company";
import { Button, Card, Carousel, CarouselControl, CarouselIndicators, CarouselItem, Col, Pagination, PaginationItem, PaginationLink, Row } from "reactstrap";
import { PageLoader } from "../../common/MJPCommon";
import { Avatar, Rating } from "@mui/material";
import { deepPurple, green } from "@mui/material/colors";
import { SearchJobPositions } from "../JobApplication/SearchJobPositions";
import { MJPRouteUtils } from "../../common/MJPRouteUtils";


class PropsModel {
    
}

class StateModel {
    status: Status;

    statusMessage: string;
}

export class RecommendedCompaniesList extends React.Component<PropsModel, StateModel>{
    
    private companyService: CompanyService;

    private companies: FilteredResult<RecommendedCompany>;

  
    constructor(props: any){
        super(props);

        this.state = {
            status: Status.None,
            statusMessage: ""
        };

        this.companies= new FilteredResult<RecommendedCompany>;
        this.companies.currentPage = 1;
        this.companies.items = [];

        this.companyService = new CompanyService();
    }

    async componentDidMount(){
        await this.filterCompanies();    
    }   

    async filterCompanies(pageNumber: number = 1) {
        
        this.setState({ status: Status.Loading, statusMessage: "Loading..."});
        this.companies = await this.companyService.selectRecommendedCompanies(pageNumber);
        this.companies.currentPage = pageNumber;
        this.setState({ status: Status.None, statusMessage: ""});
    }


        
    ITEMS_PER_ROW = 3;


    renderCompany(index: number){

        //If the index < lenght, it exists. If > length, it doesn't exist
        return (index < this.companies.items.length) &&
            (<Col xs="3">
            <Card outline className="py-2 px-2" onClick={ (e)=>
            {
                //navigate to SearchPowition with the compnay
                var companyId = this.companies.items[index].companyId;
                MJPRouteUtils.navigateToCompanyPositions(companyId);
            }}>
           
            <Row> 
            
               
            <Col xs="2">
                {  //If there is bno LOGO, just show the avatart
                (this.companies.items[index].companyLogo == "") ?  
                <Avatar sx= {{ bgcolor: green[400] }} >{ this.companies.items[index].companyName.charAt(0)} </Avatar>:
                 <img width={50} height={50} src={this.companies.items[index].companyLogo} />  
                }
            </Col>
            
            <Col xs="10">
            <div className="title px-2">
            <h6>{ this.companies.items[index].displayName } </h6>
                <Rating size="small" readOnly={true}
                                       
                                        value={this.companies.items[index].rating} />
            </div>
            </Col>
            </Row>
        </Card></Col>);
    }
    
   
    renderCompanies(){

        return (<div>
            <div className= "py-2 px-2">
            <div className="subtitle">Recommended Companies </div>
            </div>
     

        {(this.companies.items.length == 0) ?
            <Row className="pd5">No Companies</Row> :
            <><Row className="py-1">
                { this.renderCompany(0)} 
                { this.renderCompany(1)} 
                { this.renderCompany(2)} 
                { this.renderCompany(3)}  
            </Row> 
            <Row className="py-1">
              { this.renderCompany(4)} 
              { this.renderCompany(5)} 
              { this.renderCompany(6)} 
              { this.renderCompany(7)}  
          </Row> 
          </>
        }
        </div>);
    }

   

    render() {
        return ((this.state.status == Status.Loading) ?
            <PageLoader loadingMessage="Loading.." />:
           
            <div className="clear">
            {   (this.companies.items.length >0) && 
                <>
                <hr />
                { this.renderCompanies() }
                </> 
            }
         </div>);
    }

}