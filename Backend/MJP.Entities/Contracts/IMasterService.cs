using System;
using MJP.Entities.Models;
using System.Collections.Generic;

namespace MJP.Entities.Contracts
{
    public interface IMasterService
    {
        ListItem[] SelectLOVItems(string lovGroup);

       IEnumerable<Company> SelectCompanies();

        IEnumerable<JobPositionCategory> SelectJobpositionCategories();

         IEnumerable<ListItem> SelectAllDepartments();


        ListItem[] SelectAllCurrencies();
        

        IEnumerable<JobPositionRank> SelectAllRanks();

        JobPositionMasters SelectJobpositionMasters();

        JobPositionFilterMasters SelectJobpositionFilterMasters();

        UserProfileMasters SelectUserProfileMasters();

        ListItem[] SelectAllStates();
    }
}
