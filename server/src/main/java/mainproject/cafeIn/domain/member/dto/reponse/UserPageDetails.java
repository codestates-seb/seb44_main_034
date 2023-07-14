package mainproject.cafeIn.domain.member.dto.reponse;

import lombok.Builder;
import lombok.Getter;
import mainproject.cafeIn.domain.member.entity.enums.MemberGrade;

@Getter
public class UserPageDetails {


    private String displayName;
    private String image;
    private MemberGrade grade;
    private boolean isFollowing;

    @Builder
    public UserPageDetails(String displayName, String image, MemberGrade grade, boolean isFollowing) {
        this.displayName = displayName;
        this.image = image;
        this.grade = grade;
        this.isFollowing = isFollowing;
    }
}
