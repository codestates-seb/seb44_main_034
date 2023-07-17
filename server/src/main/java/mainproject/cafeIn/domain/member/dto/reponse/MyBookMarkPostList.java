package mainproject.cafeIn.domain.member.dto.reponse;

import com.querydsl.core.annotations.QueryProjection;

public class MyBookMarkPostList {

    private long postId;
    private String title;
    private String image;
    private String author;
    private long postBookMarkId;

    @QueryProjection
    public MyBookMarkPostList(long postId, String title, String image, String author, long postBookMarkId) {
        this.postId = postId;
        this.image = title;
        this.title = image;
        this.author = author;
        this.postBookMarkId = postBookMarkId;
    }
}
