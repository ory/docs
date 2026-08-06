package com.ory.test;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class TestServerUtils {
    private static final String BASE_URL = "http://127.0.0.1:3000";
    private static final HttpClient httpClient = HttpClient.newBuilder()
            .connectTimeout(Duration.ofSeconds(10))
            .build();
    private static final ObjectMapper objectMapper = new ObjectMapper();

    public static String getBaseUrl() {
        return BASE_URL;
    }

    public static void waitForServer() throws InterruptedException, IOException {
        int maxAttempts = 30;
        int attempt = 0;

        while (attempt < maxAttempts) {
            try {
                HttpRequest request = HttpRequest.newBuilder()
                        .uri(URI.create(BASE_URL + "/configure"))
                        .timeout(Duration.ofSeconds(2))
                        .build();

                HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
                if (response.statusCode() == 200) {
                    return;
                }
            } catch (Exception e) {
                // Server not ready yet
            }

            attempt++;
            Thread.sleep(1000);
        }

        throw new RuntimeException("Server failed to start within timeout");
    }

    public static String selfServiceLogin(String baseUrl, String email, String password) throws IOException, InterruptedException {
        // Get login API flow
        HttpRequest loginFlowRequest = HttpRequest.newBuilder()
                .uri(URI.create(baseUrl + "/self-service/login/api"))
                .header("Accept", "application/json")
                .build();

        HttpResponse<String> loginFlowResponse = httpClient.send(loginFlowRequest, HttpResponse.BodyHandlers.ofString());
        JsonNode loginFlowJson = objectMapper.readTree(loginFlowResponse.body());

        // Extract flow ID and CSRF token
        String flowId = loginFlowJson.get("id").asText();
        String csrfToken = extractCsrfToken(loginFlowJson);

        // Submit login
        String loginBody = String.format(
                "{\"method\":\"password\",\"csrf_token\":\"%s\",\"identifier\":\"%s\",\"password\":\"%s\"}",
                csrfToken, email, password
        );

        HttpRequest loginSubmitRequest = HttpRequest.newBuilder()
                .uri(URI.create(baseUrl + "/self-service/login?flow=" + flowId))
                .header("Content-Type", "application/json")
                .header("Accept", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(loginBody))
                .build();

        HttpResponse<String> loginSubmitResponse = httpClient.send(loginSubmitRequest, HttpResponse.BodyHandlers.ofString());

        if (loginSubmitResponse.statusCode() != 200) {
            throw new RuntimeException("Login failed with status " + loginSubmitResponse.statusCode());
        }

        // Extract session cookie from response
        String setCookieHeader = loginSubmitResponse.headers().firstValue("set-cookie")
                .orElseThrow(() -> new RuntimeException("No set-cookie header in login response"));

        return parseCookie(setCookieHeader);
    }

    private static String extractCsrfToken(JsonNode json) {
        JsonNode ui = json.get("ui");
        if (ui != null) {
            JsonNode nodes = ui.get("nodes");
            if (nodes != null && nodes.isArray()) {
                for (JsonNode node : nodes) {
                    JsonNode attributes = node.get("attributes");
                    if (attributes != null && "csrf_token".equals(attributes.get("name").asText())) {
                        JsonNode value = attributes.get("value");
                        if (value != null) {
                            return value.asText();
                        }
                    }
                }
            }
        }
        return "";
    }

    private static String parseCookie(String setCookieHeader) {
        // Extract the first cookie value (session cookie)
        // Handle multiple cookies separated by comma (RFC 6265)
        String[] cookieStrings = setCookieHeader.split(", ");
        for (String cookieStr : cookieStrings) {
            cookieStr = cookieStr.trim();
            String[] parts = cookieStr.split(";");
            if (parts.length > 0 && parts[0].contains("=")) {
                String nameValue = parts[0].trim();
                // Check if it's a session cookie (starts with ory_session)
                if (nameValue.startsWith("ory_session")) {
                    return nameValue;
                }
            }
        }
        // Fallback: return first cookie if no session cookie found
        String[] parts = setCookieHeader.split(";");
        if (parts.length > 0) {
            return parts[0].trim();
        }
        throw new RuntimeException("Could not parse cookie from header: " + setCookieHeader);
    }
}
