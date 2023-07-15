package mainproject.cafeIn.global.auth.utils;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class CustomAuthorityUtils {
    private final List<GrantedAuthority> OWNER_ROLES = AuthorityUtils.createAuthorityList("ROLE_OWNER");
    private final List<GrantedAuthority> USER_ROLES = AuthorityUtils.createAuthorityList("ROLE_MEMBER");

    private final List<String> OWNER_ROLES_STRING = List.of("OWNER");
    private final List<String> USER_ROLES_STRING = List.of("MEMBER");

    public List<GrantedAuthority> createAuthorities(String uri) {
        if (uri.contains("/api/owners")) {
            return OWNER_ROLES;
        }
        return USER_ROLES;
    }

    public List<GrantedAuthority> createAuthorities(List<String> roles) {
        return roles.stream()
                .map(role -> new SimpleGrantedAuthority("ROLE_" + role))
                .collect(Collectors.toList());
    }

    public List<String> createRoles(String uri) {
        if (uri.contains("/api/owners")) {
            return OWNER_ROLES_STRING;
        }
        return USER_ROLES_STRING;
    }

}
