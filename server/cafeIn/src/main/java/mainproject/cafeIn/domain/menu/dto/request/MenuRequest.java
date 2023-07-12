package mainproject.cafeIn.domain.menu.dto.request;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import mainproject.cafeIn.domain.cafe.entity.Cafe;
import mainproject.cafeIn.domain.menu.entity.Menu;
import mainproject.cafeIn.domain.menu.entity.enums.MenuType;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MenuRequest {
    private String name;

    private Integer price;

    private MenuType menuType;
    private Integer sequence;

    public Menu toEntity() {
        return Menu.builder()
                .name(name)
                .price(price)
                .menuType(menuType)
                .sequence(sequence)
                .build();
    }

    public Menu toEntity(Cafe cafe) {
        return Menu.builder()
                .name(name)
                .price(price)
                .menuType(menuType)
                .sequence(sequence)
                .cafe(cafe)
                .build();
    }
}
