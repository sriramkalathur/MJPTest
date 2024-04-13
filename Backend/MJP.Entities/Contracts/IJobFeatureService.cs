using System;
using MJP.Entities.Models;
using System.Collections.Generic;

namespace MJP.Entities.Contracts
{
    public interface IJobFeatureService
    {
          ///Select the JobPositions based on the applicant
        IEnumerable<JobPositionFeature> SelectJobFeatures(int jobPositionId);

        void UpdateJobFeature(JobPositionFeature model);

        void DeleteJobFeature(int jobFeatureId);


    }
}
