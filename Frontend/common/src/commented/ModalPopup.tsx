
// import * as React from "react";
// import {  Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
// import { Node } from "typescript";


// class PopupAction<T>  {
    
//     result: T;

//     closePopup: boolean
// }

// class Model<T> {

//     /* Function trigger that is reuqired when the popup is either closed/cancelled
//     The result will hold the value returned from the popup
//     This might return NULL if the popup is closed/cancelled
//      */
//     //onClose: ((result: T) => void);

//     isOpen :boolean; 

//     title : string;

//     //The action to be performed when OK is pressed which returns whether to close the Popoup
//     onOkPressed: () => PopupAction<T>;

//     //The action to be performed when Cancel is pressed which returns whether to close the Popoup
//     onCancelPressed: () =>PopupAction<T>;

//     /* The function that will be called when the popup is closed */
//     closePopup: (result: T) => void;
// }

// export class ModalContent<T> extends React.Component<Model<T>> {

//     constructor(props:any: any){
//         super(props);
//     }


//     closePopup(result: PopupAction<T>){
//         //Don't set the state here. Beause the OpenState is maintained outside in
//         //the parent component. Just return the status and that will take care of seetting the state
//          //Popup should be closed.
//          this.props.closePopup && this.props.closePopup(result.result);
//     }

//     render(){

//         /*This will not maintain the state of the Popup Open. It will be left in the paret
//         When Ok/Cancel is called,it will call closePopup() which will trigger an event 
//         back to parent and parent will close that */
//        return( <Modal  isOpen={this.props.isOpen} >
//         <ModalHeader>{ this.props.title}</ModalHeader>
//         <ModalBody>
//             { /* Just render the child component in Body */}
//            { this.props.children }
//         </ModalBody>
//         <ModalFooter>
//           <Button outline color="secondary" onClick={ (e) => 
//             {
//                 //call Ok press and pass the result to close the popup
//                 var result = this.props.onOkPressed(); 
//                 //Just trigger an event to close th popup
//                 this.closePopup(result);
//             }}>Ok</Button>

//           <Button outline color="secondary" onClick={ (e) => 
//             {
//                 //call cancel press and pass the result to close the popup
//                 var result = this.props.onCancelPressed(); 
//                 //Just trigger an event to close th popup
//                 this.closePopup(result);
//             }}>Cancel</Button>
//         </ModalFooter>
//       </Modal>);
//     }
// }