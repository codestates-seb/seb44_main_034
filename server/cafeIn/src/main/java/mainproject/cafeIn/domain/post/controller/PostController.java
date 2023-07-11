package mainproject.cafeIn.domain.post.controller;

import lombok.RequiredArgsConstructor;
import mainproject.cafeIn.domain.post.dto.request.PostRequest;
import mainproject.cafeIn.domain.post.dto.response.MultiPostResponse;
import mainproject.cafeIn.domain.post.dto.response.PostDetailResponse;
import mainproject.cafeIn.domain.post.service.PostService;
import mainproject.cafeIn.domain.postBookmark.service.PostBookmarkService;
import mainproject.cafeIn.global.response.ApplicationResponse;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.Positive;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/posts")
public class PostController {
    private final PostService postService;
    private final PostBookmarkService postBookmarkService;

    // 게시물 등록
    @PostMapping("/{cafe-id}")
    @ResponseStatus(HttpStatus.CREATED)
    public ApplicationResponse<Long> createPost(@PathVariable("cafe-id") Long cafeId,
                                                @RequestPart(value = "dto") PostRequest request,
                                                @RequestPart(value = "postImage", required = false) MultipartFile multipartFile) {

        Long loginId = 1L;
        // TODO: 이미지 업로드 기능 추가 시 multipartFile 추가
        Long postId = postService.createPost(loginId, cafeId, request);

        return new ApplicationResponse<>(postId);
    }

    // 게시물 수정
    @PatchMapping("/{post-id}")
    @ResponseStatus(HttpStatus.OK)
    public ApplicationResponse<Long> updatePost(@PathVariable("post-id") Long postId,
                                                @RequestPart(value = "dto") PostRequest request,
                                                @RequestPart(value = "postImage", required = false) MultipartFile multipartFile) {

        long loginId = 1;
        // TODO: 이미지 업로드 기능 추가 시 multipartFile 추가
        postService.updatePost(loginId, postId, request);

        return new ApplicationResponse<>(postId);
    }

    // 게시물 상세 조회
    @GetMapping("/{post-id}")
    @ResponseStatus(HttpStatus.OK)
    public ApplicationResponse<PostDetailResponse> getPost(@PathVariable("post-id") Long postId) {

        // TODO : 로그인인 경우 로그인 아이디 변수에 입력, 비로그인 상태에선 로그인 아이디값을 null로 변경
        long loginId = 1;
        PostDetailResponse response = postService.findPost(loginId, postId);

        return new ApplicationResponse<>(response);
    }

    // 게시물 리스트 조회
    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public ApplicationResponse<MultiPostResponse> getPosts(@Positive @RequestParam int page,
                                                           @Positive @RequestParam int size) {

        MultiPostResponse response = postService.findPosts(page, size);

        return new ApplicationResponse<>(response);
    }

    // 게시물 삭제
    @DeleteMapping("/{post-id}")
    @ResponseStatus(HttpStatus.OK)
    public ApplicationResponse<Long> deletePost(@PathVariable("post-id") Long postId,
                                                @RequestBody String password) {

        long loginId = 1;
        Long cafeId = postService.deletePost(loginId, postId, password);

        return new ApplicationResponse<>(cafeId);
    }

    // 게시글 북마크 기능
    @PostMapping("/{post-id}/bookmark")
    @ResponseStatus(HttpStatus.CREATED)
    public ApplicationResponse createPostBookmark(@PathVariable("post-id") Long postId) {

        long loginId = 1;
        postBookmarkService.createPostBookmark(loginId, postId);

        return new ApplicationResponse();
    }
}
