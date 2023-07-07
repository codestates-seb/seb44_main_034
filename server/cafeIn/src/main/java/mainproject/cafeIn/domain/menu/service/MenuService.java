package mainproject.cafeIn.domain.menu.service;

import lombok.RequiredArgsConstructor;
import mainproject.cafeIn.domain.cafe.entity.Cafe;
import mainproject.cafeIn.domain.cafe.service.CafeService;
import mainproject.cafeIn.domain.menu.dto.request.MenuRequest;
import mainproject.cafeIn.domain.menu.dto.response.MenuResponse;
import mainproject.cafeIn.domain.menu.entity.Menu;
import mainproject.cafeIn.domain.menu.repository.MenuRepository;
import mainproject.cafeIn.global.exception.CustomException;
import mainproject.cafeIn.global.exception.ErrorCode;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MenuService {
    private final MenuRepository menuRepository;
    private final CafeService cafeService;

    @Transactional
    public void createMenu(Long loginId, Long cafeId, List<MenuRequest> menuRequests) {
        // TODO: login user 검증
        Cafe cafe = cafeService.findCafeById(cafeId);
        List<Menu> menus = menuRequestToMenu(menuRequests);

        for (Menu menu : menus) {
            Menu result = Menu.of(menu.getName(), menu.getPrice(), menu.getMenuType(), cafe);
            menuRepository.save(result);
        }
    }

    @Transactional
    public void updateMenu(Long loginId, Long menuId, MenuRequest menuRequest) {
        // TODO: login user 검증
        Menu menu = findMenuById(menuId);
        menu.updateMenu(menuRequest.toEntity());
    }

    @Transactional
    public void deleteMenu(Long loginId, Long menuId) {
        // TODO: login user 검증
        Menu menu = findMenuById(menuId);
        menuRepository.delete(menu);
    }

    public MenuResponse getMenu(Long menuId) {
        Menu menu = findMenuById(menuId);

        return menuRepository.getMenu(menuId);
    }

    private List<Menu> menuRequestToMenu(List<MenuRequest> menuRequests) {
        return menuRequests.stream()
                .map(menu -> menu.toEntity())
                .collect(Collectors.toList());
    }

    private Menu findMenuById(Long menuId) {
        return menuRepository.findById(menuId)
                .orElseThrow(() -> new CustomException(ErrorCode.INTERNAL_SERVER_ERROR));
    }
}
