package mainproject.cafeIn.domain.member.controller;

import lombok.RequiredArgsConstructor;

import mainproject.cafeIn.domain.member.dto.reponse.SearchFollow;
import mainproject.cafeIn.domain.member.dto.reponse.SliceResponse;
import mainproject.cafeIn.domain.member.dto.reponse.UserPageDetails;
import mainproject.cafeIn.domain.member.dto.request.MemberDto;
import mainproject.cafeIn.domain.member.service.MemberService;
import mainproject.cafeIn.global.auth.interceptor.JwtParseInterceptor;
import mainproject.cafeIn.global.response.ApplicationResponse;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;

import java.net.URI;
import java.util.Objects;

import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.OK;

@RequiredArgsConstructor
@RestController
@Validated
@RequestMapping("/members")
public class MemberController {

    private final MemberService memberService;

    @PostMapping("/sign-up")
    @ResponseStatus(CREATED)
    public ApplicationResponse<Objects> signUpMember(@Valid @RequestBody MemberDto.Post post) {

        memberService.signUp(post.toEntity());
        return new ApplicationResponse<>();
    }

    @PatchMapping("/update")
    @ResponseStatus(OK)
    public ApplicationResponse updateMember(@RequestPart(value = "file", required=false) MultipartFile file, @Valid @RequestPart(value = "patch") MemberDto.Patch patch) {

        long id = JwtParseInterceptor.getAuthenticatedUserId();
        memberService.updateMember(patch,id);


        return new ApplicationResponse();
    }

    @GetMapping("/mypage")
    @ResponseStatus(OK)
    public ApplicationResponse myInfo() {

        return new ApplicationResponse<>();
    }

    @GetMapping("/{member-id}")
    @ResponseStatus(OK)
    public ApplicationResponse otherInfo(@PathVariable("member-id") long memberId,
                                         @RequestParam(value = "id") long cursorId,
                                         @PageableDefault(size = 2) Pageable pageable) {

        UserPageDetails response = memberService.userPage(memberId, cursorId, pageable);

        return new ApplicationResponse<>(response);
    }

    @PostMapping("/{member-id}/follow")
    @ResponseStatus(OK)
    public ApplicationResponse memberFollow(@PathVariable("member-id") long memberId) {

        long id = JwtParseInterceptor.getAuthenticatedUserId();
        memberService.followMember(id, memberId);
        return new ApplicationResponse<>();
    }

    @PatchMapping("/sign-out")
    @ResponseStatus(OK)
    public ApplicationResponse signOutMember(@RequestBody MemberDto.checkPassword password) {

        long id = JwtParseInterceptor.getAuthenticatedUserId();
        memberService.signOut(id, password.getPassword());

        return new ApplicationResponse<>();
    }

    @GetMapping("/my-page/following")
    @ResponseStatus(OK)
    public ApplicationResponse followingMembers(@RequestParam(value = "id") long cursorId,@PageableDefault(size = 2) Pageable pageable){

        long id = JwtParseInterceptor.getAuthenticatedUserId();
        SliceResponse<SearchFollow> response = memberService.followingList(id, cursorId, pageable);
        return new ApplicationResponse<>(response);
    }

    @GetMapping("/my-page/follower")
    @ResponseStatus(OK)
    public ApplicationResponse followerMembers(@RequestParam(value = "id") long cursorId,@PageableDefault(size = 2) Pageable pageable){

        long id = JwtParseInterceptor.getAuthenticatedUserId();
        SliceResponse<SearchFollow> response = memberService.followerList(id, cursorId, pageable);
        return new ApplicationResponse<>(response);
    }
}
