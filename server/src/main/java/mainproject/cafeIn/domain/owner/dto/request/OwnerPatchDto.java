package mainproject.cafeIn.domain.owner.dto.request;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import mainproject.cafeIn.domain.owner.entity.Owner;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class OwnerPatchDto {
    private String displayName;

    private String password;

    public static Owner toEntity(OwnerPatchDto request) {
        return Owner.builder()
                .displayName(request.getDisplayName())
                .password(request.getPassword())
                .build();
    }
}
