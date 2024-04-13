import React from "react";
import { Company } from "../../models/Company";
import { CommonUtils, FilteredResult, ListItem, MultiSelectList, Paginator, Status, TextBox } from "common";
import { MasterService } from "../../services/MasterService";
import { JobPositionFilter } from "../../models/JobPositionModels";
import { MJPConstants } from "../../MJPConstants";
import { Button, Col, Row } from "reactstrap";
import { ApplicantJobPosition, JobApplication } from "../../models/JobPositions";
import { JobPositionService } from "../../services/JobPositionService";
import { MJPCommonUtils } from "../../common/CommonUtils";
import { PageLoader } from "../../common/MJPCommon";
import { JobApplicationService } from "../../services/JobApplicationService";
import { PageTitle } from "../MJPComponents";
import { JobApplicationsView } from "./JobApplicationsView";

class PropsModel {

}

class StateModel {
  
    status: Status;

    statusMessage: string;

    jobPositions: FilteredResult<JobApplication>;
}


export class MyJobApplicationsView extends React.Component<PropsModel, StateModel> {

  
    private jobService: JobApplicationService;

    constructor(props: any) {
        super(props);

        this.state = {
            status: Status.None,
            jobPositions: new FilteredResult<JobApplication>(),
            statusMessage: ""
        };

        this.jobService = new JobApplicationService();
    }


    async componentDidMount() {

        //By default load masters & filter applications
        this.setState({
            status: Status.Loading,
            statusMessage: "Loading Applications.."
        });

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
        var result = await this.jobService.selectMyApplications(page);
       
        this.setState({
            status: Status.None,
            jobPositions: result
        });
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

  
    renderApplications() {
      return <JobApplicationsView applications={ this.state.jobPositions.items } />
    }

    render() {
        return (<>
            <PageTitle title="My Applications" actionButtons= { this.renderPaginationBar() } />
           
            {(this.state.status == Status.Loading) ?
                <PageLoader loadingMessage={this.state.statusMessage} /> :
                <div className="py-1">
                  
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