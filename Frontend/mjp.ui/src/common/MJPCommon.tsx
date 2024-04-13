import { Button } from "@mui/material";
import React from "react";

import { FiCheck } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import { Badge, Col, Row, Spinner } from "reactstrap";
import { JobPositionInformation } from "../models/JobPositions";
import { MJPConstants } from "../MJPConstants";
import { CircularProgress } from "@mui/material";
import { StatusElement } from "common";
import { Status } from "common";

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
                <Button size="small" color="primary" variant="contained" 
                    startIcon={<FiCheck />}
                    onClick={async (e) => {
                        /* Just call the OK Action */
                        await props.okAction();
                }}>{ okText }</Button>
            }  

            <Button size="small" color="primary" className="mx-2" variant="contained"  
                startIcon={ <AiOutlineClose /> }
                onClick={async (e) => {
                    await props.cancelAction();
            }}>{ cancelText }</Button>  
           </div> 
	

		{ /* If heading is provided, add that else add a clear right so that if fills in left */ }
		{ props.title &&
			<h5 className="py-2">{ props.title}</h5>
		}
		<hr /> 

    </div>);
}





// export const JobPositionStatus = ( props : {
// 	statusId: number
// }) => {
// 	let color: string;
// 	let status: string;

// 	switch (props.statusId) {
// 		case MJPConstants.JOB_STATUS_OPEN: {
// 			 color = "success";
// 			 status = "Open";
// 			 break;
// 		}
// 		case MJPConstants.JOB_STATUS_CANCELLED: {
// 			color = "danger";
// 			status = "Cancelled"; 
// 			break;
// 	   }
// 	   case MJPConstants.JOB_STATUS_CLOSED: {
// 			color = "secondary";
// 			status = "Closed";
// 			break; 
//    		}
// 	}

// 	return (<span className={"outline " + color}><b>{ status} </b></span>);
// }

// export const JobApplicationStatus = ( props : {
// 		applicationStatusId: number
// 	}) => {
// 	if(props.applicationStatusId == null){
// 		//Not applied..
// 		return <span></span>;
// 	}
// 	else {
// 		//Return based on status
// 		let color: string;
// 		let status: string;

// 		//let position = props.position;

// 		switch(props.applicationStatusId){
// 			case MJPConstants.APPLICATION_STATUS_APPLIED: {
// 				color = "info"; 
// 				status = "Applied";
// 				break;
// 			}
			
// 			case MJPConstants.APPLICATION_STATUS_CANCELLED:{
// 				color = "danger"; 
// 				status = "Cancelled";
// 				break;
// 			}
// 			case MJPConstants.APPLICATION_STATUS_CLOSED: {
// 				color = "danger"; 
// 				status = "Closed";
// 				break;
// 			}
// 			case MJPConstants.APPLICATION_STATUS_INTERVIEW_SCHEDULED: 
// 			case MJPConstants.APPLICATION_STATUS_INTERVIEW_SCHEDULED:{
// 				color = "primary"; 
// 				status = "In Progress";
// 				break;
// 			}
// 			case MJPConstants.APPLICATION_STATUS_REFER_BACK_TO_APPLICANT:
// 			case MJPConstants.APPLICATION_STATUS_REFER_BACK_TO_COMPANY:
// 			case MJPConstants.APPLICATION_STATUS_REFER_BACK_TO_STAFF:
// 			{
// 				color = "secondary"; 
// 				status = "Refer back";
// 				break;
// 			}
// 			default: {
// 				/* Other status */
// 				/* Based on interview status */

// 				color = "secondary";
// 				status = "In Progress";
// 				break;
// 			}
// 		}
// 		return (<Badge color={color} pill>
// 			{ status }
// 		</Badge>);
// 	}
// }


export const PageLoader = ((props : {
	loadingMessage: string
}) => {
	
	return (<Row className="px-2 py-5">
		<Col>
		<span className="px-3">
		<CircularProgress/> 
		</span>
		<span className="py-1">
		<h6>{ props.loadingMessage }</h6> 
		</span>
		</Col>
	
	</Row>);    
});
