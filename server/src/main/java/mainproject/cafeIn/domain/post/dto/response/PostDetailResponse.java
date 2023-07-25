package mainproject.cafeIn.domain.post.dto.response;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import mainproject.cafeIn.domain.comment.dto.response.CommentResponse;
import mainproject.cafeIn.domain.comment.entity.Comment;
import mainproject.cafeIn.domain.tag.entity.PostTag;

import java.time.LocalDateTime;
import java.util.List;
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PostDetailResponse {
    private Long postId;
    private String title;
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
    private List<CommentResponse> comments;


    public PostDetailResponse(Long postId, String title, Long cafeId, String cafeName, Long authorId, String author, String image, String content, int starRating, LocalDateTime createdAt, LocalDateTime updatedAt, List<String> tagNames, Boolean isBookmarked, List<CommentResponse> comments) {
        this.postId = postId;
        this.title = title;
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
        this.comments = comments;
    }
}
