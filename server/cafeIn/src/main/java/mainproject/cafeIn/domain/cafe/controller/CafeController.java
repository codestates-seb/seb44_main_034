package mainproject.cafeIn.domain.cafe.controller;

import lombok.RequiredArgsConstructor;
import mainproject.cafeIn.domain.cafe.dto.request.CafeInfoRequest;
import mainproject.cafeIn.domain.cafe.dto.request.PageCafeRequest;
import mainproject.cafeIn.domain.cafe.dto.request.SearchCafeFilterCondition;
import mainproject.cafeIn.domain.cafe.dto.response.GetCafeDetailResponse;
import mainproject.cafeIn.domain.cafe.dto.response.GetCafesResponse;
import mainproject.cafeIn.domain.cafe.service.CafeService;
import mainproject.cafeIn.global.auth.interceptor.JwtParseInterceptor;
import mainproject.cafeIn.global.response.ApplicationResponse;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/cafes")
public class CafeController {
    private final CafeService cafeService;

    // 카페 등록
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ApplicationResponse<Long> createCafe(@RequestPart(value = "dto") CafeInfoRequest request,
                                                @RequestPart(value = "cafeImage", required = false) MultipartFile multipartFile) {
        Long loginId = JwtParseInterceptor.getAuthenticatedUserId();
        Long cafeId = cafeService.createCafe(loginId, request, multipartFile);

        return new ApplicationResponse<>(cafeId);
    }

    // 카페 수정
    @PatchMapping("/{cafe-id}")
    @ResponseStatus(HttpStatus.OK)
    public ApplicationResponse updateCafe(@PathVariable("cafe-id") Long cafeId,
                                          @RequestPart(value = "dto") CafeInfoRequest request,
                                          @RequestPart(value = "cafeImage", required = false) MultipartFile multipartFile) {
        Long loginId = JwtParseInterceptor.getAuthenticatedUserId();
        cafeService.updateCafe(loginId, cafeId, request, multipartFile);

        return new ApplicationResponse();
    }

    // 카페 상세 조회
    @GetMapping("/{cafe-id}")
    @ResponseStatus(HttpStatus.OK)
    public ApplicationResponse<GetCafeDetailResponse> getCafe(@PathVariable("cafe-id") Long cafeId) {

        return new ApplicationResponse<>();
    }

    // 카페 삭제
    @DeleteMapping("/{cafe-id}")
    @ResponseStatus(HttpStatus.OK)
    public ApplicationResponse deleteCafe(@PathVariable("cafe-id") Long cafeId,
                                          @RequestBody String password) {
        Long loginId = JwtParseInterceptor.getAuthenticatedUserId();
        cafeService.deleteCafe(loginId, cafeId, password);

        return new ApplicationResponse();
    }

    // 카페 리스트 조회
    @GetMapping
    public ApplicationResponse<List<GetCafesResponse>> getCafes(SearchCafeFilterCondition searchCafeFilterCondition,
                                                                PageCafeRequest pageCafeRequest) {
        List<GetCafesResponse> response = cafeService.searchCafesByFilterCondition(searchCafeFilterCondition, pageCafeRequest.of());

        return new ApplicationResponse<>(response);
    }

    // 카페 북마크

    // 카페 정보 조회


}
