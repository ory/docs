package session;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
public class RefreshSessionHandler {
    private final String baseUrl;

    public RefreshSessionHandler(String baseUrl) {
        this.baseUrl = baseUrl;
    }

    @GetMapping("/refresh-session")
    public void refreshSession(HttpServletResponse response) throws IOException {
        // Redirect to login with refresh=true parameter
        response.sendRedirect(baseUrl + "/ui/login?refresh=true");
    }
}
