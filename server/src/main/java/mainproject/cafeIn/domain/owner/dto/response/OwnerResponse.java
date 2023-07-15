package mainproject.cafeIn.domain.owner.dto.response;

import com.querydsl.core.annotations.QueryProjection;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class OwnerResponse {
    private String email;

    private String displayName;

    @QueryProjection
    public OwnerResponse(String email, String displayName) {
        this.email = email;
        this.displayName = displayName;
    }
}
