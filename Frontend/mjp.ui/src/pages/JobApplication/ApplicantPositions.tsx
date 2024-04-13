import { Badge, Card, CardText, Col, Row } from "reactstrap";
import { ApplicantJobPosition } from "../../models/JobPositions";
import { JobApplicationStatus, JobPositionStatus } from "../MJPComponents";
import { CommonUtils } from "common";
import { Avatar, Rating } from "@mui/material";
import { MJPRouteUtils } from "../../common/MJPRouteUtils";

import { deepPurple, green } from "@mui/material/colors";
import { AiFillBook, AiFillExperiment, AiOutlineAim, AiOutlineApi, AiOutlineBank } from "react-icons/ai";
import { Divider } from "@mui/material";
import { PopupContextProps } from "./JobApplicationContext";

// export const ApplicantPositionView1 = (props: {
//     position: ApplicantJobPosition
// }) => {
//     return (<div className="mt-1">

//         <div className="pd10">

//             <Row>
//                 {/* <Col xs="1"> 
                        
//                        { //If there is bno LOGO, just show the avatart 
//                        (props.position.companyLogo == "") ?  
//                         <Avatar sx= {{ bgcolor: green[400] }} >{ props.position.companyName.charAt(0)} </Avatar>:
//                         <img width={50} height={50} src={props.position.companyLogo} />  
//                         }
//                     </Col> */}


//                 {/* <Col xs="1">
//                     <b><a href="">
//                         {props.position.jobCode}</a></b>
//                     <div className="py-2">
//                         <JobPositionStatus statusId={props.position.statusId} />
//                     </div>
//                 </Col> */}
                
//                 <Col xs="6">
//                     <div className="title">
//                         <span className="py-2">{props.position.positionTitle} </span></div>

//                     <Rating size="small" readOnly={true}     
//                         className="py-1"
//                         value={props.position.companyRating} />
                 
//                     <CardText className="py-1">
//                         {props.position.jdSummary}
//                     </CardText>
//                 </Col>


//                 <Col xs="3">
//                     <div className="py-1">
//                         <span>{props.position.rank}</span>
//                         <div className="py-1">
//                             <small className="text-muted">
//                                 {(props.position.applicationStatusId == null) ?
//                                     "Posted on " + CommonUtils.getDisplayDateTime(props.position.postedOn) :
//                                     "Applied on " + CommonUtils.getDisplayDateTime(props.position.appliedDate)
//                                 }
//                             </small>

//                         </div>
//                         <div>
//                             <small className="text-muted">
//                                 {"Expires on " + CommonUtils.getDisplayDate(props.position.expiryDate)
//                                 }

//                             </small>

//                         </div>
//                     </div>

//                 </Col>

//                 <Col xs="1">
//                   <span className="px-1">
//                         {(props.position.jobApplicationId) &&
//                             <JobApplicationStatus applicationStatusId={props.position.applicationStatusId} />
//                         } </span>
//                 </Col>

//             </Row>

//             <hr />

//         </div></div>);
// }

export const ApplicantPositionView = (props: {
    position: ApplicantJobPosition
}) => {
    return (<Card className="minimum">

        <div className="pd10">
           
            <div>
                <div className="float-left">
                <div>
                    <span className="title py-2">{props.position.positionTitle} </span>
                </div>  
            
                <div className="py-1"> 
                    <Rating size="small" readOnly={true}       
                            className="py-1"
                            value={props.position.companyRating} />
                    
                </div>
                </div>
               
                <span className="px-3">
                {(props.position.jobApplicationId) &&
                    <JobApplicationStatus applicationStatusId={props.position.applicationStatusId} />
               
                } 
                
                </span>
            </div>  
               
            <div className="clear">
            <span className="pr-3">{ props.position.department} - { props.position.rank} </span> 
                <span className="px-3 onlyLeftBorder">{ props.position.minExperience } - { props.position.maxExperience} yrs</span>
                <span className="px-3 onlyLeftBorder">{ (props.position.salaryRange  == "") ? "Salary not disclosed": props.position.salaryRange } </span>
                { (props.position.isRecommended) &&
                    <span className="outline success px-2">
                    Reommended
                    </span>
                }
                </div>
            <div className="py-2">
            {props.position.jdSummary}
            </div> 
           
            <div className="py-1">
            <small className="text-muted">
                <span className="pr-4">Posted on { CommonUtils.getDisplayDate(props.position.postedOn) } </span>
                { (props.position.applicationStatusId) &&
                 <span className="px-4">Applied on { CommonUtils.getDisplayDate(props.position.appliedDate)} </span> 
                } 
                <span  className="px-4"> Expires on { CommonUtils.getDisplayDate(props.position.expiryDate) }
                </span>
            </small>
            
           
            </div>
        </div></Card>);
}
