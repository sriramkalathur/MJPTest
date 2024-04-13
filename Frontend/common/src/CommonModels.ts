
import { SelectChangeEvent } from "@mui/material";
import { ReactNode } from "react";
import { InputType } from "reactstrap/types/lib/Input";
import { isSyntheticExpression } from "typescript";


export class ListItem {

    itemId : number;
    displayText: string;

    itemCode?: string;

    
    constructor(itemId:number, displayText:string, itemCode: string=""){
        this.itemId = itemId;
        this.displayText = displayText;
        this.itemCode = itemCode;
    }
    
}

const DROPDOWN_SELECT_VALUE = -1;

export class DropdownAttributes {
    
    options : Array<any>;
    value? : any;

    class?: string = "";
    labelText: string;

    labelSuffix?: JSX.Element;
    addDefaultSelect?: boolean = true;
    isReadOnly ?: boolean = false;
    
    defaultValue?: number;
    defaultText?: string;

     /* This is mandatory and this should match with the JSON property of the binded object.
    When this is changed in UI, the corresponding property will get updated in objet back */
    fieldName: string;

    /* Validation error Message */
    errorMessage ?: string;

    /* On changed event */
    onChange ?: React.ChangeEventHandler<any>;

    /* On changed event */
    //onSelectionChanged ?: (evt: SelectChangeEvent<any>, node: ReactNode) => void;
    
    displayMember: string = "displayText";
    valueMember: string = "value";

    //Custom Option building. For ex:- building an OPT Group
    optionsBuilder?:  (options: Array<any>) => JSX.Element;

    //If TRUE, adds a * 
    isMandatory ?: boolean = false;
}


export enum TextBoxType {
    None,

    Text,

    MultiLine,

    Password
}

export class TextBoxAttributes {

    value?: string;
    maxLength?: number = 100;

    rows?: number = 1;

    label?: string;
    placeHolder?: string = "";

    class?: string = "";

    /* This is mandatory and this should match with the JSON property of the binded object.
    When this is changed in UI, the correesponidng property will get updated in objet back */
    fieldName: string;

    isReadOnly ?: boolean = false;
   
    /* Validation error Message */
    errorMessage ?: string;

    /* On changed event */
    onChange ?: React.ChangeEventHandler<any>;

    /* The prefix element if any for the input field */
    prefix?: JSX.Element;

    type?: InputType = "text"

    isMandatory ?: boolean = false;
}




export class DateFieldAttributes {

    date?: Date;
 
    label?: string;
    placeHolder?: string = "";

    class?: string = "";

    /* This is mandatory and this should match with the JSON property of the binded object.
    When this is changed in UI, the correesponidng property will get updated in objet back */
    fieldName: string;

    isReadOnly ?: boolean = false;
   
    /* Validation error Message */
    errorMessage ?: string;

    /* On changed event */
    onChange ?: React.ChangeEventHandler<any>;

    //Indicates if it is time field. If Yes, it will be shown as Date Time field
    isTimeField?: boolean = false;

    //If TRUE, add a red * indication
    isMandatory ?: boolean = false;
}



export enum AsyncStatus {
    None = 0,
    Started =1,
    Completed =2,
    Error =3
}

/*Payload for calling an async action. Ideally an API call */
export class AsyncActionPayload<T> {

    payload: T;

    /* User token to call the API   
    This is required only for  API calls*/
    apiToken?: string;

    state : AsyncStatus;

    constructor(payload: T, token: string,
           state: AsyncStatus = AsyncStatus.Started ){
        this.payload = payload;
        this.apiToken = token;
        this.state = state;
    }
}


 /* Status of an API call . This contains result like "Pending"/ "Fetched"/ "err" */
export class AsyncActionState<T> {
   
    status : AsyncStatus;

    /* Response in case of success */
    result: T;

    /* Error Information */
    error: any; 

    constructor(status: AsyncStatus, 
            result: T = null,
            error: any = null){
        this.status = status;
        this.error = error;
        this.result = result;
    }
}



export enum Status {
    None,
    Loading,
    Processing, //Request is processing
    Success,
    Failure
}


export enum DialogResult {
    None,
    Ok,
    Cancel
}


export class PopupResult<T> {

    result: T;

    dialogResult: DialogResult;

    constructor(dialogResult: DialogResult, result: T){
        this.dialogResult = dialogResult;
        this.result = result;
    }

    static SuccessResult = function<T>(result : T = null){
        return new PopupResult(DialogResult.Ok,
                result);
    }


    static CancelResult = function<T>(result : T = null){
        return new PopupResult(DialogResult.Cancel,
                result);
    }
}


/* Popup actions passed from the main */
export class ModalPopupActions<T> {

    /* Function to close the popup */
    closePopup : (popupResult: PopupResult<T>) => void;
}


//Filter result for handling Paginated data
export class FilteredResult<T> {

    static FIRST_PAGE = 1;

    /* Filered items */
    items: Array<T>;

    /* Total page count */
    totalPages: number;

    /* Total records */
    totalRecords: number;

    currentPage : number;

    constructor(){
        this.currentPage =0;
        this.totalPages =0;
        this.totalRecords =0;
        this.items=[];
    }
}



// export class UserContext {

//     apiToken: string;
// }

// export class MultiSelectListItem {

//     value : number;
//     displayText: string;

//     isSeleted: boolean;

//     constructor(value:number, displayText:string){
//         this.value = value;
//         this.displayText = displayText;
//         this.isSeleted = false;
//     }
// }



// export class ComboboxListAttributes {
    
//     options : Array<any>;
//     selectedValues: Array<number>;

//     class?: string = "";
//     label: string;

//     isReadOnly ?: boolean = false;
   
//      /* This is mandatory and this should match with the JSON property of the binded object.
//     When this is changed in UI, the corresponding property will get updated in objet back */
//     fieldName: string;

//     /* Validation error Message */
//     errorMessage ?: string;

//     /* On changed event */
//     onChange ?: React.ChangeEventHandler<Array<number>>;

 
//     displayMember: string = "displayText";
//     valueMember: string = "value";
// }
