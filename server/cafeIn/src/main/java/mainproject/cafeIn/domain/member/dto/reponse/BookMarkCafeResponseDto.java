package mainproject.cafeIn.domain.member.dto.reponse;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class BookMarkCafeResponseDto {

    private long cafeId;
    private String cafeName;
    private String image;
    private String address;
    private float rating;

}
