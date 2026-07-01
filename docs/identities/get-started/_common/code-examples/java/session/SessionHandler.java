package session;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import sh.ory.model.Session;

@RestController
public class SessionHandler {
    @GetMapping("/session")
    public ResponseEntity<Object> getSession(HttpServletRequest request) {
        Session session = (Session) request.getAttribute("session");
        if (session != null && session.getIdentity() != null && session.getIdentity().getTraits() != null) {
            return ResponseEntity.ok(session.getIdentity().getTraits());
        }
        return ResponseEntity.notFound().build();
    }
}
