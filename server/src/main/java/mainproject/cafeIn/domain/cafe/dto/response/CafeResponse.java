package mainproject.cafeIn.domain.cafe.dto.response;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Getter;
import mainproject.cafeIn.domain.tag.dto.TagResponse;
import mainproject.cafeIn.domain.tag.entity.Tag;

import java.util.List;

@Getter
public class CafeResponse {
    private Long cafeId;
    private String name;
    private String address;
    private float rating;
    private double latitude;
    private double longitude;
    private String image;
    private boolean isBookmarked;
    private Integer countPost;

    @QueryProjection
    public CafeResponse(Long cafeId, String name, String address, float rating, double latitude, double longitude, String image, boolean isBookmarked, Integer countPost) {
        this.cafeId = cafeId;
        this.name = name;
        this.address = address;
        this.rating = rating;
        this.latitude = latitude;
        this.longitude = longitude;
        this.image = image;
        this.isBookmarked = isBookmarked;
        this.countPost = countPost;
    }
}
