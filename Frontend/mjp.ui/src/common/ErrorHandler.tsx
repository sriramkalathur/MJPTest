import React, { ReactNode } from "react";
import {ErrorPage} from "../pages/ErrorPage";

class PropsModel {
    children: ReactNode;
}

class StateModel {
   hasError: false;

   error?: any;
}


export default class ErrorHandler extends React.Component<PropsModel, StateModel> {
    constructor(props: any) {
        super(props);

        // to keep track of when an error occurs
        // and the error itself
        this.state = {
            hasError: false,
            error: null
        };
    }

    // update the component state when an error occurs
    static getDerivedStateFromError(error: any) {
        // specify that the error boundary has caught an error
       
        return {
            hasError: true,
            error: error
        };
    }

    // defines what to do when an error gets caught
    componentDidCatch(error: any, errorInfo: any) {

        // log the error
        console.log("Error caught!");
        console.error(error);
        console.error(errorInfo);

        // record the error in an APM tool...
    }

    render() {
        // if an error occurred
        
        if (this.state.hasError) {
            return <ErrorPage />;
        } else {
            // default behavior
            return this.props.children;
        }
    }
}