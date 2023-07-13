package mainproject.cafeIn.domain.menu.repository.implementation;

import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import mainproject.cafeIn.domain.menu.dto.response.MenuResponse;
import mainproject.cafeIn.domain.menu.dto.response.QMenuResponse;
import mainproject.cafeIn.domain.menu.entity.enums.MenuType;
import mainproject.cafeIn.domain.menu.repository.MenuRepositoryCustom;

import java.util.ArrayList;
import java.util.List;

import static mainproject.cafeIn.domain.menu.entity.QMenu.menu;

@RequiredArgsConstructor
public class MenuRepositoryImpl implements MenuRepositoryCustom {
    private final JPAQueryFactory queryFactory;


    @Override
    public MenuResponse getMenu(Long menuId) {
        return queryFactory
                .select(new QMenuResponse(
                        menu.id,
                        menu.name,
                        menu.price,
                        menu.menuType
                ))
                .from(menu)
                .where(menu.id.eq(menuId))
                .fetchOne();
    }

    @Override
    public List<List<MenuResponse>> getMenus(Long cafeId) {
        List<List<MenuResponse>> menuList = new ArrayList<>();
        menuList.add(getCoffees(cafeId));
        menuList.add(getNonCoffees(cafeId));
        menuList.add(getDesserts(cafeId));
        menuList.add(getSignatures(cafeId));

        return menuList;
    }

    private List<MenuResponse> getCoffees(Long cafeId) {
        return queryFactory
                .select(new QMenuResponse(
                        menu.id,
                        menu.name,
                        menu.price,
                        menu.menuType
                ))
                .from(menu)
                .where(menu.menuType.eq(MenuType.COFFEE),
                        menu.cafe.id.eq(cafeId))
                .fetch();
    }

    private List<MenuResponse> getNonCoffees(Long cafeId) {
        return queryFactory
                .select(new QMenuResponse(
                        menu.id,
                        menu.name,
                        menu.price,
                        menu.menuType
                ))
                .from(menu)
                .where(menu.menuType.eq(MenuType.NON_COFFEE),
                        menu.cafe.id.eq(cafeId))
                .fetch();
    }

    private List<MenuResponse> getDesserts(Long cafeId) {
        return queryFactory
                .select(new QMenuResponse(
                        menu.id,
                        menu.name,
                        menu.price,
                        menu.menuType
                ))
                .from(menu)
                .where(menu.menuType.eq(MenuType.DESSERT),
                        menu.cafe.id.eq(cafeId))
                .fetch();
    }

    private List<MenuResponse> getSignatures(Long cafeId) {
        return queryFactory
                .select(new QMenuResponse(
                        menu.id,
                        menu.name,
                        menu.price,
                        menu.menuType
                ))
                .from(menu)
                .where(menu.menuType.eq(MenuType.SIGNATURE),
                        menu.cafe.id.eq(cafeId))
                .fetch();
    }
}
