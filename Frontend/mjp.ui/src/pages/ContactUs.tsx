
import { BiEnvelope, BiPhoneCall } from "react-icons/bi";
import { MJPConfig } from "../MJPConfig"
import { Card, CardHeader, Col, ListGroupItem, Row } from "reactstrap";
import { AiFillFacebook, AiFillTwitterCircle, AiOutlineWhatsApp } from "react-icons/ai";



export const ContactUs = () => {
    return (<div>
        <h6  className="py-2"> Contact Us </h6>
    
        <div className="py-1"> { "No.54, First floor, Opp. to SBI " } </div>
        <div className=""> {"Beach Road" } </div>
        <div className=""> { "Thoothukudi - 628 001" } </div>
        <div className=""> { "Tamilnadu , India" } </div>
         
         
        <div className="py-1">
            <div>
               <BiEnvelope />
                <a href="">  <span className="px-1"> { "info@marinersmentor.com" } </span></a> 
                </div>
            
                <div className="py-1"> 
               <BiPhoneCall />
                 <span className="px-1"> +91 461 2322019 </span>
                </div>

            </div>

    </div>);
}

