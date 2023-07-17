package mainproject.cafeIn.domain.member.dto.reponse;

import com.querydsl.core.annotations.QueryProjection;

public class MyBookMarkPostList {

    private long postId;
    private String image;
    private String title;
    private String author;
    private long postBookMarkId;

    @QueryProjection
    public MyBookMarkPostList(long postId, String image, String title, String author, long postBookMarkId) {
        this.postId = postId;
        this.image = image;
        this.title = title;
        this.author = author;
        this.postBookMarkId = postBookMarkId;
    }
}
