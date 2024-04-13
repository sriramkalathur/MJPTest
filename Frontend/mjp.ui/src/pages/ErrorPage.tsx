import React from "react";
import { MJPConfig } from "../MJPConfig";


export class ErrorPage  extends React.Component {

    
    renderTitle() {
        return (<div className="py-2 titleBar">

            <div className="row">
                <div className="col-1">
                    <i className="fa fa-4x fa-anchor pd10" aria-hidden="true"></i>
                </div>
                <div className="col-8 align-text-bottom">
                <h2> { MJPConfig.AppTitle } </h2>
                <h6> { MJPConfig.AppEnvironment } - { MJPConfig.AppVersion } </h6>
                </div>
            </div>
        </div>);
    } 


    render() {

        return (<div>
            { this.renderTitle() }

            <div className="applicationError">
                <h5>
                <div>
                    Unhandled error when processing the request. 
                </div>
                <div>
                Please contact support team for further queries.
                </div>
                </h5>
            </div>
            </div>);
    
    }
}
