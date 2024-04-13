import React from "react";
import { FormGroup, Input, Label } from "reactstrap";

import * as models from "../CommonModels";
import { CommonUtils } from "../CommonUtils";
import { ValidationMessage } from "../CommonComponents";
import { InputType } from "reactstrap/types/lib/Input";


/* For now use textbox attributes */
export class DateField extends React.Component<models.DateFieldAttributes> {

    /* This is the format that should be used for Input fields */
    static INPUT_DATE_FORMAT = "yyyy-MM-DD";

    static INPUT_DATE_TIME_FORMAT = "yyyy-MM-DDThh:mm";

    //static INPUT_TIME_FORMAT = "yyyy-MM-DDThh:mm";

    inputType: InputType; 

    constructor(props:any) {
        super(props);

        this.inputType = (this.props.isTimeField ? "datetime-local": "date");
    }

    render() {

         
        return (
            <FormGroup className={this.props.class}>
                {  this.props.label && <Label className="fieldLabel">{this.props.label}</Label>}
                { this.props.isMandatory && <span className="px-1" style={ { color: "red" }}>*</span> }
		
                <Input type={this.inputType}  
                    name={this.props.fieldName}
                    onChange={this.props.onChange && this.props.onChange}
                    disabled={this.props.isReadOnly}
                    invalid={this.props.errorMessage != null}
                    value={ CommonUtils.formatDate(this.props.date!, 
                      (this.props.isTimeField)?  DateField.INPUT_DATE_TIME_FORMAT:
                        DateField.INPUT_DATE_FORMAT)} />

                 <ValidationMessage errorMessage={this.props.errorMessage!} /> 
            </FormGroup>
        );
    }
}