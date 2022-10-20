using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Polonicus_API.Exceptions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Polonicus_API.Middleware
{
    public class ErrorHandlingMiddleware: IMiddleware
    {
        private readonly ILogger<ErrorHandlingMiddleware> logger;

        public ErrorHandlingMiddleware(ILogger<ErrorHandlingMiddleware> _logger)
        {
            logger = _logger;
        }

        public async Task InvokeAsync(HttpContext context, RequestDelegate next)
        {
            try
            {
                await next.Invoke(context);
            }
            catch (BadRequestException badRequestException)
            {
                context.Response.StatusCode = 400;
                await context.Response.WriteAsync(badRequestException.Message);
            }
            catch (ForbidException forbidException)
            {
                context.Response.StatusCode = 403;
            }
            catch (NotFoundException notFoundException)
            {
                context.Response.StatusCode = 404;
                await context.Response.WriteAsync(notFoundException.Message);
            }

            catch (Exception e)
            {
                logger.LogError(e, e.Message);
                //error status
                context.Response.StatusCode = 500; 
                await context.Response.WriteAsync("Something went wrong");
            }
        }

    }
}
