 import React from "react";
 import { NavLink } from "react-router-dom";
 import MMLogo from "./assets/images/MMLogo.jpg";
import { MJPUserRoles, UserContext } from "./authentication/UserContext";
import { Button, Dropdown, DropdownToggle, Nav, NavItem, Navbar, NavbarBrand, Row } from "reactstrap";
import { BiAward, BiBookAdd, BiDotsVerticalRounded, BiExclude, BiGridAlt, BiHome, BiPaperclip, BiPlus, BiReceipt, BiRepost, BiUserCircle } from "react-icons/bi";
import { AiFillAccountBook, AiFillCaretRight, AiFillProfile, AiFillSignal, AiOutlineAccountBook, AiOutlineLogin, AiOutlineProfile, AiOutlineRead, AiOutlineSearch, AiOutlineSlack, AiOutlineUser } from "react-icons/ai";
import { MdRestartAlt, MdOutlineSearch, MdOutlineRecommend, MdOutlinePassword } from "react-icons/md";

import { FiAtSign,  FiCheck, FiLogIn, FiSettings } from "react-icons/fi";
import { FaBook, FaHome, FaPaperclip, FaRegistered, FaShip, FaShower, FaSign, FaUser, FaUserEdit } from "react-icons/fa";
import { Si1Password, SiLastpass } from "react-icons/si";
import { IoIosAdd } from "react-icons/io";
import { MJPConfig } from "./MJPConfig";


 class PropsModel {

    children: React.ReactNode;
 }
    

 class StateModel { 

 }

 export class MJPLayout extends React.Component<PropsModel, StateModel> {


    renderGuestMenus(){
        return (<div className="py-2 navmenubar">
           
                <div className="float-right">

                <Nav>
                <NavLink  to="/login" className="px-3 navlink"><AiOutlineLogin /><span className="px-2">Login</span></NavLink>
               
                <NavLink  to="/register" className="px-3 navlink"><AiOutlineUser /><span className="px-2">Register</span></NavLink>
                </Nav>
                  
                </div>
                <div>
                <Nav>
                <NavLink  to="/home" className="px-3 navlink"><FaHome /><span className="px-2">Home</span></NavLink>
         
                <NavLink to="searchpositions" className="px-3 navlink"> <MdOutlineSearch/> 
                        <span className="px-2">Find Jobs</span></NavLink>
                
                <NavLink  to="/services" className="px-3 navlink"><span className="px-2">Services</span></NavLink>
         
                <NavLink  to="/contact" className="px-3 navlink"><span className="px-2">Contact Us</span></NavLink>
                
                </Nav>
                </div>
            </div>);
    }

    renderApplicantMenus() {
        return (<div className="py-2 navmenubar">
        <Nav>
        <NavLink  to="/home" className="px-3 navlink"><FaHome /><span className="px-2">Home</span></NavLink>

        <NavLink to="/searchpositions" className="px-3 navlink"><AiOutlineSearch /><span className="px-2"> Find Jobs</span>
        </NavLink>
        <NavLink  to="/services" className="px-3 navlink"><span className="px-2">Services</span></NavLink>
         
        <NavLink  to="/myapplications" className="px-3 navlink"><span className="px-2">My Applications</span></NavLink>
           
            <div className="menu">
            <NavItem className="px-3 navlink"><span className="px-2">My Settings</span>
            </NavItem>
                <div className="menu-content">
                    <NavLink to="/myprofile"> <FaBook  color="teal" /> 
                        <span className="px-2">View Profile</span></NavLink>
                    <NavLink to="/editmyprofile"> <FaUserEdit  color="teal" /> 
                        <span className="px-2">Edit Profile</span></NavLink>
                     <NavLink to="/changepassword"> <MdOutlinePassword  color="teal" /> 
                        <span className="px-2">Change Password</span></NavLink>
                </div>   
            </div>
           
           </Nav>
      
        </div>);
    } 

    renderCompanyUserMenus() {
        return (<div className="py-2 navmenubar">
            <Nav>
                
                <NavLink to="home" className="px-3 navlink"><BiHome /><span className="px-2">Home</span>
                </NavLink>

                <NavLink  to="/services" className="px-3 navlink"><span className="px-2">Services</span></NavLink>
         
         
                <NavLink to="jobpositions" className="px-3 navlink"> 
                    <BiExclude /> <span className="px-2">Job Positions</span></NavLink>

                <NavLink to="JobApplications" className="px-3 navlink"><BiRepost /><span className="px-2">Applications</span>
                </NavLink>

                <NavLink to="newposition"  className="px-3 navlink"> 
                   <span className="px-2">Post New Job</span></NavLink>

                </Nav></div>);
    } 

    renderStaffMenus() {
        return (<div className="py-2 navmenubar">
        <Nav>
            <NavLink  to="/home" className="px-3 navlink"><FaHome /><span className="px-2">Home</span></NavLink>

            <div className="menu">
                <NavItem className="px-3 navlink"><BiAward /><span className="px-2">Job Positions</span>
                </NavItem>
                <div className="menu-content">
                    <NavLink to="searchpositions"> <MdOutlineSearch color="teal" /> 
                        <span className="px-2">Find  jobs</span></NavLink>
                        <NavLink to="jobpositions"> 
                    <BiExclude color="teal" /> <span className="px-2">Job Positions</span></NavLink>
             
                    <NavLink to="newposition"> 
                    <BiPlus color="teal"/> <span className="px-2">New Job Position</span></NavLink>
                </div>               
            </div>  
         
            
            <div className="menu">
                <NavItem className="px-3 navlink"><span className="px-2">Application</span>
                </NavItem>
                <div className="menu-content"> 
                    <NavLink to="applicants"> 
                      <AiOutlineProfile color="teal" />  <span className="px-2">Applicants</span></NavLink>
                  
              
                    <NavLink to="applications"> 
                      <AiOutlineAccountBook color="teal" />  <span className="px-2">Job Applications</span></NavLink>
               
                </div>               
            </div> 

            <div className="menu">
                <NavItem className="px-3 navlink"><span className="px-2">Company</span>
                </NavItem>
                <div className="menu-content"> 
                    <NavLink to="companies"> 
                      <AiOutlineProfile color="teal" />  <span className="px-2">Companies</span></NavLink>
               
                    <NavLink to="newcompany"> 
                    <BiPlus color="teal"/>   <span className="px-2">New Company</span></NavLink>
                  
                </div>               
            </div> 

            <div className="menu">
                <NavItem className="px-3 navlink"><span className="px-2">Reports</span>
                </NavItem>
                <div className="menu-content">
                    <NavLink to="applicationsreport"> 
                      <AiOutlineSlack color="teal" />  <span className="px-2">Applications Report</span></NavLink>
                  
                </div>               
            </div> 
        </Nav>
      
        </div>);
    } 

   
   
    getUserDisplayRole(){
        switch(UserContext.loggedInUser.role){
            case MJPUserRoles.Staff: return "Staff";
            case MJPUserRoles.Admin: return "Admin";
            case MJPUserRoles.Applicant: return "Applicant";

        }
    }

    renderLoginButton(){
        return <></>
        // return (<div className="float-right px-2 py-2">
        //    <Button className="btn-white" color="teal" outline
        //            onClick={ (e) => {
        //                 window.location.href ="/login";
        //            }} ><FiLogIn />
        //     <span className="px-2"><b>Login</b></span></Button>
        // </div>);
    }

     renderLoggedInUser(){
        return (UserContext.isUserLoggedIn() ?
                 
                (<div className="float-right">
                    <Row>
                        <span className="px-2"><AiOutlineUser size="24" /></span> 
                        <h6>{UserContext.loggedInUser.firstName}  {UserContext.loggedInUser.lastName}</h6>
                    </Row>
                    <div className="float-right"> 
                        <h6 className="small">{ this.getUserDisplayRole() }</h6>
                    </div>

                    <div className="float-right clear-right">
                        <i className="fa fa-power-off fa-lg px-2 py-1"></i>
                        <a className="link" href="/signout">Log Off</a>

                    </div>
                </div>) : this.renderLoginButton());
                
     }

     renderTitleBar() {
         return (<div className="py-3 titleBar">

             <div className="row nogutters">
                 {/* <div className="col-1">
                     <i className="fa fa-4x fa-anchor pd10" aria-hidden="true"></i>
                 </div> */}

                 <div className="col-1">
                    
                 <img src={MMLogo} className="titleImg" />
                
                 </div>
                 <div className="col-7 align-text-bottom"> 
                     <h2> { MJPConfig.AppTitle } </h2>
                     <h6> { MJPConfig.AppEnvironment } - { MJPConfig.AppVersion } </h6>
                 </div>


                 <div className="col-4">
                     { this.renderLoggedInUser() }

                 </div>
             </div>
         </div>);
     } 


     renderMenus(){
    
 
       if(!UserContext.isUserLoggedIn()){
            //User not logged in.. 
            return this.renderGuestMenus();
       }
       else {
        //Logged In. Render menu based on Applicant/staff
        if(UserContext.isApplicant()){
            //Applicant
            return this.renderApplicantMenus();
        }
        else if(UserContext.isStaffRole()) {
            //Staff
            return this.renderStaffMenus();
        }
        else {

            //Compnay user
            return this.renderCompanyUserMenus();
        }
       }
        
     }

     render() {

         return (<div>
             { this.renderTitleBar() }


             <div className="clear-right topnav col-12">
             {/* { (this.props.user.role == UserRoles.Student) && 
                   this.renderStudentMenus() }

             { (this.props.user.role == UserRoles.Staff || this.props.user.role == UserRoles.Administrator) && 
                   this.renderStaffMenus() } */
             }
                 </div> 
               
            { this.renderMenus() }
          
          
             <div className="pagecontent"> 
             { this.props.children }
             </div>
         </div>);
     }
 }
