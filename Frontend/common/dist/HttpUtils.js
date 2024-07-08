"use strict";
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
exports.HttpUtils = exports.APIResponse = exports.APIRequest = void 0;
var APIRequest = /** @class */ (function () {
    function APIRequest() {
    }
    return APIRequest;
}());
exports.APIRequest = APIRequest;
var APIResponse = /** @class */ (function () {
    function APIResponse() {
    }
    return APIResponse;
}());
exports.APIResponse = APIResponse;
///Warning: This is no more used. But this is kept for older projects like Zule Drops
//Don't use that  
var HttpUtils = /** @class */ (function () {
    function HttpUtils() {
    }
    /* This is espaecially meant for using in state.
    If we use this in state, we will use the thunkAPI to return a failure result
    which can be easily handled */
    //  static async callAPI<T>(url: string,
    //     payload: T,
    //     token: string,
    //     thunkAPI): Promise<T> {
    //     try {
    //        const response = await fetch(url);
    //        //return the rsponse. This will automatically dispatch createAsyncThunk.sucess action
    //        return response.json();
    //     } catch (err) {
    //       //  When there is error, just return the reejectWithValue() which return an action
    //       //  with fetchAsyncDetails.rejected
    //        return thunkAPI.rejectWithValue(err);
    //     }
    //  }
    HttpUtils.getAPIResult = function (url, token) {
        return __awaiter(this, void 0, void 0, function () {
            var requestOptions, response, obj;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        requestOptions = {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                                "ApiToken": token
                            },
                            accept: { 'Content-Type': 'application/json' }
                        };
                        return [4 /*yield*/, fetch(url, requestOptions)];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        obj = _a.sent();
                        return [2 /*return*/, obj];
                }
            });
        });
    };
    HttpUtils.deleteAPI = function (url, token, tokenName) {
        return __awaiter(this, void 0, void 0, function () {
            var requestOptions, response, obj;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        requestOptions = {
                            method: 'DELETE',
                            headers: {
                                'Content-Type': 'application/json',
                                "ApiToken": token
                            },
                            accept: { 'Content-Type': 'application/json' }
                        };
                        return [4 /*yield*/, fetch(url, requestOptions)];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        obj = _a.sent();
                        return [2 /*return*/, obj];
                }
            });
        });
    };
    /* Post API request with success/failure. Idealluy used for Update request */
    HttpUtils.postAPIRequest = function (url, token, payload, tokenName) {
        if (tokenName === void 0) { tokenName = "ZuleHeader"; }
        return __awaiter(this, void 0, void 0, function () {
            var requestOptions, response, obj, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        requestOptions = {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                "ApiToken": token
                            },
                            accept: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(payload)
                        };
                        return [4 /*yield*/, fetch(url, requestOptions)];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        obj = _a.sent();
                        result = new APIResponse();
                        result.statusCode = response.status;
                        result.errors = obj.errors;
                        result.success = obj.success;
                        result.response = obj.response;
                        return [2 /*return*/, result];
                }
            });
        });
    };
    /* Post API request with success/failure. Idealluy used for Update request */
    HttpUtils.fetchDataByPostAPI = function (url, token, payload, tokenName) {
        return __awaiter(this, void 0, void 0, function () {
            var requestOptions, response, result, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        requestOptions = {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                "ApiToken": token
                            },
                            accept: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(payload)
                        };
                        return [4 /*yield*/, fetch(url, requestOptions)];
                    case 1:
                        response = _b.sent();
                        result = new APIResponse();
                        result.statusCode = response.status;
                        result.errors = [];
                        result.success = true;
                        _a = result;
                        return [4 /*yield*/, response.json()];
                    case 2:
                        _a.response = _b.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    /* This is used  for uploading files */
    HttpUtils.uploadAPIRequest = function (url, token, formData) {
        return __awaiter(this, void 0, void 0, function () {
            var requestOptions, response, obj, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        requestOptions = {
                            method: 'POST',
                            headers: {
                                "ApiToken": token
                            },
                            accept: { 'Content-Type': 'application/json' },
                            body: formData
                        };
                        return [4 /*yield*/, fetch(url, requestOptions)];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        obj = _a.sent();
                        result = new APIResponse();
                        result.statusCode = response.status;
                        result.errors = obj.errors;
                        result.success = obj.success;
                        result.response = obj.response;
                        return [2 /*return*/, result];
                }
            });
        });
    };
    return HttpUtils;
}());
exports.HttpUtils = HttpUtils;
//# sourceMappingURL=HttpUtils.js.map