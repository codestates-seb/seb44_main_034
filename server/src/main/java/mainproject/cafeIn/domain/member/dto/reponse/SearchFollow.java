package mainproject.cafeIn.domain.member.dto.reponse;

import com.querydsl.core.annotations.QueryProjection;

import lombok.Getter;

@Getter
public class SearchFollow {

    private long id;
    private String displayName;
    private String image;
    private long memberId;

    @QueryProjection
    public SearchFollow(long id, String displayName, String image, long memberId) {
        this.id = id;
        this.displayName = displayName;
        this.image = image;
        this.memberId = memberId;
    }
}
