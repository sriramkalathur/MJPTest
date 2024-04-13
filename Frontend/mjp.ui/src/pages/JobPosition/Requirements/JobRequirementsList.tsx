import React from "react";
import { JobFeatureContext, PopupContextProps } from "../../JobApplication/JobApplicationContext";

import { JobPositionFeature, JobPositionRequirement } from "../../../models/JobPositionModels";
import { Rating } from "@mui/material";

import { Button, Col, Label, Row } from "reactstrap";
import { CommonUtils, DialogResult, ProcessingMessage, Status } from "common";
import { JobFeatureService } from "../../../services/JobFeatureService";
import { PageLoader } from "../../../common/MJPCommon";
import { BiMessageAltAdd } from "react-icons/bi";
import { IoIosAdd, IoIosAddCircleOutline } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { MJPCommonUtils } from "../../../common/CommonUtils";
import { JobRequirementService } from "../../../services/JobRequirementService";
import { EditJobRequirementPopup } from "./EditJobRequirementPopup";

class PropsModel {
    jobPositionId: number;
}

class StateModel {

    status: Status;

    statusMessage: string;
    
    isPopupOpen: boolean;

    currentItem?: JobPositionRequirement;
}

export class JobRequirementsList extends React.Component<PropsModel, StateModel> {

    private requirementService: JobRequirementService;
  
    private requirements: Array<JobPositionRequirement>;

    constructor(props: any){
        super(props);

        this.state = { isPopupOpen: false, 
            status: Status.None,
            statusMessage: ""
        };

        this.requirementService = new JobRequirementService();
        this.requirements =[];
    }


    async componentDidMount() {
        
        //Load the features
        await this.loadRequirements();
    } 

    private async loadRequirements(){
        this.setState({ status: Status.Loading,
            statusMessage : "Loading Job Requirements.."});

        //Load the features..
        this.requirements = await this.requirementService.selectJobRequirements(this.props.jobPositionId);

        this.setState({ status: Status.None });
    }

    async closePopup(result: DialogResult){
        this.setState({
            currentItem: null,
            isPopupOpen: false
        });

        //Refresh the features if resut = OK
        if(result == DialogResult.Ok){
            await this.loadRequirements();
        }
    }


    

    renderEditPopup(){
        return <EditJobRequirementPopup isOpen={ this.state.isPopupOpen}
            closePopup={ async (result: DialogResult) => await this.closePopup(result) }
            requirement={ this.state.currentItem} />;
    } 

    showPopup(req: JobPositionRequirement){
        this.setState({
            currentItem :req,
            isPopupOpen: true
        });
    }


    renderAddButton(){

        return (<Button outline color="teal" onClick={ (e)=> {
            //Just set the Model.JobPositionFeatureId to 0
                var item = new JobPositionRequirement();
                item.jobPositionId = this.props.jobPositionId;
            
                this.showPopup(item);
            }}><IoIosAdd />&nbsp;Add Requirement</Button>);
        
    }


    private async deleteRequirement(requirementId: number): Promise<void>{
       // var result = con("Do you want to delete the item?");

        //Proceeed with delete..
        this.setState({ status: Status.Processing,
            statusMessage: "Processing.."});
        await this.requirementService.deleteJobRequirement(requirementId);
        await this.loadRequirements();
    }


    renderTitle(){

        return (<>
             <div className="float-right"> 
                { this.renderAddButton() }
            </div>
 
            <div>
                <span className="subHeading">Position Requirements</span>
            </div>
          
        </>);
    }
 


    renderProcessingStatus(){

        switch(this.state.status) {
            case Status.Processing : {
                return (<div className="px-1 py-3"><ProcessingMessage statusMessage="Processing.." /></div>);
            }
            case Status.Failure : {
                return (<div className="px-1 py-2 error"> Save failed. Please fix the errors and try agin </div>);
            }
            
        }   
    } 

    
     renderRequirement(req: JobPositionRequirement, index: number){

        return (<Row>
                    <Col xs="1">
                        {  index }
                    </Col>
                    <Col xs="6">
                        { req.description}
                    </Col>
                    <Col xs="3">
                        { req.isMandatory ? "YES": "NO" }
                    </Col>

                    <Col xs="2">
                    <Button  outline size="sm"  color="teal" onClick= { (e) => this.showPopup(req)}>
                        <FaRegEdit />
                     </Button>
                  
                    <span className="px-2">
                    <Button outline size="sm" color="teal" onClick= { (e) => this.deleteRequirement(req.jobPositionRequirementId)}>
                        <AiFillDelete  />
                     </Button>
                     </span>
                    </Col>
                </Row>);
     }
  

     renderHeading(){

        return (<Row className="header">
                    <Col xs="1">
                        Sl.No
                    </Col>
                    <Col xs="6">
                        Description
                    </Col>
                    <Col xs="3">
                        Mandatory
                    </Col>
                    <Col xs="1">
                    
                    </Col>
                </Row>);
     }


     renderBody()
     {
        let i =0 ;
        return (<>
            { this.renderEditPopup() }

            { this.renderTitle() }
           
            <div className="py-2 clear">
                <div className="table white">
              
                { this.renderHeading() }
                { (this.requirements.length == 0) ?
                <div className="pd10">No requirements </div>: 
                <>
                { this.requirements.map((req, index) => 
                        this.renderRequirement(req, index+1) 
                )}</>}
            </div>
                </div>
            </>);
     }

     

     render() {
        return (<div>
            {
                (this.state.status == Status.Loading)? <PageLoader loadingMessage={ this.state.statusMessage } />:
                (<>
                { (this.state.status == Status.Processing) && this.renderProcessingStatus() }
                <div className="py-3">
                    { this.renderBody() }
                </div>
                </>)
            }
        </div>);

     }
}