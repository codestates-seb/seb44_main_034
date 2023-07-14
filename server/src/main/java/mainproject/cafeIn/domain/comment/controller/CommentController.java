package mainproject.cafeIn.domain.comment.controller;

import lombok.RequiredArgsConstructor;
import mainproject.cafeIn.domain.comment.dto.request.CommentRequest;
import mainproject.cafeIn.domain.comment.entity.Comment;
import mainproject.cafeIn.domain.comment.service.CommentService;
import mainproject.cafeIn.global.auth.interceptor.JwtParseInterceptor;
import mainproject.cafeIn.global.response.ApplicationResponse;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/post-comments")
public class CommentController {
    private final CommentService commentService;

    // 댓글 등록
    @PostMapping("/{post-id}")
    @ResponseStatus(HttpStatus.CREATED)
    public ApplicationResponse createComment(@PathVariable("post-id") Long postId,
                                             @RequestBody CommentRequest commentRequest) {
        Long loginId = JwtParseInterceptor.getAuthenticatedUserId();
        commentService.createComment(loginId, postId, commentRequest);

        return new ApplicationResponse();
    }

    // 댓글 수정
    @PatchMapping("/{comment-id}")
    @ResponseStatus(HttpStatus.OK)
    public ApplicationResponse updateComment(@PathVariable("comment-id") Long commentId,
                                             @RequestBody CommentRequest commentRequest) {
        Long loginId = JwtParseInterceptor.getAuthenticatedUserId();
        commentService.updateComment(loginId, commentId, commentRequest);

        return new ApplicationResponse();
    }



    // 댓글 삭제
    @DeleteMapping("/{comment-id}")
    @ResponseStatus(HttpStatus.OK)
    public ApplicationResponse deleteComment(@PathVariable("comment-id") Long commentId) {
        Long loginId = JwtParseInterceptor.getAuthenticatedUserId();
        commentService.deleteComment(loginId, commentId);

        return new ApplicationResponse();
    }
}
