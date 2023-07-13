package mainproject.cafeIn.domain.menu.controller;

import lombok.RequiredArgsConstructor;
import mainproject.cafeIn.domain.menu.dto.request.MenuRequest;
import mainproject.cafeIn.domain.menu.dto.response.GetMenuDetailResponse;
import mainproject.cafeIn.domain.menu.dto.response.MenuResponse;
import mainproject.cafeIn.domain.menu.service.MenuService;
import mainproject.cafeIn.domain.menucomment.dto.response.MenuCommentResponse;
import mainproject.cafeIn.domain.menucomment.service.MenuCommentService;
import mainproject.cafeIn.domain.owner.service.OwnerService;
import mainproject.cafeIn.global.auth.interceptor.JwtParseInterceptor;
import mainproject.cafeIn.global.response.ApplicationResponse;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.OK;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/menus")
public class MenuController {
    private final MenuService menuService;
    private final MenuCommentService menuCommentService;

    @PostMapping("/{cafe-id}")
    @ResponseStatus(CREATED)
    public ApplicationResponse createMenu(@PathVariable("cafe-id") Long cafeId,
                                          @RequestBody List<MenuRequest> menuRequests) {
        Long loginId = JwtParseInterceptor.getAuthenticatedUserId();
        menuService.createMenu(loginId, cafeId, menuRequests);

        return new ApplicationResponse<>();
    }

    @PatchMapping("/{menu-id}")
    @ResponseStatus(OK)
    public ApplicationResponse updateMenu(@PathVariable("menu-id") Long menuId,
                                          @RequestBody MenuRequest menuRequest) {
        Long loginId = JwtParseInterceptor.getAuthenticatedUserId();
        menuService.updateMenu(loginId, menuId, menuRequest);

        return new ApplicationResponse<>();
    }

    @DeleteMapping("/{menu-id}")
    @ResponseStatus(OK)
    public ApplicationResponse deleteMenu(@PathVariable("menu-id") Long menuId) {
        Long loginId = JwtParseInterceptor.getAuthenticatedUserId();
        menuService.deleteMenu(loginId, menuId);

        return new ApplicationResponse<>();
    }

    @GetMapping("/{menu-id}")
    @ResponseStatus(OK)
    public ApplicationResponse<GetMenuDetailResponse> getMenu(@PathVariable("menu-id") Long menuId) {
        MenuResponse menuResponse = menuService.getMenu(menuId);
        List<MenuCommentResponse> commentsResponse = menuCommentService.getMenuComments(menuId);
        GetMenuDetailResponse response = new GetMenuDetailResponse(menuResponse, commentsResponse);

        return new ApplicationResponse<>(response);
    }

    @GetMapping("/{cafe-id}/edit-menu")
    @ResponseStatus(OK)
    public ApplicationResponse<List<List<MenuResponse>>> getMenus(@PathVariable("cafe-id") Long cafeId) {
        List<List<MenuResponse>> menus = menuService.getMenus(cafeId);

        return new ApplicationResponse<>(menus);
    }
}
