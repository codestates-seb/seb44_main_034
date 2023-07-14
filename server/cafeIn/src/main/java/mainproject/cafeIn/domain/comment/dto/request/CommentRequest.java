package mainproject.cafeIn.domain.comment.dto.request;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import mainproject.cafeIn.domain.comment.entity.Comment;
import mainproject.cafeIn.domain.member.entity.Member;
import mainproject.cafeIn.domain.post.entity.Post;

import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class CommentRequest {
    private String content;

    public Comment toEntity(Member member, Post post) {
        return Comment.builder()
                .content(content)
                .member(member)
                .post(post)
                .build();
    }

    public Comment toEntity(Member member, Comment parentComment) {
        return Comment.builder()
                .content(content)
                .member(member)
                .parentComment(parentComment)
                .build();
    }
}
