package mainproject.cafeIn.domain.comment.dto.response;

import com.querydsl.core.annotations.QueryProjection;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import net.bytebuddy.asm.Advice;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ReplyResponse {
    private Long replyId;
    private Long authorId;
    private String author;
    private String grade;
    private String content;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public ReplyResponse(Long replyId, Long authorId, String author, String grade, String content, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.replyId = replyId;
        this.authorId = authorId;
        this.author = author;
        this.grade = grade;
        this.content = content;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
