import { CommonUtils } from "common";
import { APIService } from "../authentication/APIService";
import { APIResult } from "../models/CommonModels";
import { DocumentUploadModel, MJPDocument } from "../models/DocumentModel";
import {DocumentType } from "../models/DocumentModel";
import { BiRuler } from "react-icons/bi";

export class DocumentService {

    private get AxiosInstance() {
        var instance = APIService.getInstance();  
        return instance.AxiosInstance;
    }
  

    private getDocumentSelectUrl(documentType: DocumentType, itemId: number) {
        var url = "";
        switch(documentType) {
            case DocumentType.Applicant : url = "documents/applicantDocuments/" + itemId; break;
            case DocumentType.JobPosition : url = "documents/jobPositionDocuments/" + itemId; break;
            case DocumentType.jobApplication : url = "documents/jobApplicationDocuments/" + itemId; break;
            
        };

        return url;
    }
      

    
    private getDocumentUploadUrl(documentType: DocumentType) {
        var url = "";
        switch(documentType) {
            case DocumentType.Applicant : url = "documents/uploadApplicantDocument"; break;
            case DocumentType.JobPosition : url = "documents/uploadJobPositionDocument"; break;
            case DocumentType.jobApplication : url = "documents/uploadJobApplicationDocument"; break;
            
        };

        return url;
    }
      
    private getDocumentDeleteUrl(documentType: DocumentType, itemId: number) {
        var url = "";
        switch(documentType) {
            case DocumentType.Applicant : url = "documents/applicantFile/" + itemId ; break;
            case DocumentType.JobPosition : url = "documents/JobPosition/" + itemId; break;
            case DocumentType.jobApplication : url = "documents/jobApplication/" +  itemId; break;
            
        };

        return url;
    }


    private getDocumentDownloadUrl(documentType: DocumentType, itemId: number) {
        var url = "";
        switch(documentType) {
            case DocumentType.Applicant : url = "documents/applicantDocument/" + itemId  ; break;
            case DocumentType.JobPosition : url = "documents/jobPositionDocument/" + itemId; break;
            case DocumentType.jobApplication : url = "documents/jobApplicationDocument" + itemId; break;
            
        };

        return url;
    }

    async uploadDocument(formData: FormData, documentType: DocumentType) : Promise<APIResult> {
        //Use the URL based on the document Type
      
        var url = this.getDocumentUploadUrl(documentType);
        return (await this.AxiosInstance.post(url, formData)).data;
    }
  

    async selectDocuments(itemId: number, documentType: DocumentType) : Promise<Array<MJPDocument>> {
        //use the URl based on the document Type
        var url = this.getDocumentSelectUrl(documentType, itemId);

        return (await this.AxiosInstance.get(url)).data;
    }

    async deleteDocument(documentId: number, documentType: DocumentType) : Promise<APIResult> {
        var url = this.getDocumentDeleteUrl(documentType, documentId);

        return (await this.AxiosInstance.delete(url)).data;
    }

    private getFileNameFromHeader(contentDisposition: any) : string {
       
        //The filename will be in the header and it will be like filename="****"
        if (!contentDisposition) return null;
      
        const match = contentDisposition.match(/filename="?([^"]+)"?/);

        return match ? match[1] : null;
    } 

    async downloadDocument(documentId: number, documentType: DocumentType){
        var url = this.getDocumentDownloadUrl(documentType, documentId);

        //Download the file and crate a link and download that
        this.AxiosInstance.get(url, {   responseType: 'blob'}).then((response) => {
                // create file link in browser's memory
                const fileName = this.getFileNameFromHeader(
                    response.headers["content-disposition"]
                );
                
                //Download the content
                CommonUtils.downloadFile(response.data, fileName);
                
                // const href = URL.createObjectURL(response.data);
            
                // // create "a" HTML element with href to file & click
                // const link = document.createElement('a');
                // link.href = href;
                // //Read the file name from content dispostion header
                // const actualFileName = this.getFileNameFromHeader(
                //     response.headers["content-disposition"]
                //   );

                // link.setAttribute('download', actualFileName); //or any other extension
                // document.body.appendChild(link);
                // link.click();
            
                // // clean up "a" element & remove ObjectURL
                // document.body.removeChild(link);
                // URL.revokeObjectURL(href);
          });
    }

    static getDocumentURL(documentId: number, documentType: DocumentType){
        var url = (documentType == DocumentType.JobPosition) ?  "documents/jobDocument/" + documentId:
        "documents/applicationDocument/" + documentId;

        return url;

    }
}