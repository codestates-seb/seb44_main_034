package mainproject.cafeIn.domain.post.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import mainproject.cafeIn.domain.cafe.entity.Cafe;
import mainproject.cafeIn.domain.comment.entity.Comment;
import mainproject.cafeIn.domain.member.entity.Member;
import mainproject.cafeIn.domain.postbookmark.entity.PostBookmark;
import mainproject.cafeIn.domain.tag.entity.PostTag;
import mainproject.cafeIn.global.base.BaseEntity;

import javax.persistence.*;
import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "posts")
public class Post extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "post_id", nullable = false, updatable = false)
    private Long postId;

    @Column(name = "post_title", nullable = false)
    private String title;

    @Column(name = "post_content", nullable = false, columnDefinition = "TEXT")
    private String content;

    @Column(name = "star_rating", nullable = false)
    private int starRating;

    @Column(name = "post_image")
    private String image;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cafe_id")
    private Cafe cafe;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @OneToMany(mappedBy = "post", cascade = CascadeType.REMOVE)
    private List<PostBookmark> postBookmark;

    @OneToMany(mappedBy = "post", cascade = CascadeType.REMOVE)
    private List<PostTag> postTags;

    @OneToMany(mappedBy = "post", cascade = CascadeType.REMOVE)
    private List<Comment> comments;

    @Builder
    public Post(Long postId, String title, String content, int starRating, String image, Cafe cafe, Member member, List<PostBookmark> postBookmark, List<PostTag> postTags, List<Comment> comments) {
        this.postId = postId;
        this.title = title;
        this.content = content;
        this.starRating = starRating;
        this.image = image;
        this.cafe = cafe;
        this.member = member;
        this.postBookmark = postBookmark;
        this.postTags = postTags;
        this.comments = comments;
    }



    public void updatePostWithTags(List<PostTag> postTags) {
        this.postTags = postTags;
    }

    public void updatePostWithComments(List<Comment> comments) {
        this.comments = comments;
    }

    public void updatePost(Post post) {
        this.title = post.getTitle();
        this.content = post.getContent();
        this.starRating = post.getStarRating();
        this.image = post.getImage();
        this.postTags = post.getPostTags();
    }
}
