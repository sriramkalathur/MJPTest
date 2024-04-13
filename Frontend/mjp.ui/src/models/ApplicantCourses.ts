
export class CertificatesList {

    certificates : Array<CompetencyCertificate>;

    //Indicates wheteher certicate is mandatory
    isCertificateMandatory: boolean;
}


export class CompetencyCertificate {

    competencyCertificateId: number;

    certificateName: string;
    
    certificateId: string;

    details: string;

    applicantId: number;

    grade: string;

    certificateNumber: string;

    //fromDate: Date;

    institution: string;

    board: string;


    yearOfPassing: string;
    
    //toDate: Date;
}



export class STCWCourse {

    stcwCourseId : number;

    courseName: string;
    
    applicantId: number;

    courseId: number;
    
    details: string;

    certificateNumber: string;

    issueDate: Date;

    issuePlace: string;

    expiryDate: Date;
}