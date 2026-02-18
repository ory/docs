package com.ory.test;

import session.RequireAuth;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import sh.ory.ApiClient;
import sh.ory.Configuration;
import sh.ory.api.FrontendApi;

@Configuration
public class AppConfig implements WebMvcConfigurer {
    @Value("${ory.sdk.url:http://localhost:4000}")
    private String baseUrl;

    @Autowired
    private RequireAuth requireAuth;

    @Bean
    public FrontendApi frontendApi() {
        ApiClient apiClient = Configuration.getDefaultApiClient();
        apiClient.setBasePath(baseUrl);
        return new FrontendApi(apiClient);
    }

    @Bean
    public SignUpHandler signUpHandler(FrontendApi frontendApi) {
        return new SignUpHandler(frontendApi, baseUrl);
    }

    @Bean
    public LoginHandler loginHandler(FrontendApi frontendApi) {
        return new LoginHandler(frontendApi, baseUrl);
    }

    @Bean
    public LogoutHandler logoutHandler(FrontendApi frontendApi) {
        return new LogoutHandler(frontendApi);
    }

    @Bean
    public session.SessionHandler sessionHandler() {
        return new session.SessionHandler();
    }

    @Bean
    public session.RefreshSessionHandler refreshSessionHandler() {
        return new session.RefreshSessionHandler(baseUrl);
    }

    @Bean
    public RequireAuth requireAuth(FrontendApi frontendApi) {
        return new RequireAuth(frontendApi, baseUrl);
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(requireAuth)
                .addPathPatterns("/session");
    }
}
