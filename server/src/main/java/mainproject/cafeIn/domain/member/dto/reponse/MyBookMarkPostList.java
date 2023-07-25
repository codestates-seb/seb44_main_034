package mainproject.cafeIn.domain.member.dto.reponse;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Getter;

@Getter
public class MyBookMarkPostList {

    private long postId;
    private String title;
    private String author;
    private String image;
    private long postBookMarkId;

    @QueryProjection
    public MyBookMarkPostList(long postId, String title, String author, String image, long postBookMarkId) {
        this.postId = postId;
        this.title = title;
        this.author = author;
        this.image = image;
        this.postBookMarkId = postBookMarkId;
    }
}
