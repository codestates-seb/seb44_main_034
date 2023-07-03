package mainproject.cafeIn.domain.cafe.entity;

import lombok.*;
import mainproject.cafeIn.global.base.BaseEntity;

import javax.persistence.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
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

    @Column(name = "contact")
    private String contact;

    @Column(name = "latitude")
    private double latitude;

    @Column(name = "longitude")
    private double longitude;

    @Column(name = "notice")
    private String notice;

    @Column(name = "cafe_image")
    private String image;

    @Column(name = "rating")
    private float rating;

    @Column(name = "open_time")
    private String openTime;

    @Column(name = "close_time")
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
}
