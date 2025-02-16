package com.ddbb.dingdong.infrastructure.auth.security.filter;

import com.ddbb.dingdong.domain.user.entity.vo.Role;
import com.ddbb.dingdong.infrastructure.auth.security.AuthUser;
import com.ddbb.dingdong.infrastructure.auth.security.AuthenticationManager;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.servlet.HandlerInterceptor;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

@Component
@RequiredArgsConstructor
public class SessionInterceptor implements HandlerInterceptor {
    private final AuthenticationManager authenticationManager;
    private final Map<String, Set<Role>> roleMapping;
    private final AntPathMatcher pathMatcher = new AntPathMatcher();

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        Set<Role> REQUIRED_ROLES = new HashSet<>();

        if (request.getMethod().equals("OPTIONS")) {
            return true;
        }

        if(!requireLoggedIn(request.getRequestURI(), REQUIRED_ROLES)) {
            return true;
        }

        AuthUser authUser = authenticationManager.getAuthentication();

        if(authUser == null) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return false;
        }

        if (!isAuthorized(authUser, REQUIRED_ROLES)) {
            response.setStatus(HttpServletResponse.SC_FORBIDDEN);
            return false;
        }

        return true;
    }

    private boolean requireLoggedIn(String uri , Set<Role> REQUIRED_ROLES) {
        Set<Role> defaultRoles = new HashSet<>();
        for (Map.Entry<String, Set<Role>> entry : roleMapping.entrySet()) {
            String pattern = entry.getKey();
            if("/**".equals(pattern)) {
                defaultRoles = entry.getValue();
                continue;
            }

            if (pathMatcher.match(pattern, uri)) {
                REQUIRED_ROLES.addAll(entry.getValue());
                if (REQUIRED_ROLES.isEmpty()) {
                    return false;
                }
            }
        }
        if(REQUIRED_ROLES.isEmpty()) {
            REQUIRED_ROLES.addAll(defaultRoles);
        }

        return !REQUIRED_ROLES.isEmpty();
    }

    private boolean isAuthorized(AuthUser authUser, Set<Role> REQUIRED_ROLES) {
        return REQUIRED_ROLES.contains(authUser.role());
    }
}
