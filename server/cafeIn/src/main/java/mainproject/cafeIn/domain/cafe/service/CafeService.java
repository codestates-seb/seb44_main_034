package mainproject.cafeIn.domain.cafe.service;

import lombok.RequiredArgsConstructor;
import mainproject.cafeIn.domain.cafe.dto.request.CafeInfoRequest;
import mainproject.cafeIn.domain.cafe.dto.request.SearchCafeFilterCondition;
import mainproject.cafeIn.domain.cafe.dto.response.GetCafesResponse;
import mainproject.cafeIn.domain.cafe.entity.Cafe;
import mainproject.cafeIn.domain.cafe.repository.CafeRepository;
import mainproject.cafeIn.domain.owner.entity.Owner;
import mainproject.cafeIn.domain.owner.service.OwnerService;
import mainproject.cafeIn.global.exception.CustomException;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

import static mainproject.cafeIn.global.exception.ErrorCode.CAFE_NOT_FOUND;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CafeService {
    private final CafeRepository cafeRepository;
    private final OwnerService ownerService;

    @Transactional
    public Long createCafe(Long loginId, CafeInfoRequest cafeInfoRequest, MultipartFile multipartFile) {
        Owner owner = ownerService.findVerifiedOwner(loginId);
        Cafe cafe = cafeInfoRequest.toEntity(owner);

        // TODO: 이미지 업로드, 저장

        return cafeRepository.save(cafe).getId();
    }

    @Transactional
    public void updateCafe(Long loginId, Long cafeId, CafeInfoRequest cafeInfoRequest, MultipartFile multipartFile) {
        Cafe cafe = findCafeById(cafeId);
        cafe.validateOwner(loginId);
        cafe.updateCafe(cafeInfoRequest.toEntity());

        // TODO: 이미지 수정
    }

    @Transactional
    public void deleteCafe(Long loginId, Long cafeId, String password) {
        // TODO: password 검증
        Cafe cafe = findCafeById(cafeId);
        cafe.validateOwner(loginId);
        cafeRepository.delete(cafe);
    }

    public List<GetCafesResponse> searchCafesByFilterCondition(SearchCafeFilterCondition searchCafeFilterCondition, Pageable pageable) {

        return cafeRepository.findCafesByFilterCondition(searchCafeFilterCondition, pageable);
    }

    public Cafe findCafeById(Long cafeId) {

        return cafeRepository.findById(cafeId)
                .orElseThrow(() -> new CustomException(CAFE_NOT_FOUND));
    }
}
