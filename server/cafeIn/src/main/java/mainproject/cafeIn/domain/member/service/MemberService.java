package mainproject.cafeIn.domain.member.service;

import lombok.RequiredArgsConstructor;
import mainproject.cafeIn.domain.member.dto.reponse.*;
import mainproject.cafeIn.domain.member.dto.request.MemberDto;
import mainproject.cafeIn.domain.member.entity.Follow;
import mainproject.cafeIn.domain.member.entity.Member;
import mainproject.cafeIn.domain.member.entity.enums.MemberGrade;
import mainproject.cafeIn.domain.member.entity.enums.MemberStatus;

import mainproject.cafeIn.domain.member.repository.FollowRepository;
import mainproject.cafeIn.domain.member.repository.MemberRepository;
import mainproject.cafeIn.global.auth.utils.CustomAuthorityUtils;
import mainproject.cafeIn.global.exception.CustomException;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.security.crypto.password.PasswordEncoder;
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
    private final PasswordEncoder passwordEncoder;
    private final CustomAuthorityUtils authorityUtils;
    private String bucket;


    public Member signUp(Member member, String uri) {

        verifyExistsEmail(member.getEmail());
        verifyExistsDisplayName(member.getDisplayName());

        String encryptedPassword = passwordEncoder.encode(member.getPassword());
        List<String> roles = authorityUtils.createRoles(uri);

        return memberRepository.save(Member.builder()
                .email(member.getEmail())
                .displayName(member.getDisplayName())
                .password(encryptedPassword)
                .status(MemberStatus.MEMBER_ACTIVE)
                .grade(MemberGrade.GRADE_GREEN_BEAN)
                .roles(roles)
                .build());
    }

    @Transactional
    public void updateMember(MemberDto.Patch patch, long id) {

        Member findmember = findById(id);

        Member member = checkDisplayName(patch, findmember);

        Optional.ofNullable(patch.getPassword()).ifPresent(password -> member.updatePassword(password));
//        Optional.ofNullable(patch.getImage()).ifPresent(image -> member.updateImage(image));

        memberRepository.save(member);


    }


    public MyPageDetails myPageMember(long id) {

        Member findMember = findById(id);
        long countFollower = followRepository.countByFollowingId(id);
        long countFollowing = followRepository.countByFollowerId(id);

        MyPageDetails memberInfo = MyPageDetails.builder()
                .email(findMember.getEmail())
                .displayName(findMember.getDisplayName())
                .grade(findMember.getGrade())
                .image(findMember.getEmail())
                .countFollower(countFollower)
                .countFollowing(countFollowing).build();
        return memberInfo;
    }

    public SliceResponse<MyBookMarkCafeList> myBookMarkCafe(long id, long cursorId, Pageable pageable) {

        Slice<MyBookMarkCafeList> postList = memberRepository.findByBookMarkCafeList(id, cursorId, pageable);
        List<MyBookMarkCafeList> list = postList.getContent();
        boolean hasNext = postList.hasNext();
        int size = pageable.getPageSize();

        return new SliceResponse<>(list, hasNext, size);
    }

    public SliceResponse<MyPagePostList> myBookMarkPost(long id, long cursorId, Pageable pageable) {

        Slice<MyPagePostList> postList = memberRepository.findByBookMarkPostList(id, cursorId, pageable);
        List<MyPagePostList> list = postList.getContent();
        boolean hasNext = postList.hasNext();
        int size = pageable.getPageSize();

        return new SliceResponse<>(list, hasNext, size);
    }



    public UserPageDetails userPage(long id, long memberId) {

        Member userMember = findById(memberId);
        Member findMember = findById(id);
        boolean isFollowing = checkfollowing(id, userMember).size() > 0;
        UserPageDetails userInfo = UserPageDetails.builder()
                .displayName(userMember.getDisplayName())
                .image(userMember.getImage())
                .grade(userMember.getGrade())
                .isFollowing(isFollowing)
                .build();

        return userInfo;

    }

    public SliceResponse<MyPagePostList> postList(long id, long cursorId, Pageable pageable) {

        Slice<MyPagePostList> postList = memberRepository.findByPostList(id, cursorId, pageable);
        List<MyPagePostList> list = postList.getContent();
        boolean hasNext = postList.hasNext();
        int size = pageable.getPageSize();

        return new SliceResponse<>(list, hasNext, size);

    }
    @Transactional
    public void followMember(long id, long memberId) {

        Member findFollowingMember = findById(memberId);
        Member findMember = findById(id);
        List<Follow> follows = checkfollowing(id, findFollowingMember);
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

    public SliceResponse<SearchFollow> followingList(long id, long cursorId, Pageable pageable) {

        Member findMember = findById(id);
        Slice<SearchFollow> following = memberRepository.findByFollowingList(id, cursorId,pageable);
        List<SearchFollow> followings = following.getContent();
        boolean hasNext = following.hasNext();
        int size = pageable.getPageSize();

        return new SliceResponse<>(followings,hasNext,size);
    }

    public SliceResponse<SearchFollow> followerList(long id, long cursorId, Pageable pageable) {

        Member findMember = findById(id);
        Slice<SearchFollow> follower = memberRepository.findByFollowerList(id, cursorId, pageable);
        List<SearchFollow> followers = follower.getContent();
        boolean hasNext = follower.hasNext();
        int size = pageable.getPageSize();

        return new SliceResponse<>(followers, hasNext,size);

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

    public Member findById(long id) {

        Member member = memberRepository.findById(id)
                .orElseThrow(() -> new CustomException(MEMBER_NOT_FOUND));
        if (member.getStatus() == MEMBER_QUIT) {
            throw new CustomException(MEMBER_NOT_FOUND);
        }
        return member;
    }

    public Member findByEmail(String email) {

        return memberRepository.findByEmail(email)
                .orElseThrow(() -> new CustomException(MEMBER_NOT_FOUND));

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

    private List<Follow> checkfollowing(Long id, Member followingMember) {

        return memberRepository.findByFollowing(id, followingMember);
    }


}
