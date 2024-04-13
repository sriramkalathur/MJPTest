using System;
using MJP.Entities.Models;


namespace MJP.Entities.Contracts
{
    public interface ICompanyService
    {

        ValidationError[] ValidateCompany(EditCompany model);

        RPSLDetails SelectRPSLDetails(string rpslNumber);

          ///Select the JobPositions based on the applicant
        void UpdateCompany(EditCompany model);

        EditCompany SelectCompany(int companyId);

        FilteredResult<Company> FilterRecommendedCompanies(int currentPage, 
                            int itemsPerPage = 5);

        FilteredResult<Company> FilterCompanies(CompanyFilterModel filter, int currentPage=1, int itemsPerPage= 5);
    }
}
