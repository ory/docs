import sh.ory.ApiClient;
import sh.ory.Configuration;
import sh.ory.api.FrontendApi;

public class SetupDev {
    public static final String baseUrl = System.getenv("ORY_SDK_URL") != null 
        ? System.getenv("ORY_SDK_URL") 
        : "http://localhost:4000";

    public static FrontendApi createOryClient() {
        ApiClient apiClient = Configuration.getDefaultApiClient();
        apiClient.setBasePath(baseUrl);
        return new FrontendApi(apiClient);
    }
}
