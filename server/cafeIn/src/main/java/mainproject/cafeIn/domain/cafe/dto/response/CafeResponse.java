package mainproject.cafeIn.domain.cafe.dto.response;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Getter;

@Getter
public class CafeResponse {
    private Long cafeId;
    private String name;
    private String address;
    private float rating;
    private String image;

    @QueryProjection
    public CafeResponse(Long cafeId, String name, String address, float rating, String image) {
        this.cafeId = cafeId;
        this.name = name;
        this.address = address;
        this.rating = rating;
        this.image = image;
    }
}
