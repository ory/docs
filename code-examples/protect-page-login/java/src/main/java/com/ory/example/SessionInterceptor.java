package com.ory.example;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import sh.ory.ApiClient;
import sh.ory.ApiException;
import sh.ory.Configuration;
import sh.ory.api.FrontendApi;
import sh.ory.model.Session;

@Component
public class SessionInterceptor implements HandlerInterceptor {
    private final FrontendApi frontendApi;
    private final String basePath;

    public SessionInterceptor(@Value("${ory.sdk.url:http://localhost:4000}") String basePath) {
        this.basePath = basePath;
        ApiClient apiClient = Configuration.getDefaultApiClient();
        apiClient.setBasePath(basePath);
        this.frontendApi = new FrontendApi(apiClient);
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String cookieHeader = request.getHeader("Cookie");
        
        // Get session from Ory
        Session session;
        try {
            session = frontendApi.toSession(null, cookieHeader, null);
        } catch (ApiException e) {
            session = null;
        }
        
        // Check if session is valid
        if (session == null || !session.getActive() || session.getIdentity() == null) {
            response.sendRedirect(basePath + "/ui/login");
            return false;
        }
        
        // Store session in request attribute for controllers to access
        request.setAttribute("session", session);
        return true;
    }
}
