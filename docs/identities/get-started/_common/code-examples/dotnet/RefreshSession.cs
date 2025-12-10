using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("refresh-session")]
public class RefreshSessionController : ControllerBase
{
    private readonly string _baseUrl;

    public RefreshSessionController()
    {
        _baseUrl = Environment.GetEnvironmentVariable("ORY_SDK_URL") ?? "http://localhost:4000";
    }

    [HttpGet]
    public IActionResult Handle()
    {
        return Redirect($"{_baseUrl}/ui/login?refresh=true");
    }
}


