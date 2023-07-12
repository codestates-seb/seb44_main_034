package mainproject.cafeIn.domain.cafe.dto.response;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Getter;

@Getter
public class CafeDetailResponse {
    private Long ownerId;
    private Long cafeId;
    private String name;
    private String address;
    private double latitude;
    private double longitude;
    private String contact;
    private String notice;
    private String image;
    private float rating;
    private String openTime;
    private String closeTime;
    private boolean isOpenAllTime;
    private boolean isChargingAvailable;
    private boolean hasParking;
    private boolean isPetFriendly;
    private boolean hasDessert;
    private boolean isBookmarked;
    private Integer countPost;

    @QueryProjection
    public CafeDetailResponse(Long ownerId, Long cafeId, String name, String address, double latitude, double longitude, String contact, String notice, String image, float rating, String openTime, String closeTime, boolean isOpenAllTime, boolean isChargingAvailable, boolean hasParking, boolean isPetFriendly, boolean hasDessert, boolean isBookmarked, Integer countPost) {
        this.ownerId = ownerId;
        this.cafeId = cafeId;
        this.name = name;
        this.address = address;
        this.latitude = latitude;
        this.longitude = longitude;
        this.contact = contact;
        this.notice = notice;
        this.image = image;
        this.rating = rating;
        this.openTime = openTime;
        this.closeTime = closeTime;
        this.isOpenAllTime = isOpenAllTime;
        this.isChargingAvailable = isChargingAvailable;
        this.hasParking = hasParking;
        this.isPetFriendly = isPetFriendly;
        this.hasDessert = hasDessert;
        this.isBookmarked = isBookmarked;
        this.countPost = countPost;
    }
}
