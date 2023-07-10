package mainproject.cafeIn.domain.post.controller;

import lombok.RequiredArgsConstructor;
import mainproject.cafeIn.domain.cafe.entity.Cafe;
import mainproject.cafeIn.domain.cafe.service.CafeService;
import mainproject.cafeIn.domain.post.dto.request.PostRequest;
import mainproject.cafeIn.domain.post.dto.response.MultiPostResponse;
import mainproject.cafeIn.domain.post.dto.response.PostDetailResponse;
import mainproject.cafeIn.domain.post.entity.Post;
import mainproject.cafeIn.domain.post.service.PostService;
import mainproject.cafeIn.domain.tag.entity.PostTag;
import mainproject.cafeIn.domain.tag.service.PostTagService;
import mainproject.cafeIn.global.response.ApplicationResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/posts")
public class PostController {
    private final PostService postService;
    private final PostTagService postTagService;
    private final CafeService cafeService;

    // 게시물 등록
    @PostMapping("/{cafe-id}")
    @ResponseStatus(HttpStatus.CREATED)
    public ApplicationResponse<Long> createPost(@PathVariable("cafe-id") Long cafeId,
                                                @RequestPart(value = "dto") PostRequest request,
                                                @RequestPart(value = "postImage", required = false)MultipartFile multipartFile) {
        Long loginId = 1L;

        Cafe cafe = cafeService.findCafeById(cafeId);

        Long postId = postService.createPost(loginId, cafe, request, multipartFile);

        return new ApplicationResponse<>(postId);
    }

    // 게시물 수정
    @PatchMapping("/{post-id}")
    @ResponseStatus(HttpStatus.OK)
    public ApplicationResponse<Long> updatePost(@PathVariable("post-id") Long postId,
                                                @RequestPart(value = "dto") PostRequest request,
                                                @RequestPart(value = "postImage", required = false)MultipartFile multipartFile) {
        Long loginId = 1L;
        postService.updatePost(loginId, postId, request, multipartFile);

        return new ApplicationResponse<>(postId);
    }

    // 게시물 상세 조회
    @GetMapping("/{post-id}")
    @ResponseStatus(HttpStatus.OK)
    public ApplicationResponse<PostDetailResponse> getPost(@PathVariable("post-id") Long postId) {
        Long loginId = 1L;
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
    public ApplicationResponse<Long> deletePost(@PathVariable("posst-id") Long postId,
                                                @RequestBody String password) {
        Long loginId = 1L;
        Long cafeId = postService.deletePost(loginId, postId, password);

        return new ApplicationResponse<>(cafeId);
    }

}
