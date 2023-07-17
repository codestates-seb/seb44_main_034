package mainproject.cafeIn.domain.cafe.dto.response;

import lombok.Getter;
import mainproject.cafeIn.domain.tag.entity.Tag;

import java.util.List;

@Getter
public class GetCafesResponse {
    private CafeResponse cafe;
    private List<Tag> tags;

    public GetCafesResponse(CafeResponse cafe, List<Tag> tags) {
        this.cafe = cafe;
        this.tags = tags;
    }
}
