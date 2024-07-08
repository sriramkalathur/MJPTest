"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilteredResult = exports.ModalPopupActions = exports.PopupResult = exports.DialogResult = exports.Status = exports.AsyncActionState = exports.AsyncActionPayload = exports.AsyncStatus = exports.DateFieldAttributes = exports.TextBoxAttributes = exports.TextBoxType = exports.DropdownAttributes = exports.ListItem = void 0;
var ListItem = /** @class */ (function () {
    function ListItem(itemId, displayText, itemCode) {
        if (itemCode === void 0) { itemCode = ""; }
        this.itemId = itemId;
        this.displayText = displayText;
        this.itemCode = itemCode;
    }
    return ListItem;
}());
exports.ListItem = ListItem;
var DROPDOWN_SELECT_VALUE = -1;
var DropdownAttributes = /** @class */ (function () {
    function DropdownAttributes() {
        this.class = "";
        this.addDefaultSelect = true;
        this.isReadOnly = false;
        /* On changed event */
        //onSelectionChanged ?: (evt: SelectChangeEvent<any>, node: ReactNode) => void;
        this.displayMember = "displayText";
        this.valueMember = "value";
        //If TRUE, adds a * 
        this.isMandatory = false;
    }
    return DropdownAttributes;
}());
exports.DropdownAttributes = DropdownAttributes;
var TextBoxType;
(function (TextBoxType) {
    TextBoxType[TextBoxType["None"] = 0] = "None";
    TextBoxType[TextBoxType["Text"] = 1] = "Text";
    TextBoxType[TextBoxType["MultiLine"] = 2] = "MultiLine";
    TextBoxType[TextBoxType["Password"] = 3] = "Password";
})(TextBoxType = exports.TextBoxType || (exports.TextBoxType = {}));
var TextBoxAttributes = /** @class */ (function () {
    function TextBoxAttributes() {
        this.maxLength = 100;
        this.rows = 1;
        this.placeHolder = "";
        this.class = "";
        this.isReadOnly = false;
        this.type = "text";
        this.isMandatory = false;
    }
    return TextBoxAttributes;
}());
exports.TextBoxAttributes = TextBoxAttributes;
var DateFieldAttributes = /** @class */ (function () {
    function DateFieldAttributes() {
        this.placeHolder = "";
        this.class = "";
        this.isReadOnly = false;
        //Indicates if it is time field. If Yes, it will be shown as Date Time field
        this.isTimeField = false;
        //If TRUE, add a red * indication
        this.isMandatory = false;
    }
    return DateFieldAttributes;
}());
exports.DateFieldAttributes = DateFieldAttributes;
var AsyncStatus;
(function (AsyncStatus) {
    AsyncStatus[AsyncStatus["None"] = 0] = "None";
    AsyncStatus[AsyncStatus["Started"] = 1] = "Started";
    AsyncStatus[AsyncStatus["Completed"] = 2] = "Completed";
    AsyncStatus[AsyncStatus["Error"] = 3] = "Error";
})(AsyncStatus = exports.AsyncStatus || (exports.AsyncStatus = {}));
/*Payload for calling an async action. Ideally an API call */
var AsyncActionPayload = /** @class */ (function () {
    function AsyncActionPayload(payload, token, state) {
        if (state === void 0) { state = AsyncStatus.Started; }
        this.payload = payload;
        this.apiToken = token;
        this.state = state;
    }
    return AsyncActionPayload;
}());
exports.AsyncActionPayload = AsyncActionPayload;
/* Status of an API call . This contains result like "Pending"/ "Fetched"/ "err" */
var AsyncActionState = /** @class */ (function () {
    function AsyncActionState(status, result, error) {
        if (result === void 0) { result = null; }
        if (error === void 0) { error = null; }
        this.status = status;
        this.error = error;
        this.result = result;
    }
    return AsyncActionState;
}());
exports.AsyncActionState = AsyncActionState;
var Status;
(function (Status) {
    Status[Status["None"] = 0] = "None";
    Status[Status["Loading"] = 1] = "Loading";
    Status[Status["Processing"] = 2] = "Processing";
    Status[Status["Success"] = 3] = "Success";
    Status[Status["Failure"] = 4] = "Failure";
})(Status = exports.Status || (exports.Status = {}));
var DialogResult;
(function (DialogResult) {
    DialogResult[DialogResult["None"] = 0] = "None";
    DialogResult[DialogResult["Ok"] = 1] = "Ok";
    DialogResult[DialogResult["Cancel"] = 2] = "Cancel";
})(DialogResult = exports.DialogResult || (exports.DialogResult = {}));
var PopupResult = exports.PopupResult = /** @class */ (function () {
    function PopupResult(dialogResult, result) {
        this.dialogResult = dialogResult;
        this.result = result;
    }
    PopupResult.SuccessResult = function (result) {
        if (result === void 0) { result = null; }
        return new PopupResult(DialogResult.Ok, result);
    };
    PopupResult.CancelResult = function (result) {
        if (result === void 0) { result = null; }
        return new PopupResult(DialogResult.Cancel, result);
    };
    return PopupResult;
}());
/* Popup actions passed from the main */
var ModalPopupActions = /** @class */ (function () {
    function ModalPopupActions() {
    }
    return ModalPopupActions;
}());
exports.ModalPopupActions = ModalPopupActions;
//Filter result for handling Paginated data
var FilteredResult = exports.FilteredResult = /** @class */ (function () {
    function FilteredResult() {
        this.currentPage = 0;
        this.totalPages = 0;
        this.totalRecords = 0;
        this.items = [];
    }
    FilteredResult.FIRST_PAGE = 1;
    return FilteredResult;
}());
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
//# sourceMappingURL=CommonModels.js.map