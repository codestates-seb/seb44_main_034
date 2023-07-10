package mainproject.cafeIn.domain.member.dto.reponse;

import lombok.Getter;

import java.util.List;

@Getter
public class MemberCafeResponse {

    private MyPageResponseDto member;
    private List<BookMarkCafeResponseDto> bookMarkcafeInfo;
}
