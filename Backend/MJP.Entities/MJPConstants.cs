using System;
using MJP.Entities.Contracts;
using MJP.Entities.Models;

using System.Linq;
using System.Collections;
using System.Collections.Generic;



using System.Data.Common;
using System.Security.Principal;
 
namespace MJP.Entities
{
    public class MJPConstants
    {
        public const string LOV_GROUP_TYPE_OTHER_CERTIFICATES = "APPLICANT_CERTIFICATE";

        public const string LOV_GROUP_TYPE_CURRENCIES = "CURRENCY";

        public const string LOV_GROUP_TYPE_LOCATIONS = "JOBLOCATIONS";

        public const string LOV_GROUP_TYPE_NATIONALITY = "NATIONALITY";

         public const string LOV_GROUP_TYPE_PROFILE_STATUS = "PROFILE_STATUS";

        public const string LOV_GROUP_TYPE_MARITAL_STATUS = "MARITAL_STATUS";

        public const string LOV_GROUP_APPLICANT_DOCUMENT = "APPLICANT_DOCUMENT";

        public const string LOV_GROUP_APPLICANT_COURSES = "APPLICANT_COURSE";

        public const string LOV_GROUP_RANK = "RANK";


        public const string LOV_GROUP_CURRENCY = "CURRENCY";

        public const int JOB_STATUS_OPEN = 1;

        public const int JOB_STATUS_ONHOLD = 2;
        
        public const int JOB_STATUS_EXPIRED = 3;
        

        public const int JOB_STATUS_CANCELLED = 4;
        

        public const int APPLICATION_STATUS_APPLIED = 1;

        //public const int APPLICATION_STATUS_SENT_TO_COMPANY = 2;

        //public const int APPLICATION_STATUS_REFER_BACK_TO_APPLICANT = 3;

        //public const int APPLICATION_STATUS_REFER_BACK_TO_COMPANY = 4;

        //public const int APPLICATION_STATUS_REFER_BACK_TO_STAFF = 5;

        //public const int APPLICATION_STATUS_INTERVIEW_SCHEDULED = 6;

        //public const int APPLICATION_STATUS_INTERVIEW_RESCHEDULED = 11;

        public const int APPLICATION_STATUS_CANCELLED = 2;


         public const int APPLICATION_STATUS_ONHOLD = 3;

        public const int APPLICATION_STATUS_SHORTLISTED = 4;

        public const int APPLICATION_STATUS_REJECTED = 5;

        //public const int APPLICATION_STATUS_EXPIRED = 6;

        
        //Selected in interview
        public const int APPLICATION_STATUS_SELECTED = 6;

        //Not selected in interview
        public const int APPLICATION_STATUS_NOT_SELECTED = 7;


        //public const int APPLICATION_STATUS_CLOSED= 10;


        public const int PROFILE_STATUS_NOT_STARETED = 1;

        public const int PROFILE_STATUS_PERSONAL_INFO_COMPLETED = 2;

        public const int PROFILE_STATUS_DOCUMENTS_COMPLETED = 3;

        public const int PROFILE_STATUS_COMPLETED = 4;



        public const int APPLICANT_STATUS_NEW = 1;

        public const int APPLICANT_STATUS_ACTIVE = 2;

        public const int APPLICANT_STATUS_INACTIVE = 3;

        public const int APPLICANT_STATUS_PROFILE_SUBMITTED = 4;

        public const int JOB_AVAILABILTY_STATUS_AVAILABLE = 1;

        public const int JOB_AVAILABILTY_STATUS_NOTAVAILABLE = 2;
        
    }
}
