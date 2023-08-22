package mainproject.cafeIn.domain.cafe.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

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

    private Boolean hasWifi;

    private Boolean hasSmokingZone;

    private String sortType;

    private List<Long> tags = new ArrayList<>();

    private String cafeName;

    private String menuName;

    @Builder
    public SearchCafeFilterCondition(String shortAddress, Boolean isOpenAllTime, Boolean isChargingAvailable, Boolean hasParking, Boolean isPetFriendly, Boolean hasDessert, Boolean hasWifi, Boolean hasSmokingZone, String sortType, List<Long> tags, String cafeName, String menuName) {
        this.shortAddress = shortAddress;
        this.isOpenAllTime = isOpenAllTime;
        this.isChargingAvailable = isChargingAvailable;
        this.hasParking = hasParking;
        this.isPetFriendly = isPetFriendly;
        this.hasDessert = hasDessert;
        this.hasWifi = hasWifi;
        this.hasSmokingZone = hasSmokingZone;
        this.sortType = sortType;
        this.tags = tags;
        this.cafeName = cafeName;
        this.menuName = menuName;
    }
}
