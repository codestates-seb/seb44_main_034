package mainproject.cafeIn.domain.owner.service;

import lombok.RequiredArgsConstructor;
import mainproject.cafeIn.domain.member.repository.MemberRepository;
import mainproject.cafeIn.domain.owner.dto.response.OwnerDetailResponse;
import mainproject.cafeIn.domain.owner.entity.Owner;
import mainproject.cafeIn.domain.owner.enums.OwnerStatus;
import mainproject.cafeIn.domain.owner.repository.OwnerRepository;
import mainproject.cafeIn.global.auth.utils.CustomAuthorityUtils;
import mainproject.cafeIn.global.exception.CustomException;
import mainproject.cafeIn.global.exception.ErrorCode;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class OwnerService {
    private final OwnerRepository ownerRepository;
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final CustomAuthorityUtils authorityUtils;

    @Transactional
    public Owner createOwner(Owner owner, String uri) {
        verifyExistsEmail(owner.getEmail());
        memberRepository.verifyExistsEmail(owner.getEmail());
        verifyExistsDisplayName(owner.getDisplayName());

        String encryptedPassword = passwordEncoder.encode(owner.getPassword());

        List<String> roles = authorityUtils.createRoles(uri);

        Owner saveOwner = Owner.builder()
                .email(owner.getEmail())
                .displayName(owner.getDisplayName())
                .password(encryptedPassword)
                .roles(roles)
                .ownerStatus(OwnerStatus.OWNER_ACTIVE)
                .build();

        return ownerRepository.save(saveOwner);
    }

    @Transactional
    public Owner updateOwner(Owner owner, long ownerId) {
        Owner findOwner = findVerifiedOwner(ownerId);

        Optional.ofNullable(owner.getDisplayName())
                .ifPresent(findOwner::setDisplayName);
        Optional.ofNullable(owner.getPassword())
                .ifPresent(password -> findOwner.setPassword(passwordEncoder.encode(password)));

        return ownerRepository.save(findOwner);
    }

    @Transactional
    public OwnerDetailResponse findOwner(long ownerId) {
        Owner owner = findVerifiedOwner(ownerId);
        return ownerRepository.getOwnerDetailResponse(owner.getOwnerId());
    }

    @Transactional
    public Owner deleteOwner(long ownerId, String password) {
        Owner findOwner = findVerifiedOwner(ownerId);

        if (passwordEncoder.matches(password, findOwner.getPassword())) {
            findOwner.setOwnerStatus(OwnerStatus.OWNER_QUIT);
            ownerRepository.deleteOwnerCafe(findOwner);
        } else {
            throw new CustomException(ErrorCode.PASSWORD_NOT_MATCH);
        }
        return ownerRepository.save(findOwner);
    }

    public Owner findVerifiedOwner(long ownerId) {
        Optional<Owner> optionalOwner = ownerRepository.findById(ownerId);

        return optionalOwner.orElseThrow(() -> new CustomException(ErrorCode.NONE_AUTHORIZATION_TOKEN));
    }

    public void verifyExistsEmail(String email) {
        Optional<Owner> owner = ownerRepository.findByEmail(email);

        if (owner.isPresent()) {
            throw new CustomException(ErrorCode.ALREADY_EXIST_EMAIL);
        }
    }

    private void verifyExistsDisplayName(String displayName) {
        Optional<Owner> owner = ownerRepository.findByDisplayName(displayName);

        if (owner.isPresent()) {
            throw new CustomException(ErrorCode.ALREADY_EXIST_NAME);
        }
    }
}
