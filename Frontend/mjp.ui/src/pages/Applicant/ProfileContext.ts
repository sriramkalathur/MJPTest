import React from 'react';



export class ProfileContextData {

    TAB_INDEX_BASIC_DETAILS = "1";

    TAB_INDEX_DOCUMENTS = "2";

    TAB_INDEX_COURSES = "3";

    TAB_CERTIFICATE_OF_COMPETENCY = "4";

    TAB_INDEX_EXPERIENCE = "5";

    TAB_INDEX_FILES = "6";

    //Current Tab
    activeTab: string;

    //onActiveTabChanged: function(activeTab: string)

    constructor(){

    }
}

export const ApplicantProfileContext = React.createContext<ProfileContextData>(new ProfileContextData());
 