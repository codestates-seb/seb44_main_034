package mainproject.cafeIn.domain.menu.dto.request;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import mainproject.cafeIn.domain.menu.entity.Menu;
import mainproject.cafeIn.domain.menu.entity.enums.MenuType;

import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MenuRequest {
    private String name;

    private Integer price;

    private MenuType menuType;

    public Menu toEntity() {
        return Menu.builder()
                .name(name)
                .price(price)
                .menuType(menuType)
                .build();
    }
}
