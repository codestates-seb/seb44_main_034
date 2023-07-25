package mainproject.cafeIn.domain.comment.service;

import lombok.RequiredArgsConstructor;
import mainproject.cafeIn.domain.comment.dto.request.CommentRequest;
import mainproject.cafeIn.domain.comment.dto.response.ReplyResponse;
import mainproject.cafeIn.domain.comment.entity.Comment;
import mainproject.cafeIn.domain.comment.repository.CommentRepository;
import mainproject.cafeIn.domain.member.entity.Member;
import mainproject.cafeIn.domain.member.repository.MemberRepository;
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
public class ReplyService {

    private final CommentRepository commentRepository;
    private final MemberRepository memberRepository;

    // 대댓글 등록
    @Transactional
    public void createReply(Long loginId, Long commentId, CommentRequest commentRequest) {
        Member member = findVerifiedMember(loginId);
        Comment parentComment = commentRepository.findById(commentId).get();
        Comment reply = commentRequest.toEntity(member, parentComment);
        commentRepository.save(reply);
    }


    // 대댓글 수정
    @Transactional
    public void updateReply(Long loginId, Long replyId, CommentRequest commentRequest) {
        Comment findReply = findVerifiedReplyById(replyId);

        // 작성자 확인
        verifiedReplyOwner(findReply.getMember().getId(), loginId);

        findReply.updateComment(commentRequest.getContent());
    }

    // 대댓글 삭제
    @Transactional
    public void deleteReply(Long loginId, Long replyId) {
        Comment findReply = findVerifiedReplyById(replyId);

        // 작성자 확인
        verifiedReplyOwner(findReply.getMember().getId(), loginId);

        commentRepository.delete(findReply);
    }

    // 로그인 확인
    public Member findVerifiedMember(Long loginId) {
        Optional<Member> optionalMember = memberRepository.findById(loginId);
        return optionalMember.orElseThrow(
                () -> new CustomException(ErrorCode.MEMBER_NOT_FOUND)
        );
    }

    public void verifiedReplyOwner(Long memberId, Long loginId) {
        if (!(memberId == loginId)) {
            throw new CustomException(ErrorCode.NOT_AUTHOR);
        }
    }

    public Comment findVerifiedReplyById(Long replyId) {
        Optional<Comment> optionalReply = commentRepository.findById(replyId);

        return optionalReply.orElseThrow(
                () -> new CustomException(ErrorCode.COMMENT_NOT_FOUND)
        );
    }

    // 대댓글 리스트 기능
    public List<ReplyResponse> findReplys(Long commentId) {
        List<ReplyResponse> replylist = commentRepository.findAllByParentCommentId(commentId)
                .stream()
                .map(reply -> new ReplyResponse(
                        reply.getId(),
                        reply.getMember().getId(),
                        reply.getMember().getDisplayName(),
                        reply.getContent(),
                        reply.getCreatedAt(),
                        reply.getUpdatedAt()
                ))
                .collect(Collectors.toList());

        return replylist;
    }
}
