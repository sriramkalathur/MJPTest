import { Card, Col, Row } from "reactstrap";

import { RecommendedCompaniesList } from "./Company/RecommendedCompanies";
import { RecommendedPositionsList } from "./JobPosition/RecommendedPositions";
import { UserContext } from "../authentication/UserContext";

import { LoginPage } from "./Account/Login";
import { LoginType } from "../models/AccountModels";

import { AiFillFacebook, AiFillTwitterCircle, AiOutlineFacebook, AiOutlineWhatsApp } from "react-icons/ai";
import { OurServicesPage } from "./OurServices";
import React from "react";

import MMLogo from "../assets/images/MMLogo.jpg";
import { ContactUs } from "./ContactUs";

export class Home extends React.Component {
    constructor(props: any) {
        super(props);
    }


    aboutText1 = "At Mariners Maker, we're all about crafting extraordinary sailing experiences for both seasoned and aspiring sailors!";
    aboutText2 = "🚢 Whether you crave offshore adventures, dream of joining the main fleet, or desire a memorable journey with top-notch cruise lines, we've got you covered.The institution is dedicated to deliver high quality maritime education, training and documentation to prepare it's sailors for a rewarding career in the shipping industry.  It provides best services to upcoming, current and retired Seafarers .";

    renderAbout() {
        return (<div className="px-1">

            <div>

                <div className="py-3">
                    <h4>🌊 Welcome to Mariners Maker ⚓ </h4>

                    <div className="py-2">{this.aboutText1}
                        {this.aboutText2}
                    </div>
                </div>

            </div>
        </div>);
    }


    renderBody() {
        return (<div>
            <div>

                {this.renderAbout()}

            </div></div>);

    }


    renderAboutUs() {
        return (<>
            <h6>🌐 About Us </h6>
            <div> At Mariners Maker, we grasp the unique needs and dreams of seafarers. With
                years of maritime industry expertise, we've forged robust global relationships with sailing
                employers. Our passionate team is dedicated to helping sailors find their dream job or embark on
                thrilling voyages through our cruise line partnerships. </div>

            <div className="py-3">  
                Get Started Today! Ready to set sail on your career journey?
            <a href="/register"> Join Mariners Maker now! </a>
            Gain access to a world of tailored sailing opportunities, whether you're a fresh sailor or an
            experienced mariner seeking a change. Sign up to unlock your potential and sail towards an
            exciting future with Mariners Maker! 🌟
                </div>
        </>);
    }




    render() {
            return (<>
            <div> 
                <div>
                    {this.renderBody()}
                    {this.renderAboutUs()}

                  
                    <div>
                        {<RecommendedPositionsList />}
                    </div>

                
                    <div>
                        {<RecommendedCompaniesList />}
                    </div>
                </div>

            </div>
        </>
        );
    }
}


