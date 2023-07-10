package mainproject.cafeIn.domain.member.service;

import lombok.RequiredArgsConstructor;
import mainproject.cafeIn.domain.member.dto.reponse.FollowResponseDto;
import mainproject.cafeIn.domain.member.dto.request.MemberDto;
import mainproject.cafeIn.domain.member.entity.Follow;
import mainproject.cafeIn.domain.member.entity.Member;
import mainproject.cafeIn.domain.member.entity.enums.MemberGrade;
import mainproject.cafeIn.domain.member.entity.enums.MemberStatus;

import mainproject.cafeIn.domain.member.repository.FollowRepository;
import mainproject.cafeIn.domain.member.repository.MemberRepository;
import mainproject.cafeIn.global.exception.CustomException;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

import static mainproject.cafeIn.domain.member.entity.enums.MemberStatus.MEMBER_QUIT;
import static mainproject.cafeIn.global.exception.ErrorCode.*;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final FollowRepository followRepository;


    public Member signUp(Member member) {

        verifyExistsEmail(member.getEmail());
        verifyExistsDisplayName(member.getDisplayName());

        return memberRepository.save(Member.builder()
                .email(member.getEmail())
                .displayName(member.getDisplayName())
                .password(member.getPassword())
                .status(MemberStatus.MEMBER_ACTIVE)
                .grade(MemberGrade.GRADE_GREEN_BEAN)
                .build());
    }

    @Transactional
    public void updateMember(MemberDto.Patch patch, long id) {

        Member findmember = findById(id);

        Member member = checkDisplayName(patch, findmember);

        Optional.ofNullable(patch.getPassword()).ifPresent(password -> member.updatePassword(password));
        Optional.ofNullable(patch.getImage()).ifPresent(image -> member.updateImage(image));

        memberRepository.save(member);


    }

    public void myPageMember() {

    }

    @Transactional
    public void followMember(long id, long memberId) {

        Member findFollowingMember = findById(memberId);
        Member findMember = findById(id);
        List<Follow> follows = followingList(id, findFollowingMember);
        if (follows.isEmpty()) {
            followRepository.save(Follow.builder()
                    .followingId(findFollowingMember)
                    .followerId(findMember)
                    .build());
        } else {
            followRepository.delete(follows.get(0));
        }


    }

    public Member signOut(long id, String password) {

        Member findMember = findById(id);
        if (findMember.getPassword().equals(password)) {
            findMember.deleteStatus(MEMBER_QUIT);
        } else {
            throw new CustomException(PASSWORD_NOT_MATCH);
        }

        return memberRepository.save(findMember);
    }

    public void followings(long id, long cursorId, Pageable pageable) {

        Member findMember = findById(id);
        Slice<FollowResponseDto> following = followRepository.findByFollowingList(id, cursorId,pageable);

    }

    public void followers(long id, long cursorId, Pageable pageable) {

        Member findMember = findById(id);
        Slice<FollowResponseDto> follower = followRepository.findByFollowerList(id, cursorId, pageable);

    }

    private void verifyExistsEmail(String email) {

        Optional<Member> member = memberRepository.findByEmail(email);
        if (member.isPresent()) {
            throw new CustomException(ALREADY_EXIST_EMAIL);
        }
    }

    private void verifyExistsDisplayName(String displayName) {

        Optional<Member> member = memberRepository.findByDisplayName(displayName);
        if (member.isPresent()) {
            throw new CustomException(ALREADY_EXIST_NAME);
        }
    }

    private Member findById(long id) {

        Member member = memberRepository.findById(id)
                .orElseThrow(() -> new CustomException(MEMBER_NOT_FOUND));

        return member;
    }

    private Member checkDisplayName(MemberDto.Patch patch, Member member) {

        String displayName = patch.getDisplayName();
        if(displayName.equals(member.getDisplayName())){

            return member;
        } else if (displayName != null) {

            verifyExistsDisplayName(displayName);
            member.updateDisplay(displayName);
        }

        return member;

    }

    private List<Follow> followingList(Long id, Member followingMember) {

        return followRepository.findByFollowing(id, followingMember);
    }


}
