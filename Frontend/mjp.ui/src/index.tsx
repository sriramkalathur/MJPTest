
import { createRoot } from 'react-dom/client';


import App from './App';
import { MJPConstants } from './MJPConstants';
import { AxiosError } from 'axios';
import { MJPRouteUtils } from './common/MJPRouteUtils';
import { UserContext } from './authentication/UserContext';



//import reportWebVitals from './reportWebVitals'; 

const root = createRoot(document.getElementById('root'));
root.render( 
    <App />   
);    


function handleError(error: any) {
    var axErr = (error as AxiosError);
    if(axErr == null){
        //This is not AXIOS error..
        MJPRouteUtils.navigateToError();
    }
    else {
        //Check if it is 401. (unauthroized)
        if(axErr.message.indexOf(MJPConstants.HTTP_STATUS_UNAUTHORIZED.toString())!= -1){
            //Unauthroized
            //Clear the LOGIN before
            UserContext.signOutUser();
            MJPRouteUtils.navigateToLogin();
        }
        else {
            //Navigate to ERR
            MJPRouteUtils.navigateToError();
        }
    }
}


window.addEventListener('unhandledrejection', function(event) {
    // This is to handle Promise errors
    console.log(event.reason); // [object Promise] - the promise that generated the error
    console.log(event.promise); // Error: Whoops! - the unhandled error object
    
    handleError(event.reason);
  });

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
