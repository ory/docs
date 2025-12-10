using Microsoft.AspNetCore.Http;
using Ory.Client.Api;
using Ory.Client.Client;
using System.Threading.Tasks;

public class SessionMiddleware
{
    private readonly RequestDelegate _next;
    private readonly FrontendApi _ory;
    private readonly string _baseUrl;

    public SessionMiddleware(RequestDelegate next)
    {
        _next = next;
        _baseUrl = Environment.GetEnvironmentVariable("ORY_SDK_URL") ?? "http://localhost:4000";
        _ory = new FrontendApi(new Configuration { BasePath = _baseUrl });
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            var session = await _ory.ToSessionAsync(cookie: context.Request.Headers.Cookie, cancellationToken: context.RequestAborted);
            context.Items["req.session"] = session;
            await _next(context);
        }
        catch (ApiException)
        {
            context.Response.Redirect($"{_baseUrl}/self-service/login/browser");
        }
    }
}


