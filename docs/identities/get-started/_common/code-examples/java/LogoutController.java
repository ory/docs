import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import sh.ory.ApiClient;
import sh.ory.Configuration;
import sh.ory.api.FrontendApi;
import sh.ory.model.CreateBrowserLogoutFlowResponse;

public class LogoutController {
    private final FrontendApi ory;
    private final String baseUrl;

    public LogoutController() {
        this.baseUrl = System.getenv().getOrDefault("ORY_SDK_URL", "http://localhost:4000");
        ApiClient apiClient = Configuration.getDefaultApiClient();
        apiClient.setBasePath(baseUrl);
        this.ory = new FrontendApi(apiClient);
    }

    public void handle(HttpServletRequest request, HttpServletResponse response) throws IOException {
        try {
            String cookieHeader = request.getHeader("Cookie");
            CreateBrowserLogoutFlowResponse flow = ory.createBrowserLogoutFlow(cookieHeader);
            response.sendRedirect(flow.getLogoutUrl());
        } catch (Exception e) {
            response.sendRedirect("/");
        }
    }
}


