"use strict";
// /* Utility class for making API/Web requset calls */
// export default class HttpRequestUtils{
// 	/* Fetches a data using API call and calls the onSucess function */
// 	fetchAPIData(url, onSuccess){
// 		 /* Fetch the data from API */	
// 		 fetch(url).then(response =>  response.json())
// 				.then(result => {
// 					//Call the success function
// 					onSuccess(result);
// 				});
// 	}
// 	clearErrors(errors){
// 		//Don't set the errors to NULL.
// 		//Instead set the individual proeprty so that the state object is maintained..
// 		for(var field in errors){
// 			errors[field] = null;
// 		};
// 	}
// 	updateErrorState(errorState, errors){
// 		//Set the errors from the response
// 		for(var field in errors){
// 			errorState[field] = errors[field]
// 		};
// 	}
// 	/* Posts a HTTP request */
// 	postAPIRequest(url, postData,  onSuccess, onFailure){
// 		const requestOptions = {
// 			method: 'POST',
// 			headers: { 'Content-Type': 'application/json' },
// 			body: JSON.stringify(postData)
// 		};
// 		 /* Fetch the data from API */	
// 		 fetch(url, requestOptions).then(response =>  response.json())
// 				.then(result => {
// 					//Call the success function
// 					
// 					if(result.success){
// 						//Success response.
// 						onSuccess && onSuccess(result.response);
// 					}
// 					else
// 					{
// 						//Failure response. Might be validation
// 						//Call the failure..
// 						onFailure(result);
// 					}
// 				});
// 	}
// 	postRequest(url, postData, onSuccess, onFailure){
// 		const requestOptions = {
// 			method: 'POST',
// 			headers: { 'Content-Type': 'application/json' },
// 			body: JSON.stringify(postData)
// 		};
// 		 /* Fetch the data from API */	
// 		 fetch(url, requestOptions).then(response =>  response.json())
// 				.then(result => {
// 					//Call the success callback
// 					onSuccess(result);
// 				});
// 	}
// }
//# sourceMappingURL=HttpRequestUtils.js.map