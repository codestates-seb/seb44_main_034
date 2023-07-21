package mainproject.cafeIn.domain.member.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Follow {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "FOLLOWER_ID")
    private Member followerId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "FOLLOWING_ID")
    private Member followingId;

    @Builder
    public Follow(Member followerId, Member followingId) {
        this.followerId = followerId;
        this.followingId = followingId;
    }
}
