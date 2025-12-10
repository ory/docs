using Microsoft.AspNetCore.Mvc;
using Ory.Client.Api;
using Ory.Client.Client;

[ApiController]
[Route("/")]
public class SignUpController : ControllerBase
{
    private readonly FrontendApi _ory;
    private readonly string _baseUrl;

    public SignUpController()
    {
        _baseUrl = Environment.GetEnvironmentVariable("ORY_SDK_URL") ?? "http://localhost:4000";
        _ory = new FrontendApi(new Configuration { BasePath = _baseUrl });
    }

    [HttpGet]
    public async Task<IActionResult> Handle()
    {
        try
        {
            var session = await _ory.ToSessionAsync(cookie: Request.Headers.Cookie, cancellationToken: HttpContext.RequestAborted);
            return Ok(session);
        }
        catch (ApiException)
        {
            return Redirect($"{_baseUrl}/self-service/registration/browser");
        }
    }
}


