import axios, { AxiosResponse } from "axios";
import { MJPUser } from "../authentication/UserContext";
import { MJPConstants } from "../MJPConstants";
import { UserLoginModel } from "../models/AccountModels";
import { APIResponse } from "common";
import { ChangePasswordModel, ResetPasswordModel,  UserRegistrationModel } from "../models/UserModels";
import { APIResult } from "../models/CommonModels";
import { APIService } from "../authentication/APIService";
import { MJPConfig } from "../MJPConfig";
import { UserProfile } from "../models/ApplicantModels_old";

export class UserService {
    
    private get AxiosInstance() {
        var instance = APIService.getInstance();  
        return instance.AxiosInstance;
    }
    
    async getUserAPIToken(model:UserLoginModel): Promise<MJPUser> {
        
        //Create AXIOS instance
        let instance = axios.create({ 
            baseURL: MJPConfig.APIBaseUri
        });

        var payload = {
            "userName": model.userName,
            "password": model.password,
            "loginType": model.loginType
        };

        var url = "user/getUserToken";

        //Get the Token
        //instance.interceptors.request.use((config) => config.headers.Access-Control-Allow-Origin = "http://localhost:3000"
        var result = await instance.post<UserLoginModel, MJPUser>(url, model).catch((error) => {
            //When there is an error check if it is 401. 401 error will be thrown as ERR
            //So catch that explicitly and return NULL
            if(error.response.status == MJPConstants.HTTP_STATUS_UNAUTHORIZED){
                //Invalid User
                return null;
            }
            else {
                //some other. rethrow
                throw error; 
            }
        });
        //Return the result
        return (result == null)? null: result.data;
    }   


    async registerUser(model: UserRegistrationModel): Promise<APIResult> {
        let instance = axios.create({ 
            baseURL: MJPConfig.APIBaseUri
        });

     
        var url = "user/register";
        var result = (await instance.post(url, model)).data;
        return result;
    }

    async selectMyProfile(): Promise<UserProfile> {
        var url = "user/profile";
        var result = (await this.AxiosInstance.get(url)).data;
        return result;
    }


    async resetPassword(model: ResetPasswordModel): Promise<APIResult> {

        let instance = axios.create({ 
            baseURL: MJPConfig.APIBaseUri
        });

        var url = "user/resetpassword";
        var result = (await this.AxiosInstance.post(url, model)).data;
        return result;
    }



    async changePassword(model: ChangePasswordModel): Promise<APIResult> {

        var url = "user/changepassword";
        var result = (await this.AxiosInstance.post(url, model)).data;
        return result;
    }
    
    async updateProfile(model: UserProfile): Promise<APIResult> {
        var url = "user/updateprofile";
        var result = (await this.AxiosInstance.post(url, model)).data;
        return result;
        
    }
}