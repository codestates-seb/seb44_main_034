package mainproject.cafeIn.domain.post.service;

import lombok.RequiredArgsConstructor;
import mainproject.cafeIn.domain.cafe.entity.Cafe;
import mainproject.cafeIn.domain.cafe.repository.CafeRepository;
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
    private final CafeRepository cafeRepository;

    // 게시물 생성(+ PostTag 생성)
    @Transactional
    public Long createPost(Long loginId, Long cafeId, PostRequest postRequest, MultipartFile image) throws IOException {
        // 충돌 해결
        Member member = findVerifiedMember(loginId);

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
        Post findPost = findVerifiedPostById(postId);

        // 로그인한 사용자가 게시물 작성자와 일치하는지 확인
        verifiedPostOwner(findPost.getMember().getId(), loginId);

        updatePostTags(postId, postRequest, findPost);
        findPost.updatePost(postRequest.toEntity());

        // 이미지 수정 구현
        if (!image.isEmpty()) {
            String storedImageUrl = imageService.update(findPost.getImage(), image, "posts");
            findPost.setImage(storedImageUrl);
        }

        Long cafeId = findPost.getCafe().getId();

        return cafeId;
    }

    // 게시물 삭제
    @Transactional
    public Long deletePost(Long loginId, Long postId) {
        Post findPost = findVerifiedPostById(postId);

        // 로그인한 회원과 해당 게시물의 작성자가 일치하는 지 확인
        verifiedPostOwner(findPost.getMember().getId(), loginId);

        Long cafeId = findPost.getCafe().getId();
        postRepository.delete(findPost);
        return cafeId;
    }

    // 게시물 단일 조회
    public PostDetailResponse findPost(Long loginId, Long postId) {
        Post findPost = findVerifiedPostById(postId);

        Boolean isBookmarked = false;
        if (postBookmarkRepository.findByMemberIdAndPostPostId(loginId, postId).isPresent()) {
            isBookmarked = true;
        }

        List<String> tagNames = postTagService.getTagNames(postId);

        List<CommentResponse> commentList = commentService.findComments(postId);

        PostDetailResponse response = new PostDetailResponse(
                findPost.getPostId(),
                findPost.getTitle(),
                findPost.getCafe().getId(),
                findPost.getCafe().getName(),
                findPost.getMember().getId(),
                findPost.getMember().getDisplayName(),
                findPost.getImage(),
                findPost.getContent(),
                findPost.getStarRating(),
                findPost.getCreatedAt(),
                findPost.getUpdatedAt(),
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

    // 카페 게시물 집계
    public List<PostResponse> getPosts(Long cafeId) {
        return postRepository.getPosts(cafeId);
    }

    // 존재하는 회원인지 확인
    public Member findVerifiedMember(Long loginId) {
        Optional<Member> optionalMember = memberRepository.findById(loginId);
        return optionalMember.orElseThrow(
                () -> new CustomException(ErrorCode.MEMBER_NOT_FOUND)
        );
    }

    // 게시글 작성자 확인
    public void verifiedPostOwner(long memberId, long loginId) {
        if(!(memberId == loginId)) {
            throw new CustomException(ErrorCode.NOT_AUTHOR);
        }
    }

    // 해당하는 게시글이 존재하는지 확인
    public Post findVerifiedPostById(Long postId) {
        Optional<Post> optionalPost = postRepository.findById(postId);
        return optionalPost.orElseThrow(
                () -> new CustomException(ErrorCode.POST_NOT_FOUND));
    }

    public void calculateRating(Long cafeId) {
        List<Post> posts = postRepository.findPostsByCafeId(cafeId);
        Cafe cafe = cafeRepository.findById(cafeId).get();

        float rating = 0;

        if (posts == null || posts.isEmpty()) {
            // 게시물이 없을 경우에는 평점을 0으로 초기화
            cafe.refreshRating(rating);
            return;
        }

        int totalStarRating = 0;
        for (Post post : posts) {
            totalStarRating += post.getStarRating();
        }

        int numberOfPosts = posts.size();
        cafe.refreshRating((float) (Math.round(totalStarRating / numberOfPosts * 10.0) / 10.0 ));
    }
}
