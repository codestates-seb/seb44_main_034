package mainproject.cafeIn.domain.member.dto.reponse;


import com.querydsl.core.annotations.QueryProjection;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
public class MyPagePostList {

    private long postId;
    private String title;
    private String image;
    private String author;


    @QueryProjection
    public MyPagePostList(long postId, String title, String image, String author) {
        this.postId = postId;
        this.title = title;
        this.image = image;
        this.author = author;
    }

}
