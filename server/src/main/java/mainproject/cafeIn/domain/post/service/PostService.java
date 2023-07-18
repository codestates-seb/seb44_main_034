package mainproject.cafeIn.domain.post.service;

import lombok.RequiredArgsConstructor;
import mainproject.cafeIn.domain.cafe.entity.Cafe;
import mainproject.cafeIn.domain.cafe.service.CafeService;
import mainproject.cafeIn.domain.comment.dto.response.CommentResponse;
import mainproject.cafeIn.domain.comment.dto.response.ReplyResponse;
import mainproject.cafeIn.domain.comment.repository.CommentRepository;
import mainproject.cafeIn.domain.comment.service.CommentService;
import mainproject.cafeIn.domain.member.entity.Member;
import mainproject.cafeIn.domain.member.repository.MemberRepository;
import mainproject.cafeIn.domain.post.dto.request.PostRequest;
import mainproject.cafeIn.domain.post.dto.response.MultiPostResponse;
import mainproject.cafeIn.domain.post.dto.response.PostDetailResponse;
import mainproject.cafeIn.domain.post.dto.response.PostResponse;
import mainproject.cafeIn.domain.post.entity.Post;
import mainproject.cafeIn.domain.post.repository.PostRepository;
import mainproject.cafeIn.domain.postbookmark.repository.PostBookmarkRepository;
import mainproject.cafeIn.domain.tag.entity.PostTag;
import mainproject.cafeIn.domain.tag.repsitory.PostTagRepository;
import mainproject.cafeIn.domain.tag.service.PostTagService;
import mainproject.cafeIn.global.cloud.S3ImageService;
import mainproject.cafeIn.global.exception.CustomException;
import mainproject.cafeIn.global.exception.ErrorCode;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
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
    private final MemberRepository memberRepository;
    private final CommentService commentService;
    private final S3ImageService imageService;

    // 게시물 생성(+ PostTag 생성)
    @Transactional
    public Long createPost(Long loginId, Long cafeId, PostRequest postRequest, MultipartFile image) throws IOException {
        // 충돌 해결
        verifyMember(loginId);
        Member member = memberRepository.findById(loginId).get();

        Cafe cafe = cafeService.findCafeById(cafeId);
        Post post = postRequest.toEntity(member, cafe);

        // 이미지 업로드 저장
        if (!image.isEmpty()) {
            String storedImageUrl = imageService.upload(image, "posts");
            post.setImage(storedImageUrl);
        }

        Long postId = postRepository.save(post).getPostId();
        post.updatePostWithTags(postTagService.createPostTag(postRequest.getTags(), post, cafe));
        return postId;
    }

    // 게시물 수정(+ PostTag 초기화, 수정)
    @Transactional
    public Long updatePost(Long loginId, Long postId, PostRequest postRequest, MultipartFile image) throws IOException {
        verifyMember(loginId);
        Post post = findPostById(postId);
        updatePostTags(postId, postRequest, post);
        post.updatePost(postRequest.toEntity());
        // 이미지 구현
        if (!image.isEmpty()) {
            String storedImageUrl = imageService.update(post.getImage(), image, "posts");
            post.setImage(storedImageUrl);
        }

        return postId;
    }

    // 게시물 삭제
    @Transactional
    public Long deletePost(Long loginId, Long postId) {
        verifyMember(loginId);
        Post post = findPostById(postId);
        Long cafeId = post.getCafe().getId();
        postRepository.delete(post);
        return cafeId;
    }

    // 게시물 단일 조회
    public PostDetailResponse findPost(Long loginId, Long postId) {
        Boolean isBookmarked = false;
        if (loginId != null) {
            isBookmarked = postBookmarkRepository.findByMemberIdAndPostPostId(loginId, postId)
                    .map(postBookmark -> true)
                    .orElse(false);
        }
        Post post = findPostById(postId);
        List<String> tagNames = postTagService.getTagNames(postId);
        List<CommentResponse> commentList = commentService.findComments(postId);

        PostDetailResponse response = new PostDetailResponse(
                post.getPostId(),
                post.getCafe().getId(),
                post.getCafe().getName(),
                post.getMember().getId(),
                post.getMember().getDisplayName(),
                post.getImage(),
                post.getContent(),
                post.getStarRating(),
                post.getCreatedAt(),
                post.getUpdatedAt(),
                tagNames,
                isBookmarked,
                commentList);

        return response;
    }

    // 게시물 전체 조회
    public MultiPostResponse findPosts(int page, int size) {
        Page<Post> postPage = postRepository.findAll(PageRequest.of(page - 1, size));
        List<PostResponse> posts = postPage.getContent()
                .stream()
                .map(post -> new PostResponse(
                        post.getPostId(),
                        post.getTitle(),
                        post.getMember().getDisplayName(),
                        post.getImage()))
                .collect(Collectors.toList());
        return new MultiPostResponse<>(posts, postPage);
    }

    // 아이디로 게시물 조회
    public Post findPostById(Long postId) {
        return postRepository.findById(postId)
                .orElseThrow(() -> new CustomException(ErrorCode.POST_NOT_FOUND));
    }

    // postTag 업데이트 로직 분리
    public void updatePostTags(Long postId, PostRequest postRequest, Post post) {
        if (postRequest.getTags() != null) {
            Optional<List<PostTag>> optionalPostTags = postTagRepository.findPostTagsByPostPostId(postId);
            if (optionalPostTags.isPresent()) {
                List<PostTag> postTags = optionalPostTags.get();
                postTagRepository.deleteInBatch(postTags);
            }
            postTagService.createPostTag(postRequest.getTags(), post, post.getCafe());
        }
    }

    public List<PostResponse> getPosts(Long cafeId) {

        return postRepository.getPosts(cafeId);
    }

    public void verifyMember(Long memberId) {
        Optional<Member> optionalMember = memberRepository.findById(memberId);

        if (!optionalMember.isPresent()) {
            throw new CustomException(ErrorCode.MEMBER_NOT_FOUND);
        }
    }

}
