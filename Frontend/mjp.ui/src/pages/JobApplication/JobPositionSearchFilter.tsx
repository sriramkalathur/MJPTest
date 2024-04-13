import React from "react";
import { JobPositionFilter, JobPositionFilterMasters, JobSearchFilter } from "../../models/JobPositionModels";
import { DropdownList, FieldLabel, ListItem, MultiSelectList, Status, StatusElement, TextBox } from "common";
import { Rating } from '@mui/material';

import { MasterService } from "../../services/MasterService";
import { Company } from "../../models/Company";
import { Button, Row } from "reactstrap";
import { MdOutlineSearch, MdRestartAlt } from "react-icons/md";
import { MJPConstants } from "../../MJPConstants";


class PropsModel {
    onFilterChanged?: (filter: JobSearchFilter) => void;

    //This will be passed from the parent component
    //When a filter is applied in parrent component and when it refreshes filter state is lost
    //So the state is saved in parent and rendered everytme from here
    filter: JobSearchFilter;
}


class StateModel {

   
    status: Status;
}

export class JobPositionSearchFilter extends React.Component<PropsModel, StateModel>{


    private masters: JobPositionFilterMasters;

    private masterService: MasterService;
    
    private filter: JobSearchFilter;
   
    constructor(props: any) {
        super(props);

      
        this.state = {
            status: Status.Loading,
        };

        this.masterService = new MasterService();
        this.filter = this.props.filter;
    }

  

    private async loadMasters() {
        this.setState({ status: Status.Loading });
        this.masters = await this.masterService.selectJobPositionFilterMasters();
        this.setState({ status: Status.None });
    }


    async componentDidMount() {

        await this.loadMasters();

    }

    OPTIONS_ALL = -1;   


    private notifyFilterChanged(){
      
        if(this.props.onFilterChanged) {
            //Just notify
            this.props.onFilterChanged(this.filter);
        } 
    }


    private renderExperience(){
        return ( <>
                <div className="fieldLabel py-2">Experience</div>
                <Row>
               
                <TextBox fieldName="experienceFrom" 
                        type="number" class="col-4" placeHolder="Any"
                        
                        onChange={(e) => {
                        this.filter.minExperience = e.target.value as number;
                        this.setState({});
                        //Notify filter
                        //this.notifyFilterChanged();3
                    }} value={this.filter.minExperience?.toString() }></TextBox>
                    <span className="py-2 px-2">to</span>
            
                    <TextBox fieldName="experienceTo" type="number" class="col-4"
                            placeHolder="Any"
                            onChange={(e) => { 
                            this.filter.maxExperience = e.target.value as number;
                            this.setState({});
                            //Notify filter
                            //this.notifyFilterChanged();3
                        }} value={this.filter.maxExperience?.toString() } />

                        <span className="px-2 py-2">yrs</span>
            </Row></>);
    }

    private renderFilters() {
    
       return (<div>
            <div className="mt-3">
            <TextBox fieldName="searchText" label="Search Text"
                placeHolder="Your search text ex:- Chef"
                onChange={ (e) => {
                    this.filter.filterText = e.target.value; 
                    this.setState({});
                    //Notify filter
                    //this.notifyFilterChanged();
                }}
                value={this.filter.filterText} />
            </div>
            <div>
            <DropdownList options={this.masters.ranks} 
                value={this.filter.rankId} 
                addDefaultSelect={true} defaultText="All"
                labelText="Rank" displayMember="displayText"
                valueMember="itemId"
                onChange={ (e) => {
                    this.filter.rankId = e.target.value;
                    this.setState({});
                }}
                fieldName="rankId" />
               
            </div>   
            { this.renderExperience() }
            { this.renderButtons() }
            </div>
        );
    }
    
    private createDefaultFilter() {
        var filter = new JobSearchFilter();
        filter.filterText = "";
        filter.rankId = null;
        filter.minExperience = null;
        filter.maxExperience = null;
        return filter;
    }

    renderButtons(){
        return (  
        <div className="float-right py-2">
            <Button color="teal" outline
                onClick={async (e) => {
                //RESET
                await this.notifyFilterChanged();
            }}><span> <MdOutlineSearch /> Filter </span></Button>

            <Button color="teal" outline
            className="mx-2"
            onClick={async (e) => {
                //RESET
                this.filter = this.createDefaultFilter();
                await this.notifyFilterChanged();
            }}>
            <span> <MdRestartAlt /> Reset </span></Button>
           
            </div>);
    }


    render() {
       
        return (<div>
            {(this.state.status == Status.Loading) ?
                <StatusElement status={this.state.status}
                    statusMessage={"Loading Filters.."} /> : this.renderFilters()
           }
        </div>)
    }
}   