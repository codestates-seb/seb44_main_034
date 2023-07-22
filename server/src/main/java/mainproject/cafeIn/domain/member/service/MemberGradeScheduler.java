package mainproject.cafeIn.domain.member.service;

import lombok.RequiredArgsConstructor;
import mainproject.cafeIn.domain.member.dto.reponse.MemberGrade;
import mainproject.cafeIn.domain.member.entity.Member;
import mainproject.cafeIn.domain.member.repository.MemberRepository;
import mainproject.cafeIn.global.exception.CustomException;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

import static mainproject.cafeIn.domain.member.entity.enums.MemberGrade.*;
import static mainproject.cafeIn.global.exception.ErrorCode.MEMBER_NOT_FOUND;

@Component
@RequiredArgsConstructor
public class MemberGradeScheduler {

    private final MemberRepository memberRepository;

    public void updateMemberCoffeeBean() {

        List<MemberGrade> memberGradeList = memberRepository.memberGradeCoffeeBean();

        //포스트 3개
        //팔로워 10명 - 커피콩
        //팔로워 50명 - 원두
        //팔로워 100명 - 에스프레소
        if(memberGradeList != null) {
            for(MemberGrade member : memberGradeList) {

                Long memberId = member.getId();
                Member findMember = memberRepository.findById(memberId)
                        .orElseThrow(() -> new CustomException(MEMBER_NOT_FOUND));

                findMember.updateGrade(GRADE_COFFEE_BEAN);

                memberRepository.save(findMember);

            }
        }

    }

    public void updateMemberRostedBean() {

        List<MemberGrade> memberGradeList = memberRepository.memberGradeRoastedBean();

        if (memberGradeList != null) {
            for (MemberGrade member : memberGradeList) {

                Long memberId = member.getId();
                Member findMember = memberRepository.findById(memberId)
                        .orElseThrow(() -> new CustomException(MEMBER_NOT_FOUND));

                findMember.updateGrade(GRADE_ROASTED_BEAN);

                memberRepository.save(findMember);

            }


        }
    }

    public void updateMemberEspresso() {

        List<MemberGrade> memberGradeList = memberRepository.memberGradeEspresso();

        if (memberGradeList != null) {
            for (MemberGrade member : memberGradeList) {

                Long memberId = member.getId();
                Member findMember = memberRepository.findById(memberId)
                        .orElseThrow(() -> new CustomException(MEMBER_NOT_FOUND));

                findMember.updateGrade(GRADE_ESPRESSO);

                memberRepository.save(findMember);

            }


        }
    }
}
