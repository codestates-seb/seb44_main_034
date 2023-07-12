package mainproject.cafeIn.domain.postbookmark.service;

import lombok.RequiredArgsConstructor;
import mainproject.cafeIn.domain.member.entity.Member;
import mainproject.cafeIn.domain.member.repository.MemberRepository;
import mainproject.cafeIn.domain.member.service.MemberService;
import mainproject.cafeIn.domain.post.entity.Post;
import mainproject.cafeIn.domain.post.repository.PostRepository;
import mainproject.cafeIn.domain.postbookmark.entity.PostBookmark;
import mainproject.cafeIn.domain.postbookmark.repository.PostBookmarkRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@RequiredArgsConstructor
@Service
public class PostBookmarkService {
    private final PostBookmarkRepository postBookmarkRepository;
    private final PostRepository postRepository;
    private final MemberRepository memberRepository;
    private final MemberService memberService;

    public void createPostBookmark(Long loginId, Long postId) {
        Optional<PostBookmark> postBookmarkOptional = postBookmarkRepository.findByMemberIdAndPostPostId(loginId, postId);
        if (postBookmarkOptional.isPresent()) {
            // 북마크가 이미 존재하는 경우 => 북마크 삭제
            PostBookmark postBookmark = postBookmarkOptional.get();
            postBookmarkRepository.delete(postBookmark);
        } else {
            Optional<Post> post = postRepository.findById(postId);
            Member member = memberService.findById(loginId);
            // 북마크가 존재하지 않는 경우 => 북마크 등록
            PostBookmark postBookmark = PostBookmark.builder()
                    .member(member)
                    .post(post.get())
                    .build();
            postBookmarkRepository.save(postBookmark);
        }
    }
}
