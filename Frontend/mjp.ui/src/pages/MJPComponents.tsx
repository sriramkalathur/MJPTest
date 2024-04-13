import { Rating, Step, StepContent, StepLabel, Stepper } from "@mui/material";
import { MJPConstants } from "../MJPConstants";
import { JobApplicationDetails, JobPositionInformation, StatusHistoryItem } from "../models/JobPositions";
import { CommonUtils, FieldLabel, ProcessingMessage, Status } from "common";
import { Company } from "../models/Company";
import { Badge, Card, Col, Row } from "reactstrap";
import { BiEnvelope, BiPhoneCall } from "react-icons/bi";
import { UserContext } from "../authentication/UserContext";
import { ChoiceList } from "../common/ChoiceList";
import { MJPCommonUtils } from "../common/CommonUtils";
import { LoginType } from "../models/AccountModels";
import { LoginPage } from "./Account/Login";



function getStatusHistory(statusHistory: Array<StatusHistoryItem>, applicationStatusId: number) {

    if (statusHistory == null) {
        statusHistory = [];
    }

    var result = statusHistory.map(s => s);
    return result;
    // switch (applicationStatusId) {
    //     case MJPConstants.APPLICATION_STATUS_APPLIED: 
    //     case MJPConstants.APPLICATION_STATUS_REFER_BACK_TO_STAFF:
    //         {
    //             //If it is applied/Refer back with staff, just push a PENDING with staff item
    //             //All these are pending with staff
    //             result.push(new StatusHistoryItem(MJPConstants.PENDING_STATUS_WITH_STAFF,null, null));
    //             break;
    //         }
    //     case MJPConstants.APPLICATION_STATUS_SENT_TO_COMPANY:
    //     case MJPConstants.APPLICATION_STATUS_INTERVIEW_SCHEDULED:
    //     case MJPConstants.APPLICATION_STATUS_INTERVIEW_RESCHEDULED:
    //     case MJPConstants.APPLICATION_STATUS_REFER_BACK_TO_COMPANY: {
    //         //All these cases are pending with Compnay
    //         result.push(new StatusHistoryItem(MJPConstants.PENDING_STATUS_WITH_COMPANY, null, null));
    //         break;
    //     }
    //     case MJPConstants.APPLICATION_STATUS_REFER_BACK_TO_APPLICANT: {
    //         //All these cases are pending with Compnay
    //         result.push(new StatusHistoryItem(MJPConstants.PENDING_STATUS_WITH_APPLICANT, null, null));
    //         break;
    //     }
    // }

    return result;
}

export const PageTitle = ( props: {
    title: string,
    actionButtons?: React.ReactNode
}) => {
    return  (<div className="py-2">
        <div className="float-right">
            {  props.actionButtons && props.actionButtons
            }
        </div>
        { /* If there is an action button give py-2 else py-3 */}
        <div className="px-1">
        <h5 className={ props.actionButtons ? "py-2": "py-3 "}>{ props.title} </h5>
        </div>
       
        <hr className="clear"/>
        </div>);
} 

export const JobApplicationStatusHistory = (props : {
    statusHistory: Array<StatusHistoryItem>
}) => {
    //If there is a pending status, the status Date will be NULL. So that is the active step
    //if there is no pending status, all the states are completed and the last step will
    //be the active step
    //var index = this.model.statusHistory.findIndex(s => (s.statusDate != null));

    let statusHistory = props.statusHistory;

    var itemCount = statusHistory.length;

    //If the last step status =NULL, it indicates it is pending with someone
    //So the last step is lastStep-2 (previous step to last inde)
    //If last step status != NULL, it is not pending with someone and status is lastindex
    var activeStep = (statusHistory[itemCount - 1].statusDate == null) ?
        itemCount - 2 : itemCount - 1;

    return (
        <Stepper activeStep={activeStep} orientation="vertical">
            {statusHistory.map((status, index) => (
                <Step key={status.statusId} >
                    <StepLabel
                        optional={
                            <span className="py-2"> { status.remarks && status.remarks}</span>
                        }>


                        <span> { MJPCommonUtils.getApplicationStatusDisplayText(status.statusId)} </span><br />

                        { status.statusDate &&
                         <small className="colorgray">{CommonUtils.getDisplayDateTime(status.statusDate)}
                            ,&nbsp;{status.updatedBy} </small>
                        }

                    </StepLabel>
                    <StepContent>
                    </StepContent>
                </Step>
            ))}
        </Stepper>);
   
}


export const CompanyDetails = (props: {
    company: Company
}) => {
        return (<>
        
           <div className="subtitle nogutters"> { props.company.displayName} </div>
        
        {/* <Row>
            <Rating size="small" readOnly={true}
                className="py-2"
                value={props.company.rating} />          
        </Row> */}
        <div>
       
                {props.company.address1} , {props.company.address2}
            <div>
                <span> <BiEnvelope /> 
                <span className="px-1"> { props.company.email } </span>
                 <BiPhoneCall /> <span className="px-1">
                 {props.company.contactNumber} </span>
                 </span>
            </div>

            <div>
                <a href={props.company.url}>{props.company.url}</a>
            </div>
        </div></>);
    }


    function renderJobFields(position: JobPositionInformation) {
       
        return (<><Row>
             
          
            <Col xs="4">
            <FieldLabel label="Category">
                <span>{position.category}</span>
            </FieldLabel>
            </Col>
         
            
            <Col xs="4">
            <FieldLabel label="Vessel Type">
                <span>{position.vesselType}</span>
            </FieldLabel>
            </Col>

            <Col xs="4"> 
                <FieldLabel label="Department">
                    <span>{position.department}</span>
                </FieldLabel>
            </Col> 

            </Row>
           
        <Row> 
            
            <Col xs="4"> 
                <FieldLabel label="Rank">
                    <span>{position.rank}</span>
                </FieldLabel>
            </Col> 

            <Col xs="4">
                <FieldLabel label="Experience">
                    {
                        (position.maxExperience == null) ? <span>{position.minExperience}+ yrs </span>:
                        <span>{position.minExperience} - {position.maxExperience} yrs </span>
                    }
                 
                </FieldLabel>
            </Col> 
         

            <Col xs="4">
                <FieldLabel label="Salary Range">
                    {position.salaryRange ?? "N/A" }
                </FieldLabel>
            </Col> 

      
        </Row>
      
        <Row>
     
            <Col xs="4">
                <FieldLabel label="Posted On">
                    <span>{CommonUtils.getDisplayDateTime(position.postedOn)}</span>
                </FieldLabel>
            </Col>

            <Col xs="4">
                <FieldLabel label="Expiry Date"> 
                    <span>{CommonUtils.getDisplayDateTime(position.expiryDate)}</span>
                </FieldLabel>
            </Col>

            <Col xs="4">
                <FieldLabel label="Position Status">
                    <JobPositionStatus statusId={position.statusId} />
                </FieldLabel>
            </Col>
          
        </Row>
        <Row>
            <Col xs="4">
                <FieldLabel label="Number of positions">
                    <span>{(position.numberOfPositions) == null ? "Not specified" : 
                            position.numberOfPositions}</span>
                </FieldLabel>
            </Col>            
       
            <Col xs="4">
                <FieldLabel label="Last date of Application">
                    <span>{(position.lastDateOfApplication) == null ? "Not specified" :
                        CommonUtils.getDisplayDate(position.lastDateOfApplication)}</span>
                </FieldLabel>
            </Col>
            <Col xs="4">
                <FieldLabel label="Interview Date">
                  { (position.lastDateOfApplication) == null ? "Not specified" :
                    CommonUtils.getDisplayDate(position.interviewDate)}
                </FieldLabel>
            </Col>
        </Row>
        <Row>
            <Col xs="4">
                <FieldLabel label="Interview Location & venue">
                 { position.interviewLocation }
                </FieldLabel>
            </Col>
        </Row>
        </>); 
    }   

    function renderStaffStatus(){

        var options= [
          { "choiceId": MJPConstants.APPLICATION_STATUS_APPLIED , displayText: "Applied", color: "primary"},
          { "choiceId": MJPConstants.APPLICATION_STATUS_SHORTLISTED, displayText: "Shortlisted", color: "teal"},
          { "choiceId": MJPConstants.APPLICATION_STATUS_CANCELLED, displayText: "Rejected", color: "success"},
          { "choiceId": MJPConstants.APPLICATION_STATUS_ONHOLD, displayText: "Selected", color: "green"},
          { "choiceId": MJPConstants.APPLICATION_STATUS_SELECTED, displayText: "Selected", color: "green"}
        ];
        return ( <ChoiceList choices={options} onChoiceChanged={function (itemId: number): void {
           
        } } label="Status" disabled={false} />);
     
    }


export const JobPositionDetails =  (props: {
    position: JobApplicationDetails
}) => {
    return (<div className="py-3">
           
        { renderJobFields(props.position.positionDetails) }
    </div>
    );
}



export const JobPositionStatus = ( props : {
	statusId: number,
}) => {
	let color: string;
	let status: string;

	switch (props.statusId) {
		case MJPConstants.JOB_STATUS_OPEN: {
			color = "success";
			 status = "Open";
			 break;
		}
		case MJPConstants.JOB_STATUS_CANCELLED: {
			color = "danger";
			status = "Cancelled"; 
			break;
	   }
	   case MJPConstants.JOB_STATUS_EXPIRED: {
			color = "secondary";
			status = "Expired";
			break; 
   		}
        case MJPConstants.JOB_STATUS_ONHOLD: {
            color = "warning";
            status = "On HOLD";
            break; 
   		}
	}

	return (<span className={"outline " + color}><b>{ status} </b></span>);
}

export const JobApplicationStatus = ( props : {
		applicationStatusId: number
	}) => {
	if(props.applicationStatusId == null){
		//Not applied..
		return <span></span>;
	}
	else {
		//Return based on status
		let color: string;
		let status: string;

		//let position = props.position;

		switch(props.applicationStatusId){
			case MJPConstants.APPLICATION_STATUS_APPLIED: {
				color = "info"; 
				status = "Applied";
				break;
			}
			case MJPConstants.APPLICATION_STATUS_ONHOLD: {
				color = "warning"; 
				status = "On Hold";
				break;
			}
			
			case MJPConstants.APPLICATION_STATUS_CANCELLED:{
				color = "danger"; 
				status = "Cancelled";
				break;
			}
			
			case MJPConstants.APPLICATION_STATUS_SHORTLISTED:
			{
				color = "secondary"; 
				status = "Shortlisted";
				break;
			}
            case MJPConstants.APPLICATION_STATUS_REJECTED:
			{
				color = "danger"; 
				status = "Rejected";
				break;
			}
            case MJPConstants.APPLICATION_STATUS_SELECTED:
                {
                    color = "success"; 
                    status = "Selected";
                    break;
                }
            case MJPConstants.APPLICATION_STATUS_NOT_SELECTED:
                {
                    color = "warning"; 
                    status = "Not Selected";
                    break;
                }
			default: {
				/* Other status */
				/* Based on interview status */

				color = "secondary";
				status = "In Progress";
				break;
			}
		}
		return (<Badge color={color} pill>
			{ status }
		</Badge>);
	}
}

export const PageProcessingStatus = ( props : {
		status: Status,
        statusMessage: string
	}) => {
        
        switch (props.status) {
            case Status.Processing: {
              return (<div className="px-1 py-3"><ProcessingMessage statusMessage={ props.statusMessage} /></div>);
            }
            case Status.Failure: {
              return (<div className="px-1 py-3 error">{ props.statusMessage} </div>);
            }
            case Status.Success: {
                return (<div className="px-1 py-3 success">{ props.statusMessage} </div>);
              }
          }
}



// export const ApplicantLogin = ()=> {
//     return (<>        
//     <Card>
//         <div className="titleBar teal pd10">
//         <div className="float-right"> 
//         <a href="/register"><b className="colorwhite" >REGISTER</b></a>
//     </div>
    
//     </div>
//     <hr />
//         <LoginPage loginType={LoginType.Applicant} />
//         </Card>  
//     </>);
// }

// export const ExternalLogin = ( props: {
//     loginType: LoginType
// })=> {
//     return (<div className="center-wd300">
//             <div>
//             {<div className="border rounded titleBar  pd10">
//                 <div> 
//                 <div className="float-right">
//                   {  (props.loginType  == LoginType.Staff) ? "Staff" : "Company User" } 
//                 </div>
//                 <div className="align-text-bottom"> <h5> {process.env.REACT_APP_TITLE} </h5>
//                     <b> { process.env.REACT_APP_ENV } - { process.env.REACT_APP_VERSION } </b>
//                 </div>
               
//                 </div>
              
//             </div>}    
//           </div>

//           <div className="py-4">
//           <LoginPage loginType={props.loginType} />
//           </div>
//     </div>)
// }