import React from "react";
import { MdAddToHomeScreen } from "react-icons/md";
import { Button, Card, CardHeader, Carousel, CarouselCaption, CarouselControl, CarouselIndicators, CarouselItem, Col, ListGroup, ListGroupItem, Nav, NavItem, NavLink, Row } from "reactstrap";

class PropsModel {

}

class StateModel {

    activeIndex: number;
}

export class OurServicesPage extends React.Component <PropsModel, StateModel> {
    

    CDC_WATCH_SERVICES = [
        "CDC New & Renewal Application",
        "Duplicate CDC Application",
        "Replacement CDC Application",
        "COOKERY Certificate Application (COC)",
        "SID Application/Tracking",
        "Watchkeeping Certificate Guidance",
        "AB COP Certificate Guidance"
    ];

    DC_ENDORSEMENT_SERVICES = [
        "Basic DC Endorsement (NEW)",
        "Basic DC Endorsement (RENEWAL)",
        "Advance DC Endorsement (NEW)",
        "Advance DC Endorsement (RENEWAL)",
        "IGF CODE - Basic/Advance",
        "COC Revalidation - DECK/ENGNE/ETO",
        "GOC Renewal",
        "GMDSS COC Renewal",
    ];

    TAR_BOOK_SERVICES = [
        "TAR Book - GME/ETR/ETO",
        "TAR Book WatchKeeping - DECK/ENGINE",
        "TAR Book COP - DECK/ENGINE",
        "ILO Medical Booking",
        "Yellow Fever Vaccination Booking",
        "Passport Applying",
        "Retired Seafarer Provident Fund",
        "Gratutity / JSU Retired Fund",
    ];


    PRE_SEA_SERVICES = [
        "GP/CCMC/DNS/BSC/B.TECH MARINE/GME/ETO Value Added Courses",
        "Company & Offshore Courses Guidance (MARLINS)",
        "Flag State Documents PANAMA/LIBERIAN/HOUNDURAS/PALAU",
        "Seat Booking Guidance - Electrical Side",
        "II Mate - Oral Preparation",
        "Seafarer Profile Updation",
        "UNIFORM/BOILER SUIT/EPAULETTES",
        "SIM4CREW - RECHARGE",
        "GENERAL ENQUIRY"
    ];


    serviceNames = [
        "CDC & Watch Keeping",
        "DC Endorsement Oil/Chemical/Gas",
        "Tar Book & Passport",
        "Pre-Sea Courses"
    ];

    MAX_TABS = 5;

    constructor(props: any) {
        super(props);

        this.state = {
            activeIndex:0 
        }
    }


  
    getServices(tabIndex: number) {
        switch(tabIndex){
            case 0: return this.CDC_WATCH_SERVICES; 
            case 1: return this.DC_ENDORSEMENT_SERVICES; 
            case 2: return this.TAR_BOOK_SERVICES; 
            case 3: return this.PRE_SEA_SERVICES; 
        }
    }


   

    renderSlide(index: number) {

        var services = this.getServices(index);
        // return (<>
        //     <Card color="lightblue">
        //      <CardHeader>
        //         TTTT
        //      </CardHeader>
        //     {services.map(item => <ListGroupItem>{item}</ListGroupItem>)
        //     }
        // </Card></>);

        return (<div className="px-2">
        <div className="subtitle  aligncenter teal py-3"><b> { this.serviceNames[index].toUpperCase()}</b></div>
        <ListGroup color="teal">
             { services.map(item => 
            (
            <Button color="teal" size="sm" outline className="py-2">{item}</Button>
            ))
            }
      
        </ListGroup> 
        </div>); 
    }

   

    renderBody(){
        return (<>
            <Row>
                <Col xs="3">
                    { this.renderSlide(0)}
                </Col>
                <Col xs="3">
                    { this.renderSlide(1)}
                </Col>
                <Col xs="3">
                    { this.renderSlide(2)}
                </Col>
                <Col xs="3">
                    { this.renderSlide(3)}
                </Col>
            </Row>
        </>)
    }


    renderServices() {
        return (<>
            <h5>🛠️ Our Services </h5>
            <div>
                <ul>
                    <br />
                    <li><div> <b> Offshore Job Opportunities </b></div>
                    
                    Navigate the seas of offshore employment effortlessly!
                        We connect sailors with a broad spectrum of offshore jobs in the maritime industry, from
                        oil rigs to supply vessels.</li>
                    <br />
                    <li> <div> <b>Shore Job Opportunities </b></div> Prefer keeping land in sight? Explore diverse shore job
                        options, from port operations to marine surveying. Unlock new onshore career paths with
                        Mariners Makers.</li>
                        <br />
                    <li>
                     
                    <div> <b>Join the Main Fleet</b></div>
                         Set sail with renowned shipping companies! Whether it's container
                        ships or passenger vessels, we open doors to a plethora of main fleet job opportunities.
                    </li>
                    <br />
                    <li>
                    <div> <b>Cruise Line Partnerships</b></div>
                        Embark on a mesmerizing journey with our esteemed cruise
                        line partnerships! Whether you fancy being a deckhand or onboard entertainer, we'll help
                        you find the perfect role for creating lasting memories at sea.
                    </li>
                </ul>

            </div> </>)
    }


    render(){
        return (<div className="py-2">
             
             <hr />
             { this.renderServices() }
        </div>);
    }
}