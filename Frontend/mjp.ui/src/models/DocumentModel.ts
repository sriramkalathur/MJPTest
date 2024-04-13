

export enum DocumentType {
    None,

    //Documents for a JobPosition
    JobPosition,

    //Documents for a Job Application
    jobApplication,

    //Documents for Applicant
    Applicant
}

export class DocumentUploadModel {

    //Job Position/Job Application Id
    documentId: number;

    remarks?: string;

    fileContent: File;

}

export class MJPDocument {

    //Job Position/Job Application Id
    documentId: number;

    remarks: string;

    uploadedBy: string;

    uploadedTime: Date;

    fileName: string;
}