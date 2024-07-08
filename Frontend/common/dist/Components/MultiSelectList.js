"use strict";
/* A Multi select list with check box */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultiSelectList = void 0;
var react_1 = __importDefault(require("react"));
var reactstrap_1 = require("reactstrap");
var PropsModel = /** @class */ (function () {
    function PropsModel() {
        //Whether the extra filter for fiering the items should be included
        this.renderFilter = false;
    }
    return PropsModel;
}());
var StateModel = /** @class */ (function () {
    function StateModel() {
    }
    return StateModel;
}());
var MultiSelectList = /** @class */ (function (_super) {
    __extends(MultiSelectList, _super);
    function MultiSelectList(props) {
        var _this = _super.call(this, props) || this;
        _this.SELECT_ALL_VALUE = -1;
        _this.SELECT_ALL_TEXT = "All";
        /* Indicates whether the options list should be shown */
        _this.state = {
            isExpanded: false
        };
        _this.selectedItems = _this.getSelectedItems(_this.props.selectedItems);
        /* Just bind our method for event handling */
        _this.toggleOptionsList = _this.toggleOptionsList.bind(_this);
        return _this;
    }
    MultiSelectList.prototype.getSelectedItems = function (items) {
        var _this = this;
        var index = items.indexOf(this.SELECT_ALL_VALUE);
        if (index > -1) {
            //select all selected..
            //add all the items
            return (this.props.options.map(function (o) { return o[_this.props.valueField]; }));
        }
        //return the items as it is
        return items;
    };
    MultiSelectList.prototype.toggleOptionsList = function (e) {
        /* Just toggle the state of expanded */
        //(this.state.expanded) ? this.hideOptionsList() : this.showOptionsList();
        //Stop the event from popagating to the lower controls. Otherwise click event will be triggerd for
        //all the other controls */
        this.setState({
            isExpanded: !this.state.isExpanded
        });
        //This will trigger a click event. We don't want to process the clikc
        //So prvent default() click event from happening
        e.preventDefault();
    };
    MultiSelectList.prototype.notifySelectionChanged = function () {
        if (this.props.onSelectionChanged != null) {
            var items = this.selectedItems;
            if (items.length == this.props.options.length) {
                //All selected..
                //return only -1
                items = [this.SELECT_ALL_VALUE];
            }
            this.props.onSelectionChanged(items);
        }
    };
    MultiSelectList.prototype.setAllSelected = function (selected) {
        var _this = this;
        if (selected) {
            //Select ALL
            this.selectedItems = this.props.options.map(function (o) { return o[_this.props.valueField]; });
        }
        else {
            //No items 
            this.selectedItems = [];
        }
        this.setState({});
        this.notifySelectionChanged();
    };
    MultiSelectList.prototype.handleClickOutside = function (ev) {
        //When we click inside a document, need to close the options
        //But we need to handle the event only when the use clicks ourside
        //When the user click in checkbox, it will trigger this event. So don't handle 
        //when it is not checkbox. All the chekbox related items will have data-ischeckbox="true"
        //So if the elment has data.ischeckbox, don't handle the event
        var handleclick = (ev.target.dataset.handleclick);
        console.log(handleclick);
        //The element has data.ischeckbox. So don't handle that
        if (handleclick)
            return;
        if (this.state.isExpanded
        //this.node.contains(ev.target) == false
        ) {
            this.setState({
                isExpanded: false,
            });
        }
        //Notify the selection
        //this.notifySelectionChanged();
    };
    MultiSelectList.prototype.componentWillUnmount = function () {
        //Just remove the evvent handler
        document.removeEventListener("click", this.handleClickOutside.bind(this));
    };
    MultiSelectList.prototype.componentDidMount = function () {
        //this.setOptions();
        document.addEventListener("click", this.handleClickOutside.bind(this));
    };
    MultiSelectList.prototype.getSelectedOptionsText = function () {
        var _this = this;
        //Concatenate the selected items list
        var selectedText = "";
        if (this.props.options.length == 0) {
            //There is only one item and it is ALL.
            //So return null
            return this.props.noItemsText;
        }
        var isFirst = true;
        var allSelected = (this.selectedItems.length == this.props.options.length);
        if (allSelected) {
            //ALL items are selected
            return this.SELECT_ALL_TEXT;
        }
        this.selectedItems.map(function (value) {
            var item = _this.props.options.find(function (it) { return parseInt(it[_this.props.valueField]) == value; });
            console.log(value);
            if (!isFirst) {
                selectedText += ",";
            }
            isFirst = false;
            selectedText += item[_this.props.displayField];
        });
        return selectedText == "" ? this.props.noItemsText : selectedText;
    };
    MultiSelectList.prototype.handleItemChecked = function (selectedValue, checked) {
        //Find the element
        var index = this.selectedItems.findIndex(function (it) { return it == selectedValue; });
        if (checked) {
            //selected. Add to selected items
            if (index == -1) {
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
    };
    MultiSelectList.prototype.isItemChecked = function (value) {
        if (value == this.SELECT_ALL_VALUE) {
            //SELECT ALL. Check if length of selected items is same as props.lngt
            return (this.props.options.length == this.selectedItems.length);
        }
        else {
            //Find mathing index
            var index = this.selectedItems.indexOf(value);
            return (index > -1);
        }
    };
    MultiSelectList.prototype.renderSelectAllOption = function () {
        var _this = this;
        return (react_1.default.createElement("div", { className: "dropdown-item" },
            react_1.default.createElement("div", { className: "form-check" },
                react_1.default.createElement("input", { key: "multiselect-".concat(-1), value: "*", "data-handleclick": "true", name: "multiselect-".concat(-1), id: "multiselect-".concat(-1), className: "form-check-input", type: "checkbox", onChange: function (ev) {
                        _this.setAllSelected(ev.target.checked);
                        //ev.preventDefault();
                        return true;
                    }, checked: this.isItemChecked(this.SELECT_ALL_VALUE) }),
                react_1.default.createElement("label", { "data-handleclick": "true", className: "form-check-label", style: { userSelect: "none", width: "100%" }, htmlFor: "multiselect-".concat(-1) }, this.SELECT_ALL_TEXT))));
    };
    MultiSelectList.prototype.filteredItems = function () {
        var _this = this;
        //return only the filtered items..
        if (this.filterText == "" || this.filterText == null) {
            //No fitler.ALl items
            return this.props.options;
        }
        else {
            //Filter only the items that has the filter in displat field.
            return this.props.options.filter(function (item) { return item[_this.props.displayField].toLowerCase().includes(_this.filterText.toLowerCase()); });
        }
    };
    MultiSelectList.prototype.renderOptions = function () {
        var _this = this;
        var filteredOptions = this.filteredItems();
        return (react_1.default.createElement("div", { className: "dropdown-menu show multiselect multiselect-options", "data-istxtbox": "true" },
            (this.props.renderFilter && this.renderFilter()),
            this.renderSelectAllOption(),
            filteredOptions.map(function (opt, index) {
                //If the item is found in the list render with isChecdk trie
                var isChecked = _this.isItemChecked(opt[_this.props.valueField]);
                return (react_1.default.createElement("div", { className: "dropdown-item" },
                    react_1.default.createElement("div", { className: "form-check" },
                        react_1.default.createElement("input", { key: "multiselect-".concat(index), value: opt[_this.props.valueField], "data-handleclick": "true", name: "multiselect-".concat(index), id: "multiselect-".concat(index), className: "form-check-input", type: "checkbox", onChange: function (ev) {
                                _this.handleItemChecked(parseInt(ev.target.value), ev.target.checked);
                                //ev.preventDefault();
                                return true;
                            }, checked: isChecked }),
                        react_1.default.createElement("label", { "data-ischeckbox": "true", className: "form-check-label", style: { userSelect: "none", width: "100%" }, htmlFor: "multiselect-".concat(index) }, (_this.props.renderItem) == null ?
                            opt[_this.props.displayField] :
                            _this.props.renderItem(opt)))));
            })));
    };
    MultiSelectList.prototype.renderFilter = function () {
        var _this = this;
        return (react_1.default.createElement("div", { className: "px-2" },
            react_1.default.createElement(reactstrap_1.Input, { type: "text", "data-handleclick": "false", value: this.filterText, onChange: function (e) {
                    _this.filterText = e.target.value;
                    _this.setState({});
                } })));
    };
    MultiSelectList.prototype.render = function () {
        var _this = this;
        return (
        /*Just render a div and add the options */
        react_1.default.createElement(reactstrap_1.FormGroup, null,
            this.props.label && react_1.default.createElement(reactstrap_1.Label, { className: "fieldLabel" }, this.props.label && this.props.label),
            react_1.default.createElement("div", { className: "dropdown" },
                react_1.default.createElement("div", { className: "btn-group" },
                    react_1.default.createElement("button", { type: "button", className: "multiselect dropdown-toggle btn btn-default", "data-handleclick": true, onClick: function (e) { return _this.toggleOptionsList(e); } },
                        react_1.default.createElement("span", { className: "multiselect-selected-text", "data-handleclick": true },
                            this.getSelectedOptionsText(),
                            " "))),
                this.state.isExpanded &&
                    (this.props.options.length > 0) &&
                    this.renderOptions())));
    };
    return MultiSelectList;
}(react_1.default.Component));
exports.MultiSelectList = MultiSelectList;
//# sourceMappingURL=MultiSelectList.js.map