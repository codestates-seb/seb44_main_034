package mainproject.cafeIn.global.auth.userdetails;

import lombok.RequiredArgsConstructor;
import mainproject.cafeIn.domain.owner.entity.Owner;
import mainproject.cafeIn.domain.owner.enums.OwnerStatus;
import mainproject.cafeIn.domain.owner.repository.OwnerRepository;
import mainproject.cafeIn.global.auth.utils.CustomAuthorityUtils;
import mainproject.cafeIn.global.exception.CustomException;
import mainproject.cafeIn.global.exception.ErrorCode;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class UsersDetailsService implements UserDetailsService { // 사용자 크리덴셜 조회한 후 AuthenticationManager에게 전달
    private final OwnerRepository ownerRepository;
    private final CustomAuthorityUtils authorityUtils;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Owner> optionalOwner = ownerRepository.findByEmail(username);
        Owner findOwner = optionalOwner.orElseThrow(() -> new CustomException(ErrorCode.MEMBER_NOT_FOUND));

        //TODO MemberStatus 조건 추가
        try {
            if (findOwner.getOwnerStatus() == OwnerStatus.OWNER_QUIT) {
                throw new CustomException(ErrorCode.MEMBER_NOT_FOUND);
            }
        } catch (Exception e) {
            throw new CustomException(ErrorCode.MEMBER_NOT_FOUND);
        }
        return new OwnerDetails(findOwner);
    }

    private final class OwnerDetails extends Owner implements UserDetails {
        OwnerDetails(Owner owner) {
            setOwnerId(owner.getOwnerId());
            setEmail(owner.getEmail());
            setPassword(owner.getPassword());
            setRoles(owner.getRoles());
            setOwnerStatus(owner.getOwnerStatus());
        }

        @Override
        public Collection<? extends GrantedAuthority> getAuthorities() {
            return authorityUtils.createAuthorities(this.getRoles());
        }

        @Override
        public String getUsername() {
            return getEmail();
        }

        @Override
        public boolean isAccountNonExpired() { // 계정이 만료되지 않았다.
            return true;
        }

        @Override
        public boolean isAccountNonLocked() { // 계정이 잠겨있지 않다.
            return true;
        }

        @Override
        public boolean isCredentialsNonExpired() { // 사용자 인증 정보가 만료되지 않았다.
            return true;
        }

        @Override
        public boolean isEnabled() { // 사용자 계정이 활성화 되었다.
            return true;
        }
    }
    // TODO MemberDetails 구현
}
