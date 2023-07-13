package mainproject.cafeIn.domain.member.dto.reponse;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Getter;

@Getter
public class MyBookMarkCafeList {

    private long cafeId;
    private String cafeName;
    private String image;
    private String address;
    private float rating;

    @QueryProjection
    public MyBookMarkCafeList(long cafeId, String cafeName, String image, String address, float rating) {
        this.cafeId = cafeId;
        this.cafeName = cafeName;
        this.image = image;
        this.address = address;
        this.rating = rating;
    }
}
