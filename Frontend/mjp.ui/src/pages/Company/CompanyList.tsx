import { FilteredResult, Paginator, Status, TextBox } from "common";
import { Company, CompanyFilter } from "../../models/Company";
import React from "react";
import { CompanyService } from "../../services/CompanyService";
import { Button, Col, Row } from "reactstrap";
import { PageProcessingStatus, PageTitle } from "../MJPComponents";
import { PageLoader } from "../../common/MJPCommon";
import { MJPRouteUtils } from "../../common/MJPRouteUtils";
import { IoIosAdd } from "react-icons/io";

class PropsModel {

}

class StateModel {
    status: Status;

    statusMessage: string;
}

export class CompanyList extends React.Component<PropsModel, StateModel> {
    
    private companies: FilteredResult<Company>;
    
    private companyService: CompanyService;
    
    private filter: CompanyFilter;

    constructor(props: any){
        super(props);

        this.state = {
            status: Status.Loading,
            statusMessage: "Loading.."
        };

        this.companies = new FilteredResult<Company>();
        this.companies.items = [];
        this.companies.totalPages = 1;
        this.companies.totalRecords =0;

        this.filter = new CompanyFilter();
        this.companyService = new CompanyService();
    }


    async componentDidMount() {
        await this.filterCompanies();
    }

    async filterCompanies(page: number = 1) {

        this.setState({
            status: Status.Processing,
            statusMessage: "Loading Companies.."
        });

        //this.state.filter.page = page;
        this.companies = await this.companyService.filterCompanies(this.filter, page);

        this.setState({
            status: Status.None,
            
        });
    }


    renderPaginationBar() {
        return (
            <Paginator
                result={this.companies}
                loadPage={async (page) => {

                    this.filterCompanies(page);
                }} />
        );
    }

    renderFilters() {

        return (<Row>
                <Col xs="4">
                <TextBox fieldName="filterText" label="Filter Text"
                    placeHolder="Type company name"
                    onChange={(e) => {
                       //Just filter..
                       this.filter.filterText = e.target.value;
                       this.filterCompanies();
                    }}
                    value={this.filter.filterText}></TextBox>
                </Col>
                </Row>);
    }

    renderHeader(){
        return (<Row className="header">
                <Col xs="1">
                    Company Code
                </Col>

                <Col xs="1-75">
                    Company Name
                </Col>

                <Col xs="1-75">
                    Display Name
                </Col>

                
                <Col xs="1">
                    Rating
                </Col>


                <Col xs="2-5">
                   Address
                </Col>


                <Col xs="2">
                   Contact
                </Col>

                <Col xs="1">
                   Is Active
                </Col>
            </Row>);
    }


    renderCompany(company: Company){

        var url = "/company?companyId=" + company.companyId;

        return (<Row>
                <Col xs="1">
                    <a href={url}>
                    { company.companyCode }
                    </a>
                </Col>

                <Col xs="1-75">
                    { company.companyName }
                </Col>

                <Col xs="1-75">
                   { company.displayName }
                </Col>

                <Col xs="1">
                   { company.rating }
                </Col>

                <Col xs="2-5">
                  { company.address1 } <br /> {company.city}
                </Col>

                <Col xs="2">
                { company.email } <br /> {company.contactNumber}
                </Col>

                <Col xs="1">
                   { company.isActive ? "Yes": "No"}
                </Col>
            </Row>);
    }

    renderCompanies() {
        return (<div className="table white">
            {
                this.renderHeader()
            }
            {(this.companies.items.length == 0) ?
                <Row className="pd5">No Companies</Row> :
                this.companies.items.map(c => {
                    return this.renderCompany(c);
                })
            }
        </div>);

    }


    renderActionButtons(){
        return (     
            <div>
                  <Button outline  color="teal" className="ml-2"
                      onClick={ async (e)=> {
                        //save the details
                       MJPRouteUtils.navigateToNewCompany();
                    }}> <IoIosAdd color="teal"/> &nbsp;New Company</Button>
             
            </div>);
    }
    
    
    renderBody() {
        return (<>
            <PageTitle title="Companies"  actionButtons={ this.renderActionButtons() } />
           
            {(this.state.status == Status.Loading) ?
                <PageLoader loadingMessage={this.state.statusMessage} /> :
                <div className="py-1">
                    <>
                    <div className="float-right pt-4">
                        {this.renderPaginationBar()}
                    </div>

                     {this.renderFilters()}
                    </>
                    
                    <div className="clear">
                        <div>
                        <PageProcessingStatus status={this.state.status} statusMessage={this.state.statusMessage} />
                        </div>
                        <div>
                            {  this.renderCompanies()}
                        </div>
                    </div>
            </div>
            }
        </>);
    }  
    
    
    render() {
        return this.renderBody();
    }
}