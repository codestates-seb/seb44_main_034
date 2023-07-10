package mainproject.cafeIn.domain.postBookmark.controller;

import lombok.RequiredArgsConstructor;
import mainproject.cafeIn.domain.postBookmark.service.PostBookmarkService;
import mainproject.cafeIn.global.response.ApplicationResponse;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/cafes")
public class PostBookmarkController {
    private final PostBookmarkService postBookmarkService;

    @PostMapping("/{post-id}/bookmark")
    @ResponseStatus(HttpStatus.CREATED)
    public ApplicationResponse createPostBookmark(@PathVariable("post-id") Long postId) {
        Long loginId = 1L;
        postBookmarkService.createPostBookmark(loginId, postId);

        return new ApplicationResponse();
    }
}
