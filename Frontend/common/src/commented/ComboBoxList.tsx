// import * as React from "react";
// import * as models from "../CommonModels";

// import { Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap';
// import { validationMessage } from "./CommonComponents";

// export const DROPDOWN_SELECT_VALUE = null;

	
// export class DropdownList extends React.Component<models.DropdownAttributes> {

// 	constructor(props:any: any) {
// 		super(props);
// 	}

// 	render() {
		
// 		//Use "" for NULL
// 		var defaultValue = (this.props.defaultValue == null) ? "": this.props.defaultValue;
// 		var defaultText = (this.props.defaultText == null) ? "--Select--" : this.props.defaultText;
		
// 		return (
// 			<FormGroup>
// 				<Label className="fieldLabel">{this.props.label}</Label>

				
// 				<Input name={this.props.fieldName} type="select" 
// 					value={this.props.value} 
// 					class={this.props.class}
// 					disabled ={ this.props.isReadOnly }
// 					invalid={this.props.errorMessage != null}
// 					onChange={ this.props.onChange && this.props.onChange }	>
// 					{ this.props.addDefaultSelect && (<option key="-1" value={defaultValue}>{ defaultText }</option>) }
// 					{ 		this.props.options && this.props.options.map(opt =>
// 							<option key={opt[this.props.valueMember]} value={ opt[this.props.valueMember]}>
// 									{ opt[this.props.displayMember] }</option>
// 					)};
				
//         	</Input>
// 			<FormFeedback>{this.props.errorMessage}</FormFeedback>

// 			{/* {  validationMessage(this.props.errorMessage) }
// 			 */}
// 			</FormGroup>

// 		);

// 	}
// }