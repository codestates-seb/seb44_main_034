package mainproject.cafeIn.domain.member.dto.reponse;

import lombok.Getter;
import mainproject.cafeIn.domain.member.entity.enums.MemberGrade;

@Getter
public class UserPageParam {

    private String displayName;
    private String image;
    private MemberGrade grade;
    private boolean isFollowing;


}
