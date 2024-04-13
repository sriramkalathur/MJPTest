using System;
using MJP.Entities.Models;

namespace MJP.Entities.Contracts
{
    public interface IDocumentService
    {
        void UploadApplicationDocument(MJPDocumentUploadModel document);

        void UploadJobPositionDocument(MJPDocumentUploadModel document);
        
         void UploadApplicantFile(MJPDocumentUploadModel document);

        MJPDocument[] SelectApplicantFiles(int applicantId);


        MJPDocument[] SelectJobApplicationDocuments(int jobPositionId);

        MJPDocument[] SelectJobPositionDocuments(int jobPositionId);


        void DeleteJobApplicationDocument(int documentId);

        void DeleteApplicantFile(int applicantFileId);

        void DeleteJobPositionDocument(int documentId);

        MJPDocument  SelectJobDocument(int documentId);

        MJPDocument  SelectApplicantFile(int applicantFileId);

        MJPDocument  SelectApplicationDocument(int documentId);
    }
}
