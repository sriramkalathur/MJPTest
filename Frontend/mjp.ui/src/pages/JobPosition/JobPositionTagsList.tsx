import { Chip, FormGroup } from "@mui/material";
import { Status, TextBox } from "common";
import { Formik, FormikProps } from "formik";
import React from "react";
import { IoIosAdd } from "react-icons/io";
import { Button, Col, FormFeedback, FormText, Input, Label, Row } from "reactstrap";
import { MJPCommonUtils } from "../../common/CommonUtils";
import { JobPositionTag } from "../../models/JobPositions";

class PropsModel {
    

    tags: Array<JobPositionTag>;
 
    //When the tags/added or removed this will be raised
    onTagsUpdated?: (tags: Array<JobPositionTag>) => void;

    errorMessage?: string;
}

class StateModel {

    
}



export class JobPositionTagsList extends React.Component<PropsModel, StateModel>{


    private tags: Array<JobPositionTag> = [];

    formState: FormikProps<JobPositionTag>;


    constructor(props: any){
        super(props);

        this.tags = this.props.tags;
    }

    private  notifyTagsChanged(){
        if(this.props.onTagsUpdated != null){
            this.props.onTagsUpdated(this.tags);
        }
    }

    private deleteTag(index: number){
        //Just remove the item
        this.tags.splice(index, 1);
        //Nofity
        this.notifyTagsChanged();
        //Just refresh state
        this.setState({});
    }

    private renderTags(){
        return (<div>
        {   (this.tags.length > 0) &&
            this.tags.map((t, index) => {
                return <Chip label={t.tagName} onDelete={ (e) => this.deleteTag(index)} />
            })
        }</div>);
    }


    private addTag(){
        //if tagName is empty, validate that
        MJPCommonUtils.clearErrors(this.formState);

        if(this.formState.values.tagName == "" || this.formState.values.tagName == null){
            //Validate
            this.formState.setFieldError("tagName", "Tag name is requried");
        }
        else {
            //Add to the list.
            this.tags.push(this.formState.values);
            //Clear that
            this.formState.setFieldValue("tagName", "");
        }
    }

    renderFields(){
        return (<Row>
           
             <Col xs="3">

                <TextBox   fieldName="tagName" 
                    onChange={ this.formState.handleChange }
                     errorMessage={ this.formState.errors.tagName }
                    value = {this.formState.values.tagName} />
                
              </Col>
              <Col xs="2">
                <Button color="teal" outline  onClick={ (e) => this.addTag() }> 
                    <IoIosAdd />&nbsp;Add Tag</Button>
              </Col>
        </Row>);
    }

    renderBody(){
        return (<div>
             <div>
             <Label className="fieldLabel">Tags</Label>
            
			</div>
          
            <div className="py-2">
            { this.renderTags()}
           
            { /* Render a hidden field just for validation error */ }
            <Input type="hidden" invalid={ this.props.errorMessage != null}></Input>
            <FormFeedback>{ this.props.errorMessage } </FormFeedback>
            </div>
              <div className="py-2">
            { this.renderFields() }
            <FormText>* The job will be matched based on this tag</FormText>  
            </div>
        
                  
        </div>);
    }

    renderForm() {
       
        const newItem = new JobPositionTag();
 
        return (<div className="pd10">
           <Formik
             initialValues={  newItem }
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
        return this.renderForm();
    }
}