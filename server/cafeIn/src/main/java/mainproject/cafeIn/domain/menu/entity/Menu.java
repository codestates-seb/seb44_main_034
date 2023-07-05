package mainproject.cafeIn.domain.menu.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import mainproject.cafeIn.domain.menu.entity.enums.MenuType;

import javax.persistence.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "menus")
public class Menu {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "menu_id", nullable = false, updatable = false)
    private Long id;

    @Column(name = "menu_name")
    private String name;

    @Column(name = "price")
    private Integer price;

    @Column(name = "menu_type")
    private MenuType menuType;

    @Builder
    public Menu(String name, Integer price, MenuType menuType) {
        this.name = name;
        this.price = price;
        this.menuType = menuType;
    }

    public void updateMenu(Menu menu) {
        this.name = menu.getName();
        this.price = menu.getPrice();
        this.menuType = menu.getMenuType();
    }
}
