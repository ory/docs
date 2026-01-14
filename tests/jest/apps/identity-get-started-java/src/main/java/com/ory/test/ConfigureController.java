package com.ory.test;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class ConfigureController {
    @Value("${ory.sdk.url:http://localhost:4000}")
    private String orySdkUrl;

    @GetMapping("/configure")
    public Map<String, String> configure() {
        return Map.of("orySdkUrl", orySdkUrl);
    }
}
