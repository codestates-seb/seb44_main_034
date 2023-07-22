package mainproject.cafeIn.domain.member.entity.enums;

import lombok.Getter;

public enum MemberGrade {

    GRADE_GREEN_BEAN("생두"),

    GRADE_COFFEE_BEAN("커피콩"),
    GRADE_ROASTED_BEAN("원두"),
    GRADE_ESPRESSO("에스프레소");

    @Getter
    private String grade;

    MemberGrade(String grade){
        this.grade = grade;
    }
}
