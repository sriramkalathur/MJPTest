using System;
using System.Collections.Generic;
using MJP.Entities.Models;


namespace MJP.Entities.Contracts
{
    public interface IApplicantService
    {
       
        ApplicantPersonalInfo SelectPersonalInfo(int applicantId);

        void UpdatePersonalInformation(ApplicantPersonalInfo model);

        //Selects the basic details of applicant
        ApplicantInfo SelectApplicantInfo(int applicantId);
        

        void SubmitProfile(int applicantId, string updatedBy);

        ApplicantDocument[] SelectApplicantDocuments(int applicantId);
        
        void UpdateApplicationDocument(ApplicantDocument model);

        ValidationError[] ValidateApplicantDocument(ApplicantDocument model);

        void DeleteApplicantDocument(int documentId);


        SEAExperience[] SelectExperiences(int applicantId);

        void DeleteExperience(int experienceId);

        void UpdateExperience(SEAExperience model);

        ValidationError[] ValidateExperience(SEAExperience model);

        FilteredResult<Applicant> FilterApplicants(ApplicantFilters filter,
                int currentPage, 
                int itemsPerPage = 5);

        FilteredResult<JobPositionProfile> FilterProfiles(ProfileFilters filter, int currentPage, int itemsPerPage = 5);
        
    }



}
