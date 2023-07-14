package mainproject.cafeIn.domain.owner.dto.response;

import com.querydsl.core.annotations.QueryProjection;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import mainproject.cafeIn.domain.cafe.entity.Cafe;

import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class OwnerDetailResponse {
    private OwnerResponse ownerResponse;

    private List<OwnerCafeResponse> cafes;

    @QueryProjection
    public OwnerDetailResponse(OwnerResponse ownerResponse, List<OwnerCafeResponse> cafes) {
        this.ownerResponse = ownerResponse;
        this.cafes = cafes;
    }
}
