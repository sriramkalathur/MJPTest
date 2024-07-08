/// <reference types="react" />
import { InputType } from "reactstrap/types/lib/Input";
export declare class ListItem {
    itemId: number;
    displayText: string;
    itemCode?: string;
    constructor(itemId: number, displayText: string, itemCode?: string);
}
export declare class DropdownAttributes {
    options: Array<any>;
    value?: any;
    class?: string;
    labelText: string;
    labelSuffix?: JSX.Element;
    addDefaultSelect?: boolean;
    isReadOnly?: boolean;
    defaultValue?: number;
    defaultText?: string;
    fieldName: string;
    errorMessage?: string;
    onChange?: React.ChangeEventHandler<any>;
    displayMember: string;
    valueMember: string;
    optionsBuilder?: (options: Array<any>) => JSX.Element;
    isMandatory?: boolean;
}
export declare enum TextBoxType {
    None = 0,
    Text = 1,
    MultiLine = 2,
    Password = 3
}
export declare class TextBoxAttributes {
    value?: string;
    maxLength?: number;
    rows?: number;
    label?: string;
    placeHolder?: string;
    class?: string;
    fieldName: string;
    isReadOnly?: boolean;
    errorMessage?: string;
    onChange?: React.ChangeEventHandler<any>;
    prefix?: JSX.Element;
    type?: InputType;
    isMandatory?: boolean;
}
export declare class DateFieldAttributes {
    date?: Date;
    label?: string;
    placeHolder?: string;
    class?: string;
    fieldName: string;
    isReadOnly?: boolean;
    errorMessage?: string;
    onChange?: React.ChangeEventHandler<any>;
    isTimeField?: boolean;
    isMandatory?: boolean;
}
export declare enum AsyncStatus {
    None = 0,
    Started = 1,
    Completed = 2,
    Error = 3
}
export declare class AsyncActionPayload<T> {
    payload: T;
    apiToken?: string;
    state: AsyncStatus;
    constructor(payload: T, token: string, state?: AsyncStatus);
}
export declare class AsyncActionState<T> {
    status: AsyncStatus;
    result: T;
    error: any;
    constructor(status: AsyncStatus, result?: T, error?: any);
}
export declare enum Status {
    None = 0,
    Loading = 1,
    Processing = 2,
    Success = 3,
    Failure = 4
}
export declare enum DialogResult {
    None = 0,
    Ok = 1,
    Cancel = 2
}
export declare class PopupResult<T> {
    result: T;
    dialogResult: DialogResult;
    constructor(dialogResult: DialogResult, result: T);
    static SuccessResult: <T_1>(result?: T_1) => PopupResult<T_1>;
    static CancelResult: <T_1>(result?: T_1) => PopupResult<T_1>;
}
export declare class ModalPopupActions<T> {
    closePopup: (popupResult: PopupResult<T>) => void;
}
export declare class FilteredResult<T> {
    static FIRST_PAGE: number;
    items: Array<T>;
    totalPages: number;
    totalRecords: number;
    currentPage: number;
    constructor();
}
//# sourceMappingURL=CommonModels.d.ts.map