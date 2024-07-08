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
exports.TextBox = void 0;
var reactstrap_1 = require("reactstrap");
var react_1 = __importDefault(require("react"));
var TextBox = /** @class */ (function (_super) {
    __extends(TextBox, _super);
    function TextBox(props) {
        return _super.call(this, props) || this;
    }
    TextBox.prototype.render = function () {
        /* Set the Id as field Name as that is the name with which the propertis will be saved to in
        form */
        return (react_1.default.createElement(reactstrap_1.FormGroup, { className: this.props.class },
            this.props.prefix && this.props.prefix,
            this.props.label && react_1.default.createElement(reactstrap_1.Label, { className: "fieldLabel" }, this.props.label && this.props.label),
            this.props.isMandatory && react_1.default.createElement("span", { className: "px-1", style: { color: "red" } }, "*"),
            react_1.default.createElement(reactstrap_1.Input, { rows: this.props.rows, name: this.props.fieldName, type: this.props.type, id: this.props.fieldName, value: this.props.value, invalid: this.props.errorMessage != null, onChange: this.props.onChange && this.props.onChange, readOnly: this.props.isReadOnly, placeholder: this.props.placeHolder }),
            react_1.default.createElement(reactstrap_1.FormFeedback, null, this.props.errorMessage)));
    };
    return TextBox;
}(react_1.default.Component));
exports.TextBox = TextBox;
//# sourceMappingURL=TextBox.js.map