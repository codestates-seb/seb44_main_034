package mainproject.cafeIn.domain.cafe.dto.request;

import lombok.Builder;
import lombok.Getter;

@Getter
public class SearchCafeFilterCondition {
    private String shortAddress;
    private boolean isOpenAllTime;

    private boolean isChargingAvailable;

    private boolean hasParking;

    private boolean isPetFriendly;

    private boolean hasDessert;

    @Builder
    public SearchCafeFilterCondition(String shortAddress, boolean isOpenAllTime, boolean isChargingAvailable, boolean hasParking, boolean isPetFriendly, boolean hasDessert) {
        this.shortAddress = shortAddress;
        this.isOpenAllTime = isOpenAllTime;
        this.isChargingAvailable = isChargingAvailable;
        this.hasParking = hasParking;
        this.isPetFriendly = isPetFriendly;
        this.hasDessert = hasDessert;
    }
}
