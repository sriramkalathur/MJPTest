using System;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace MJP.Entities.Models
{
    public class ApplicantProfileModel : MJPEntity {

        public ApplicantPersonalInfo PersonalInfo { get; set;}

        public ApplicantDocument[] Documents { get; set;}


        public ApplicantSTCWCourse[] Courses { get; set;}

        public ApplicantCertificatesList Certificates { get; set;}

        public SEAExperience[] Experience { get; set; }
    }
}