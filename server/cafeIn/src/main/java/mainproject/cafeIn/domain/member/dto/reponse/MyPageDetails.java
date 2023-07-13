package mainproject.cafeIn.domain.member.dto.reponse;

import lombok.Builder;
import lombok.Getter;
import mainproject.cafeIn.domain.member.entity.enums.MemberGrade;

@Getter
public class MyPageDetails {

    private String email;
    private String displayName;
    private String image;
    private MemberGrade grade;
    private Long countFollower;
    private Long countFollowing;

    @Builder
    public MyPageDetails(String email, String displayName, String image, MemberGrade grade, Long countFollower, Long countFollowing) {
        this.email = email;
        this.displayName = displayName;
        this.image = image;
        this.grade = grade;
        this.countFollower = countFollower;
        this.countFollowing = countFollowing;
    }
}
