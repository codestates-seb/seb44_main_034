package mainproject.cafeIn.domain.post.service;

import lombok.RequiredArgsConstructor;
import mainproject.cafeIn.domain.cafe.entity.Cafe;
import mainproject.cafeIn.domain.cafe.repository.CafeRepository;
import mainproject.cafeIn.domain.cafe.service.CafeService;
import mainproject.cafeIn.domain.post.dto.request.PostRequest;
import mainproject.cafeIn.domain.post.dto.response.MultiPostResponse;
import mainproject.cafeIn.domain.post.dto.response.PostDetailResponse;
import mainproject.cafeIn.domain.post.dto.response.PostResponse;
import mainproject.cafeIn.domain.post.entity.Post;
import mainproject.cafeIn.domain.post.repository.PostRepository;
import mainproject.cafeIn.domain.postBookmark.repository.PostBookmarkRepository;
import mainproject.cafeIn.domain.tag.entity.PostTag;
import mainproject.cafeIn.domain.tag.repsitory.PostTagRepository;
import mainproject.cafeIn.domain.tag.service.PostTagService;
import mainproject.cafeIn.global.exception.CustomException;
import mainproject.cafeIn.global.exception.ErrorCode;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PostService {
    private final PostRepository postRepository;
    private final CafeService cafeService;
    private final PostTagRepository postTagRepository;
    private final PostTagService postTagService;
    private final PostBookmarkRepository postBookmarkRepository;

    // 게시물 생성
    @Transactional
    public Long createPost(Long loginId, Cafe cafe, PostRequest postRequest, MultipartFile multipartFile) {

        List<PostTag> postTags = postTagService.createPostTag(postRequest.getTags());

        Post post = postRequest.toEntity(cafe, postTags);


        // TODO : 이미지 업로드, 저장

        return postRepository.save(post).getPostId();
    }

    // 게시물 수정
    @Transactional
    public Long updatePost(Long loginId, Long postId, PostRequest postRequest, MultipartFile multipartFile) {
        // TODO: login user 검증

        Post post = findPostById(postId);

        if(postRequest.getTags() != null) {
            Optional<List<PostTag>> optionalPostTags = checkPostTag(postId);

            if(optionalPostTags.isPresent()) {
                List<PostTag> postTags = optionalPostTags.get();
                postTagRepository.deleteInBatch(postTags);
            }
        }

        List<PostTag> postTags = postTagService.createPostTag(postRequest.getTags());

        post.updatePost(postRequest.toEntity(postTags));

        // TODO: 이미지 수정

        return postId;
    }

    // 게시물 삭제
    @Transactional
    public Long deletePost(Long loginId, Long postId, String password) {
        // TODO: login user 검증
        // TODO: password 검증
        Post post = findPostById(postId);

        Long cafeId = post.getCafe().getId();

        postRepository.delete(post);

        return cafeId;
    }

    // 게시물 단일 조회
    public PostDetailResponse findPost(Long loginId, Long postId) {
        // 북마크 조회
        Boolean isBookmarked = postBookmarkRepository.findByMemberIdAndPostId(loginId, postId)
                .map(postBookmark -> true)
                .orElse(false);

        // 디테일 조회
        Post post = findPostById(postId);

        PostDetailResponse response = new PostDetailResponse(
                post.getPostId(),
                post.getMember().getId(),
                post.getMember().getDisplayName(),
                post.getImage(),
                post.getContent(),
                post.getStarRating(),
                post.getCreatedAt(),
                post.getUpdatedAt(),
                post.getPostTags(),
                isBookmarked
        );

        return response;
    }

    // 게시물 전체 조회
    public MultiPostResponse findPosts(int page, int size) {
        Page<Post> postPage = postRepository.findAll(PageRequest.of(page - 1, size));
        List<PostResponse> posts = postPage.getContent()
                .stream()
                .map(post -> new PostResponse(
                        post.getPostId(),
                        post.getMember().getDisplayName(),
                        post.getImage(),
                        post.getStarRating(),
                        post.getPostTags()))
                .collect(Collectors.toList());

        return new MultiPostResponse<>(posts, postPage);
    }

    // 아이디로 게시물 조회
    public Post findPostById(Long postId) {

        return postRepository.findById(postId)
                .orElseThrow(() -> new CustomException(ErrorCode.POST_NOT_FOUND));
    }

    // 게시물 태그 조회
    public Optional<List<PostTag>> checkPostTag(Long postId) {
        Optional<List<PostTag>> optionalPostTags = postTagRepository.findPostTagsByPostPostId(postId);

        return optionalPostTags;
    }
}
