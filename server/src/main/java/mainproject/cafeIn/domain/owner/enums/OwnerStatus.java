package mainproject.cafeIn.domain.owner.enums;

import lombok.Getter;

public enum OwnerStatus {
    OWNER_QUIT("탈퇴 상태"),
    OWNER_ACTIVE("활동중");

    @Getter
    private String status;

    OwnerStatus(String status) {
        this.status = status;
    }
}
