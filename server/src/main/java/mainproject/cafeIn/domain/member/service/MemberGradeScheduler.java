package mainproject.cafeIn.domain.member.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import mainproject.cafeIn.domain.member.dto.reponse.MemberGrade;
import mainproject.cafeIn.domain.member.entity.Member;
import mainproject.cafeIn.domain.member.repository.MemberRepository;
import mainproject.cafeIn.global.exception.CustomException;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static mainproject.cafeIn.domain.member.entity.enums.MemberGrade.*;
import static mainproject.cafeIn.global.exception.ErrorCode.MEMBER_NOT_FOUND;

@Component
@RequiredArgsConstructor
@Slf4j
public class MemberGradeScheduler {

    private final MemberRepository memberRepository;

    @Scheduled(cron = "0 */30 * * * *") // 매 30분마다 실행
    @Transactional
    public void updateMemberCoffeeBean() {

        List<MemberGrade> memberGradeList = memberRepository.memberGradeCoffeeBean();
        log.info("start schedule1 : " + LocalDateTime.now());
        //포스트 3개
        //팔로워 10명 - 커피콩
        //팔로워 50명 - 원두
        //팔로워 100명 - 에스프레소
        if (memberGradeList != null) {
            for (MemberGrade member : memberGradeList) {

                Long memberId = member.getId();
                Member findMember = memberRepository.findById(memberId)
                        .orElseThrow(() -> new CustomException(MEMBER_NOT_FOUND));


                if(member.getPostCount()>=3) {

                    if(member.getFollowerCount()>= 100) {
                       findMember.updateGrade(GRADE_ESPRESSO);
                       memberRepository.save(findMember);
                    } else if(member.getFollowerCount()>=50 && member.getFollowerCount()<100) {
                        findMember.updateGrade(GRADE_ROASTED_BEAN);
                        memberRepository.save(findMember);
                    } else if(member.getFollowerCount()>=10 && member.getFollowerCount()< 50) {
                        findMember.updateGrade(GRADE_COFFEE_BEAN);
                    } else {
                        findMember.updateGrade(GRADE_GREEN_BEAN);
                    }
                }

            }
        }

    }

//    public void updateMemberRostedBean() {
//
//
//    }
//
//
//    public void updateMemberEspresso() {
//
//
//
//    }
}
