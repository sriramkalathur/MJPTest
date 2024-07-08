"use strict";
// import * as models from "../../CommonModels";
// import {  Form, FormGroup,  Label, Input, FormFeedback} from 'reactstrap';
// import React from "react";
// import { FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField } from "@mui/material";
// import { getTextOfJSDocComment } from "typescript";
// export class MaterialDropdown extends React.Component<models.DropdownAttributes> {
// 	constructor(props:any) {
// 		super(props);    
// 	}           
// 	render() {     
//         var defaultValue = (this.props.defaultValue == null) ? "" : this.props.defaultValue;
// 		var defaultText = (this.props.defaultText == null) ? "--Select--" : this.props.defaultText;
// 		return (<FormControl sx={ { minWidth: 120 }}>
//             <InputLabel>{ this.props.labelText} {this.props.labelSuffix && this.props.labelSuffix} </InputLabel>
//             <Select value={ (this.props.value) ?? "" }
//                   id={this.props.fieldName} 
// 				  label={this.props.labelText}
//                   fullWidth={true}  
//                    readOnly= { this.props.isReadOnly}  
//                    onChange={ this.props.onSelectionChanged && this.props.onSelectionChanged }>
//                     {this.props.addDefaultSelect && (<MenuItem key="-1" value={defaultValue}>{defaultText}</MenuItem>)}
// 					{  /* If there is a custom OptionsBuilder use that */ }
// 					{ (this.props.optionsBuilder) ? (this.props.optionsBuilder(this.props.options)):
// 						(this.props.options && this.props.options.map(opt =>
// 						<MenuItem key={opt[this.props.valueMember]} value={opt[this.props.valueMember]}>
// 							{opt[this.props.displayMember]}</MenuItem>
// 					))};
//             </Select>
//             <FormHelperText>{(this.props.errorMessage != null && this.props.errorMessage != "")}</FormHelperText>
//         </FormControl>);
// 	}
// }
//# sourceMappingURL=MaterialDropdown.js.map