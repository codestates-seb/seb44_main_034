package mainproject.cafeIn.domain.owner.controller;

import lombok.RequiredArgsConstructor;
import mainproject.cafeIn.domain.owner.dto.request.OwnerPatchDto;
import mainproject.cafeIn.domain.owner.dto.request.OwnerPostDto;
import mainproject.cafeIn.domain.owner.dto.response.OwnerDetailResponse;
import mainproject.cafeIn.domain.owner.entity.Owner;
import mainproject.cafeIn.domain.owner.service.OwnerService;
import mainproject.cafeIn.global.auth.interceptor.JwtParseInterceptor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.net.URI;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/owners")
public class OwnerController {
    private final static String MEMBER_DEFAULT_URL = "/api/owners";
    private final OwnerService ownerService;

    @PostMapping("/sign-up")
    public ResponseEntity postOwner(@Valid @RequestBody OwnerPostDto requestBody,
                                    HttpServletRequest request){
        Owner createdOwner = ownerService.createOwner(OwnerPostDto.toEntity(requestBody), request.getRequestURI());

        URI location =
                UriComponentsBuilder
                        .newInstance()
                        .path(MEMBER_DEFAULT_URL + "/{owner-id}")
                        .buildAndExpand(createdOwner.getOwnerId())
                        .toUri();

        return ResponseEntity.created(location).build();
    }

    @PatchMapping("/update")
    public ResponseEntity patchOwner(@Valid @RequestBody OwnerPatchDto requestBody) {
        long ownerId = JwtParseInterceptor.getAuthenticatedUserId();

        Owner response = ownerService.updateOwner(OwnerPatchDto.toEntity(requestBody), ownerId);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/my-page")
    public ResponseEntity getOwner() {
        long ownerId = JwtParseInterceptor.getAuthenticatedUserId();
        OwnerDetailResponse owner = ownerService.findOwner(ownerId);

        return new ResponseEntity<>(owner, HttpStatus.OK);
    }

    @DeleteMapping("/sign-out")
    public ResponseEntity deleteOwner(HttpServletRequest request) {
        long ownerId = JwtParseInterceptor.getAuthenticatedUserId();
        Owner owner = ownerService.deleteOwner(ownerId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

//    @PostMapping("/log-out")
//    public ResponseEntity logout(HttpServletRequest request, HttpServletResponse response) {
//        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
//        if (auth != null) {
//            new SecurityContextLogoutHandler().logout(request, response, auth);
//        }
//        return new ResponseEntity<>(HttpStatus.OK);
//    }
}
