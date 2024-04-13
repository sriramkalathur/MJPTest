import { FilteredResult } from "../CommonModels";

export interface IPaginatorProps<T> {
	
    result: FilteredResult<T>,

    //children: JSX.Element,
    
	loadPage : (page: number) => Promise<void>,
}


export interface ModalDialogProps {
    title: string, 
    body: JSX.Element,
	actionButtons: JSX.Element, 
    progress?: JSX.Element
}