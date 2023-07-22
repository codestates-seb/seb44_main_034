package mainproject.cafeIn.domain.member.dto.reponse;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Getter;

@Getter
public class MemberGrade {

    private Long id;
    private Long followerCount;

    private Long postCount;

    @QueryProjection
    public MemberGrade(Long id, Long followerCount, Long postCount) {
        this.id = id;
        this.followerCount = followerCount;
        this.postCount = postCount;
    }
}
