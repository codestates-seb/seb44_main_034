package mainproject.cafeIn.domain.tag.dto;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Getter;

@Getter
public class TagResponse {
    private Long id;
    private String name;

    @QueryProjection
    public TagResponse(Long id, String name) {
        this.id = id;
        this.name = name;
    }
}
