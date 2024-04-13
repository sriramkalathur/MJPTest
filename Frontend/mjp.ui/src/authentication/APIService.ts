
import axios, { AxiosInstance, AxiosResponse } from "axios";

import { MJPConstants } from "../MJPConstants";
import { MJPUser, UserContext } from "./UserContext";
import { UserService } from "../services/UserService";
import { LoginType, UserLoginModel } from "../models/AccountModels";
import { MJPConfig } from "../MJPConfig";

export class APIService {

    ///Axios instance for calling GUEST api
    private axiosInstance: AxiosInstance;
    
    private static instance: APIService;

    ///Axios instance for calling other functions
    //private userAxios: AxiosInstance;

    
    get AxiosInstance() {
        return this.axiosInstance;
    }

    private userService:UserService;


    private async updateGuestToken(): Promise<string> {

        var model: UserLoginModel;
        model = new UserLoginModel();
        model.userName = MJPConfig.GuestUserName;
        model.password = MJPConfig.GuestPassword;
        model.loginType = LoginType.Staff;

        var user = await this.userService.getUserAPIToken(model);
        // Set token..
       
        UserContext.updateGuestAuthToken(user.authToken);
        return user.authToken;
    }

    private  initializeAxiosInstance() {

        this.userService = new UserService();
        this.axiosInstance = axios.create({ 
            baseURL: MJPConfig.APIBaseUri
        });
        
        //Use a inteceptor
        this.axiosInstance.interceptors.request.use(async (config) => {

            var token = UserContext.getAuthToken();
            if(token== null){
                //There is no GUEST token/user token. So create one
                token = await this.updateGuestToken();
            }
            //Set the AUTH token
            config.headers.set("Authorization", token);
            return config;
        });


        //Add a response interceptor
        this.axiosInstance.interceptors.response.use((resp) => {

            //success response... Just return it as it is
            return resp;
        },  async (err) => {
            
            console.log(err);
            //Failure.This will have the axios failure and also failure in the interceptor
            if(err.response){
                //Error and there is a response
                //Check if 401 
                let errResp = (err.response as AxiosResponse<any>);
                if(errResp.status == MJPConstants.HTTP_STATUS_UNAUTHORIZED){
                    //Unauthorized. Could be  a Token expiry issue..
                    //Check if the user is Guest user. If yes, renew the token
                    
                    //If Logged in user, don't renew that and throw error as it 
                    //might be an access ISSUE
                    // If Guest User, check if it is Token expiry issue.
                    //If YES, renew the token
                    //The authentication error will be set in response header WWW-Authenticate
                    // If it contains 'The token expired..', then it is TOKEN expiry issue
                    var respHeader = (errResp.headers?.["www-authenticate"] as string);
                    
                    if(! respHeader){
                        //The reponse header doesn't exist
                        return Promise.reject(err);
                    }
                    else {
                        //Header exist. check if has Token Exipred
                        let tokenEpiryMessage = "The token expired";
                        //If the messge is found, it is a TOKEN expiry message
                        var isTokenExpired = (respHeader.indexOf(tokenEpiryMessage) > -1);
                        if(isTokenExpired) {
                            //Renew the token...
                            await this.updateGuestToken();
                            //After renewal try the same request
                            return axios(err.config);
                        }
                        else {
                            //Not a TOKEN expiry error. Throw that back..
                            return Promise.reject(err);
                        }
                    }
                }
                else {
                    //Some other response code other than 401
                    //throw that back
                    return Promise.reject(err);
                }
            }
            else {
                //Some other failure other than HTTP.
                //throw that back
                return Promise.reject(err);
            }
            
        });
    }



    public static getInstance(): APIService {
        if (!APIService.instance) {
            APIService.instance = new APIService();
            //Initialize that

            APIService.instance.initializeAxiosInstance();
        }

        return APIService.instance;
    }
}

