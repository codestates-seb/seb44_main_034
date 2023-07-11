package mainproject.cafeIn.domain.postBookmark.entity;

import lombok.Builder;
import lombok.Getter;
import mainproject.cafeIn.domain.member.entity.Member;
import mainproject.cafeIn.domain.post.entity.Post;

import javax.persistence.*;

@Entity
@Getter
public class PostBookmark {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long postBookmarkId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id")
    private Post post;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @Builder
    public PostBookmark(Post post, Member member) {
        this.post = post;
        this.member = member;
    }
}
