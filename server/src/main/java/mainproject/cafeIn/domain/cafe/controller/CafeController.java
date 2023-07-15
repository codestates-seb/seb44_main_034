package mainproject.cafeIn.domain.cafe.controller;

import lombok.RequiredArgsConstructor;
import mainproject.cafeIn.domain.cafe.dto.request.CafeInfoRequest;
import mainproject.cafeIn.domain.cafe.dto.request.PageCafeRequest;
import mainproject.cafeIn.domain.cafe.dto.request.SearchCafeFilterCondition;
import mainproject.cafeIn.domain.cafe.dto.response.CafeDetailResponse;
import mainproject.cafeIn.domain.cafe.dto.response.CafeResponse;
import mainproject.cafeIn.domain.cafe.dto.response.GetCafeDetailResponse;
import mainproject.cafeIn.domain.cafe.service.CafeBookmarkService;
import mainproject.cafeIn.domain.cafe.service.CafeService;
import mainproject.cafeIn.domain.menu.dto.response.MenuResponse;
import mainproject.cafeIn.domain.menu.service.MenuService;
import mainproject.cafeIn.domain.post.dto.response.PostResponse;
import mainproject.cafeIn.domain.post.service.PostService;
import mainproject.cafeIn.domain.tag.dto.TagResponse;
import mainproject.cafeIn.domain.tag.service.TagService;
import mainproject.cafeIn.global.auth.interceptor.JwtParseInterceptor;
import mainproject.cafeIn.global.response.ApplicationResponse;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.OK;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/cafes")
public class CafeController {
    private final CafeService cafeService;
    private final CafeBookmarkService cafeBookmarkService;
    private final MenuService menuService;
    private final TagService tagService;
    private final PostService postService;

    // 카페 등록
    @PostMapping
    @ResponseStatus(CREATED)
    public ApplicationResponse<Long> createCafe(@RequestPart(value = "dto") CafeInfoRequest request,
                                                @RequestPart(value = "cafeImage", required = false) MultipartFile multipartFile) {
        Long loginId = JwtParseInterceptor.getAuthenticatedUserId();
        Long cafeId = cafeService.createCafe(loginId, request, multipartFile);

        return new ApplicationResponse<>(cafeId);
    }

    // 카페 수정
    @PatchMapping("/{cafe-id}")
    @ResponseStatus(OK)
    public ApplicationResponse updateCafe(@PathVariable("cafe-id") Long cafeId,
                                          @RequestPart(value = "dto") CafeInfoRequest request,
                                          @RequestPart(value = "cafeImage", required = false) MultipartFile multipartFile) {
        Long loginId = JwtParseInterceptor.getAuthenticatedUserId();
        cafeService.updateCafe(loginId, cafeId, request, multipartFile);

        return new ApplicationResponse<>();
    }

    // 카페 상세 조회
    @GetMapping("/{cafe-id}")
    @ResponseStatus(OK)
    public ApplicationResponse<GetCafeDetailResponse> getCafe(@PathVariable("cafe-id") Long cafeId) {
        Long loginId = JwtParseInterceptor.getAuthenticatedUserId();

        CafeDetailResponse cafeDetail = cafeService.getCafe(cafeId, loginId);
        List<List<MenuResponse>> menus = menuService.getMenus(cafeId);
        List<PostResponse> posts = postService.getPosts(cafeId);
        List<TagResponse> tags = tagService.getTags(cafeId);

        return new ApplicationResponse<>(new GetCafeDetailResponse(cafeDetail, menus, posts, tags));
    }

    // 카페 삭제
    @DeleteMapping("/{cafe-id}")
    @ResponseStatus(OK)
    public ApplicationResponse deleteCafe(@PathVariable("cafe-id") Long cafeId,
                                          @RequestBody String password) {
        Long loginId = JwtParseInterceptor.getAuthenticatedUserId();
        cafeService.deleteCafe(loginId, cafeId, password);

        return new ApplicationResponse<>();
    }

    // 카페 리스트 조회 (정렬 X)
    @GetMapping
    @ResponseStatus(OK)
    public ApplicationResponse<List<CafeResponse>> getCafes(SearchCafeFilterCondition searchCafeFilterCondition,
                                                            PageCafeRequest pageCafeRequest) {
        Long loginId = JwtParseInterceptor.getAuthenticatedUserId();
        List<CafeResponse> response = cafeService.searchCafesByFilterCondition(loginId, searchCafeFilterCondition, pageCafeRequest.of());

        return new ApplicationResponse<>(response);
    }

    // 카페 리스트 조회 (정렬 O)
    @GetMapping("/orders")
    @ResponseStatus(OK)
    public ApplicationResponse<List<CafeResponse>> getCafesWithOrder(SearchCafeFilterCondition searchCafeFilterCondition,
                                                                     PageCafeRequest pageCafeRequest,
                                                                     String order) {
        Long loginId = JwtParseInterceptor.getAuthenticatedUserId();
        List<CafeResponse> response = cafeService.searchCafesByFilterConditionAndOrder(loginId, searchCafeFilterCondition, pageCafeRequest.of(), order);

        return new ApplicationResponse<>(response);
    }

    // 카페 북마크
    @PostMapping("/{cafe-id}/Bookmark")
    @ResponseStatus(OK)
    public ApplicationResponse bookmarkCafe(@PathVariable("cafe-id") Long cafeId) {
        Long loginId = JwtParseInterceptor.getAuthenticatedUserId();
        cafeBookmarkService.bookmarkCafe(cafeId, loginId);

        return new ApplicationResponse<>();
    }

    // 카페 정보 조회 (수정용)
    @GetMapping("/{cafe-id}/edit")
    @ResponseStatus(OK)
    public ApplicationResponse<CafeDetailResponse> getCafeForEdit(@PathVariable("cafe-id") Long cafeId) {
        Long loginId = JwtParseInterceptor.getAuthenticatedUserId();
        CafeDetailResponse cafeDetail = cafeService.getCafe(cafeId, loginId);

        return new ApplicationResponse<>(cafeDetail);
    }
}
