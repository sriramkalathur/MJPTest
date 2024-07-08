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
exports.DateField = void 0;
var react_1 = __importDefault(require("react"));
var reactstrap_1 = require("reactstrap");
var CommonUtils_1 = require("../CommonUtils");
var CommonComponents_1 = require("../CommonComponents");
/* For now use textbox attributes */
var DateField = exports.DateField = /** @class */ (function (_super) {
    __extends(DateField, _super);
    function DateField(props) {
        var _this = _super.call(this, props) || this;
        _this.inputType = (_this.props.isTimeField ? "datetime-local" : "date");
        return _this;
    }
    DateField.prototype.render = function () {
        return (react_1.default.createElement(reactstrap_1.FormGroup, { className: this.props.class },
            this.props.label && react_1.default.createElement(reactstrap_1.Label, { className: "fieldLabel" }, this.props.label),
            this.props.isMandatory && react_1.default.createElement("span", { className: "px-1", style: { color: "red" } }, "*"),
            react_1.default.createElement(reactstrap_1.Input, { type: this.inputType, name: this.props.fieldName, onChange: this.props.onChange && this.props.onChange, disabled: this.props.isReadOnly, invalid: this.props.errorMessage != null, value: CommonUtils_1.CommonUtils.formatDate(this.props.date, (this.props.isTimeField) ? DateField.INPUT_DATE_TIME_FORMAT :
                    DateField.INPUT_DATE_FORMAT) }),
            react_1.default.createElement(CommonComponents_1.ValidationMessage, { errorMessage: this.props.errorMessage })));
    };
    /* This is the format that should be used for Input fields */
    DateField.INPUT_DATE_FORMAT = "yyyy-MM-DD";
    DateField.INPUT_DATE_TIME_FORMAT = "yyyy-MM-DDThh:mm";
    return DateField;
}(react_1.default.Component));
//# sourceMappingURL=DateField.js.map