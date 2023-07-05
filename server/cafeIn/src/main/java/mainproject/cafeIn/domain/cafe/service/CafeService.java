package mainproject.cafeIn.domain.cafe.service;

import lombok.RequiredArgsConstructor;
import mainproject.cafeIn.domain.cafe.dto.request.SearchCafeFilterCondition;
import mainproject.cafeIn.domain.cafe.dto.response.GetCafesResponse;
import mainproject.cafeIn.domain.cafe.entity.Cafe;
import mainproject.cafeIn.domain.cafe.repository.CafeRepository;
import mainproject.cafeIn.global.exception.CustomException;
import mainproject.cafeIn.global.exception.ErrorCode;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CafeService {
    private final CafeRepository cafeRepository;

    public Long createCafe(Long loginId, Cafe cafe, MultipartFile multipartFile) {
        // Owner owner = ownerService.findOwnerById(loginId);
        extractAreaFromAddress(cafe);
        // TODO: 이미지 업로드, 저장

        return cafeRepository.save(cafe).getId();
    }

    public void updateCafe(Long loginId, Cafe cafe, MultipartFile multipartFile) {
        // TODO: login user 검증
        cafe.updateCafe(cafe);
        // TODO: 이미지 수정
    }

    public void deleteCafe(Long loginId, Long cafeId, String password) {
        // TODO: login user 검증
        // TODO: password 검증
        Cafe cafe = findCafeById(cafeId);
        cafeRepository.delete(cafe);
    }

    public List<GetCafesResponse> searchCafesByFilterCondition(SearchCafeFilterCondition searchCafeFilterCondition, Pageable pageable) {

        return cafeRepository.findCafesByFilterCondition(searchCafeFilterCondition, pageable);
    }

    private void extractAreaFromAddress(Cafe cafe) {
        String pattern = "\\b(\\w+구)\\b";
        Pattern regex = Pattern.compile(pattern);
        Matcher matcher = regex.matcher(cafe.getAddress());

        // TODO: ErrorCode 수정
        if (matcher.find()) {
            cafe.setShortAddress(matcher.group(1));
        } else throw new CustomException(ErrorCode.INTERNAL_SERVER_ERROR);
    }

    private Cafe findCafeById(Long cafeId) {

        // TODO: ErrorCode 수정
        return cafeRepository.findById(cafeId)
                .orElseThrow(() -> new CustomException(ErrorCode.INTERNAL_SERVER_ERROR));
    }
}
