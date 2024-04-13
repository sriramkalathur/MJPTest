import { APIRequest, CommonUtils, ProcessingMessage, Status, TextBox, ValidationMessage } from "common";
import React from "react";
import { DocumentUploadModel, MJPDocument } from "../models/DocumentModel";
import { MJPCommonUtils } from "../common/CommonUtils";
import { Formik, FormikProps } from "formik";
import { DocumentService } from "../services/DocumentService";
import { Button, Col, FormFeedback, FormGroup, Input, Label, Row } from "reactstrap";
import { AiFillDelete, AiOutlineClose, AiOutlineDelete, AiOutlineDownload } from "react-icons/ai";
import { UserContext } from "../authentication/UserContext";
import { APIResult } from "../models/CommonModels";
import { DocumentType  } from "../models/DocumentModel";
import { FaDownload, FaUpload } from "react-icons/fa";

class PropsModel {
   
    //Application Id/Job PositonId
    itemId: number;
 
    documentType: DocumentType;

    allowDelete: boolean
}

class StateModel {

    status: Status;

    statusMessage: string;
}

export class DocumentsList extends React.Component<PropsModel, StateModel> {
    
    private documents: Array<MJPDocument>;

    private formState: FormikProps<DocumentUploadModel>;

    private documentService: DocumentService;

    constructor(props: any){
        super(props);

        this.state = {  status: Status.None,
              statusMessage: ""  
        }

        this.documents = [];
        this.documentService = new DocumentService();
    }

    async loadDocuments() {

        this.setState({ status: Status.Loading,
              statusMessage: "Loading documents..."  
        });

        this.documents = await this.documentService.selectDocuments(this.props.itemId, this.props.documentType);

        this.setState({ status: Status.None});
    }

    async componentDidMount() {
       await this.loadDocuments();
    }



    private async uploadDocument() : Promise<void> {
        this.setState({ status: Status.Processing, statusMessage : "Uploading Document.."});
    
        MJPCommonUtils.clearErrors(this.formState);
        this.formState.setErrors([] as any);
    
        //Set the itemId
        this.formState.values.documentId = this.props.itemId;
        var formData = new FormData();
        formData.append("fileContent", this.formState.values.fileContent);
        formData.append("itemId", this.props.itemId.toString());

        if(this.formState.values.remarks != null){
            //If remarks is NULL, don't add that field
            formData.append("remarks", this.formState.values.remarks );
        }

        
        let result = await this.documentService.uploadDocument(formData, this.props.documentType);
        
        if (!result.success) {
    
            //set the errors
            MJPCommonUtils.updateErrors(result, this.formState);
            //Set the failure status
            this.setState({ status: Status.None });
        }
        else {
            //success.
            //Clear the values..
            this.formState.values.remarks = "";
            //Refresh the documents
            await this.loadDocuments();
        }
    }

    renderHeading(){
        return (<Row className="header">
            <Col xs="0-5">
               
            </Col> 
            <Col xs="3"> 
                File Name
            </Col>
            <Col xs="2-5">
                Remarks
            </Col>
            <Col xs="2-5">
                Uploaded Time
            </Col>
            <Col xs="2">
                Uploaded By
            </Col>
        </Row>);
    }

    renderDocuments(){

        return ((this.documents == null || this.documents.length == 0)? 
            <div className="pd10">No documents</div>:
        <div>
        {  (this.documents.map((d, index) => 
                <Row>
                    <Col xs="0-5">
                        { index+1 } 
                    </Col>
                    <Col xs="3">
                        { d.fileName }
                    </Col> 
                    <Col xs="2-5">
                        { d.remarks }
                    </Col>
                    <Col xs="2-5">
                        { CommonUtils.getDisplayDateTime(d.uploadedTime) }
                    </Col>
                    <Col xs="2">
                        { d.uploadedBy }
                    </Col>
                    <Col xs="1-5">
                   
                        <span className="px-1">
                            <Button outline size="sm" color="teal" 
                                onClick= { async (e) => { await this.documentService.downloadDocument(d.documentId, this.props.documentType) }}>
                                <FaDownload  /> </Button>
                        </span>
                    
                    { (this.props.allowDelete) &&
                        <span className="px-1">
                        <Button outline size="sm" 
                            color="teal" onClick= { async (e) => { await this.deleteDocument(d.documentId); }}>
                            <AiOutlineClose color="red"  />
                        </Button>
                        </span>
                     }
                    </Col>
                    
                   
                </Row>
            ))
        }</div>);
    }

  

    private async deleteDocument(documentId: number){

        this.setState({ status: Status.Processing,
                    statusMessage: "Deleting document.."
                });
        //Delete
        await this.documentService.deleteDocument(documentId, this.props.documentType);
        //Refresh the application
        debugger;
        await this.loadDocuments();
    }

    renderFields(){
        return (<>
                    <div>
                    <div>
                    <FormGroup>
                        <Label className="fieldLabel">File </Label>
                        <Input name="fileContent" type="file" className="no-border"
                            id="fileContent" 
                            onChange={

                            /* When the file content is changed, just set the file to local object */
                            (e) => {
                                this.formState.values.fileContent = e.target.files[0];

                            }                            
                        } />
                        
                        { /* Render a hidden field just for validation error */ }
                        <Input type="hidden" invalid={ this.formState.errors.fileContent != null}></Input>
                        <FormFeedback>{ this.formState.errors.fileContent as string } </FormFeedback>

                    </FormGroup>
                    </div>
                    
                  
                    <TextBox label="Remarks" fieldName="remarks"
                        onChange={this.formState.handleChange}
                        type="textarea"
                        errorMessage={this.formState.errors.remarks}
                        value={ this.formState.values.remarks } />
                    </div>
                    <div className="py-3">
                        <Button color="teal" outline onClick = { async (e) => await this.uploadDocument() }>
                        <FaUpload />&nbsp;&nbsp;Upload</Button>
                    </div>
                </>);
    }

    renderProcessingStatus(){
        return (this.state.status == Status.Processing) ? <ProcessingMessage statusMessage={ this.state.statusMessage } />:
        (<></>);
    }

    renderBody(){
     
        return (<div>
            {
               this.renderProcessingStatus()
            }
            <Row>
                
                <Col xs="8">
                    <div className="table white">
              
                    { this.renderHeading() }
                    { this.renderDocuments() }
                </div>
                </Col>
              
                <Col xs="4">
                    <div className="px-2">
                    { this.renderFields() }
                    </div>
                </Col>
            </Row>
           
            
        </div>);
    }


    renderForm() {
        
        return (<div className="pd10">
          <Formik
            initialValues={ new DocumentUploadModel() }
            validateOnChange={false}
            validateOnBlur={false}
            onSubmit={(e) => { }}>
            {
              (props) => {
                this.formState = props;
                return this.renderBody();
              }
            }
          </Formik></div>);
      }

    
      render() {
          return ((this.state.status == Status.Loading)?
            <span> <ProcessingMessage statusMessage={this.state.statusMessage} /> </span>:
             this.renderForm());
      }
}