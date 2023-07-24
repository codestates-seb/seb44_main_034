package mainproject.cafeIn.domain.menucomment.dto.response;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Getter;

@Getter
public class MenuCommentResponse {
    private Long id;
    private String content;
    private Long memberId;
    private String author;

    @QueryProjection
    public MenuCommentResponse(Long id, String content, Long memberId, String author) {
        this.id = id;
        this.content = content;
        this.memberId = memberId;
        this.author = author;
    }
}
