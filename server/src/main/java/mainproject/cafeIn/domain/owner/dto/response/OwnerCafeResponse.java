package mainproject.cafeIn.domain.owner.dto.response;

import com.querydsl.core.annotations.QueryProjection;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class OwnerCafeResponse {
    private long cafeId;

    private String cafeName;

    private long countBookmarked;

    private String image;
    @QueryProjection
    public OwnerCafeResponse(long cafeId, String cafeName, long countBookmarked, String image) {
        this.cafeId = cafeId;
        this.cafeName = cafeName;
        this.countBookmarked = countBookmarked;
        this.image = image;
    }
}
