package mainproject.cafeIn.global.auth.userdetails;

import lombok.Builder;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import mainproject.cafeIn.domain.member.entity.Member;
import mainproject.cafeIn.domain.member.entity.enums.MemberStatus;
import mainproject.cafeIn.domain.member.repository.MemberRepository;
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
    private final MemberRepository memberRepository;
    private final CustomAuthorityUtils authorityUtils;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Owner> optionalOwner = ownerRepository.findByEmail(username);
        Owner owner = optionalOwner.orElse(null);

        Optional<Member> optionalMember = memberRepository.findByEmail(username);
        Member member = optionalMember.orElse(null);

        if (owner != null && owner.getOwnerStatus() != OwnerStatus.OWNER_QUIT) {
            return new OwnerDetails(owner);
        } else if (member != null && member.getStatus() != MemberStatus.MEMBER_QUIT) {
            return new MemberDetails(member);
        }
        throw new CustomException(ErrorCode.MEMBER_NOT_FOUND);
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

    private final class MemberDetails extends Member implements UserDetails {
        MemberDetails(Member member) {
            setId(member.getId());
            setDisplayName(member.getDisplayName());
            setEmail(member.getEmail());
            setPassword(member.getPassword());
            setRoles(member.getRoles());
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
        public boolean isAccountNonExpired() {
            return true;
        }

        @Override
        public boolean isAccountNonLocked() {
            return true;
        }

        @Override
        public boolean isCredentialsNonExpired() {
            return true;
        }

        @Override
        public boolean isEnabled() {
            return true;
        }
    }
}
