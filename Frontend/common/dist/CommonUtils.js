"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonUtils = void 0;
var moment_1 = __importDefault(require("moment"));
var CommonUtils = /** @class */ (function () {
    function CommonUtils() {
    }
    CommonUtils.openInNewTab = function (url) {
        window.open(url, "_blank");
    };
    ;
    CommonUtils.wait = function (delay) {
        //Just call timeout for the delay
        return new Promise(function (res) { return setTimeout(res, delay); });
    };
    /* Format the date for display purpose */
    CommonUtils.formatDate = function (date, format) {
        //return "2020-01-05T06:00";
        //var x = moment(date).format(format);
        //debugger;
        return date && (0, moment_1.default)(date).format(format);
    };
    CommonUtils.getDisplayDate = function (date) {
        return date && (0, moment_1.default)(date).format("DD MMM YYYY");
    };
    CommonUtils.getDisplayTime = function (time) {
        //We need only the time. So just append a DUMMY date and select only the toime part frm that
        var dateTime = "1/1/2001 " + time;
        return ((0, moment_1.default)(dateTime).format("HH:mm"));
    };
    CommonUtils.getDisplayDateTime = function (date) {
        return date && (0, moment_1.default)(date).format("DD MMM YYYY hh:mm");
    };
    CommonUtils.downloadFile = function (blob, fileName) {
        //Export the server data as BLOB and generate an temp object URL from that
        //create a <a> href tag in the background and simulate the click of that
        //to open the doucment
        var tempUrl = window.URL.createObjectURL(blob);
        var tempLink = document.createElement('a');
        tempLink.href = tempUrl;
        tempLink.setAttribute('download', fileName);
        //Simulate the click
        tempLink.click();
        //Remove the element
        //tempLink.remove();
    };
    return CommonUtils;
}());
exports.CommonUtils = CommonUtils;
//# sourceMappingURL=CommonUtils.js.map