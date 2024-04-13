using System;
using MJP.Entities.Models;

namespace MJP.Entities.Contracts
{
    public interface IJobApplicationService
    {
        ///Filters the job applications. Pass applcantId as NULL to get all valies
        FilteredResult<JobApplication> FilterJobApplications(ApplicationFilterModel filter,
                int? applicantId,
                int currentPage, 
                int itemsPerPage = 5);
 
        void UpdateApplicationStatus(ApplicationStatusItem status);

        JobApplicationDetails SelectJobApplicationDetails(int jobPositionId, int? applicantId);
        
        //int? GetJobApplicationId(int jobPositionId, int applicationId);

        ValidationError[] ApplyForJobPosition(JobPositionApplyModel model);


        void ApplyForJobPosition(BulkJobPositionApplyModel model);

        void UpdateJobApplicationDetails(JobApplicationDetails model);
        
        JobApplicationDetails SelectJobApplicationDetails(int jobApplicationId);


        FilteredResult<ApplicantJobPosition> SearchJobPositions(JobSearchFilter filter,
                            int? applicantId,
                            int currentPage, 
                            int itemsPerPage = 5);

        FilteredResult<JobApplication> SelectJobsByApplicant(int applicantId,
                int currentPage, 
                int itemsPerPage = 5);

        //Validate Job Position before applying
        ValidationError[] Validate(BulkJobPositionApplyModel model);
    }
}
