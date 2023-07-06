package mainproject.cafeIn.domain.menu.dto.response;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Getter;
import mainproject.cafeIn.domain.menu.entity.enums.MenuType;

@Getter
public class MenuResponse {
    private String name;
    private Integer price;
    private MenuType menuType;

    @QueryProjection
    public MenuResponse(String name, Integer price, MenuType menuType) {
        this.name = name;
        this.price = price;
        this.menuType = menuType;
    }
}
