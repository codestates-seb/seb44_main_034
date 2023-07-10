package mainproject.cafeIn.domain.member.dto.reponse;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class MyPageResponseDto {

    private String email;
    private String displayName;
    private String grade;
    private long countFollower;
    private long countfollowing;
}
