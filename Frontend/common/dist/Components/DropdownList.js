"use strict";
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
exports.DropdownList = exports.DROPDOWN_SELECT_VALUE = void 0;
var reactstrap_1 = require("reactstrap");
var react_1 = __importDefault(require("react"));
exports.DROPDOWN_SELECT_VALUE = null;
var DropdownList = /** @class */ (function (_super) {
    __extends(DropdownList, _super);
    function DropdownList(props) {
        return _super.call(this, props) || this;
    }
    DropdownList.prototype.render = function () {
        var _this = this;
        //Use "" for NULL
        var defaultValue = (this.props.defaultValue == null) ? "" : this.props.defaultValue;
        var defaultText = (this.props.defaultText == null) ? "--Select--" : this.props.defaultText;
        return (react_1.default.createElement(reactstrap_1.FormGroup, { className: this.props.class },
            this.props.labelText && react_1.default.createElement(reactstrap_1.Label, { className: "fieldLabel" },
                this.props.labelText,
                this.props.labelSuffix && this.props.labelSuffix),
            this.props.isMandatory && react_1.default.createElement("span", { className: "px-1", style: { color: "red" } }, "*"),
            react_1.default.createElement(reactstrap_1.Input, { name: this.props.fieldName, id: this.props.fieldName, type: "select", value: this.props.value, className: "form-control", disabled: this.props.isReadOnly, invalid: this.props.errorMessage != null, onChange: this.props.onChange && this.props.onChange },
                this.props.addDefaultSelect && (react_1.default.createElement("option", { key: "-1", value: defaultValue }, defaultText)),
                (this.props.optionsBuilder) ? (this.props.optionsBuilder(this.props.options)) :
                    (this.props.options && this.props.options.map(function (opt) {
                        return react_1.default.createElement("option", { key: opt[_this.props.valueMember], value: opt[_this.props.valueMember] }, opt[_this.props.displayMember]);
                    })),
                ";"),
            this.props.labelSuffix && this.props.labelSuffix,
            react_1.default.createElement(reactstrap_1.FormFeedback, null, this.props.errorMessage)));
    };
    return DropdownList;
}(react_1.default.Component));
exports.DropdownList = DropdownList;
//# sourceMappingURL=DropdownList.js.map