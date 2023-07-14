package mainproject.cafeIn.domain.member.dto.reponse;

import com.querydsl.core.annotations.QueryProjection;

import lombok.Getter;

@Getter
public class SearchFollow {

    private long id;
    private String displayName;
    private String image;

    @QueryProjection
    public SearchFollow(long id, String displayName, String image) {
        this.id = id;
        this.displayName = displayName;
        this.image = image;
    }
}
