import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import sh.ory.ApiException;
import sh.ory.api.FrontendApi;
import sh.ory.model.Session;

import java.io.IOException;

@RestController
public class LoginHandler {
    private final FrontendApi ory;
    private final String baseUrl;

    public LoginHandler(FrontendApi ory, String baseUrl) {
        this.ory = ory;
        this.baseUrl = baseUrl;
    }

    @GetMapping("/login")
    public void login(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String cookieHeader = request.getHeader("Cookie");

        try {
            Session session = ory.toSession(null, cookieHeader, null);
            if (session != null && session.getActive() != null && session.getActive()) {
                // Session is valid, return session data as JSON
                response.setContentType("application/json");
                response.setStatus(HttpServletResponse.SC_OK);
                response.getWriter().write(session.toString());
                return;
            }
        } catch (ApiException e) {
            // Session is invalid or doesn't exist
        }

        // Redirect to login page
        response.sendRedirect(baseUrl + "/self-service/login/browser");
    }
}
