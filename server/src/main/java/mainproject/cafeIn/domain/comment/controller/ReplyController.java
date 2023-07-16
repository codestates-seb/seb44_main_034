package mainproject.cafeIn.domain.comment.controller;

import lombok.RequiredArgsConstructor;
import mainproject.cafeIn.domain.comment.dto.request.CommentRequest;
import mainproject.cafeIn.domain.comment.service.ReplyService;
import mainproject.cafeIn.global.auth.interceptor.JwtParseInterceptor;
import mainproject.cafeIn.global.response.ApplicationResponse;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/replys")
public class ReplyController {

    private final ReplyService replyService;

    // 대댓글 등록
    @PostMapping("/{comment-id}")
    @ResponseStatus(HttpStatus.CREATED)
    public ApplicationResponse createReply(@PathVariable("comment-id") Long commentId,
                                             @RequestBody CommentRequest commentRequest) {
        Long loginId = JwtParseInterceptor.getAuthenticatedUserId();
        replyService.createReply(loginId, commentId, commentRequest);

        return new ApplicationResponse();
    }

    // 대댓글 수정
    @PatchMapping("/{reply-id}")
    @ResponseStatus(HttpStatus.OK)
    public ApplicationResponse updateComment(@PathVariable("reply-id") Long replyId,
                                             @RequestBody CommentRequest commentRequest) {
        Long loginId = JwtParseInterceptor.getAuthenticatedUserId();
        replyService.updateReply(loginId, replyId, commentRequest);

        return new ApplicationResponse();
    }



    // 대댓글 삭제
    @DeleteMapping("/{reply-id}")
    @ResponseStatus(HttpStatus.OK)
    public ApplicationResponse deleteComment(@PathVariable("reply-id") Long replyId) {
        Long loginId = JwtParseInterceptor.getAuthenticatedUserId();
        replyService.deleteReply(loginId, replyId);

        return new ApplicationResponse();
    }
}

