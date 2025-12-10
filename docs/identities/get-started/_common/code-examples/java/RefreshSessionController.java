import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;

public class RefreshSessionController {
    private final String baseUrl;

    public RefreshSessionController() {
        this.baseUrl = System.getenv().getOrDefault("ORY_SDK_URL", "http://localhost:4000");
    }

    public void handle(HttpServletResponse response) throws IOException {
        response.sendRedirect(baseUrl + "/ui/login?refresh=true");
    }
}


