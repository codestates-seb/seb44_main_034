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
    private String image;
    // TODO: 이미지 업로드 시 내용 추가

    @QueryProjection
    public PostResponse(Long postId, String title, String author, String image) {
        this.postId = postId;
        this.title = title;
        this.author = author;
        this.image = image;
    }
}
