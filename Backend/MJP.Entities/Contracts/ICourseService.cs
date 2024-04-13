
    using System;
using System.Collections.Generic;
using MJP.Entities.Models;


namespace MJP.Entities.Contracts
{
    ///Handles Courses & Certificates
    public interface IApplicantCourseService {
       ApplicantCertificatesList SelectCertificates(int applicantId);
        
        void UpdateCertificate(CompetencyCertificate model);

        //ValidationError[] Validate(ApplicantDocument model);

        void DeleteCertificate(int certificateId);



        ApplicantSTCWCourse[] SelectCourses(int applicantId);
        
        void UpdateCourse(ApplicantSTCWCourse model);

        //ValidationError[] Validate(ApplicantDocument model);

        void DeleteCourse(int stcwCourseId);

    }
}