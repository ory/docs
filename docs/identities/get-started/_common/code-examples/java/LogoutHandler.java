import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import sh.ory.ApiException;
import sh.ory.api.FrontendApi;
import sh.ory.model.LogoutFlow;

import java.io.IOException;

@RestController
public class LogoutHandler {
    private final FrontendApi ory;

    public LogoutHandler(FrontendApi ory) {
        this.ory = ory;
    }

    @GetMapping("/logout")
    public void logout(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String cookieHeader = request.getHeader("Cookie");

        try {
            LogoutFlow logoutFlow = ory.createBrowserLogoutFlow(cookieHeader);
            String logoutUrl = logoutFlow.getLogoutUrl();
            if (logoutUrl != null) {
                response.sendRedirect(logoutUrl);
                return;
            }
        } catch (ApiException e) {
            // Error creating logout flow
        }

        // Redirect to home page if there's an error
        response.sendRedirect("/");
    }
}
