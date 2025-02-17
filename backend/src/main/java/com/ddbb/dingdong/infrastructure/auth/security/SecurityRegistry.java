package com.ddbb.dingdong.infrastructure.auth.security;

import com.ddbb.dingdong.domain.user.entity.vo.Role;
import java.util.*;

public class SecurityRegistry {
    private final Map<String, Set<Role>> rules = new LinkedHashMap<>();
    private static final Set<Role> ALL_ROLES = new HashSet<>(Arrays.asList(Role.values()));
    private List<String> currentPatterns;

    public SecurityRegistry antMatchers(String... patterns) {
        this.currentPatterns = Arrays.asList(patterns);
        return this;
    }

    public SecurityRegistry antMatchers(Collection<String> patterns) {
        this.currentPatterns = new ArrayList<>(patterns);
        return this;
    }

    public SecurityRegistry permitAll() {
        if (currentPatterns != null) {
            for (String pattern : currentPatterns) {
                rules.put(pattern, Collections.emptySet());
            }
        }
        return this;
    }

    public SecurityRegistry hasRole(String roleName) {
        if (currentPatterns != null) {
            Role role = Role.valueOf(roleName);
            for (String pattern : currentPatterns) {
                if(rules.containsKey(pattern)) {
                    rules.get(pattern).add(role);
                } else {
                    rules.put(pattern, Set.of(role));
                }
            }
        }
        return this;
    }

    public SecurityRegistry anyRequest() {
        currentPatterns = List.of("/**");
        return this;
    }

    public SecurityRegistry authenticated() {
        if(currentPatterns != null) {
            for (String pattern : currentPatterns) {
                rules.put(pattern, ALL_ROLES);
            }
        }
        return this;
    }

    public Map<String, Set<Role>> build() {
        return Collections.unmodifiableMap(rules);
    }
}
