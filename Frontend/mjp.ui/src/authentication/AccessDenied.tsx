import React from "react";
import { Row } from "reactstrap";

export const AccessDenied = function() {

    return (<div>
         {/* <Row className="border rounded titleBar">
            <div className="align-text-bottom"> <h5>Course Management System</h5> <h6>V 1.0</h6></div>
        </Row> */}

        <Row>
        <h4 className="pdTop20 error">
            <span className="fa fa-ban pd10"></span>
            Access Denied!!!</h4>
        </Row>
    </div>);
}

