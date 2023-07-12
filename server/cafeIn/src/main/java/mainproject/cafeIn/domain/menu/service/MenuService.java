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

import static mainproject.cafeIn.global.exception.ErrorCode.*;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MenuService {
    private final MenuRepository menuRepository;
    private final CafeService cafeService;

    @Transactional
    public void createMenu(Long loginId, Long cafeId, MenuRequest menuRequest) {
        Cafe cafe = cafeService.findCafeById(cafeId);
        cafe.validateOwner(loginId);
        Menu menu = menuRequest.toEntity(cafe);

        menuRepository.save(menu);
    }

    @Transactional
    public void updateMenu(Long loginId, Long menuId, MenuRequest menuRequest) {
        Menu menu = findMenuById(menuId);
        Cafe cafe = menu.getCafe();
        cafe.validateOwner(loginId);

        menu.updateMenu(menuRequest.toEntity());
    }

    @Transactional
    public void deleteMenu(Long loginId, Long menuId) {
        Menu menu = findMenuById(menuId);
        Cafe cafe = menu.getCafe();
        cafe.validateOwner(loginId);

        menuRepository.delete(menu);
    }

    public MenuResponse getMenu(Long menuId) {
        Menu menu = findMenuById(menuId);

        return menuRepository.getMenu(menuId);
    }

    public List<List<MenuResponse>> getMenus(Long cafeId) {

        return menuRepository.getMenus(cafeId);
    }

    public Menu findMenuById(Long menuId) {

        return menuRepository.findById(menuId)
                .orElseThrow(() -> new CustomException(MENU_NOT_FOUND));
    }
}
