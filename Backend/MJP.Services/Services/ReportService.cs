using System;
using MJP.Entities.Contracts;
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

namespace MJP.Services
{
    public class ReportService : IReportService
    {
         private MJPContext context;

        private ILogger<ReportService> logger;

        public ReportService(MJPContext context, ILogger<ReportService> logger){
            this.context = context;
            this.logger =logger;
        }


        private ApplicationReportItem ReadApplicationReportItem(DbDataReader reader){
            return new ApplicationReportItem(){
                Applicant= reader.ReadString("ApplicantName"),
                ApplicationNumber = reader.ReadString("ApplicationNumber"),
                ApplicationStatusId = reader.ReadInteger("ApplicationStatusId"),
                AppliedDate = reader.ReadDateTime("AppliedDate"),

                Category = reader.ReadString("Category"),
                Company = reader.ReadString("CompanyName"),
                JobCode = reader.ReadString("JobCode"),
                PositionTitle = reader.ReadString("PositionTitle"),
                PostedDate = reader.ReadDateTime("PostedDate")
            };
        }



        
        public FilteredResult<ApplicationReportItem> FilterReport(ApplicationReportParams filter, int currentPage, 
                            int itemsPerPage = 5){

            var result = new FilteredResult<ApplicationReportItem>();
            var list = new List<ApplicationReportItem>();

            using (var cmd = context.Database.GetDbConnection().CreateCommand())
            {
                cmd.CommandText = "[administration].[FilterApplicationsReport]";
                cmd.CommandType = System.Data.CommandType.StoredProcedure;

                cmd.AddParameter("@postedBefore", filter.PostedBefore);
                 cmd.AddParameter("@postedAfter", filter.PostedAfter);
                cmd.AddParameter("@currentPage",currentPage);
                cmd.AddParameter("@itemsPerPage",itemsPerPage);

                cmd.Connection.Open();
               //var reader = cmd.ExecuteReader();
                cmd.ExecuteDBReader((reader) =>
                {   
                    //The first set will have the Pagination detials
                    reader.Read();

                    result.TotalPages = reader.ReadInteger("TotalPages");
                    result.CurrentPage = currentPage;
                    result.TotalRecords = reader.ReadInteger("TotalRecords");

                    //Move to next result
                    reader.NextResult();

                    while (reader.Read())
                    {
                        list.Add(this.ReadApplicationReportItem(reader));
                    }
                });

                result.Items = list.ToArray();
                return result;
            }
        }

        
        const int ALL_PAGES = -1;


         public IEnumerable<ApplicationReportItem> ExportApplicationsReport(ApplicationReportParams filter){

            //Selet all pages
            var result = this.FilterReport(filter, 1, ALL_PAGES);
            return result.Items;
        }
    }
}