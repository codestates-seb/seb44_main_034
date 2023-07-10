package mainproject.cafeIn.domain.owner.service;

import lombok.RequiredArgsConstructor;
import mainproject.cafeIn.domain.owner.dto.response.OwnerDetailResponse;
import mainproject.cafeIn.domain.owner.entity.Owner;
import mainproject.cafeIn.domain.owner.enums.OwnerStatus;
import mainproject.cafeIn.domain.owner.repository.OwnerRepository;
import mainproject.cafeIn.global.auth.utils.CustomAuthorityUtils;
import mainproject.cafeIn.global.exception.CustomException;
import mainproject.cafeIn.global.exception.ErrorCode;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OwnerService {
    private final OwnerRepository ownerRepository;
    private final PasswordEncoder passwordEncoder;
    private final CustomAuthorityUtils authorityUtils;
    public Owner createOwner(Owner owner, String uri) {
        verifyExistsEmail(owner.getEmail());

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

    public Owner updateOwner(Owner owner, long ownerId) {
        Owner findOwner = findVerifiedOwner(ownerId);

        Optional.ofNullable(owner.getDisplayName())
                .ifPresent(findOwner::setDisplayName);
        Optional.ofNullable(owner.getPassword())
                .ifPresent(password -> findOwner.setPassword(passwordEncoder.encode(password)));

        return ownerRepository.save(findOwner);
    }

    public OwnerDetailResponse findOwner(long ownerId) {
        return ownerRepository.getOwnerDetailResponse(ownerId);
    }

    public Owner deleteOwner(long ownerId) {
        Owner findOwner = findVerifiedOwner(ownerId);
        findOwner.setOwnerStatus(OwnerStatus.OWNER_QUIT);

        return ownerRepository.save(findOwner);
    }

    public Owner findVerifiedOwner(long ownerId) {
        Optional<Owner> optionalOwner = ownerRepository.findById(ownerId);

        return optionalOwner.orElseThrow(() -> new CustomException(ErrorCode.NONE_AUTHORIZATION_TOKEN));
    }

    private void verifyExistsEmail(String email) {
        Optional<Owner> owner = ownerRepository.findByEmail(email);

        if (owner.isPresent()) {
            throw new CustomException(ErrorCode.ALREADY_EXIST_EMAIL);
        }
    }
}
