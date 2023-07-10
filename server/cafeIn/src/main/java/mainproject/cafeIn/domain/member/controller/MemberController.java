package mainproject.cafeIn.domain.member.controller;

import lombok.RequiredArgsConstructor;
import mainproject.cafeIn.domain.member.dto.request.MemberDto;
import mainproject.cafeIn.domain.member.service.MemberService;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import java.net.URI;
import java.util.Objects;

@RequiredArgsConstructor
@RestController
@Validated
@RequestMapping("/members")
public class MemberController {

    private final MemberService memberService;

    @PostMapping("/sign-up")
    public ResponseEntity<Objects> signUpMember(@Valid @RequestBody MemberDto.Post post) {

        memberService.signUp(post.toEntity());
        return ResponseEntity.created(URI.create("/members/mypage")).build();
    }

    @PatchMapping("/update")
    public ResponseEntity updateMember(@Valid @RequestBody MemberDto.Patch patch) {

        long id = 1L;
        memberService.updateMember(patch, id);

        return ResponseEntity.ok().build();
    }

    @GetMapping("/mypage")
    public ResponseEntity myInfo() {

        return null;
    }

    @GetMapping("/{member-id}")
    public ResponseEntity otherInfo() {

        return null;
    }

    @PostMapping("/{member-id}/follow")
    public ResponseEntity memberFollow(@PathVariable("member-id") long memberId) {

        long id = 1L;
        memberService.followMember(id, memberId);
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/sign-out")
    public ResponseEntity signOutMember(@RequestBody MemberDto.checkPassword password) {

        long id = 1L;
        memberService.signOut(id, password.getPassword());

        return ResponseEntity.ok().build();
    }

    @GetMapping("/my-page/following")
    public ResponseEntity followingMembers(@RequestParam Long cursorId,@PageableDefault(size = 2) Pageable pageable){

        long id = 1L;
        memberService.followings(id, cursorId, pageable);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/my-page/follower")
    public ResponseEntity followerMembers(@RequestParam Long cursorId,@PageableDefault(size = 2) Pageable pageable){

        long id = 1L;
        memberService.followers(id, cursorId, pageable);
        return ResponseEntity.ok().build();
    }
}
