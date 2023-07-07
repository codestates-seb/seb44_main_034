package mainproject.cafeIn.domain.menu.controller;

import lombok.RequiredArgsConstructor;
import mainproject.cafeIn.domain.menu.dto.request.MenuRequest;
import mainproject.cafeIn.domain.menu.dto.response.GetMenuDetailResponse;
import mainproject.cafeIn.domain.menu.dto.response.MenuResponse;
import mainproject.cafeIn.domain.menu.entity.Menu;
import mainproject.cafeIn.domain.menu.service.MenuService;
import mainproject.cafeIn.global.response.ApplicationResponse;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

import static org.springframework.http.HttpStatus.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/menus")
public class MenuController {
    private final MenuService menuService;

    @PostMapping("/{cafe-id}")
    @ResponseStatus(CREATED)
    public ApplicationResponse createMenus(@PathVariable("cafe-id") Long cafeId,
                                           @RequestBody List<MenuRequest> menuRequests) {
        // TODO: 로그인 정보 가져오는 로직 적용
        Long loginId = 1L;
        menuService.createMenu(loginId, cafeId, menuRequests);

        return new ApplicationResponse<>();
    }

    @PatchMapping("/{menu-id}")
    @ResponseStatus(OK)
    public ApplicationResponse updateMenu(@PathVariable("menu-id") Long menuId,
                                          @RequestBody MenuRequest menuRequest) {
        // TODO: 로그인 정보 가져오는 로직 적용
        Long loginId = 1L;
        menuService.updateMenu(loginId, menuId, menuRequest);

        return new ApplicationResponse<>();
    }

    @DeleteMapping("/{menu-id}")
    @ResponseStatus(OK)
    public ApplicationResponse deleteMenu(@PathVariable("menu-id") Long menuId) {
        // TODO: 로그인 정보 가져오는 로직 적용
        Long loginId = 1L;
        menuService.deleteMenu(loginId, menuId);

        return new ApplicationResponse<>();
    }

    @GetMapping("/{menu-id}")
    @ResponseStatus(OK)
    public ApplicationResponse<GetMenuDetailResponse> getMenu(@PathVariable("menu-id") Long menuId) {
        MenuResponse menuResponse = menuService.getMenu(menuId);
        MenuCommentsResponse commentsResponse = menuCommentService.getComments(menuId);
        GetMenuDetailResponse response = new GetMenuDetailResponse(menuResponse, commentsResponse);

        return new ApplicationResponse<>(response);
    }
}
