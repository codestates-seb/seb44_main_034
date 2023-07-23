package mainproject.cafeIn.domain.comment.dto.response;

import com.querydsl.core.annotations.QueryProjection;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class CommentResponse {
    private Long commentId;
    private Long authorId;
    private String author;
    private String grade;
    private String content;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private List<ReplyResponse> replies;

    public CommentResponse(Long commentId, Long authorId, String author, String grade, String content, LocalDateTime createdAt, LocalDateTime updatedAt, List<ReplyResponse> replies) {
        this.commentId = commentId;
        this.authorId = authorId;
        this.author = author;
        this.grade = grade;
        this.content = content;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.replies = replies;
    }
}
