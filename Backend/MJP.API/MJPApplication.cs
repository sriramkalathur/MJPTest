using Microsoft.Extensions.Logging;


using Microsoft.Extensions.Caching.Memory;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;

using Microsoft.Extensions.FileProviders;
using System.Web;
using System.IO;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

using MJP.Entities.Models;
using System.Collections.Generic;
using MJP.Infrastructure;
using log4net;
using Microsoft.AspNetCore.Mvc.NewtonsoftJson;
using System.Linq;
using MJP.Entities.Contracts;
using MJP.Services;

using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.Extensions.Logging.Log4Net.AspNetCore;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using MJP.API.Controllers;

namespace MJP.API
{

    public class MJPApplication
    {

        private void ConfigureServices(IServiceCollection services){
            //services.AddEndpointsApiExplorer();
            //services.AddSwaggerGen();

            services.AddTransient<MJPContext>();
            services.AddTransient<IJobPositionService, JobPositionService>();
            services.AddTransient<IUserService, UserService>();
            services.AddTransient<IMasterService, MasterService>();
            services.AddTransient<IJobFeatureService, JobFeatureService>();
           
            services.AddTransient<IJobRequirementService, JobRequirementService>();
            services.AddTransient<IJobApplicationService, JobApplicationService>();
            services.AddTransient<IDocumentService, DocumentService>();
            services.AddTransient<ICompanyService, CompanyService>();

             services.AddTransient<IApplicantService, ApplicantService>();
            services.AddTransient<IReportService, ReportService>();
            services.AddTransient<IEmailService, EMailService>();
            services.AddTransient<IApplicantCourseService, ApplicantCourseService>();

            services.AddControllers().AddNewtonsoftJson();
        }


        private void AddAuthentication(IServiceCollection services, MJPJWTSettings jwtSettings){
            services.AddAuthentication(opt => {
                    opt.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                    opt.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                    
                }).AddJwtBearer(options => {
                    options.TokenValidationParameters = new TokenValidationParameters {
                        
                             //ValidateIssuer = true,
                            //ValidateAudience = true,
                            ValidateLifetime = true,
                            //ValidateIssuerSigningKey = true,
                            ValidIssuer = jwtSettings.Issuer,
                            ValidAudience = jwtSettings.Audience,
                            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings.Secret))
                };
            });
        }

        private void InitializeConfigSettings(ConfigurationManager config, IServiceCollection services){

            //Initialie CORS settings
            var jwtSettings = new MJPJWTSettings();
            config.GetSection("JWT").Bind(jwtSettings);
            //Add the config
            services.AddSingleton(typeof(MJPJWTSettings), jwtSettings);
            //Add authenticatation
            AddAuthentication(services, jwtSettings);

            //Email settings
            var emailSettings = new EmailConfigSettings();      
            config.GetSection("EmailSettings").Bind(emailSettings);
            //Add singleton
            services.AddSingleton(typeof(EmailConfigSettings), emailSettings);

            //Initize connections string
            var connString = config.GetSection("AppSettings").GetValue<string>("ConnectionString");
            //Set the connetion string
            MJPContext.ConnectionString = connString;


             //Point the SPA directory that will be served as static files
            //This includes the spa static files
            //This will be the root folder not the wwwroot
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "dist";
        
            });
        }
       

        public void StartApp(string[] args){
            var builder = WebApplication.CreateBuilder(args);
        
            // Add services to the container.
            builder.Logging.AddLog4Net();

            builder.Services.AddControllers();
            
            //Supress AUTO validation.If we don't do that, 400 BAD request will be automatically
            //return fro Invalid data
            builder.Services.Configure<ApiBehaviorOptions>(options
                => options.SuppressModelStateInvalidFilter = true);

            ConfigureServices(builder.Services);
            //Initialize the config..
            InitializeConfigSettings(builder.Configuration, builder.Services);
          
            //Build the setting
            var app = builder.Build();
           
            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                //app.UseSwagger();
                //app.UseSwaggerUI();
               
            }


            // Note:
            /* The order of middlewares matters a lot
             1) Exception middle ware -> All the excpetions are routed
             2)Use static() & spaStatic() files to handle static files built from SPA
             3) Use routing() after spa
             4) use Authentication & Authorization
             5) Use our controllers
            */
            
            var corsOrigin = builder.Configuration.GetValue<string>("CorsOrigin");
            app.UseCors( policy  =>
                {
                    //Allow WW-Authenticate & content-disostion headers
                    policy.WithOrigins(corsOrigin).AllowAnyMethod()
                        .AllowAnyHeader()
                        .WithExposedHeaders("WWW-Authenticate", "Content-Disposition");
                      
                });
            //app.UseHttpsRedirection();
           
            app.UseCookiePolicy();

            
            app.UseSpaStaticFiles();
            app.UseStaticFiles();

            
            app.UseMiddleware<ExceptionHandlerMiddleware>();
            app.UseRouting();
            
            app.UseAuthentication();
            app.UseAuthorization();
            
            app.UseEndpoints(endpoints => {
                //endpoints.MapHealthChecks("/healthz").RequireAuthorization();
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "api/{controller=Home}/{action=Index}/{id?}");
                //endpoints.MapRazorPages();
                endpoints.MapControllers();
            });
         

            //app.MapControllers();

            //For SPA pages
            app.UseSpa(spa =>
            {   
                //The files built will be placed in "dist" folder.
                spa.Options.SourcePath = "dist";
                
            });

            app.Run();
        }

    }
}

