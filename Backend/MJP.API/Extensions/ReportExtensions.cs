using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using ClosedXML.Excel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MJP.API.Common;
using MJP.Entities;
using MJP.Entities.Models;
using Newtonsoft.Json;

namespace MJP.API.Common
{


    public static class MJPReportExtensions
    {
        static readonly XLColor HEADER_BACK_COLOR = XLColor.LightBlue;
        const string DATE_FORMAT = "dd MMM yy";
        const string TIME_FORMAT = @"hh\:mm";


        private static string GetApplicationStatusDisplayText(int statusId ){
        
            switch(statusId){
                case MJPConstants.APPLICATION_STATUS_APPLIED: return "Applied";
                case MJPConstants.APPLICATION_STATUS_CANCELLED: return "Cancelled";

                //case MJPConstants.APPLICATION_STATUS_EXPIRED: return "Expired";
                case MJPConstants.APPLICATION_STATUS_NOT_SELECTED: return "Not Selected";

                case MJPConstants.APPLICATION_STATUS_SELECTED: return "Selected";
                case MJPConstants.APPLICATION_STATUS_ONHOLD: return "On Hold";

                case MJPConstants.APPLICATION_STATUS_REJECTED: return "Rejected";
                case MJPConstants.APPLICATION_STATUS_SHORTLISTED: return "Shortlisted";
                default : return "";
            }
        }

       public static void ExportApplicationsReport(IEnumerable<ApplicationReportItem> items,
                System.IO.Stream stream)
        {
           
            using (var workbook = new XLWorkbook())
            {
                IXLWorksheet worksheet = workbook.Worksheets.Add("Applications");

                //Write the Course batch details..
              
                //Lave one row 
                var row = 1;
                worksheet.Cell(row, 1).Value = "Job Code";
                worksheet.Cell(row, 2).Value = "Application #";
                worksheet.Cell(row, 3).Value = "Position Title";
                worksheet.Cell(row, 4).Value = "Company";
                worksheet.Cell(row, 5).Value = "Category";
                worksheet.Cell(row, 6).Value = "Posted On";

                worksheet.Cell(row, 7).Value = "Applied Date";
                worksheet.Cell(row, 8).Value = "Applicant";

                worksheet.Cell(row, 9).Value = "Applicant Status";                
                //Set the background color
                //worksheet.Range("A1:K1").Style.Fill.BackgroundColor = XLColor.AliceBlue;
                worksheet.Range($"A{row}:I{row}").Style.Fill.BackgroundColor = HEADER_BACK_COLOR;

                //Row 1 -> header, i starts from 0. So add i+2
                row++;

                foreach(var item in items)
                {
                    //var student = model.Students.ElementAt(i);
                    worksheet.Cell(row, 1).Value = item.JobCode;
                    worksheet.Cell(row, 2).Value = item.ApplicationNumber;

                    worksheet.Cell(row, 3).Value = item.PositionTitle;
                    worksheet.Cell(row, 4).Value = item.Company;

                    worksheet.Cell(row, 5).Value = item.Category;
                    worksheet.Cell(row, 6).Value = item.PostedDate.ToString(DATE_FORMAT);

                     worksheet.Cell(row, 7).Value =item.AppliedDate.ToString(DATE_FORMAT);
                    worksheet.Cell(row, 8).Value = item.Applicant;

                    worksheet.Cell(row, 9).Value = GetApplicationStatusDisplayText(item.ApplicationStatusId);
                    
                    row += 1;
                }

                workbook.SaveAs(stream);
            }
        }


    }
}