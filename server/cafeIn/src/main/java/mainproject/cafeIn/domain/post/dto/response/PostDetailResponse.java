package mainproject.cafeIn.domain.post.dto.response;

import mainproject.cafeIn.domain.comment.entity.Comment;
import mainproject.cafeIn.domain.tag.entity.PostTag;

import java.time.LocalDateTime;
import java.util.List;

public class PostDetailResponse {
    private Long postId;
    private Long authorId;
    private String author;
    private String image;
    private String content;
    private float starRating;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private List<PostTag> postTags;
    private Boolean isBookmarked;

    // 기능 미완성
    // private List<Comment> comments;

    public PostDetailResponse(Long postId, Long authorId, String author, String image, String content, float starRating, LocalDateTime createdAt, LocalDateTime updatedAt, List<PostTag> postTags, Boolean isBookmarked) {
        this.postId = postId;
        this.authorId = authorId;
        this.author = author;
        this.image = image;
        this.content = content;
        this.starRating = starRating;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.postTags = postTags;
        this.isBookmarked = isBookmarked;
    }
}
