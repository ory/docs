package com.ory.test;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;

import static org.junit.jupiter.api.Assertions.*;
import static org.junit.jupiter.api.Assumptions.assumeTrue;

public class IdentityLogoutTest {
    private static final String BASE_URL = TestServerUtils.getBaseUrl();
    private static final HttpClient httpClient = HttpClient.newBuilder()
            .connectTimeout(Duration.ofSeconds(10))
            .followRedirects(HttpClient.Redirect.NEVER)
            .build();

    private static String testEmail;
    private static String testPassword;
    private static String oryBaseUrl;

    @BeforeAll
    public static void setUp() {
        testEmail = System.getenv("TEST_USER_EMAIL");
        String testPasswordEnv = System.getenv("TEST_USER_PASSWORD");
        oryBaseUrl = System.getenv("ORY_SDK_URL");

        assumeTrue(testEmail != null && !testEmail.isEmpty(),
                "TEST_USER_EMAIL environment variable must be set");
        assumeTrue(testPasswordEnv != null && !testPasswordEnv.isEmpty(),
                "TEST_USER_PASSWORD environment variable must be set");
        assumeTrue(oryBaseUrl != null && !oryBaseUrl.isEmpty(),
                "ORY_SDK_URL environment variable must be set");

        testPassword = testPasswordEnv;
    }

    @Test
    public void testLogsInUsingPredefinedEnvVariablesThenLogsOut() throws IOException, InterruptedException {
        // Login and get session cookie
        String sessionCookie = TestServerUtils.selfServiceLogin(oryBaseUrl, testEmail, testPassword);

        // Logout
        HttpRequest logoutRequest = HttpRequest.newBuilder()
                .uri(URI.create(BASE_URL + "/logout"))
                .header("Cookie", sessionCookie)
                .timeout(Duration.ofSeconds(10))
                .build();

        HttpResponse<Void> logoutResponse = httpClient.send(logoutRequest, HttpResponse.BodyHandlers.discarding());

        // After logout, user should be redirected to home page
        assertEquals(302, logoutResponse.statusCode(), "Expected 302 redirect status");
        String logoutLocation = logoutResponse.headers().firstValue("location")
                .orElseThrow(() -> new AssertionError("No location header in logout response"));
        assertEquals("http://127.0.0.1:3000/", logoutLocation,
                "After logout, should redirect to home page");
    }
}
