
import * as models from "../CommonModels";

import { Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import React from "react";
export const DROPDOWN_SELECT_VALUE: any = null;


export class DropdownList extends React.Component<models.DropdownAttributes> {

	constructor(props:any) {
		super(props);
	}

	render() {

		//Use "" for NULL
		var defaultValue = (this.props.defaultValue == null) ? "" : this.props.defaultValue;
		var defaultText = (this.props.defaultText == null) ? "--Select--" : this.props.defaultText;

		return (
			<FormGroup className={this.props.class}>
				
				{this.props.labelText && <Label className="fieldLabel">{this.props.labelText}
					{this.props.labelSuffix && this.props.labelSuffix}
					 
				</Label>}
				{ this.props.isMandatory && <span className="px-1" style={ { color: "red" }}>*</span> }
				
				<Input name={this.props.fieldName}
					id={this.props.fieldName}
					type="select" 
					
					value={this.props.value}
					className={"form-control"}
					disabled={this.props.isReadOnly}
					invalid={this.props.errorMessage != null}
					onChange={this.props.onChange && this.props.onChange}>
					{this.props.addDefaultSelect && (<option key="-1" value={defaultValue}>{defaultText}</option>)}
					
					{  /* If there is a custom OptionsBuilder use that */ }
					{ (this.props.optionsBuilder) ? (this.props.optionsBuilder(this.props.options)):
						(this.props.options && this.props.options.map(opt =>

						<option key={opt[this.props.valueMember]} value={opt[this.props.valueMember]}>
							{opt[this.props.displayMember]}</option>
					))};

				</Input>
				{this.props.labelSuffix && this.props.labelSuffix}
				<FormFeedback>{this.props.errorMessage}</FormFeedback>

				{/* {  validationMessage(this.props.errorMessage) }
			 */}
			</FormGroup>

		);

	}
}