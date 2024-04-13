export class MJPConfig {


    static get  AppTitle()  {
       return process.env.REACT_APP_TITLE;
    }

    static get  AppVersion()  {
        return process.env.REACT_APP_VERSION;
    }

    static get  APIBaseUri()  {   
        return process.env.REACT_APP_API_BASE_URI;
    }

    static get  GuestUserName()  {
        return process.env.REACT_APP_GUEST_USER_NAME;
    }

    static get  GuestPassword()  {
        return process.env.REACT_APP_GUEST_PASSWORD;
    }

    static get  AppEnvironment()  {
        return process.env.REACT_APP_ENV;
    }

    static get  AboutusText1()  {
        return process.env.REACT_APP_ABOUTUS1;
    }

    static get  AboutusText2()  {
        return process.env.REACT_APP_ABOUTUS2;
    }

    static get  ContactUsAddress1()  {
        return process.env.REACT_APP_CONTACTUS_ADD1;
    }

    static get  ContactUsAddress2()  {
        return process.env.REACT_APP_CONTACTUS_ADD2;
    }

    static get  ContactUsCity()  {
        return process.env.REACT_APP_CONTACTUS_CITY;
    }

    static get  ContactUsPincode()  {
        return process.env.REACT_APP_CONTACTUS_PINCODE;
    }

    static get  ContactUsState()  {
        return process.env.REACT_APP_CONTACTUS_STATE;
    }


    static get  ContactUsEmail()  {
        return process.env.REACT_APP_CONTACTUS_EMAIL;
    }

    static get  ContactUsUrl()  {
        return process.env.REACT_APP_URL;
    }

    static get  ContactUsPhoneNumber()  {
        return process.env.REACT_APP_CONTACTUS_PHONENUMBER;
    }
}