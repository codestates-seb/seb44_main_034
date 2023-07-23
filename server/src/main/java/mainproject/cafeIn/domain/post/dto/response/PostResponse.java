package mainproject.cafeIn.domain.post.dto.response;

import com.querydsl.core.annotations.QueryProjection;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PostResponse {
    private Long postId;
    private String title;
    private String author;
    private String grade;
    private String image;

    @QueryProjection
    public PostResponse(Long postId, String title, String author, String grade, String image) {
        this.postId = postId;
        this.title = title;
        this.author = author;
        this.grade = grade;
        this.image = image;
    }
}
