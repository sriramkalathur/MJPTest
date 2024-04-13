import { FilteredResult } from "common";
import { APIService } from "../authentication/APIService";
import { Company, CompanyEditModel, CompanyFilter, RPSLDetails, RecommendedCompany } from "../models/Company";
import { APIResult } from "../models/CommonModels";

export class CompanyService {
   
    private get AxiosInstance() {
        var instance = APIService.getInstance();  
        return instance.AxiosInstance;
    }


    async filterCompanies(filter: CompanyFilter, currentPage: number) : Promise<FilteredResult<Company>> {
        var url = "company/filtercompanies?page=" + currentPage;
        var result = (await this.AxiosInstance.post<FilteredResult<Company>>(url, filter)).data;

        return result;
    }

    async updateCompany(company: CompanyEditModel) : Promise<APIResult>{
        var url = "company/update";

        //Call API
        return (await this.AxiosInstance.post(url, company)).data;
    }


    async selectCompany(companyId: number) : Promise<CompanyEditModel>{
        var url = "company/details/" + companyId;

        //Call API
        return (await this.AxiosInstance.get(url)).data;
    }


    STATUS_CODE_NO_CONTENT = 204;

    async selectRPSLDetails(rpslNumber: string) : Promise<RPSLDetails>{
        var url = "company/rpslDetails?rpslNumber=" + rpslNumber;

        //Call API
        var resp = (await this.AxiosInstance.get(url));
        //If there is no RSPL detials, NOCONTENT will be returned
        return (resp.status == this.STATUS_CODE_NO_CONTENT) ? null: resp.data;
    }

    async selectRecommendedCompanies(currentPage: number) : Promise<FilteredResult<RecommendedCompany>> {
        var url = "company/recommended?page=" + currentPage;
        var result = (await this.AxiosInstance.post<FilteredResult<RecommendedCompany>>(url)).data;

        return result;
    }
}
