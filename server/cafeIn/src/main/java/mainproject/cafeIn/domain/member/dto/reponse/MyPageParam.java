package mainproject.cafeIn.domain.member.dto.reponse;

import lombok.Builder;
import lombok.Getter;

@Getter
public class MyPageParam {

    private String email;
    private String displayName;
    private String grade;
    private long countFollower;
    private long countFollowing;

    @Builder
    public MyPageParam(String email, String displayName, String grade, long countFollower, long countFollowing) {
        this.email = email;
        this.displayName = displayName;
        this.grade = grade;
        this.countFollower = countFollower;
        this.countFollowing = countFollowing;
    }
}
