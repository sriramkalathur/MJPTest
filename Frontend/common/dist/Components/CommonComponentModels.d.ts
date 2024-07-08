/// <reference types="react" />
import { FilteredResult } from "../CommonModels";
export interface IPaginatorProps<T> {
    result: FilteredResult<T>;
    loadPage: (page: number) => Promise<void>;
}
export interface ModalDialogProps {
    title: string;
    body: JSX.Element;
    actionButtons: JSX.Element;
    progress?: JSX.Element;
}
//# sourceMappingURL=CommonComponentModels.d.ts.map