export class APIRequest<T> {
   url: string;

   /* Auth token */
   token: string;

   /* The payload data that is sent to the API*/
   payload: T
}



export class APIResponse<T> {

   //Success response
   response: T;

   //Response status code
   statusCode: number;

   //Success/failure
   success: boolean;

   //List of errors
   errors: any;
}

 
///Warning: This is no more used. But this is kept for older projects like Zule Drops
//Don't use that  
export class HttpUtils {

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




    static async getAPIResult<R>(url: string, token: string): Promise<R> {

       /* Fetch the data from API */
       const requestOptions = {
          method: 'GET',
          headers: {
             'Content-Type': 'application/json',
             "ApiToken": token
          },
          accept: { 'Content-Type': 'application/json' }
       };

        //set the header value dynamically
        //requestOptions.headers.tokenName] = token;
      
       var response = await fetch(url, requestOptions);
       var obj = await response.json();

       return obj;
    }



    static async deleteAPI<R>(url: string, token: string, tokenName: string): Promise<R> {

       /* Fetch the data from API */
       const requestOptions = {
          method: 'DELETE',
          headers: {
             'Content-Type': 'application/json',
             "ApiToken": token
          },
          accept: { 'Content-Type': 'application/json' }
       };

        //set the header value dynamically
        //requestOptions.headers[tokenName] = token;
      
       var response = await fetch(url, requestOptions);
       var obj = await response.json();

       return obj;
    }


    /* Post API request with success/failure. Idealluy used for Update request */
   static async postAPIRequest<T, R>(url: string, token: string, payload: T, tokenName: string ="ZuleHeader"): Promise<APIResponse<R>> {

       /* Fetch the data from API */
       const requestOptions = {
          method: 'POST',
          headers: {
             'Content-Type': 'application/json',
             "ApiToken": token
          },
          accept: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
       };

       //set the header value dynamically
       //requestOptions.headers[tokenName] = token;
     
       var response = await fetch(url, requestOptions);
       //Convert the response to JSOn object
       var obj = await response.json();

       let result = new APIResponse<R>();
       result.statusCode = response.status;

       result.errors = obj.errors;
       result.success = obj.success;
       result.response = obj.response;

       return result;
    }


    /* Post API request with success/failure. Idealluy used for Update request */
    static async fetchDataByPostAPI<T, R>(url: string, token: string, payload: T, tokenName: string): Promise<APIResponse<R>> {

       //This is for getting the POST response
       //The API will directly return the data without success/failuare
       const requestOptions = {
          method: 'POST',
          headers: {
             'Content-Type': 'application/json',
             "ApiToken": token
          },
          accept: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
       };

       //set the header value dynamically
       //requestOptions.headers[tokenName] = token;
   
       var response = await fetch(url, requestOptions);
       //Convert the response to JSOnobjec
       let result = new APIResponse<R>();
       result.statusCode = response.status;

       result.errors = [];
       result.success = true;
       result.response = await response.json();

       return result;
    }

    /* This is used  for uploading files */
    static async uploadAPIRequest<T, R>(url: string,
       token: string, formData: FormData): Promise<APIResponse<R>> {

       /* Fetch the data from API */
       const requestOptions = {
          method: 'POST',
          headers: {
            "ApiToken": token
          },
          accept: { 'Content-Type': 'application/json' },
          body: formData
       };

       var response = await fetch(url, requestOptions);
       //Convert the response to JSOnobjec
       var obj = await response.json();

       let result = new APIResponse<R>();
       result.statusCode = response.status;

       result.errors = obj.errors;
       result.success = obj.success;
       result.response = obj.response;

       return result;
    }
 }



