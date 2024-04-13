import React from "react";
import { JobFeatureContext, PopupContextProps } from "../../JobApplication/JobApplicationContext";
import { EditJobFeaturePopup } from "./EditJobFeaturePopup";
import { JobPositionFeature } from "../../../models/JobPositionModels";
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

class PropsModel {
    jobPositionId: number;
}

class StateModel {

    status: Status;

    statusMessage: string;
    
    isPopupOpen: boolean;

    currentItem?: JobPositionFeature;
}

export class JobFeaturesList extends React.Component<PropsModel, StateModel> {

    private featureService: JobFeatureService;
  
    private features: Array<JobPositionFeature>;

    constructor(props: any){
        super(props);

        this.state = { isPopupOpen: false, 
            status: Status.None,
            statusMessage: ""
        };

        this.featureService = new JobFeatureService();
        this.features =[];
    }


    async componentDidMount() {
        
        //Load the features
        await this.loadFeatures();
    } 

    private async loadFeatures(){
        this.setState({ status: Status.Loading,
            statusMessage : "Loading Job Features.."});

        //Load the features..
        this.features = await this.featureService.selectJobFeatures(this.props.jobPositionId);

        this.setState({ status: Status.None,
            statusMessage : "Loading Job Features.."});
    }

    async closePopup(result: DialogResult){
        this.setState({
            currentItem: null,
            isPopupOpen: false
        });

        //Refresh the features if resut = OK
        if(result == DialogResult.Ok){
            await this.loadFeatures();
        }
    }


    

    renderEditPopup(){
        return <EditJobFeaturePopup isOpen={ this.state.isPopupOpen}
            closePopup={ async (result) => await this.closePopup(result) }
            feature={ this.state.currentItem} />;
    } 

    showPopup(req: JobPositionFeature){
        this.setState({
            currentItem:req,
            isPopupOpen: true
        });
    }


    renderAddButton(){

        return (<Button outline color="teal" onClick={ (e)=> {
            //Just set the Model.JobPositionFeatureId to 0
                var item = new JobPositionFeature();
                item.jobPositionId = this.props.jobPositionId;
                item.jobPositionFeatureId = 0;
                item.textColor = "#000000";
                this.showPopup(item);
            }}><IoIosAdd />&nbsp;Add Feature</Button>);
        
    }


    private async deleteFeature(featureId: number): Promise<void>{
       // var result = con("Do you want to delete the item?");

       
        //Proceeed with delete..
        this.setState({ status: Status.Processing,
            statusMessage: "Processing.."});
        await this.featureService.deleteJobFeature(featureId);
        await this.loadFeatures();
    }


    renderTitle(){

        return (<>
             <div className="float-right"> 
                { this.renderAddButton() }
            </div>
 
            <div>
                <span className="subHeading">Features & Benefits</span>
            </div>
          
        </>);
    }
  
    // renderJobFeature1(req: JobPositionFeature){
    //     var styles = {
    //          fontSize: req.size + "px",
    //          color: req.textColor
    //     };  
        
    //     return ( <div className="mt-1">
    //              { /* Use a rating * instead of <li> */ }
    //                  <Rating size="small" readOnly={true}
    //                      className="px-2" max={1}
    //                      value={1} />
     
    //                  <span className={ "px-2"} style={ styles }> 
    //                      {  req.description }
                         
    //                  </span>

    //                  <Button outline size="sm" onClick= { (e) => this.showPopup(req)}>
    //                     <FaRegEdit />
    //                  </Button>
    //              </div>
    //              );
    //  }

    renderPreview(feature: JobPositionFeature){
      
       var styles= MJPCommonUtils.getCssStyles(feature);
       return (<div>
       
        <div style={ styles }> 
        {  feature.description }
        </div>
       </div> 
      );
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

    
     renderFeature(feature: JobPositionFeature, index: number){

        return (<Row>
                    <Col xs="1">
                        {  index }
                    </Col>
                    <Col xs="4">
                        { feature.description}
                    </Col>
                    <Col xs="5">
                        { this.renderPreview(feature) }
                    </Col>

                    <Col xs="2">
                    <Button  outline size="sm"  color="teal" onClick= { (e) => this.showPopup(feature)}>
                        <FaRegEdit />
                     </Button>
                  
                    <span className="px-2">
                    <Button outline size="sm" color="teal" onClick= { (e) => this.deleteFeature(feature.jobPositionFeatureId)}>
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
                    <Col xs="4">
                        Description
                    </Col>
                    <Col xs="5">
                        Preview
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
                { (this.features.length == 0) ?
                <div className="pd10">No features </div>: 
                <>
                { this.features.map((req, index) => 
                        this.renderFeature(req, index+1) 
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