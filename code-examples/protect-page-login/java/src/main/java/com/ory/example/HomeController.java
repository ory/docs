package com.ory.example;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import sh.ory.model.Session;

@RestController
public class HomeController {
    @GetMapping("/")
    public ResponseEntity<Session> home(HttpServletRequest request) {
        // Get session from request attribute (set by SessionInterceptor)
        Session session = (Session) request.getAttribute("session");
        return ResponseEntity.ok(session);
    }
}
