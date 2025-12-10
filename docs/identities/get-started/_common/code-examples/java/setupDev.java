import sh.ory.ApiClient;
import sh.ory.Configuration;
import sh.ory.api.FrontendApi;

public class OryClientFactory {
    private static final String DEFAULT_BASE_URL = "http://localhost:4000";

    public static FrontendApi createOryClient() {
        String baseUrl = System.getenv().getOrDefault("ORY_SDK_URL", DEFAULT_BASE_URL);

        ApiClient apiClient = Configuration.getDefaultApiClient();
        apiClient.setBasePath(baseUrl);

        return new FrontendApi(apiClient);
    }
}


