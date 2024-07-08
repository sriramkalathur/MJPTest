"use strict";
// /* Droddown list with FormIk Support.
// Use this if you need Dropdown list with FromIk upport */
// import * as models from "../CommonModels";
// import { Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap';
// import React from "react";
// import { FormikProps } from "formik";
// /* Combine Dropdown and form IK props */
// type PropsModel = models.DropdownAttributes & { formState: FormikProps<any> };
// /* Defined for using Dropdown from form state */
// export class FormFieldDropdownList extends React.Component<PropsModel> {
// 	constructor(props:any) {
// 		super(props);
// 	}
// 	render() {
// 		//Use "" for NULL
// 		var defaultValue = (this.props.defaultValue == null) ? "": this.props.defaultValue;
// 		var defaultText = (this.props.defaultText == null) ? "--Select--" : this.props.defaultText;
// 		var errMessage = ((this.props.formState.errors == null) ? null: 
// 				this.props.formState.errors[this.props.fieldName]) as string;
// 		return (
// 			<FormGroup>
// 				{  this.props.labelText && <Label className="fieldLabel">{this.props.labelText}</Label> }
// 				<Input name={this.props.fieldName} 
// 					id={this.props.fieldName}
// 					type="select" 
// 					value={this.props.value} 
// 					class={this.props.class}
// 					disabled ={ this.props.isReadOnly }
// 					invalid={errMessage != null}
// 					/* If a onChange handler is defined, take that from from state */
// 					onChange={ this.props.onChange == null ? this.props.formState.handleChange :
// 							 this.props.onChange } >
// 					{ this.props.addDefaultSelect && (<option key="-1" value={defaultValue}>{ defaultText }</option>) }
// 					{ 		this.props.options && this.props.options.map(opt =>
// 								/* Construct the options */
// 								<option key={opt[this.props.valueMember]} value={ opt[this.props.valueMember]}>
// 									{ opt[this.props.displayMember] }</option>
// 					)};
//         	</Input>
// 			{ /* Read the errors from formState.errors */ }
// 			<FormFeedback>{errMessage}</FormFeedback>
// 			{/* {  validationMessage(this.props.errorMessage) }
// 			 */}
// 			</FormGroup>
// 		);
// 	}
// }
//# sourceMappingURL=FormFieldDropdownList.js.map