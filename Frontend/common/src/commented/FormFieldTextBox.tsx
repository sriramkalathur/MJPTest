
// import * as models from "../CommonModels";

// import {   FormGroup,  Label, Input, FormFeedback} from 'reactstrap';
// import React from "react";



// /* Combine Dropdown and form IK props */
// type PropsModel = models.TextBoxAttributes;

// /* Defined for using Dropdown from form state */

// export class FormFieldTextBox extends React.Component<PropsModel> {

// 	constructor(props:any) {
// 		super(props);
// 	}

// 	render() {
// 		/* Set the Id as field Name as that is the name with which the propertis will be saved to in
// 		form */
//         var errMessage = (this.props.formState.errors[this.props.fieldName]) as string;

// 		return (
// 			<FormGroup className={this.props.class}> 
// 			{  this.props.label &&  <Label className="fieldLabel">{this.props.label && this.props.label }</Label> }
			
// 			<Input rows={this.props.rows} name={this.props.fieldName} 
// 					type={this.props.type} 
// 					id={this.props.fieldName} 
// 					value={ this.props.text}   
				
// 					invalid={errMessage != null}
// 					/* If a onChange handler is defined, take that from from state */
// 					onChange={ this.props.onChange == null ? this.props.formState.handleChange :
//                         this.props.onChange } 
// 					readOnly={ this.props.isReadOnly }
//                     placeholder={this.props.placeHolder} /> 
		
// 			<FormFeedback>{errMessage}</FormFeedback>
					
// 		  </FormGroup>
// 		);
		
// 	}
// }