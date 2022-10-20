using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Polonicus_API.Entities;
using Polonicus_API.Middleware;
using Polonicus_API.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Polonicus_API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            var authenticationSettings = new AuthenticationSettings();
            //zbindowanie Jsona configa z instacj¹ obiektu authentication settings

            Configuration.GetSection("JwtAuthentication").Bind(authenticationSettings);
            //rejestruje jako singleton instancje obiektu do autentykacji
            services.AddSingleton(authenticationSettings);

            services.AddAuthentication(option =>
            {
                option.DefaultAuthenticateScheme = "Bearer";
                option.DefaultScheme = "Bearer";
                option.DefaultChallengeScheme = "Bearer";
            }
            ).AddJwtBearer(cfg =>
            {
                cfg.RequireHttpsMetadata = false;
                cfg.SaveToken = true;
                cfg.TokenValidationParameters = new TokenValidationParameters()
                {
                    ValidIssuer = authenticationSettings.JwtIssuer,
                    ValidAudience = authenticationSettings.JwtIssuer,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(authenticationSettings.JwtKey))
                };

            });
            /*  var key = new SymmetricSecurityKey
              services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                  .AddJwtBearer(opt=>
                  {
                      opt.TokenValidationParameters = new TokenValidationParameters
                      {
                          ValidateIssuerSigningKey = true,
                          IssuerSigningKey=
                      }
                  })*/

            //Polityka CORS
            services.AddCors(
                opt => opt.AddPolicy("CorsPolicy", policy =>
                {
                    policy.AllowAnyMethod()
                          .AllowAnyHeader()
                          .AllowAnyOrigin();
                }
                )
            );

            services.AddControllers();
            //Kontekst Bazy Danych
            services.AddDbContext<PolonicusDbContext>();
            //Seeder
            services.AddScoped<PolonicusSeeder>();

            //automapper
            services.AddAutoMapper(this.GetType().Assembly);

            //Serwisy kontrolerów
            services.AddScoped<IChronicleService,ChronicleService>();
            services.AddScoped<IOutpostService, OutpostService>();
            services.AddScoped<IAccountService,AccountService>();

            //
            services.AddScoped<IPasswordHasher<User>, PasswordHasher<User>>();

            //Middleware errorów
            services.AddScoped<ErrorHandlingMiddleware>();

            //Dokumentacja api
            services.AddSwaggerGen();

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, PolonicusSeeder seeder)
        {
            app.UseCors("CorsPolicy");

            //Seedowanie danych
            seeder.Seed();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            //obs³uga b³êdów przed dzia³aniem apki
            app.UseMiddleware<ErrorHandlingMiddleware>();

            app.UseAuthentication();

            app.UseHttpsRedirection();

            //Generacje pliku swagger.json
            app.UseSwagger();
            //Prosty interfejs 
            app.UseSwaggerUI(c => {
                c.SwaggerEndpoint("/swagger/v1/swagger.json","Polonicus_API");
            });

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
