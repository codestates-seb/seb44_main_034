package mainproject.cafeIn.domain.member.dto.reponse;

import lombok.Builder;
import lombok.Getter;

@Getter
public class UpdateMember {

    private String displayName;
    private String image;

    @Builder
    public UpdateMember(String displayName, String image) {
        this.displayName = displayName;
        this.image = image;
    }
}
