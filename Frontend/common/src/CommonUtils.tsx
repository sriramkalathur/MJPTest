import moment from "moment";
import { Moment,  } from "moment";
import React from "react";

import { JsxElement } from "typescript";


export class CommonUtils { 

 

   static openInNewTab(url: string)  {
        window.open(url, "_blank");
   };

   static wait (delay: number) {
        //Just call timeout for the delay
        return new Promise(res => setTimeout(res, delay));
    }
    
    /* Format the date for display purpose */
   static formatDate (date: Date, format: string) : string {
    
        //return "2020-01-05T06:00";
        //var x = moment(date).format(format);
        //debugger;
        return date && moment(date).format(format);   
    }
     
    static getDisplayDate(date: Date) : string {
    
        return date && moment(date).format("DD MMM YYYY");
    }
    

    static getDisplayTime(time: string) : string {
    
        //We need only the time. So just append a DUMMY date and select only the toime part frm that
        var dateTime = "1/1/2001 " + time;
        return (moment(dateTime).format("HH:mm"));
    }
    
   static getDisplayDateTime(date: Date) : string {
    
        return date && moment(date).format("DD MMM YYYY hh:mm");
    }


    static downloadFile(blob: Blob, fileName: string){
        
         //Export the server data as BLOB and generate an temp object URL from that
        //create a <a> href tag in the background and simulate the click of that
        //to open the doucment
        var tempUrl = window.URL.createObjectURL(blob);

        const tempLink = document.createElement('a');
        tempLink.href = tempUrl;
        tempLink.setAttribute('download', fileName); 
        //Simulate the click
        tempLink.click();
        //Remove the element
        //tempLink.remove();
    }
    
}
