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
import org.springframework.web.multipart.MultipartFile;

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
    public void updateMember(MemberDto.Patch patch, Long id) {

        Member findmember = findById(id);

        Member member = checkDisplayName(patch, findmember);

        if (patch.getPassword() != null ) {
            String pass = patch.getPassword();
            String encryptedPassword = passwordEncoder.encode(pass);
            member.updatePassword(encryptedPassword);
        }

        memberRepository.save(member);


    }

    public UpdateMember getMember(Long id) {
        Member findMember = findById(id);


        return UpdateMember.builder()
                .displayName(findMember.getDisplayName())
                .image(findMember.getImage()).build();
    }

    @Transactional
    public MyPageDetails myPageMember(Long id) {

        Member findMember = findById(id);
        Long follower = memberRepository.countByFollowings(id);
        Long following = memberRepository.countByFollowers(id);

        MyPageDetails memberInfo = MyPageDetails.builder()
                .email(findMember.getEmail())
                .displayName(findMember.getDisplayName())
                .grade(findMember.getGrade())
                .image(findMember.getImage())
                .countFollower(follower)
                .countFollowing(following).build();
        return memberInfo;
    }

    @Transactional
    public SliceResponse<MyBookMarkCafeList> myBookMarkCafe(Long id, Long cursorId, Pageable pageable) {

        Member findMember = findById(id);
        Slice<MyBookMarkCafeList> postList = memberRepository.findByBookMarkCafeList(id, cursorId, pageable);
        List<MyBookMarkCafeList> list = postList.getContent();
        boolean hasNext = postList.hasNext();
        int size = pageable.getPageSize();

        return new SliceResponse<>(list, hasNext, size);
    }

    @Transactional
    public SliceResponse<MyPagePostList> myBookMarkPost(Long id, Long cursorId, Pageable pageable) {

        Member findMember = findById(id);
        Slice<MyPagePostList> postList = memberRepository.findByBookMarkPostList(id, cursorId, pageable);
        List<MyPagePostList> list = postList.getContent();
        boolean hasNext = postList.hasNext();
        int size = pageable.getPageSize();

        return new SliceResponse<>(list, hasNext, size);
    }

    @Transactional
    public UserPageDetails userPage(Long id, Long memberId) {

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

    @Transactional
    public SliceResponse<MyPagePostList> postList(Long id, Long cursorId, Pageable pageable) {

        Member findMember = findById(id);
        Slice<MyPagePostList> postList = memberRepository.findByPostList(id, cursorId, pageable);
        List<MyPagePostList> list = postList.getContent();
        boolean hasNext = postList.hasNext();
        int size = pageable.getPageSize();

        return new SliceResponse<>(list, hasNext, size);

    }
    @Transactional
    public void followMember(Long id, Long memberId) {

        if(id == memberId) throw new CustomException(REQUEST_VALIDATION_FAIL);
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

    public Member signOut(Long id, String password) {

        Member findMember = findById(id);
        if (passwordEncoder.matches(password, findMember.getPassword()) == true) {
            findMember.deleteStatus(MEMBER_QUIT);
        } else {
            throw new CustomException(PASSWORD_NOT_MATCH);
        }

        return memberRepository.save(findMember);
    }

    @Transactional
    public SliceResponse<SearchFollow> followingList(Long id, Long cursorId, Pageable pageable) {

        Member findMember = findById(id);
        Slice<SearchFollow> following = memberRepository.findByFollowingList(id, cursorId,pageable);
        List<SearchFollow> followings = following.getContent();
        boolean hasNext = following.hasNext();
        int size = pageable.getPageSize();

        return new SliceResponse<>(followings,hasNext,size);
    }

    @Transactional
    public SliceResponse<SearchFollow> followerList(Long id, Long cursorId, Pageable pageable) {

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

    public Member findById(Long id) {

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
