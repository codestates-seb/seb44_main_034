package mainproject.cafeIn.domain.menucomment.controller;

import lombok.RequiredArgsConstructor;
import mainproject.cafeIn.domain.menucomment.dto.request.MenuCommentRequest;
import mainproject.cafeIn.domain.menucomment.service.MenuCommentService;
import mainproject.cafeIn.global.auth.interceptor.JwtParseInterceptor;
import mainproject.cafeIn.global.response.ApplicationResponse;
import org.springframework.web.bind.annotation.*;

import static org.springframework.http.HttpStatus.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/menu-comments")
public class MenuCommentController {
    private final MenuCommentService menuCommentService;

    @PostMapping("/{menu-id}")
    @ResponseStatus(CREATED)
    public ApplicationResponse<Long> createMenuComment(@PathVariable("menu-id") Long menuId,
                                                       @RequestBody MenuCommentRequest request) {
        Long loginId = JwtParseInterceptor.getAuthenticatedUserId();
        menuCommentService.createMenuComment(loginId, menuId, request);

        return new ApplicationResponse<>(menuId);
    }

    @PatchMapping("/{comment-id}")
    @ResponseStatus(OK)
    public ApplicationResponse<Long> updateMenuComment(@PathVariable("comment-id") Long commentId,
                                                       @RequestBody MenuCommentRequest request) {
        Long loginId = JwtParseInterceptor.getAuthenticatedUserId();
        Long menuId = menuCommentService.updateMenuComment(loginId, commentId, request);

        return new ApplicationResponse<>(menuId);
    }

    @DeleteMapping("/{comment-id}")
    @ResponseStatus(OK)
    public ApplicationResponse<Long> deleteMenuComment(@PathVariable("comment-id") Long commentId) {
        Long loginId = JwtParseInterceptor.getAuthenticatedUserId();
        Long menuId = menuCommentService.deleteMenuComment(loginId, commentId);

        return new ApplicationResponse<>(menuId);
    }
}
