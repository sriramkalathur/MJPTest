 import React from "react";
// import { Button, ButtonGroup, FormGroup, Label } from "reactstrap";

// export class ChoiceItem {

//     choiceId?: number;

//     displayText: string; 

//     color: string; cls
// }

// class PropsModel {

//     choices: Array<ChoiceItem>;

//     onChoiceChanged : (itemId: number) => void;

//     selectedChoiceId?: number;

//     label: string;

//     disabled: boolean;
// }

// class StateModel {

//     selectedChoiceId?: number;
// }   


// export class ChoiceList extends React.Component<PropsModel, StateModel> {

//     constructor(props: any){
//         super(props);

//         this.state = {
//             selectedChoiceId: this.props.selectedChoiceId
//         };
//     }

//     notifyChoiceChanged(value: number){
//         if(this.notifyChoiceChanged){
//             //Raise onChanged event
//             this.props.onChoiceChanged(value);
//         }
//     }

//     renderBody(){
//         return (  <FormGroup> 
//             <Label className="fieldLabel">{ this.props.label }</Label>
//             <div>
//                 <ButtonGroup>
//                 {
//                     (this.props.choices.map(opt => {
//                         console.log(this.state.selectedChoiceId == opt.choiceId);
//                         return <Button size="sm" outline disabled={ this.props.disabled }
//                             active = { this.state.selectedChoiceId == opt.choiceId}
                            
//                             onClick={ (e) => {
//                                 this.setState( { selectedChoiceId : opt.choiceId });
//                                 this.notifyChoiceChanged(opt.choiceId);
//                              }}
//                             color={ opt.color} >{ opt.displayText }</Button>
//                     }))
//                 }
//                 </ButtonGroup>
//             </div> 
//         </FormGroup>);
//     }

//     render(): React.ReactNode {
//         return this.renderBody();
//     }
// }