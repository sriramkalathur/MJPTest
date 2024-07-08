"use strict";
// import * as React from "react";
// import * as models from "./CommonModels";
// import { Form, FormGroup, Label, Input } from 'reactstrap';
// export const DEFAULT_VALUE = -1;
// export class DropdownList extends React.Component<models.DropdownAttributes> {
// 	constructor(props:any: any) {
// 		super(props);
// 	}
// 	render() {
// 		return (
// 			<FormGroup>
// 				<Label class="fieldLabel">{this.props.label}</Label>
// 				<Input name={this.props.fieldName} type="select" 
// 					value={this.props.value} 
// 					class={this.props.class}
// 					onChange={ this.props.onChange && this.props.onChange }	>
// 					<option key="-1" value={DEFAULT_VALUE}>--Select--</option>
// 					{ 		this.props.options && this.props.options.map(opt =>
// 							<option key={opt[this.props.valueMember]} value={ opt[this.props.valueMember]}>
// 									{ opt[this.props.displayMember] }</option>
// 						)};
//         	</Input>
// 				<div className="field-validation-error">
// 					{ /* Get the error. For ex:- if validationFor is "name", then get the props.error.name */}
// 					{this.props.errorMessage && <div> {this.props.errorMessage} </div>}
// 				</div>
// 			</FormGroup>
// 		);
// 	}
// }
//# sourceMappingURL=DropdownList.js.map