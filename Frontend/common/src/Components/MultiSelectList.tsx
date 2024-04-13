/* A Multi select list with check box */


import React, { ReactNode } from "react";
import { isThisTypeNode } from "typescript";
import { ListItem } from "../CommonModels";
import { Form, FormGroup, Input, Label, List } from "reactstrap";
import { TextBox } from "./TextBox";


class PropsModel {
    options: Array<any>;

    selectedItems: Array<number>;

    onSelectionChanged: (items: Array<number>) => void;

    noItemsText: string;

    label?: string;
    
    valueField: string;

    renderItem?: (item: any) => ReactNode;

    displayField: string;

    //Whether the extra filter for fiering the items should be included
    renderFilter?: boolean = false;
}



class StateModel {
    /* IS dropdown menu expanded */
    isExpanded: boolean;
}

export class MultiSelectList extends React.Component<PropsModel, StateModel> {
    
    
    selectedItems: Array<number>;

    SELECT_ALL_VALUE = -1;
    SELECT_ALL_TEXT = "All"

    private filterText: string;

    constructor(props: any) {
        super(props);

        /* Indicates whether the options list should be shown */
        this.state = {
            isExpanded: false
        };

        this.selectedItems= this.getSelectedItems(this.props.selectedItems);
       /* Just bind our method for event handling */
        this.toggleOptionsList = this.toggleOptionsList.bind(this);
    }
 
  
    getSelectedItems(items: number[]){
        var index = items.indexOf(this.SELECT_ALL_VALUE);
        if(index > -1){
            //select all selected..
            //add all the items
            return (this.props.options.map(o => o[this.props.valueField]));
        }
        //return the items as it is
        return items;
    }

    toggleOptionsList(e: any) {
        /* Just toggle the state of expanded */
        //(this.state.expanded) ? this.hideOptionsList() : this.showOptionsList();
        //Stop the event from popagating to the lower controls. Otherwise click event will be triggerd for
        //all the other controls */

        this.setState({
            isExpanded: !this.state.isExpanded
        })

        //This will trigger a click event. We don't want to process the clikc
        //So prvent default() click event from happening
        e.preventDefault();
    }


    private notifySelectionChanged(){
        if (this.props.onSelectionChanged != null) {

            var items = this.selectedItems;
            if(items.length == this.props.options.length){
                //All selected..
                //return only -1
                items = [ this.SELECT_ALL_VALUE ];
            }
            this.props.onSelectionChanged(items);
        }
    }

    setAllSelected(selected: boolean) {
         if (selected) {
            //Select ALL
            this.selectedItems = this.props.options.map(o => o[this.props.valueField]);            
        }
        else {
            //No items 
            this.selectedItems =[];
        } 
        this.setState({ });
        this.notifySelectionChanged();
    }

    handleClickOutside(ev: any) {

        //When we click inside a document, need to close the options
        //But we need to handle the event only when the use clicks ourside
        //When the user click in checkbox, it will trigger this event. So don't handle 
        //when it is not checkbox. All the chekbox related items will have data-ischeckbox="true"
        //So if the elment has data.ischeckbox, don't handle the event
        var handleclick = (ev.target.dataset.handleclick);
       
        console.log(handleclick);

        //The element has data.ischeckbox. So don't handle that
        if (handleclick) return;

        if (
            this.state.isExpanded
            //this.node.contains(ev.target) == false
        ) {
            this.setState({
                isExpanded: false,
            });
        }

        //Notify the selection
        //this.notifySelectionChanged();
    }

    componentWillUnmount() {
        //Just remove the evvent handler
        document.removeEventListener(
            "click",
            this.handleClickOutside.bind(this)
        );
    }

    componentDidMount() {
        //this.setOptions();
        document.addEventListener("click", this.handleClickOutside.bind(this));

    }




    getSelectedOptionsText() {
        //Concatenate the selected items list
        var selectedText = "";

        if (this.props.options.length == 0) {
            //There is only one item and it is ALL.
            //So return null
            return this.props.noItemsText;
        }

     
        var isFirst = true;
        
        var allSelected = (this.selectedItems.length == this.props.options.length);
        if(allSelected){
            //ALL items are selected
            return this.SELECT_ALL_TEXT;
        }

        this.selectedItems.map((value) => {
           
            var item = this.props.options.find(it => parseInt(it[this.props.valueField]) == value);
           
            console.log(value);
            if (!isFirst) {
                selectedText += ",";
            }


            isFirst = false;
            selectedText += item[this.props.displayField]
        });

        return selectedText == "" ? this.props.noItemsText : selectedText;
    }

    handleItemChecked(selectedValue: number, checked: boolean) {

        //Find the element
        var index = this.selectedItems.findIndex(it => it == selectedValue);
       
        if(checked){
            //selected. Add to selected items
            if(index == -1) {
                //Slected,Add to  selceted value
                this.selectedItems.push(selectedValue);
            }
        }
        else {
            //Remove the element from selectedist
            this.selectedItems.splice(index, 1);   
        }
        this.setState({});
        this.notifySelectionChanged();
    }
 

    isItemChecked(value: number){
        if(value == this.SELECT_ALL_VALUE){
            //SELECT ALL. Check if length of selected items is same as props.lngt
            return (this.props.options.length == this.selectedItems.length);
        }    
        else {
            //Find mathing index
            var index = this.selectedItems.indexOf(value);
            return (index > -1);
        }
    }

    renderSelectAllOption(){
        return (
            <div className="dropdown-item">
                <div className="form-check">
                    <input key={`multiselect-${-1}`}
                        value="*" data-handleclick="true"
                        name={`multiselect-${-1}`}
                        id={`multiselect-${-1}`}
                        className="form-check-input"
                        type="checkbox"

                        onChange={(ev) => {
                            this.setAllSelected(ev.target.checked);
                            //ev.preventDefault();
                            return true;
                        }}

                        checked={ this.isItemChecked(this.SELECT_ALL_VALUE) }                  
                    />
                    <label data-handleclick="true"
                        className="form-check-label"
                        style={{ userSelect: "none", width: "100%" }}
                        htmlFor={`multiselect-${-1}`}>
                         { this.SELECT_ALL_TEXT }
                    </label>
                </div>
            </div>);
    }

    filteredItems() {
        //return only the filtered items..
        if(this.filterText == "" || this.filterText == null){
            //No fitler.ALl items
            return this.props.options;
        }
        else {
            //Filter only the items that has the filter in displat field.
             return this.props.options.filter(item => (item[this.props.displayField] as string).toLowerCase().includes(this.filterText.toLowerCase()));
        }
    }
    

    renderOptions() {
        
        var filteredOptions = this.filteredItems();
        return (<div className="dropdown-menu show multiselect multiselect-options"  
                data-istxtbox="true">
          
            { /* Render ALL only when it is required and atlest there in one option */}
            { (this.props.renderFilter && this.renderFilter()) }
            { this.renderSelectAllOption() }
            {filteredOptions.map((opt, index) => {

                //If the item is found in the list render with isChecdk trie
                var isChecked = this.isItemChecked(opt[this.props.valueField]);
                return (
                    <div className="dropdown-item">
                        <div className="form-check">
                            <input key={`multiselect-${index}`}
                                value={opt[this.props.valueField]} data-handleclick="true"
                                name={`multiselect-${index}`}
                                id={`multiselect-${index}`}
                                className="form-check-input"
                                type="checkbox"

                                onChange={(ev) => {
                                    this.handleItemChecked(parseInt(ev.target.value), ev.target.checked);
                                    //ev.preventDefault();
                                    return true;
                                }}

                                checked={ isChecked }                      
                            />
                            <label data-ischeckbox="true"
                                className="form-check-label"
                                style={{ userSelect: "none", width: "100%" }}
                                htmlFor={`multiselect-${index}`}>
                            
                              { /* if render method is defined, take that else default string */}
                               { (this.props.renderItem) == null ?
                                      opt[this.props.displayField] :
                                     this.props.renderItem(opt) }
                            </label>
                        </div>
                    </div>
                );
            }
            )} 
            </div>);
    }


    renderFilter(){
        return ( 
            <div className="px-2">
            <Input type="text" 
                data-handleclick="false" value={ this.filterText }
            
            onChange={ (e) => {
                this.filterText = e.target.value;
                this.setState({});
            }} />
            </div>
        );
    }

    render() {

     
        return (
            /*Just render a div and add the options */
            <FormGroup>
                {  this.props.label &&  <Label className="fieldLabel">
                        {this.props.label && this.props.label }</Label> }
			
                <div className="dropdown">

                    { /* Rner data-handleclick so that it is not handled by custom click */}
                    <div className="btn-group">
                        <button type="button" className="multiselect dropdown-toggle btn btn-default"
                            data-handleclick={true}
                            onClick={(e) => this.toggleOptionsList(e)}>

                            { /* Render selection options as text */}
                            <span className="multiselect-selected-text"
                                data-handleclick={true}>{this.getSelectedOptionsText()} </span>
                        </button>
                    </div>
                    
                    { this.state.isExpanded &&
                        (this.props.options.length > 0) && 
                        this.renderOptions()
                    }
                </div>
            </FormGroup>
        )
    }
}