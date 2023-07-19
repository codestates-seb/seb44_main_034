package mainproject.cafeIn.domain.cafe.service;

import lombok.RequiredArgsConstructor;
import mainproject.cafeIn.domain.cafe.dto.request.CafeInfoRequest;
import mainproject.cafeIn.domain.cafe.dto.request.SearchCafeFilterCondition;
import mainproject.cafeIn.domain.cafe.dto.response.CafeDetailResponse;
import mainproject.cafeIn.domain.cafe.dto.response.CafeResponse;
import mainproject.cafeIn.domain.cafe.entity.Cafe;
import mainproject.cafeIn.domain.cafe.repository.CafeRepository;
import mainproject.cafeIn.domain.owner.entity.Owner;
import mainproject.cafeIn.domain.owner.service.OwnerService;
import mainproject.cafeIn.global.cloud.S3ImageService;
import mainproject.cafeIn.global.exception.CustomException;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

import static mainproject.cafeIn.global.exception.ErrorCode.CAFE_NOT_FOUND;
import static mainproject.cafeIn.global.exception.ErrorCode.PASSWORD_NOT_MATCH;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CafeService {
    private final CafeRepository cafeRepository;
    private final OwnerService ownerService;
    private final PasswordEncoder passwordEncoder;
    private final S3ImageService imageService;

    @Transactional
    public Long createCafe(Long loginId, CafeInfoRequest cafeInfoRequest, MultipartFile image) throws IOException {
        Owner owner = ownerService.findVerifiedOwner(loginId);
        Cafe cafe = cafeInfoRequest.toEntity(owner);

        if (!image.isEmpty()) {
            String storedImageUrl = imageService.upload(image, "cafes");
            cafe.setImage(storedImageUrl);
        }

        return cafeRepository.save(cafe).getId();
    }

    @Transactional
    public void updateCafe(Long loginId, Long cafeId, CafeInfoRequest cafeInfoRequest, MultipartFile image) throws IOException {
        Cafe cafe = findCafeById(cafeId);
        cafe.validateOwner(loginId);
        cafe.updateCafe(cafeInfoRequest.toEntity());

        if (!image.isEmpty()) {
            String storedImageUrl = imageService.update(cafe.getImage(), image, "cafes");
            cafe.setImage(storedImageUrl);
        }
    }

    @Transactional
    public void deleteCafe(Long loginId, Long cafeId, String password) {
        Cafe cafe = findCafeById(cafeId);
        cafe.validateOwner(loginId);
        Owner owner = ownerService.findVerifiedOwner(loginId);
        if (!passwordEncoder.matches(password, owner.getPassword())) {
            throw new CustomException(PASSWORD_NOT_MATCH);
        }

        imageService.delete("cafes", cafe.getImage());
        cafeRepository.delete(cafe);
    }

    public CafeDetailResponse getCafe(Long cafeId, Long loginId) {
        findCafeById(cafeId);

        return cafeRepository.getCafe(cafeId, loginId);
    }

    public PageImpl<CafeResponse> searchCafesByFilterCondition(Long loginId, SearchCafeFilterCondition searchCafeFilterCondition, Pageable pageable) {

        return cafeRepository.findCafesByFilterCondition(loginId, searchCafeFilterCondition, pageable);
    }

    public PageImpl<CafeResponse> findCafesByName(Long loginId, String name, Pageable pageable) {

        return cafeRepository.findCafesByName(loginId, name, pageable);
    }

    public PageImpl<CafeResponse> findCafesByMenu(Long loginId, String name, Pageable pageable) {

        return cafeRepository.findCafesByMenu(loginId, name, pageable);
    }

    public Cafe findCafeById(Long cafeId) {

        return cafeRepository.findById(cafeId)
                .orElseThrow(() -> new CustomException(CAFE_NOT_FOUND));
    }
}
