export class ApplicationReportItem {

    applicant: string;

    postedDate: Date;

    appliedDate: Date;

    applicationStatusId: number;

    category: string;

    jobCode: string;

    companyJobCode: string;

    positionTitle: string;

    company: string;

    applicationNumber: string;
}



export class ApplicationReportParams {

    postedBefore: Date;

    postedAfter: Date;
}