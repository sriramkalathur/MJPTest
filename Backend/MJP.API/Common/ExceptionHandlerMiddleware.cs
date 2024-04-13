using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

namespace MJP.API.Controllers
{
    public class ExceptionHandlerMiddleware
    {
        private readonly RequestDelegate next;
        private readonly ILogger<ExceptionHandlerMiddleware> logger;

        public ExceptionHandlerMiddleware(RequestDelegate next, ILogger<ExceptionHandlerMiddleware> logger)
        {
            
            this.next = next;
            this.logger = logger;
        }

        public async Task InvokeAsync(HttpContext httpContext)
        {
            try
            {
                //Just call the next item in the middleware
                await next(httpContext);
            }
            catch (Exception ex)
            {
                LogException(httpContext, ex);
                httpContext.Response.StatusCode = StatusCodes.Status500InternalServerError;

                //HandleExceptionAsync(httpContext, ex);
            }
        }


        private void LogException(HttpContext context, Exception ex){

            StringBuilder error = new StringBuilder();
            error.AppendFormat("Exception : {0}", ex.ToString()).AppendLine();

            error.AppendFormat("URL: {0}", context.Request.Path);

            error.Append("Query String :").AppendLine();
            foreach(var q in context.Request.Query){
                 error.AppendFormat("{0}: {1}", q.Key, q.Value);
            }

            error.Append("Post Data:").AppendLine();
            // foreach(var f in context.Request.Form){
            //      error.AppendFormat("{0}: {1}", f.Key, f.Value);
            // }

            //Finally write the log
            logger.LogError(error.ToString());
        }

        private void HandleExceptionAsync(HttpContext context, Exception exception)
        {
            //context.Response.ContentType = "application/json";
            //context.Response.StatusCode = (int)StatusCodes.Status500InternalServerError;

            //Just redirect to Error Page for friendly error message
            //This needs to be handled seperately for API
            //context.Response.Redirect("/home/Error");
        }
    }
}