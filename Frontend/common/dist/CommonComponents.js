"use strict";
//import { Formik, FormikHelpers, FormikProps, FormikValues } from "formik";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldLabel = exports.Paginator = exports.Paginator1 = exports.ModalDialog = exports.ModalContent = exports.PageTitleActionBar = exports.StatusElement = exports.ValidationMessage = exports.ProcessingMessage = void 0;
var React = __importStar(require("react"));
var reactstrap_1 = require("reactstrap");
var CommonModels_1 = require("./CommonModels");
/* A simple spinner control */
// General definition =>  (props: { strucuture of the props })
// export const ProcessingMessage =  (props : { message : string } ) => {
// 	return (<div className="pd5">
// 		<Spinner size="sm" color="primary">
// 			&nbsp;
// 		</Spinner>
// 		<span className="px-2">{ props.message }	</span>
// 	</div>);
// }
var ProcessingMessage = function (props) {
    return (React.createElement("div", { className: "py-2" },
        React.createElement(reactstrap_1.Spinner, { color: "primary", type: "grow", size: "sm" }, "\u00A0"),
        " \u00A0",
        React.createElement(reactstrap_1.Spinner, { color: "success", type: "grow", size: "sm" }, "\u00A0"),
        "\u00A0",
        React.createElement(reactstrap_1.Spinner, { color: "warning", type: "grow", size: "sm" }, "\u00A0"),
        "\u00A0",
        React.createElement(reactstrap_1.Spinner, { color: "danger", type: "grow", size: "sm" }, "\u00A0"),
        "\u00A0",
        React.createElement("span", { className: "px-1" },
            props.statusMessage,
            " ")));
};
exports.ProcessingMessage = ProcessingMessage;
// <div>
// 	<i className="fa fa-spinner fa-spin fa-2x fa-fw"></i>
// 	{ message }
// </div>);
/* A validation error messsage control which will simply show the validation message */
var ValidationMessage = function (props) {
    return (React.createElement("div", { className: "invalid-feedback" }, props.errorMessage && React.createElement("div", null,
        " ",
        props.errorMessage,
        " ")));
};
exports.ValidationMessage = ValidationMessage;
// export const FieldText = (fieldName: string, nullValue: string, value?: string) => {
// 	return (<div><div className="fieldLabel">{fieldName}</div>
// 		<div>{value == null ? nullValue : value}</div></div>);
// };
/* A generalized function for handling all forms */
/* Properties for rendering a Form */
// export interface formBuilderArgs<T> {
// 	/* The Initial values to be supplied to the form */
// 	initialValues: T;
// 	/* Function that renders form for the given state
// 	This will be automatically called by FomrIk when there is a state change*/
// 	formBuilder: (props: FormikProps<T>) => JSX.Element
// }
/* Builds a Input form*/
// export const InputForm = function ({ initialState, formBuilder}: { initialState: any, formBuilder: (props: FormikProps<any>) => JSX.Element})  {
// 	/* Define a form with the props and return that */
// 	return  (<div>
// 		<Formik
// 			initialValues={initialState}
// 			validateOnChange={false}
// 			validateOnBlur={false}
// 			enableReinitialize
// 			/* For now pass onSubmit as NULL, the form submit can be hanlded in the respective
// 			buttons insider formBuilder() */
// 			onSubmit={null}>
// 			{(props) =>
// 				<div>
// 					{ /*Render the childrens */}
// 					{ formBuilder(props)}
// 				</div>
// 			}</Formik></div>);
// }
/* Renders the status of a form */
var StatusElement = function (props) {
    switch (props.status) {
        case CommonModels_1.Status.Success: {
            return (React.createElement(reactstrap_1.UncontrolledAlert, { color: "success" },
                " ",
                props.statusMessage,
                " "));
        }
        case CommonModels_1.Status.Failure: {
            return (React.createElement(reactstrap_1.UncontrolledAlert, { color: "danger" },
                " ",
                props.statusMessage,
                " "));
        }
        case CommonModels_1.Status.Processing: {
            return (React.createElement(reactstrap_1.Alert, { color: "light", className: "pd5" },
                React.createElement(reactstrap_1.Spinner, { size: "sm", color: "primary" }, " "),
                React.createElement("span", null,
                    "\u00A0\u00A0",
                    (props.statusMessage == null) ? "Processing request" : props.statusMessage)));
        }
        case CommonModels_1.Status.Loading: {
            return (React.createElement("div", { className: "py-2" },
                React.createElement(reactstrap_1.Spinner, { color: "primary", size: "sm" }, "\u00A0"),
                React.createElement("span", { className: "px-2" },
                    " ",
                    props.statusMessage,
                    " ")));
        }
        case CommonModels_1.Status.None: {
            return (React.createElement("div", null, "\u00A0"));
        }
    }
};
exports.StatusElement = StatusElement;
/* Builds a Top Bar with title & Save/Cancel Buttons */
var PageTitleActionBar = function (props) {
    var okText = props.okText;
    var cancelText = props.cancelText;
    if (props.cancelText == null || props.cancelText == "") {
        cancelText = "Cancel";
    }
    if (props.okText == null || props.okText == "") {
        okText = "Save";
    }
    return (React.createElement("div", null,
        React.createElement("div", { className: "col-6 nogutters" },
            React.createElement(exports.StatusElement, { status: props.status, statusMessage: props.statusMessage })),
        React.createElement("div", { className: "float-right" },
            okText &&
                React.createElement(reactstrap_1.Button, { color: "primary", onClick: function (e) { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: 
                                /* Just call the OK Action */
                                return [4 /*yield*/, props.okAction()];
                                case 1:
                                    /* Just call the OK Action */
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); } }, "sfsdfsdffds"),
            React.createElement(reactstrap_1.Button, { onClick: function (e) { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, props.cancelAction()];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); } }, cancelText)),
        props.title &&
            React.createElement("div", { className: "pageHeader" }, props.title),
        React.createElement("hr", null)));
};
exports.PageTitleActionBar = PageTitleActionBar;
var ModalContent = function (props) {
    return (React.createElement("div", null,
        React.createElement("div", { className: "modal-title" },
            React.createElement("h6", null, props.title)),
        React.createElement("div", { className: "modal-body" }, props.children),
        React.createElement("div", { className: "modal-footer float-right" },
            props.OkButton && props.OkButton,
            props.cancelButton && props.cancelButton)));
};
exports.ModalContent = ModalContent;
/* Renders a Modal dialog with footer & progress
If progress is NULL progres will not be rendered */
var ModalDialog = function (props) {
    /* This was used to render modal with header, body & footer */
    return (React.createElement("div", null,
        React.createElement("div", { className: "modal-title" },
            React.createElement("h6", null, props.title)),
        React.createElement("div", { className: "modal-body" }, props.children),
        React.createElement("div", { className: "modal-footer" },
            React.createElement("div", { className: "col-12" },
                React.createElement("div", { className: "float-right" }, props.actionButtons),
                React.createElement("div", { className: "col-6-5" }, props.progress && props.progress)))));
};
exports.ModalDialog = ModalDialog;
var Paginator1 = function (props) {
    var FIRST_PAGE = 1;
    return (React.createElement("div", { className: "row" },
        React.createElement(reactstrap_1.Pagination, { size: "sm" },
            React.createElement(reactstrap_1.PaginationItem, null,
                React.createElement(reactstrap_1.PaginationLink, { first: true, disabled: props.result.currentPage == FIRST_PAGE, onClick: function (e) { return props.loadPage(FIRST_PAGE); } })),
            React.createElement(reactstrap_1.PaginationItem, null,
                React.createElement(reactstrap_1.PaginationLink, { previous: true, disabled: props.result.currentPage == FIRST_PAGE, onClick: function (e) {
                        props.loadPage(props.result.currentPage - 1);
                    } })),
            React.createElement("div", { className: "pd5" },
                "Page ",
                props.result.currentPage,
                " of  ",
                props.result.totalPages,
                " "),
            React.createElement(reactstrap_1.PaginationItem, null,
                React.createElement(reactstrap_1.PaginationLink, { next: true, disabled: (props.result.currentPage == props.result.totalPages) ||
                        (props.result.totalPages <= 0), onClick: function (e) {
                        props.loadPage(props.result.currentPage + 1);
                    } })),
            React.createElement(reactstrap_1.PaginationItem, null,
                React.createElement(reactstrap_1.PaginationLink, { last: true, disabled: (props.result.currentPage == props.result.totalPages) ||
                        (props.result.totalPages <= 0), onClick: function (e) { return props.loadPage(props.result.totalPages); } })))));
};
exports.Paginator1 = Paginator1;
var Paginator = function (props) {
    var FIRST_PAGE = 1;
    return (React.createElement(reactstrap_1.Pagination, { size: "sm" },
        React.createElement(reactstrap_1.PaginationItem, null,
            React.createElement(reactstrap_1.PaginationLink, { first: true, "aria-label": "\u00A0", disabled: props.result.currentPage == FIRST_PAGE, onClick: function (e) { return props.loadPage(FIRST_PAGE); } })),
        React.createElement(reactstrap_1.PaginationItem, null,
            React.createElement(reactstrap_1.PaginationLink, { previous: true, "aria-label": "\u00A0", disabled: props.result.currentPage == FIRST_PAGE, onClick: function (e) {
                    props.loadPage(props.result.currentPage - 1);
                } })),
        React.createElement("div", { className: "py-2 px-2 small" },
            "Page ",
            props.result.currentPage,
            " of  ",
            props.result.totalPages,
            " "),
        React.createElement(reactstrap_1.PaginationItem, null,
            React.createElement(reactstrap_1.PaginationLink, { next: true, "aria-label": "\u00A0", disabled: (props.result.currentPage == props.result.totalPages) ||
                    (props.result.totalPages <= 0), onClick: function (e) {
                    props.loadPage(props.result.currentPage + 1);
                } })),
        React.createElement(reactstrap_1.PaginationItem, null,
            React.createElement(reactstrap_1.PaginationLink, { last: true, "aria-label": "\u00A0", disabled: (props.result.currentPage == props.result.totalPages) ||
                    (props.result.totalPages <= 0), onClick: function (e) { return props.loadPage(props.result.totalPages); } }))));
};
exports.Paginator = Paginator;
// export const Paginator1 = (props : IPaginatorProps<any>) => {
// 	const FIRST_PAGE = 1;
// 	return (  
// 		<div className="row">
// 			<i className="pd5 fa fa-angle-double-left iconButton" onClick={(e) => props.loadPage(FIRST_PAGE)} />
// 			&nbsp;<i className="pd5 fa fa-angle-left iconButton" onClick={(e) => {
// 				if (props.result.currentPage == 1) {
// 					//This is first Page. So no previous page
// 					return;
// 				}
// 				props.loadPage(props.result.currentPage - 1)
// 			}
// 			} />
// 			<div className="pd5">Page { props.result.currentPage} of  { props.result.totalPages} </div>
// 			<i className="pd5 fa fa-angle-right iconButton" onClick={(e) => {
// 				if ( props.result.currentPage == props.result.totalPages) {
// 					//This is last Page. So no next page
// 					return;
// 				}
// 				props.loadPage(props.result.currentPage + 1)
// 			}
// 			} />
// 			&nbsp;<i className="pd5 fa fa-angle-double-right iconButton" onClick={(e) => props.loadPage(props.result.totalPages)} />
// 		</div>
// 	);
// }
var FieldLabel = function (props) {
    return (React.createElement(reactstrap_1.FormGroup, null,
        React.createElement(reactstrap_1.Label, { className: "fieldLabel" }, props.label),
        " ",
        React.createElement("br", null),
        React.createElement("div", { className: "label" }, props.children)));
};
exports.FieldLabel = FieldLabel;
//# sourceMappingURL=CommonComponents.js.map