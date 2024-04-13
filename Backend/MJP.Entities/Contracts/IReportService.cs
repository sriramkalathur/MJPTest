using System;
using MJP.Entities.Models;
using System.Collections.Generic;

namespace MJP.Entities.Contracts
{
    public interface IReportService
    {
        FilteredResult<ApplicationReportItem> FilterReport(ApplicationReportParams filter,
                int currentPage=1, int itemsPerPage= 5);
        
        IEnumerable<ApplicationReportItem> ExportApplicationsReport(ApplicationReportParams filter);
    }
}
