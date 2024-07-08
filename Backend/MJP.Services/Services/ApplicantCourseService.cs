using MJP.Entities.Models;

using System.Linq;
using System.Collections;
using System.Collections.Generic;


using Microsoft.EntityFrameworkCore;
using MJP.Infrastructure;
using MJP.Services.Extensions;
using System.Data.Common;
using MJP.Entities;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore.Scaffolding;
using MJP.Entities.Contracts;


namespace MJP.Services
{
    ///This handles the course & certificate details in Profile
    public class ApplicantCourseService : IApplicantCourseService
    {
        private MJPContext context;

        public ApplicantCourseService(MJPContext context)
        {
            this.context = context;
        }

        public void DeleteCertificate(int certificateId)
        {
            var dbItem =(from d in this.context.CompetencyCertificates
                    where d.CompetencyCertificateId == certificateId
                    select d).FirstOrDefault();
            this.context.CompetencyCertificates.Remove(dbItem);
            this.context.SaveChanges();
        }


        public ApplicantCertificatesList SelectCertificates(int applicantId) {

            var result = new ApplicantCertificatesList();
        
            var role = (from ap in this.context.ApplicantPersonalDetails
                        join rk in this.context.JobPositionRanks on ap.RankId equals rk.JobPositionRankId
                        join rle in this.context.Roles on rk.RoleId equals rle.RoleId
                        where ap.ApplicantId == applicantId
                        select rle).FirstOrDefault();

            if(role != null){
                //select if certificate is required
                result.IsCertificateMandatory = role.IsCertificateRequired.Value;
            }   
            result.Certificates = (from doc in this.context.CompetencyCertificates
                        join lov in this.context.Mjplovitems on doc.CertificateId equals lov.LovitemId
                        where doc.ApplicantId == applicantId
                        select new CompetencyCertificate(){
                            CompetencyCertificateId = doc.CompetencyCertificateId,
                            ApplicantId = doc.ApplicantId.Value,

                            Grade = doc.Grade,
                            CertificateId = doc.CertificateId,
                            Details = doc.Details,

                            CertificateName = lov.DisplayText,
                            CertificateNumer = doc.Cocnumber,
                        
                            Institution = doc.Institution,
                            Board = doc.Board,
                            YearOfPassing= doc.YearOfPassing
                        }).ToArray();
            return result;
        }

           public void UpdateCertificate(CompetencyCertificate model) {

            var dbItem = (from doc in this.context.CompetencyCertificates
                        where doc.CompetencyCertificateId == model.CompetencyCertificateId
                        select doc).FirstOrDefault();
                        
             if(model.CompetencyCertificateId == 0) {
                //New item.. Update only applicantId
                dbItem = new CompetencyCertificates();
                dbItem.ApplicantId = model.ApplicantId;
            }

            dbItem.Cocnumber = model.CertificateNumer;
            dbItem.CertificateId = model.CertificateId;
            dbItem.Details = model.Details;
            
            dbItem.YearOfPassing=model.YearOfPassing;
            dbItem.Institution = model.Institution;
            dbItem.Grade = model.Grade;
            dbItem.Board = model.Board;

            dbItem.LastUpdatedBy = model.LastUpdatedBy;
            dbItem.LastUpdatedTime = model.LastUpdatedTime;

            if(model.CompetencyCertificateId == 0) {
                //New item.. Update only applicantId
                this.context.CompetencyCertificates.Add(dbItem);
            }
            else {
                //Update
                this.context.CompetencyCertificates.Update(dbItem);
            }
            this.context.SaveChanges();
        }


        public void DeleteCourse(int courseId)
        {
            var dbItem =(from d in this.context.ApplicantStcwcourses
                    where d.StcwcourseId == courseId
                    select d).FirstOrDefault();
            this.context.ApplicantStcwcourses.Remove(dbItem);
            this.context.SaveChanges();
        }


        public ApplicantSTCWCourse[] SelectCourses(int applicantId) {

            var list = (from crse in this.context.ApplicantStcwcourses
                        join lv in this.context.Mjplovitems on crse.CourseId equals lv.LovitemId
                        where crse.ApplicantId == applicantId
                        && lv.Lovgroup == MJPConstants.LOV_GROUP_APPLICANT_COURSES
                        select new ApplicantSTCWCourse(){
                            STCWCourseId = crse.StcwcourseId,
                            ApplicantId = crse.ApplicantId.Value,

                            CertificateNumer = crse.CertificateNumber,
                            CourseId = crse.CourseId.Value,
                            CourseName = lv.DisplayText,
                            PlaceOfIssue = crse.IssuePlace,
                            Details = crse.Details,
                            IssueDate =crse.IssueDate,
                            ExpiryDate = crse.ValidTill,
                            Grade = crse.Grade
                        }).ToArray();
            return list;
        }

        public void UpdateCourse(ApplicantSTCWCourse model) {

          var dbItem = new ApplicantStcwcourses();
                    
            if(model.STCWCourseId == 0) {
                //New item.. Update only applicantId
                dbItem = new ApplicantStcwcourses();
                dbItem.ApplicantId = model.ApplicantId;
            }
            else {
                dbItem = (from doc in this.context.ApplicantStcwcourses
                    where doc.StcwcourseId == model.STCWCourseId
                    select doc).FirstOrDefault();
            }

            dbItem.CertificateNumber = model.CertificateNumer;
            dbItem.CourseId = model.CourseId;
            dbItem.IssueDate = model.IssueDate;
            dbItem.IssuePlace = model.PlaceOfIssue;
            dbItem.ValidTill = model.ExpiryDate;    
            dbItem.Details = model.Details;
            dbItem.Grade = model.Grade;

            dbItem.LastUpdatedBy = model.LastUpdatedBy;
            dbItem.LastUpdatedTime = model.LastUpdatedTime;

             if(model.STCWCourseId == 0) {
                //New item.. Update only applicantId
                this.context.ApplicantStcwcourses.Add(dbItem);
            }
            else {
                //Update
                this.context.ApplicantStcwcourses.Update(dbItem);
            }
            this.context.SaveChanges();
        }


    }
}

