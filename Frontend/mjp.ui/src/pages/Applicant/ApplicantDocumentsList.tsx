import { TabContext, TabPanel } from "@mui/lab";
import { Box, Step, StepButton, StepContent, InputLabel, FormControl, StepLabel, Stepper, Select, Tab, Tabs, TextField } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import { CommonUtils, DateField, DialogResult, DropdownList, ListItem, Status, TextBox } from "common";
import React from "react";
import { MdAddToHomeScreen } from "react-icons/md";
import { SiTrustedshops } from "react-icons/si";
import { Button, Card, Col, Nav, NavItem, NavLink, Row } from "reactstrap";

import { UserProfileMasters } from "../../models/UserModels";
import { PageLoader } from "../../common/MJPCommon";
import { Formik, FormikProps } from "formik";
import { PageProcessingStatus, PageTitle } from "../MJPComponents";
import { FiCheck } from "react-icons/fi";
import { AiFillDelete, AiOutlineClose } from "react-icons/ai";
import { EditPersonalInformation } from "./EditPersonalInformation";
import { ApplicantService } from "../../services/ApplicantService";
import { ApplicantDocument, ApplicantInfo, PersonalInformation } from "../../models/ApplicantModels";
import { MJPCommonUtils } from "../../common/CommonUtils";
import { IoIosAdd } from "react-icons/io";

import { FaRegEdit } from "react-icons/fa";
import { EditApplicantDocumentPopup } from "./Popup/EditApplicantDocumentPopup";

class PropsModel {
    applicantId: number;

    //Document Types
    documentTypes: ListItem[];
}


class StateModel {

    status: Status;

    statusMessage: string;
    
    //Current Item selected
    currentItem: ApplicantDocument;

    isPopupOpen: boolean;
}


export class ApplicantDocumentList extends React.Component<PropsModel, StateModel> {

    private applicantService: ApplicantService;

    private model: ApplicantDocument[];

    constructor(props: any) {
        super(props);

        this.applicantService = new ApplicantService();
        this.state = {
            status: Status.Loading,
            statusMessage: "Loading Documents..",
            currentItem: null,
            isPopupOpen: false
        };
    }


    async loadDocuments() {
        
        this.setState({ status: Status.Loading });
        this.model = await this.applicantService.selectDocuments(this.props.applicantId);
        this.setState({ status: Status.None });
    }

    async componentDidMount() {
        await this.loadDocuments();
    }


    private async deleteDocument(documentId: number): Promise<void>{
       
        this.setState({ status: Status.Processing,
             statusMessage: "Deleting Document.."});
         await this.applicantService.deleteApplicantDocument(documentId);
         await this.loadDocuments();
     }


    private renderDocument(doc: ApplicantDocument){
        return (<>
            <Row>
                <Col xs="3">{ doc.documentName} </Col>
         
                <Col xs="2-5">{ doc.documentNumber} </Col>
           
                <Col xs="1-5">{ CommonUtils.getDisplayDate(doc.issueDate) } </Col>
           
                <Col xs="1-5">{ CommonUtils.getDisplayDate(doc.expiryDate) } </Col>
            
                <Col xs="2-5">{ doc.issuePlace } </Col>

                <Col xs="1">
                    <Button  outline size="sm"  color="teal" onClick= { (e) => this.showPopup(doc)}>
                        <FaRegEdit />
                     </Button>
                  
                    <span className="px-2">
                    <Button outline size="sm" color="teal" onClick= { (e) => this.deleteDocument(doc.applicantDocumentId)}>
                        <AiFillDelete  />
                     </Button>
                     </span>
                </Col>
            </Row>
        </>);
    }


    private renderHeader(){
        return (<>
            <Row className="header">
                <Col xs="3">Document</Col>
           
                <Col xs="2-5">Document Number</Col>
            
                <Col xs="1-5">Issue Date</Col>
           
                <Col xs="1-5">Expiry Date</Col>
         
                <Col xs="2-5">Issue Place</Col>
            </Row>
        </>);
    }


    showPopup(doc: ApplicantDocument){
        this.setState({
            currentItem:doc,
            isPopupOpen: true
        });
    }


    
    async closePopup(result: DialogResult){
        this.setState({
            currentItem: null,
            isPopupOpen: false
        });

        //Refresh the features if resut = OK
        if(result == DialogResult.Ok){
            await this.loadDocuments();
        }
    }
 
    
    renderEditPopup(){
        return <EditApplicantDocumentPopup isOpen={ this.state.isPopupOpen}
            model={ this.state.currentItem}
            closePopup={ async (result) => await this.closePopup(result) }
            documentTypes={ this.props.documentTypes} />;
    } 

    renderAddButton(){

        return (<Button outline color="teal" onClick={ (e)=> {
            //Just set the Model.JobPositionFeatureId to 0
                var item = new ApplicantDocument();
                item.applicantId = this.props.applicantId;
              
                this.showPopup(item);
            }}><IoIosAdd />&nbsp;Add Document</Button>);
        
    }


  
    renderBody() {
        return (<>
            <PageTitle title="Documents Held" actionButtons={ this.renderAddButton() } />
            { this.renderEditPopup() }
            <div className="table white">
            {
                this.renderHeader()
            }
            {(this.model.length == 0) ?
                <Row className="pd15">No Documents</Row> :
                this.model.map(c => {
                    return this.renderDocument(c);
                })
            }
        </div></>);
    }

    render(){
        return (<>
            {(this.state.status == Status.Loading) ?
            <PageLoader loadingMessage={this.state.statusMessage} /> :
             this.renderBody() 
            }
        </>);
    }
}



class ViewModel {
    documents: Array<ApplicantDocument>
}


export class ApplicantDocumentsListView extends React.Component<ViewModel> {

    constructor(props: any){
        super(props);
    }

    renderHeader(){
        return (<>
            <Row className="header">
                <Col xs="3">Document Name</Col> 
                <Col xs="2-25">Document #</Col>

                <Col xs="2-25">Issue Date</Col>

                <Col xs="2-25">Expiry Date</Col>
   
                <Col xs="2-25">Issue Place</Col>
                
            </Row>
        </>);
    }


    renderDocument(doc: ApplicantDocument) {
        return (<>
            <Row>
                <Col xs="3">{ doc.documentName }</Col>
                <Col xs="2-25">{ doc.documentNumber }</Col>
                <Col xs="2-25">{ CommonUtils.getDisplayDate(doc.issueDate) }</Col>
                <Col xs="2-25">{  CommonUtils.getDisplayDate(doc.expiryDate)  }</Col>

                <Col xs="2-25">{ doc.issuePlace}</Col>

                
            </Row>
        </>);
    }

    renderBody() {
        debugger;
        return (<div className="table white">
            {
               this.renderHeader() 
            }
            {    this.props.documents.map(c => {
                    return this.renderDocument(c);
                })       
            }
        </div>);
    }

    render(){
        return this.renderBody();
    }
}