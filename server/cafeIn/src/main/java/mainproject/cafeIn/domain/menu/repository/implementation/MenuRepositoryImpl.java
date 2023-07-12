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
    public List<List<MenuResponse>> getMenus() {
        List<List<MenuResponse>> menuList = new ArrayList<>();
        menuList.add(getCoffees());
        menuList.add(getNonCoffees());
        menuList.add(getDesserts());
        menuList.add(getSignatures());

        return menuList;
    }

    private List<MenuResponse> getCoffees() {
        return queryFactory
                .select(new QMenuResponse(
                        menu.id,
                        menu.name,
                        menu.price,
                        menu.menuType
                ))
                .from(menu)
                .where(menu.menuType.eq(MenuType.COFFEE))
                .orderBy(menu.sequence.asc())
                .fetch();
    }

    private List<MenuResponse> getNonCoffees() {
        return queryFactory
                .select(new QMenuResponse(
                        menu.id,
                        menu.name,
                        menu.price,
                        menu.menuType
                ))
                .from(menu)
                .where(menu.menuType.eq(MenuType.NON_COFFEE))
                .orderBy(menu.sequence.asc())
                .fetch();
    }

    private List<MenuResponse> getDesserts() {
        return queryFactory
                .select(new QMenuResponse(
                        menu.id,
                        menu.name,
                        menu.price,
                        menu.menuType
                ))
                .from(menu)
                .where(menu.menuType.eq(MenuType.DESSERT))
                .orderBy(menu.sequence.asc())
                .fetch();
    }

    private List<MenuResponse> getSignatures() {
        return queryFactory
                .select(new QMenuResponse(
                        menu.id,
                        menu.name,
                        menu.price,
                        menu.menuType
                ))
                .from(menu)
                .where(menu.menuType.eq(MenuType.SIGNATURE))
                .orderBy(menu.sequence.asc())
                .fetch();
    }
}
