package mainproject.cafeIn.domain.menu.repository;

import mainproject.cafeIn.domain.menu.dto.response.MenuResponse;

public interface MenuRepositoryCustom {
    MenuResponse getMenu(Long menuId);
}
