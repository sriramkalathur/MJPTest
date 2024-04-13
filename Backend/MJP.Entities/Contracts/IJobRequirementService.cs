using System;
using MJP.Entities.Models;
using System.Collections.Generic;

namespace MJP.Entities.Contracts
{
    public interface IJobRequirementService
    {
        ///Select the JobPositions based on the applicant
        IEnumerable<JobPositionRequirement> SelectJobRequirements(int jobPositionId);


        void UpdateJobRequirement(JobPositionRequirement model);

        void DeleteJobRequirement(int jobRequirementId);

    }
}
