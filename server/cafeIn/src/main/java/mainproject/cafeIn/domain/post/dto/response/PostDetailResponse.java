package mainproject.cafeIn.domain.post.dto.response;

import mainproject.cafeIn.domain.comment.entity.Comment;
import mainproject.cafeIn.domain.tag.entity.PostTag;

import java.time.LocalDateTime;
import java.util.List;

public class PostDetailResponse {
    private Long postId;
    private Long cafeId;
    private String cafeName;
    private Long authorId;
    private String author;
    private String image;
    private String content;
    private int starRating;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private List<String> tagNames;
    private Boolean isBookmarked;

    // 기능 미완성
    // private List<Comment> comments;


    public PostDetailResponse(Long postId, Long cafeId, String cafeName, Long authorId, String author, String image, String content, int starRating, LocalDateTime createdAt, LocalDateTime updatedAt, List<String> tagNames, Boolean isBookmarked) {
        this.postId = postId;
        this.cafeId = cafeId;
        this.cafeName = cafeName;
        this.authorId = authorId;
        this.author = author;
        this.image = image;
        this.content = content;
        this.starRating = starRating;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.tagNames = tagNames;
        this.isBookmarked = isBookmarked;
    }
}
