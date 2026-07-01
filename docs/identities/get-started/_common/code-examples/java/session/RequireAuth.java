package session;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.servlet.HandlerInterceptor;
import sh.ory.ApiException;
import sh.ory.api.FrontendApi;
import sh.ory.model.Session;

import java.io.IOException;

public class RequireAuth implements HandlerInterceptor {
    private final FrontendApi ory;
    private final String baseUrl;

    public RequireAuth(FrontendApi ory, String baseUrl) {
        this.ory = ory;
        this.baseUrl = baseUrl;
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws IOException {
        String cookieHeader = request.getHeader("Cookie");

        try {
            Session session = ory.toSession(null, cookieHeader, null);
            if (session != null && session.getActive() != null && session.getActive()) {
                // Store session in request attribute
                request.setAttribute("session", session);
                return true;
            }
        } catch (ApiException e) {
            // Session is invalid or doesn't exist
        }

        // Redirect to login page
        response.sendRedirect(baseUrl + "/self-service/login/browser");
        return false;
    }
}
