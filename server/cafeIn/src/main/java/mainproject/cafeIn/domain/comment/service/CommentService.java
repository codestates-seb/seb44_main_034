package mainproject.cafeIn.domain.comment.service;

import lombok.RequiredArgsConstructor;
import mainproject.cafeIn.domain.comment.dto.request.CommentRequest;
import mainproject.cafeIn.domain.comment.dto.response.CommentResponse;
import mainproject.cafeIn.domain.comment.entity.Comment;
import mainproject.cafeIn.domain.comment.repository.CommentRepository;
import mainproject.cafeIn.domain.member.entity.Member;
import mainproject.cafeIn.domain.member.repository.MemberRepository;
import mainproject.cafeIn.domain.post.entity.Post;
import mainproject.cafeIn.domain.post.repository.PostRepository;
import mainproject.cafeIn.global.exception.CustomException;
import mainproject.cafeIn.global.exception.ErrorCode;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CommentService {

    private final CommentRepository commentRepository;
    private final MemberRepository memberRepository;
    private final PostRepository postRepository;
    private final ReplyService replyService;


    // 댓글 등록
    @Transactional
    public void createComment(Long loginId, Long postId, CommentRequest commentRequest) {
        verifyMember(loginId);
        Member member = memberRepository.findById(loginId).get();
        Post post = postRepository.findById(postId).get();
        Comment comment = commentRequest.toEntity(member, post);
        commentRepository.save(comment);
    }

    // 댓글 수정
    @Transactional
    public void updateComment(Long loginId, Long commentId, CommentRequest commentRequest) {
        verifyMember(loginId);
        Comment comment = commentRepository.findById(commentId).get();
        comment.updateComment(commentRequest.getContent());
    }

    // 댓글 삭제
    @Transactional
    public void deleteComment(Long loginId, Long commentId) {
        verifyMember(loginId);
        Comment comment = commentRepository.findById(commentId).get();
        commentRepository.delete(comment);
    }

    // 로그인 확인
    public void verifyMember(Long memberId) {
        Optional<Member> optionalMember = memberRepository.findById(memberId);

        if (!optionalMember.isPresent()) {
            throw new CustomException(ErrorCode.MEMBER_NOT_FOUND);
        }
    }

    public List<CommentResponse> findComments(Long postId) {
        List<CommentResponse> commentList = commentRepository.findAllByPostPostId(postId)
                .stream()
                .map(comment -> new CommentResponse(
                        comment.getId(),
                        comment.getMember().getId(),
                        comment.getMember().getDisplayName(),
                        comment.getContent(),
                        comment.getCreatedAt(),
                        comment.getUpdatedAt(),
                        replyService.findReplys(comment.getId())
                ))
                .collect(Collectors.toList());

        return commentList;
    }

}
