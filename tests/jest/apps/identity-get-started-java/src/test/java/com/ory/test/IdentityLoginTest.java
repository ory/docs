package com.ory.test;

import org.junit.jupiter.api.Test;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;

import static org.junit.jupiter.api.Assertions.*;

public class IdentityLoginTest {
    private static final String BASE_URL = TestServerUtils.getBaseUrl();
    private static final HttpClient httpClient = HttpClient.newBuilder()
            .connectTimeout(Duration.ofSeconds(10))
            .followRedirects(HttpClient.Redirect.NEVER)
            .build();

    @Test
    public void testRedirectsToOryLoginUIWhenNoSessionOnLogin() throws IOException, InterruptedException {
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(BASE_URL + "/login"))
                .timeout(Duration.ofSeconds(10))
                .build();

        HttpResponse<Void> response = httpClient.send(request, HttpResponse.BodyHandlers.discarding());

        assertEquals(302, response.statusCode(), "Expected 302 redirect status");
        String location = response.headers().firstValue("location")
                .orElseThrow(() -> new AssertionError("No location header in redirect"));
        assertTrue(location.contains("/self-service/login/browser"),
                "Location should contain /self-service/login/browser, got: " + location);
    }
}
