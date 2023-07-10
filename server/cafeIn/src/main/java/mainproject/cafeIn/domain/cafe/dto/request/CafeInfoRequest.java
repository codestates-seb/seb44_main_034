package mainproject.cafeIn.domain.cafe.dto.request;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import mainproject.cafeIn.domain.cafe.entity.Cafe;
import mainproject.cafeIn.domain.owner.entity.Owner;

import javax.validation.constraints.NotNull;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class CafeInfoRequest {
    @NotNull
    private String name;

    @NotNull
    private String address;

    private String contact;

    @NotNull
    private double latitude;

    @NotNull
    private double longitude;

    private String notice;

    private String openTime;

    private String closeTime;

    private boolean isOpenAllTime;

    private boolean isChargingAvailable;

    private boolean hasParking;

    private boolean isPetFriendly;

    private boolean hasDessert;

    public Cafe toEntity() {
        return Cafe.builder()
                .name(name)
                .address(address)
                .contact(contact)
                .latitude(latitude)
                .longitude(longitude)
                .notice(notice)
                .openTime(openTime)
                .closeTime(closeTime)
                .isOpenAllTime(isOpenAllTime)
                .isChargingAvailable(isChargingAvailable)
                .isPetFriendly(isPetFriendly)
                .hasParking(hasParking)
                .hasDessert(hasDessert)
                .build();
    }

    public Cafe toEntity(Owner owner) {
        return Cafe.builder()
                .name(name)
                .address(address)
                .contact(contact)
                .latitude(latitude)
                .longitude(longitude)
                .notice(notice)
                .openTime(openTime)
                .closeTime(closeTime)
                .isOpenAllTime(isOpenAllTime)
                .isChargingAvailable(isChargingAvailable)
                .isPetFriendly(isPetFriendly)
                .hasParking(hasParking)
                .hasDessert(hasDessert)
                .owner(owner)
                .build();
    }
}
