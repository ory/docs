using Microsoft.AspNetCore.Mvc;
using Ory.Client.Api;
using Ory.Client.Client;

[ApiController]
[Route("logout")]
public class LogoutController : ControllerBase
{
    private readonly FrontendApi _ory;

    public LogoutController()
    {
        var baseUrl = Environment.GetEnvironmentVariable("ORY_SDK_URL") ?? "http://localhost:4000";
        _ory = new FrontendApi(new Configuration { BasePath = baseUrl });
    }

    [HttpGet]
    public async Task<IActionResult> Handle()
    {
        try
        {
            var flow = await _ory.CreateBrowserLogoutFlowAsync(cookie: Request.Headers.Cookie, cancellationToken: HttpContext.RequestAborted);
            return Redirect(flow.LogoutUrl);
        }
        catch (ApiException)
        {
            return Redirect("/");
        }
    }
}



