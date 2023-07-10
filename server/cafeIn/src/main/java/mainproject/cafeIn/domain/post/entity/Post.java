package mainproject.cafeIn.domain.post.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import mainproject.cafeIn.domain.cafe.entity.Cafe;
import mainproject.cafeIn.domain.comment.entity.Comment;
import mainproject.cafeIn.domain.member.entity.Member;
import mainproject.cafeIn.domain.tag.entity.PostTag;
import mainproject.cafeIn.global.base.BaseEntity;
import net.bytebuddy.agent.builder.AgentBuilder;
import org.springframework.security.core.parameters.P;

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
    private float starRating;

    @Column(name = "post_image")
    private String image;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cafe_id")
    private Cafe cafe;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @OneToMany(mappedBy = "post", cascade = CascadeType.REMOVE)
    private List<PostTag> postTags;

    @OneToMany(mappedBy = "post", cascade = CascadeType.REMOVE)
    private List<Comment> comments;

    @Builder
    public Post(String title, String content, float starRating, String image, Cafe cafe, Member member, List<PostTag> postTags) {
        this.title = title;
        this.content = content;
        this.starRating = starRating;
        this.image = image;
        this.cafe = cafe;
        this.member = member;
        this.postTags = postTags;
    }

    public void updatePost(Post post) {
        this.title = post.getTitle();
        this.content = post.getContent();
        this.starRating = post.getStarRating();
        this.image = post.getImage();
        this.postTags = post.getPostTags();
    }

}
