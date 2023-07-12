package mainproject.cafeIn.domain.member.dto.reponse;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
public class BookMarkCafeList {

    private long cafeId;
    private String cafeName;
    private String image;
    private String address;
    private float rating;

    public BookMarkCafeList(long cafeId, String cafeName, String image, String address, float rating) {
        this.cafeId = cafeId;
        this.cafeName = cafeName;
        this.image = image;
        this.address = address;
        this.rating = rating;
    }
}
