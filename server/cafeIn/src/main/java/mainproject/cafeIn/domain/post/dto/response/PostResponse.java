package mainproject.cafeIn.domain.post.dto.response;

import mainproject.cafeIn.domain.tag.entity.PostTag;

import java.util.List;

public class PostResponse {
    private Long postId;
    private String author;
    private String image;
    private float starRating;
    private List<PostTag> postTags;

    public PostResponse(Long postId, String author, String image, float starRating, List<PostTag> postTags) {
        this.postId = postId;
        this.author = author;
        this.image = image;
        this.starRating = starRating;
        this.postTags = postTags;
    }
}
