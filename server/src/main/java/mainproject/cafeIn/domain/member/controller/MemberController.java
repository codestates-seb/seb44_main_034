package mainproject.cafeIn.domain.member.controller;

import lombok.RequiredArgsConstructor;

import mainproject.cafeIn.domain.member.dto.reponse.*;
import mainproject.cafeIn.domain.member.dto.request.MemberDto;
import mainproject.cafeIn.domain.member.service.MemberService;
import mainproject.cafeIn.global.auth.interceptor.JwtParseInterceptor;
import mainproject.cafeIn.global.response.ApplicationResponse;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import java.util.Objects;

import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.OK;

@RequiredArgsConstructor
@RestController
@Validated
@RequestMapping("/api/members")
public class MemberController {

    private final MemberService memberService;

    @PostMapping("/sign-up")
    @ResponseStatus(CREATED)
    public ApplicationResponse<Objects> signUpMember(@Valid @RequestBody MemberDto.Post post, HttpServletRequest request) {

        memberService.signUp(post.toEntity(), request.getRequestURI());
        return new ApplicationResponse<>();
    }

    @PatchMapping("/update")
    @ResponseStatus(OK)
    public ApplicationResponse updateMember(@RequestPart(value = "profile-image", required = false) MultipartFile file, @Valid @RequestPart(value = "dto") MemberDto.Patch patch) {

        long id = JwtParseInterceptor.getAuthenticatedUserId();
        memberService.updateMember(patch,id);


        return new ApplicationResponse();
    }

    @GetMapping("/get-update")
    @ResponseStatus(OK)
    public ApplicationResponse getMember() {

        Long id = JwtParseInterceptor.getAuthenticatedUserId();
        UpdateMember response = memberService.getMember(id);


        return new ApplicationResponse(response);
    }

    @GetMapping("/my-page")
    @ResponseStatus(OK)
    public ApplicationResponse myInfo() {

        Long id = JwtParseInterceptor.getAuthenticatedUserId();
        MyPageDetails response = memberService.myPageMember(id);

        return new ApplicationResponse<>(response);
    }

    @GetMapping("/my-page/bookmarked-cafe")
    @ResponseStatus(OK)
    public ApplicationResponse<SliceResponse<MyBookMarkCafeList>> myBookMarkCafe(@RequestParam(value = "bookmarkid", required = false) Long cursorId,
                                              @PageableDefault(size = 3) Pageable pageable) {

        Long id = JwtParseInterceptor.getAuthenticatedUserId();
        SliceResponse<MyBookMarkCafeList> response = memberService.myBookMarkCafe(id, cursorId, pageable);

        return new ApplicationResponse<>(response);
    }

    @GetMapping("/my-page/bookmarked-post")
    @ResponseStatus(OK)
    public ApplicationResponse<SliceResponse<MyPagePostList>> myBookMarkPost(@RequestParam(value = "bookmarkid", required = false) Long cursorId,
                                              @PageableDefault(size = 3) Pageable pageable) {

        Long id = JwtParseInterceptor.getAuthenticatedUserId();
        SliceResponse<MyPagePostList> response = memberService.myBookMarkPost(id, cursorId, pageable);

        return new ApplicationResponse<>(response);
    }

    @GetMapping("/my-page/my-post")
    @ResponseStatus(OK)
    public ApplicationResponse<SliceResponse<MyPagePostList>> myPost(@RequestParam(value = "postid", required = false) Long cursorId,
                                      @PageableDefault(size = 3) Pageable pageable) {

        Long id = JwtParseInterceptor.getAuthenticatedUserId();
        SliceResponse<MyPagePostList> response = memberService.postList(id, cursorId, pageable);

        return new ApplicationResponse<>(response);
    }

    @GetMapping("/{member-id}")
    @ResponseStatus(OK)
    public ApplicationResponse otherInfo(@PathVariable("member-id") Long memberId) {
        Long id = JwtParseInterceptor.getAuthenticatedUserId();
        UserPageDetails response = memberService.userPage(id, memberId);

        return new ApplicationResponse<>(response);
    }
    @GetMapping("/{member-id}/post")
    @ResponseStatus(OK)
    public ApplicationResponse<SliceResponse<MyPagePostList>> otherPost(@PathVariable("member-id") Long memberId,
                                         @RequestParam(value = "id", required = false) Long cursorId,
                                         @PageableDefault(size = 3) Pageable pageable) {


        SliceResponse<MyPagePostList> response = memberService.postList(memberId, cursorId, pageable);

        return new ApplicationResponse<>(response);
    }

    @PostMapping("/{member-id}/follow")
    @ResponseStatus(OK)
    public ApplicationResponse memberFollow(@PathVariable("member-id") long memberId) {

        Long id = JwtParseInterceptor.getAuthenticatedUserId();
        memberService.followMember(id, memberId);
        return new ApplicationResponse<>();
    }

    @PatchMapping("/sign-out")
    @ResponseStatus(OK)
    public ApplicationResponse signOutMember(@RequestBody MemberDto.checkPassword password) {

        Long id = JwtParseInterceptor.getAuthenticatedUserId();
        memberService.signOut(id, password.getPassword());

        return new ApplicationResponse<>();
    }

    @GetMapping("/my-page/following")
    @ResponseStatus(OK)
    public ApplicationResponse<SliceResponse<SearchFollow>> followingMembers(@RequestParam(value = "id", required = false) Long cursorId,
                                                @PageableDefault(size = 2) Pageable pageable){

        Long id = JwtParseInterceptor.getAuthenticatedUserId();
        SliceResponse<SearchFollow> response = memberService.followingList(id, cursorId, pageable);
        return new ApplicationResponse<>(response);
    }

    @GetMapping("/my-page/follower")
    @ResponseStatus(OK)
    public ApplicationResponse<SliceResponse<SearchFollow>> followerMembers(@RequestParam(value = "id", required = false) Long cursorId,
                                               @PageableDefault(size = 2) Pageable pageable){

        Long id = JwtParseInterceptor.getAuthenticatedUserId();
        SliceResponse<SearchFollow> response = memberService.followerList(id, cursorId, pageable);
        return new ApplicationResponse<>(response);
    }
}
