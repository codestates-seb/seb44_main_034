package mainproject.cafeIn.domain.menu.repository;

import mainproject.cafeIn.domain.menu.dto.response.MenuResponse;

import java.util.List;

public interface MenuRepositoryCustom {
    MenuResponse getMenu(Long menuId);

    List<List<MenuResponse>> getMenus(Long cafeId);
}
