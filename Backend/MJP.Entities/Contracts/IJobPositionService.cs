using System;
using MJP.Entities.Models;

namespace MJP.Entities.Contracts
{
    public interface IJobPositionService
    {
        ///Select the JobPositions based on the applicant
        //IEnumerable<JobPositionFilterItem> FilterJobPositions(JobPositionFilterModel filter);


        //JobPositionDetails SelectJobPositionDetails(int jobPositionId);

        EditJobPosition SelectJobPositionEdit(int jobPositionId);

        JobPosition SelectJobPositionDetails(int jobPositionId);

        JobPositionTag[] SelectTags(int jobPositionId);

        MJPDocument[] SelectDocuments(int jobPositionId);
        
        void UpdateJobpositionInfo(EditJobPosition model);

       
        FilteredResult<JobPosition> FilterJobPositions(ApplicationFilterModel filter,
                            int currentPage, 
                            int itemsPerPage = 5);

        FilteredResult<JobPosition> SelectRecommendedPositions(int currentpage=1, int itemsPerPage=10);


   

        JobPositionBasicInfo SelectJobPositionBasicInfo(int jobPositionId);
    }
}
