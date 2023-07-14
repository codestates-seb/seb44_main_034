package mainproject.cafeIn.domain.cafe.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;

@Getter
public class SearchCafeFilterCondition {
    private String shortAddress;

    @JsonProperty("isOpenAllTime")
    private Boolean isOpenAllTime;

    @JsonProperty("isChargingAvailable")
    private Boolean isChargingAvailable;

    private Boolean hasParking;

    @JsonProperty("isPetFriendly")
    private Boolean isPetFriendly;

    private Boolean hasDessert;

    @Builder
    public SearchCafeFilterCondition(String shortAddress, Boolean isOpenAllTime, Boolean isChargingAvailable, Boolean hasParking, Boolean isPetFriendly, Boolean hasDessert) {
        this.shortAddress = shortAddress;
        this.isOpenAllTime = isOpenAllTime;
        this.isChargingAvailable = isChargingAvailable;
        this.hasParking = hasParking;
        this.isPetFriendly = isPetFriendly;
        this.hasDessert = hasDessert;
    }
}
