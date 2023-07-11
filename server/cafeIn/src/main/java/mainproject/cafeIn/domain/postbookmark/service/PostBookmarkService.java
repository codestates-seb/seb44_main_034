package mainproject.cafeIn.domain.postBookmark.service;

import lombok.RequiredArgsConstructor;
import mainproject.cafeIn.domain.member.entity.Member;
import mainproject.cafeIn.domain.member.repository.MemberRepository;
import mainproject.cafeIn.domain.post.entity.Post;
import mainproject.cafeIn.domain.post.repository.PostRepository;
import mainproject.cafeIn.domain.post.service.PostService;
import mainproject.cafeIn.domain.postBookmark.entity.PostBookmark;
import mainproject.cafeIn.domain.postBookmark.repository.PostBookmarkRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@RequiredArgsConstructor
@Service
public class PostBookmarkService {
    private final PostBookmarkRepository postBookmarkRepository;
    private final PostRepository postRepository;
    private final MemberRepository memberRepository;

    public void createPostBookmark(Long loginId, Long postId) {
        Optional<PostBookmark> postBookmarkOptional = postBookmarkRepository.findByMemberIdAndPostId(loginId, postId);
        if (postBookmarkOptional.isPresent()) {
            // 북마크가 이미 존재하는 경우 => 북마크 삭제
            PostBookmark postBookmark = postBookmarkOptional.get();
            postBookmarkRepository.delete(postBookmark);
        } else {
            Optional<Post> post = postRepository.findById(postId);
            Optional<Member> member = memberRepository.findById(loginId);
            // 북마크가 존재하지 않는 경우 => 북마크 등록
            PostBookmark postBookmark = PostBookmark.builder()
                    .member(member.get())
                    .post(post.get())
                    .build();
            postBookmarkRepository.save(postBookmark);
        }
    }
}
