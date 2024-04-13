export {}
// import { Col, Row, TabContent } from "reactstrap";
// import { About, ContactUs } from "./About";
// import { RecommendedCompaniesList } from "./Company/RecommendedCompanies";
// import { RecommendedPositionsList } from "./JobPosition/RecommendedPositions";
// import { UserContext } from "../authentication/UserContext";
// import React from "react";

// export class HomeNew extends React.Component {

//     constructor(props: any){
//         super(props);
//     }


//     renderAboutUs(){
//         return (<>
//         <h6>About Mariners Mentors</h6>
//         <hr />
//         SEA LINE GROUP WAS FOUNDED BY MR. RONI ABRAHAM, A MARINE ENGINEER WAY BACK IN MARCH 2004. THE COMPANY’S FIRST VENTURE WAS A SHIPPING JOB PORTAL – WWW.SEAJOB.NET WHICH WAS INTRODUCED IN JUNE 2004 AND TODAY IT ENJOYS THE NO.1 POSITION IN SHIPPING. OVER THE YEARS, THE WEBSITE HAS TRANSPIRED WITH THE HIGHEST NUMBER OF MARINE OFFICERS REGISTERED WITH THE PORTAL TO SEIZE THE BEST EMPLOYMENT OPPORTUNITIES WITH THE MOST ESTEEMED SHIPPING/MANNING COMPANIES OF INDIA.
//         </>)
//     }


//     renderContactUs(){
//         return (<>
//         <h6>About Mariners Mentors</h6>
//         <hr />
//         SEA LINE GROUP WAS FOUNDED BY MR. RONI ABRAHAM, A MARINE ENGINEER WAY BACK IN MARCH 2004. THE COMPANY’S FIRST VENTURE WAS A SHIPPING JOB PORTAL – WWW.SEAJOB.NET WHICH WAS INTRODUCED IN JUNE 2004 AND TODAY IT ENJOYS THE NO.1 POSITION IN SHIPPING. OVER THE YEARS, THE WEBSITE HAS TRANSPIRED WITH THE HIGHEST NUMBER OF MARINE OFFICERS REGISTERED WITH THE PORTAL TO SEIZE THE BEST EMPLOYMENT OPPORTUNITIES WITH THE MOST ESTEEMED SHIPPING/MANNING COMPANIES OF INDIA.
//         </>)
//     }

//     renderCurrentTab() {
//         return (<TabContent activeTab={this.state.tabIndex}>
//             <TabPane tabId={this.TAB_INDEX_DETAILS}>
//                 {this.renderJobDetails()}
//             </TabPane>
//             <TabPane tabId={this.TAB_INDEX_DOCUMENTS}>
//                 {this.renderDocuments()}
//             </TabPane>
//             <TabPane tabId={this.TAB_INDEX_FEATURES}>
//                 <Row>
//                     <Col xs="6"> 
//                     {this.renderRequirementsAndFeatures()}
//                     </Col>
//                     <Col xs="6">
//                         { this.renderDocuments() }
//                     </Col>
//                 </Row>
              
//             </TabPane>
//         </TabContent>);
//     }


//     renderTabs() {
//         return (<div>
//             <Nav tabs>
//                 <NavItem>
//                     <NavLink
//                         className={(this.state.tabIndex == this.TAB_INDEX_DETAILS) ? "active" : ""}
//                         onClick={(e) => this.setState({ tabIndex: this.TAB_INDEX_DETAILS })}>
//                         Job Details
//                     </NavLink>
//                 </NavItem>
//                 <NavItem>
//                     <NavLink
//                         className={(this.state.tabIndex == this.TAB_INDEX_FEATURES) ? "active" : ""}
//                         onClick={(e) => this.setState({ tabIndex: this.TAB_INDEX_FEATURES })}>
//                         Requirements & Benefits
//                     </NavLink>
//                 </NavItem> 
//                 <NavItem>
//                     <NavLink
//                         className={(this.state.tabIndex == this.TAB_INDEX_DOCUMENTS) ? "active" : ""}
//                         onClick={(e) => this.setState({ tabIndex: this.TAB_INDEX_DOCUMENTS })}>
//                         Documents
//                     </NavLink>
//                 </NavItem>

//             </Nav>
//         </div>);
//     }

// }