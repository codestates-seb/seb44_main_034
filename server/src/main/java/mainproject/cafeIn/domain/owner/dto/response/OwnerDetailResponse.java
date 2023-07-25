package mainproject.cafeIn.domain.owner.dto.response;

import com.querydsl.core.annotations.QueryProjection;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class OwnerDetailResponse {
    private OwnerResponse ownerResponse;

    private OwnerCafeResponse cafe;

    @QueryProjection
    public OwnerDetailResponse(OwnerResponse ownerResponse, OwnerCafeResponse cafe) {
        this.ownerResponse = ownerResponse;
        this.cafe = cafe;
    }
}
