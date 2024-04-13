// import * as React from "react";
// import * as models from "./CommonModels";

// import {  Form, FormGroup,  Label, Input} from 'reactstrap';


// export class TextBox extends React.Component<models.TextBoxAttributes> {

// 	constructor(props:any: any) {
// 		super(props);
// 	}

// 	render() {
// 		return (
// 			<FormGroup>
// 			<Label class="fieldLabel">{ this.props.label }</Label>
			
			
// 			<Input name={this.props.fieldName} type="text" id={this.props.fieldName} 
// 					value={ this.props.text}
// 					onChange={ this.props.onChange && this.props.onChange }	
// 					readOnly={ this.props.isReadOnly }
//                     placeholder={this.props.placeHolder} />

// 			<div className="field-validation-error">
// 			{ /* Get the error. For ex:- if validationFor is "name", then get the props.error.name */ }
// 			{ this.props.errorMessage && <div> { this.props.errorMessage } </div> }
// 		</div>
// 		  </FormGroup>
// 		);
		
// 	}
// }