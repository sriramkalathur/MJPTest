import { CommonUtils, FilteredResult } from "common";
import { APIService } from "../authentication/APIService";
import { Company, CompanyEditModel, CompanyFilter } from "../models/Company";
import { APIResult } from "../models/CommonModels";
import { ApplicationReportItem, ApplicationReportParams } from "../models/ReportModels";

export class ReportService  {
   
    private get AxiosInstance() {
        var instance = APIService.getInstance();  
        return instance.AxiosInstance;
    }


    async filterApplicationReport(params: ApplicationReportParams, currentPage: number) : Promise<FilteredResult<ApplicationReportItem>> {
        var url = "report/applicationsreport?page=" + currentPage;
        var result = (await this.AxiosInstance.post<FilteredResult<ApplicationReportItem>>(url, params)).data;

        return result;
    }

    async downloadReport(params: ApplicationReportParams) : Promise<void> {
        var url = "report/exportapplicationsreport";

        //Export the results as BLOB and then download that
        var response = await this.AxiosInstance.post(url, params, 
                {   responseType: 'blob' });
        // create file link in browser's memory
        const fileName = "Job Applications Report.xlsx";
        //Download the content
        CommonUtils.downloadFile(new Blob([response.data]), fileName);
        
    }  
}
