
import * as models from "../CommonModels";

import {  Form, FormGroup,  Label, Input, FormFeedback, InputGroupText, InputGroup} from 'reactstrap';
import React from "react";
import { DropdownList } from "./DropdownList";

export class TextBox extends React.Component<models.TextBoxAttributes> {
 
	constructor(props:any) {
		super(props);    
	}          
              
	render() {         
		/* Set the Id as field Name as that is the name with which the propertis will be saved to in
		form */
		
		return (
			<FormGroup className={this.props.class}>  
			{ this.props.prefix && this.props.prefix}
		
			{  this.props.label &&  <Label className="fieldLabel">{this.props.label && this.props.label }</Label> }
			{ this.props.isMandatory && <span className="px-1" style={ { color: "red" }}>*</span> }
		
			
			<Input rows={this.props.rows} name={this.props.fieldName} 
					type={ this.props.type }
					id={this.props.fieldName} 

					value={ this.props.value} 
					invalid={this.props.errorMessage != null}
					onChange={ this.props.onChange && this.props.onChange }	
					readOnly={ this.props.isReadOnly }
                    placeholder={this.props.placeHolder} />
			
			<FormFeedback>{this.props.errorMessage}</FormFeedback>
		
		  </FormGroup>
		);
		
	}
}