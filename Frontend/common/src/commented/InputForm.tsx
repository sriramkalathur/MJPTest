
// import * as React from "react";
// import { Field, Formik, FormikHelpers } from "formik";
// import { Status } from "../CommonModels";
// import { loadingSpinner } from "./CommonComponents";
// import { Alert } from "react-bootstrap";

// type PropsModel = {
    
//     /* Submit function */
//     onSubmit: (values: any, helpers: FormikHelpers<any>)=> void,

//     /* Initial values */
//     initialValues : any

//     /* Status */
//     status: Status

//     /* Status Message */
//     statusMessage: string
// };

// export class InputForm extends  React.Component<PropsModel> {

//     constructor(props:any: any){
//         super(props);  
//     }

//     render(){

//     // var showStatus = (this.props.status == Status.Success) || (this.props.status == Status.Failure);
//     // var statusColor = (this.props.status == Status.Success) ? "success" : "danger";

//     // return (<div>
//     //     <Formik
//     //       initialValues={this.props.initialValues}
//     //       validateOnChange={false}
//     //       validateOnBlur={false}
//     //       onSubmit={async (values, helpers) => this.props.onSubmit(values, helpers)
//     //       }>
//     //       {(props) =>
//     //         <div>
//     //           <div className="row">
//     //             {
//     //               //Show spinner only when processing
//     //               (this.props.status == Status.Processing) && loadingSpinner("Processing your request!!")
//     //             }
//     //           </div>
//     //           <div>
//     //             <Alert color={statusColor}
//     //               isOpen={showStatus} toggle={() => {
//     //                 this.setState({
//     //                   status: Status.None
//     //                 });
//     //               }}>
//     //               {this.props.statusMessage}
//     //             </Alert>
//     //           </div>
//     //           { this.props.children && this.props.children }
//     //         </div>
//     //     }</Formik></div>);
// //     }
// // }