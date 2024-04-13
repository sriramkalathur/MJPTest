//import { Formik, FormikHelpers, FormikProps, FormikValues } from "formik";

import * as React from "react";

import { Alert, Label, ListGroupItem, FormGroup, Row, Spinner, UncontrolledAlert, Pagination, PaginationItem, PaginationLink, Button } from "reactstrap";
import { FilteredResult, Status } from "./CommonModels";
import { IPaginatorProps } from "./Components/CommonComponentModels";

/* A simple spinner control */
// General definition =>  (props: { strucuture of the props })
// export const ProcessingMessage =  (props : { message : string } ) => {
// 	return (<div className="pd5">
// 		<Spinner size="sm" color="primary">
// 			&nbsp;
// 		</Spinner>
// 		<span className="px-2">{ props.message }	</span>
// 	</div>);
// }
  

export const ProcessingMessage = (props: {
	statusMessage: string
}) => {
	return (<div className="py-2">
		<Spinner
			color="primary"
			type="grow" size="sm">&nbsp;
		</Spinner> &nbsp;
		
		<Spinner  
			color="success"
			type="grow" size="sm">&nbsp;
	
		</Spinner>&nbsp;
		<Spinner
			color="warning"
			type="grow" size="sm">&nbsp;
	
		</Spinner>&nbsp;
		<Spinner
			color="danger"
			type="grow" size="sm">&nbsp;
	
		</Spinner>&nbsp;
		
		<span className="px-1">{ props.statusMessage } </span>
		</div>)
}


// <div>
// 	<i className="fa fa-spinner fa-spin fa-2x fa-fw"></i>
// 	{ message }
// </div>);


/* A validation error messsage control which will simply show the validation message */
export const ValidationMessage = (props : { errorMessage: string } ) => {
	return (<div className="invalid-feedback">
		{ /* Get the error. For ex:- if validationFor is "name", then get the props.error.name */}
		{ props.errorMessage && <div> { props.errorMessage} </div>}
	</div>);
};


// export const FieldText = (fieldName: string, nullValue: string, value?: string) => {
// 	return (<div><div className="fieldLabel">{fieldName}</div>
// 		<div>{value == null ? nullValue : value}</div></div>);
// };

/* A generalized function for handling all forms */

/* Properties for rendering a Form */
// export interface formBuilderArgs<T> {
// 	/* The Initial values to be supplied to the form */
// 	initialValues: T;

// 	/* Function that renders form for the given state
// 	This will be automatically called by FomrIk when there is a state change*/
// 	formBuilder: (props: FormikProps<T>) => JSX.Element
// }
 

/* Builds a Input form*/
// export const InputForm = function ({ initialState, formBuilder}: { initialState: any, formBuilder: (props: FormikProps<any>) => JSX.Element})  {
// 	/* Define a form with the props and return that */

// 	return  (<div>
// 		<Formik
// 			initialValues={initialState}
// 			validateOnChange={false}
// 			validateOnBlur={false}
// 			enableReinitialize
// 			/* For now pass onSubmit as NULL, the form submit can be hanlded in the respective
// 			buttons insider formBuilder() */
// 			onSubmit={null}>

// 			{(props) =>
// 				<div>

// 					{ /*Render the childrens */}
// 					{ formBuilder(props)}
// 				</div>
// 			}</Formik></div>);
// }



/* Renders the status of a form */
export const StatusElement = ( props : { status: Status,
	statusMessage: string}) => {


	switch (props.status) {
		case Status.Success: {
			return (<UncontrolledAlert color="success"> { props.statusMessage} </UncontrolledAlert>);

		}

		case Status.Failure: {
			return (<UncontrolledAlert color="danger"> { props.statusMessage} </UncontrolledAlert>);

		}

		case Status.Processing: {
			return (<Alert color="light" className="pd5">
				<Spinner size="sm" color="primary"> </Spinner>
				<span>&nbsp;&nbsp;{( props.statusMessage == null) ? "Processing request" : props.statusMessage}</span>
			</Alert>);
		}

		case Status.Loading: {
			return (<div className="py-2">

					<Spinner color="primary"  size="sm">&nbsp;</Spinner>
					<span className="px-2"> { props.statusMessage } </span>
				</div>);
		}
		case Status.None: {
			return (<div>&nbsp;</div>);

		}
	}
}

/* Builds a Top Bar with title & Save/Cancel Buttons */
export const PageTitleActionBar = (props: {
	okAction: () => Promise<void>,
	cancelAction: () => Promise<void>,
	title: string,
	status: Status,
	statusMessage: string,
	okText?: string,
	cancelText?: string})  => {

	var okText = props.okText;
	var cancelText = props.cancelText;

		
	if(props.cancelText == null || props.cancelText == "") {
		cancelText = "Cancel";
	}
	if(props.okText == null || props.okText == "") {
		okText = "Save";
	}

	return (<div>

		{ /* Load status */}
		<div className="col-6 nogutters">
			<StatusElement status={props.status}
					statusMessage ={ props.statusMessage } />
			
		</div>

		<div className="float-right">
		{ /*  If okText is NULL, don't render OK btn */ }
		{   okText && 
			<Button color="primary" onClick={async (e) => {
				/* Just call the OK Action */
				await props.okAction();
			}}>{ "sfsdfsdffds"}</Button>
		}

		<Button onClick={async (e) => {
			await props.cancelAction();
		}}>{ cancelText }</Button> 

		</div>


		{/* If heading is provided, add that else add a clear right so that if fills in left */}
		{ props.title &&
			<div className="pageHeader">{ props.title}</div>
		}
		<hr />
	</div>);
}



export const ModalContent =  (props: { title: string, 
	children: JSX.Element,
	OkButton: JSX.Element,
	cancelButton: JSX.Element}) => {
	return (
		<div>
			<div className="modal-title"><h6>{ props.title}</h6></div>
			<div className="modal-body">
				{ props.children}
			</div>
			<div className="modal-footer float-right">
				{props.OkButton && props.OkButton}
				{props.cancelButton && props.cancelButton}
			</div>

		</div>
	);
}

/* Renders a Modal dialog with footer & progress 
If progress is NULL progres will not be rendered */
export const ModalDialog = (props: { title: string, 
			children: JSX.Element,
			actionButtons: JSX.Element,
			progress?: JSX.Element}) => {
	
	/* This was used to render modal with header, body & footer */
	return (
		<div>
			<div className="modal-title"><h6>{ props.title}</h6>

			</div>
			<div className="modal-body">
				{ props.children }
			</div>
			{ /* If progress is NULL progres will not be rendered */}

			<div className="modal-footer">

				<div className="col-12">

					{ /* Render the action button first with float-right and render progress below 
					so they appear in the same row with buttons in right*/ }
					<div className="float-right">
						{ props.actionButtons }
					</div>

					<div className="col-6-5">
						{props.progress && props.progress}
					</div>


				</div>

			</div>

		</div>
	);
}




export const Paginator1 = (props : IPaginatorProps<any>) => {

	const FIRST_PAGE = 1;
 
	return (  
		<div className="row">
			<Pagination size="sm">
				<PaginationItem>
					<PaginationLink first 
					disabled={props.result.currentPage == FIRST_PAGE} 
					onClick={(e) => props.loadPage(FIRST_PAGE)} />
				</PaginationItem>

				<PaginationItem>
					<PaginationLink previous 
						disabled={props.result.currentPage == FIRST_PAGE} 
						onClick={(e) => {
		
						props.loadPage(props.result.currentPage - 1);
					}} />
				</PaginationItem>
			
			<div className="pd5">Page { props.result.currentPage} of  { props.result.totalPages} </div>
			
			<PaginationItem>
				<PaginationLink next disabled={ (props.result.currentPage == props.result.totalPages) ||
							(props.result.totalPages <= 0)} 
				onClick={(e) => {
					props.loadPage(props.result.currentPage + 1)
			}
			} />  
			</PaginationItem>
   
			<PaginationItem>
					<PaginationLink last 
					disabled={(props.result.currentPage == props.result.totalPages) ||
						(props.result.totalPages <= 0)} 
					onClick={(e) => props.loadPage(props.result.totalPages)} />
			</PaginationItem>
			</Pagination>
		</div>
	);

}  

export const Paginator = (props : IPaginatorProps<any>) => {

	const FIRST_PAGE = 1;
 
	return (   
	
			<Pagination size="sm">
				<PaginationItem>
					<PaginationLink first aria-label="&nbsp;"
					disabled={props.result.currentPage == FIRST_PAGE}       
					onClick={(e) => props.loadPage(FIRST_PAGE)} />
				</PaginationItem>

				<PaginationItem>
					<PaginationLink previous  aria-label="&nbsp;"
						disabled={props.result.currentPage == FIRST_PAGE} 
						onClick={(e) => {
		  
						props.loadPage(props.result.currentPage - 1);    
					}} /> 
				</PaginationItem> 
			
			<div className="py-2 px-2 small">Page { props.result.currentPage} of  { props.result.totalPages} </div>
			
			<PaginationItem>
				<PaginationLink next aria-label="&nbsp;"
				disabled={ (props.result.currentPage == props.result.totalPages) ||
							(props.result.totalPages <= 0)} 
				onClick={(e) => {
					props.loadPage(props.result.currentPage + 1)
			}
			} />  
			</PaginationItem>
   
			<PaginationItem>
					<PaginationLink last  aria-label="&nbsp;"
					disabled={(props.result.currentPage == props.result.totalPages) ||
						(props.result.totalPages <= 0)} 
					onClick={(e) => props.loadPage(props.result.totalPages)} />
			</PaginationItem>
			</Pagination>
		
	);

}  

// export const Paginator1 = (props : IPaginatorProps<any>) => {

// 	const FIRST_PAGE = 1;
 
// 	return (  
// 		<div className="row">
// 			<i className="pd5 fa fa-angle-double-left iconButton" onClick={(e) => props.loadPage(FIRST_PAGE)} />
// 			&nbsp;<i className="pd5 fa fa-angle-left iconButton" onClick={(e) => {
// 				if (props.result.currentPage == 1) {
// 					//This is first Page. So no previous page
// 					return;
// 				}
// 				props.loadPage(props.result.currentPage - 1)
// 			}
// 			} />

// 			<div className="pd5">Page { props.result.currentPage} of  { props.result.totalPages} </div>
// 			<i className="pd5 fa fa-angle-right iconButton" onClick={(e) => {
// 				if ( props.result.currentPage == props.result.totalPages) {
// 					//This is last Page. So no next page
// 					return;
// 				}
// 				props.loadPage(props.result.currentPage + 1)
// 			}
// 			} />
// 			&nbsp;<i className="pd5 fa fa-angle-double-right iconButton" onClick={(e) => props.loadPage(props.result.totalPages)} />
// 		</div>
// 	);

// }

export const FieldLabel = (props : { label: string, children: React.ReactNode}) => {
	return (<FormGroup>
		<Label className="fieldLabel">{ props.label }</Label> <br />
		<div className="label">{ props.children}</div>
	</FormGroup>);
}


