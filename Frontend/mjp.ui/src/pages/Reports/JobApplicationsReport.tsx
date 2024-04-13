import React from "react";
import { Company } from "../../models/Company";
import { CommonUtils, DateField, FilteredResult, ListItem, MultiSelectList, Paginator, Status, TextBox } from "common";
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

import { MJPRouteUtils } from "../../common/MJPRouteUtils";
import { IoIosAdd } from "react-icons/io";
import { ApplicationReportItem, ApplicationReportParams } from "../../models/ReportModels";
import { ReportService } from "../../services/ReportService";
import { AiFillFileExcel } from "react-icons/ai";
import { FaFileDownload } from "react-icons/fa";


class PropsModel {

}

class StateModel {
    
    status: Status;

    statusMessage: string;
}


export class JobApplicationsReport extends React.Component<PropsModel, StateModel> {

    private reportService: ReportService;

    private filterParams: ApplicationReportParams;

    private items: FilteredResult<ApplicationReportItem>;

    constructor(props: any) {
        super(props);

        this.state = {
            status: Status.Loading,
            statusMessage: "",
        };

        this.filterParams = new ApplicationReportParams();

        this.items= new FilteredResult<ApplicationReportItem>();
        this.items.currentPage =1;
        this.items.totalPages = 0;
        this.items.items = [];

        this.reportService = new ReportService();
    }


    async componentDidMount() {

        //By default load masters & filter applications
        this.setState({
            status: Status.Loading,
            statusMessage: "Loading Report.."
        });

        await this.filterReport();

        this.setState({
            status: Status.None
        });

    }


    async filterReport(page: number = 1) {

        this.setState({
            status: Status.Processing,
            statusMessage: "Loading report.."
        });

        //this.state.filter.page = page;
        this.items = await this.reportService.filterApplicationReport(this.filterParams, page);

        this.setState({
            status: Status.None
        });
    }



    
    renderPaginationBar() {
        return (
            <Paginator
                result={this.items}
                loadPage={async (page) => {

                    this.filterReport(page);
                }} />
        );
    }

    async downloadReport(): Promise<void> {
        //Download report
        await this.reportService.downloadReport(this.filterParams);
    }

    renderFilterParams() {

        return (
            <Row>
                <Col xs="3">
                <DateField fieldName="postedBefore" label="Posted Before"
                    placeHolder="All"
                    onChange={(e) => {
                        this.filterParams.postedBefore = e.target.value;
                        this.setState({});
                        //Notify filter
                        //this.notifyFilterChanged();
                    }}
                    date={this.filterParams.postedBefore}></DateField>
                </Col>

                <Col xs="2-5">
                <DateField fieldName="postedAfter" label="Posted After"
                    placeHolder="All"
                    onChange={(e) => {
                        this.filterParams.postedAfter = e.target.value;
                        this.setState({});
                        //Notify filter
                        //this.notifyFilterChanged();
                    }}
                    date={this.filterParams.postedAfter}></DateField>
                </Col>
               
                <Col xs="2"> 
                    <Button size="small" outline color="teal" className="my-4"
                        onClick={async (e) => { await this.filterReport() }}>
                        Filter
                    </Button>

                    <Button size="small" outline color="teal" className="mx-2 my-4"
                        onClick={async (e) => { await this.downloadReport() }}>
                        <FaFileDownload />&nbsp;&nbsp; Export
                    </Button>
                </Col> 

            </Row>
        );
    }


  

    renderHeader(){
        return <Row className="header">
            <Col xs="0-75">
                Job Code
            </Col>

            <Col xs="0-75">
                Application #
            </Col>

            <Col xs="1-75">
                Position Title
            </Col>

            <Col xs="1-75">
                Company
            </Col>

            <Col xs="1-5">
                Category
            </Col>
          

            <Col xs="1-25">
                Posted On
            </Col>
          

      
            <Col xs="1-25">
                Applied Date
            </Col>

            <Col xs="1-75">
                Applicant
            </Col>

            <Col xs="1-25">
                Application <br />Status
            </Col>
        </Row>
    }


    renderReportItem(item: ApplicationReportItem){
        return <Row>
            <Col xs="0-75">
                { item.jobCode }
            </Col>

            <Col xs="0-75">
                { item.applicationNumber }
            </Col>

            <Col xs="1-75">
            { item.positionTitle }
            </Col>

            <Col xs="1-75">
            { item.company }
            </Col>

            
            <Col xs="1-5">
            { item.category }
            </Col>

            <Col xs="1-25">
            { CommonUtils.getDisplayDate(item.postedDate) }
            </Col>
          

          
            <Col xs="1-25">
            { CommonUtils.getDisplayDate(item.appliedDate) }
            </Col>

            
            <Col xs="1-75">
            { item.applicant }
            </Col>

            <Col xs="1-25">
               { MJPCommonUtils.getApplicationStatusDisplayText(item.applicationStatusId) }
            </Col>
        </Row>
    }

    renderReportItems() {
        return (<div className="table white">
        {
            this.renderHeader()
        }
        {(this.items.items.length == 0) ?
            <Row className="py-2 px-2">No Applications</Row> :
            this.items.items.map(c => {
                return this.renderReportItem(c);
            })
        }
    </div>);

    }

    render() {
        return (<>
            <PageTitle title="Job Applications Report"  />
           
            {(this.state.status == Status.Loading) ?
                <PageLoader loadingMessage={this.state.statusMessage} /> :
                <div className="py-1">
                    <>
                    <div className="float-right pt-4">
                        {this.renderPaginationBar()}
                    </div>

                     {this.renderFilterParams()}
                    </>
                    {(this.state.status == Status.Processing) ?
                        <PageLoader loadingMessage={this.state.statusMessage} /> :
                        <div className="clear">
                            {  this.renderReportItems()}
                        </div>
                    }
            </div>
            }
        </>);
    }       
}