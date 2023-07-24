package mainproject.cafeIn.domain.member.entity.enums;

import lombok.Getter;

public enum MemberStatus {

    MEMBER_ACTIVE("활동중"),
    MEMBER_QUIT("탈퇴 상태");

    @Getter
    private String status;

    MemberStatus(String status){
        this.status = status;
    }
}
