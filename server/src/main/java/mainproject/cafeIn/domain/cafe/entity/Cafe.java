package mainproject.cafeIn.domain.cafe.entity;

import lombok.*;
import mainproject.cafeIn.domain.cafe.dto.request.CafeInfoRequest;
import mainproject.cafeIn.domain.menu.entity.Menu;
import mainproject.cafeIn.domain.owner.entity.Owner;
import mainproject.cafeIn.domain.post.entity.Post;
import mainproject.cafeIn.domain.tag.entity.PostTag;
import mainproject.cafeIn.global.base.BaseEntity;
import mainproject.cafeIn.global.exception.CustomException;
import org.hibernate.annotations.OnDelete;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import static javax.persistence.CascadeType.PERSIST;
import static javax.persistence.FetchType.LAZY;
import static mainproject.cafeIn.global.exception.ErrorCode.NONE_AUTHORIZATION_TOKEN;
import static org.hibernate.annotations.OnDeleteAction.CASCADE;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "cafes")
public class Cafe extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cafe_id", nullable = false, updatable = false)
    private Long id;

    @Column(name = "cafe_name", nullable = false)
    private String name;

    @Column(name = "address", nullable = false)
    private String address;

    @Column(name = "short_address", nullable = false)
    private String shortAddress;

    @Column(name = "contact", nullable = false)
    private String contact;

    @Column(name = "latitude", nullable = false)
    private double latitude;

    @Column(name = "longitude", nullable = false)
    private double longitude;

    @Column(name = "notice")
    private String notice;

    @Setter
    @Column(name = "cafe_image", columnDefinition = "TEXT")
    private String image;

    @Column(name = "rating")
    private float rating;

    @Column(name = "open_time", nullable = false)
    private String openTime;

    @Column(name = "close_time", nullable = false)
    private String closeTime;

    @Column(name = "is_open_all_time")
    private boolean isOpenAllTime;

    @Column(name = "is_charging_available")
    private boolean isChargingAvailable;

    @Column(name = "has_parking")
    private boolean hasParking;

    @Column(name = "is_pet_friendly")
    private boolean isPetFriendly;

    @Column(name = "has_dessert")
    private boolean hasDessert;

    @Column(name = "has_wifi")
    private boolean hasWifi;

    @Column(name = "has_smoking_zone")
    private boolean hasSmokingZone;

    @OneToOne(fetch = LAZY)
    @JoinColumn(name = "owner_id")
    private Owner owner;

    @OnDelete(action = CASCADE)
    @OneToMany(mappedBy = "cafe", cascade = PERSIST)
    private List<Menu> menus = new ArrayList<>();

    @OnDelete(action = CASCADE)
    @OneToMany(mappedBy = "cafe", cascade = PERSIST)
    private List<Post> posts = new ArrayList<>();

    @OnDelete(action = CASCADE)
    @OneToMany(mappedBy = "cafe", cascade = PERSIST)
    private List<CafeBookmark> cafeBookmarks = new ArrayList<>();

    @OnDelete(action = CASCADE)
    @OneToMany(mappedBy = "cafe", cascade = PERSIST)
    private List<PostTag> postTags = new ArrayList<>();

    @Builder
    public Cafe(String name, String address, String shortAddress, String contact, double latitude, double longitude, String notice, String image, String openTime, String closeTime, boolean isOpenAllTime, boolean isChargingAvailable, boolean hasParking, boolean isPetFriendly, boolean hasDessert, boolean hasWifi, boolean hasSmokingZone, Owner owner) {
        this.name = name;
        this.address = address;
        this.shortAddress = shortAddress;
        this.contact = contact;
        this.latitude = latitude;
        this.longitude = longitude;
        this.notice = notice;
        this.image = image;
        this.openTime = openTime;
        this.closeTime = closeTime;
        this.isOpenAllTime = isOpenAllTime;
        this.isChargingAvailable = isChargingAvailable;
        this.hasParking = hasParking;
        this.isPetFriendly = isPetFriendly;
        this.hasDessert = hasDessert;
        this.hasWifi = hasWifi;
        this.hasSmokingZone = hasSmokingZone;
        this.rating = 0;
        this.owner = owner;
    }

    public void updateCafe(CafeInfoRequest cafe) {
        this.name = cafe.getName();
        this.address = cafe.getAddress();
        this.shortAddress = cafe.getShortAddress();
        this.contact = cafe.getContact();
        this.latitude = cafe.getLatitude();
        this.longitude = cafe.getLongitude();
        this.notice = cafe.getNotice();
        this.openTime = cafe.getOpenTime();
        this.closeTime = cafe.getCloseTime();
        this.isOpenAllTime = cafe.isOpenAllTime();
        this.isChargingAvailable = cafe.isChargingAvailable();
        this.hasParking = cafe.isHasParking();
        this.isPetFriendly = cafe.isPetFriendly();
        this.hasDessert = cafe.isHasDessert();
        this.hasWifi = cafe.isHasWifi();
        this.hasSmokingZone = cafe.isHasSmokingZone();
    }

    public void validateOwner(Long ownerId) {
        if (!Objects.equals(this.owner.getOwnerId(), ownerId)) {
            throw new CustomException(NONE_AUTHORIZATION_TOKEN);
        }
    }

    public void setRating(float rating) {
        this.rating = rating;
    }
}
