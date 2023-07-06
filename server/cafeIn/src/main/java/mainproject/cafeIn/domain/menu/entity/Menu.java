package mainproject.cafeIn.domain.menu.entity;

import lombok.*;
import mainproject.cafeIn.domain.cafe.entity.Cafe;
import mainproject.cafeIn.domain.menu.entity.enums.MenuType;

import javax.persistence.*;

import static javax.persistence.FetchType.*;

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

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "cafe_id", nullable = false)
    private Cafe cafe;

    @Builder
    public Menu(String name, Integer price, MenuType menuType, Cafe cafe) {
        this.name = name;
        this.price = price;
        this.menuType = menuType;
        this.cafe = cafe;
    }

    public static Menu of(String name, Integer price, MenuType menuType, Cafe cafe) {
        return Menu.builder()
                .name(name)
                .price(price)
                .menuType(menuType)
                .cafe(cafe)
                .build();
    }

    public void updateMenu(Menu menu) {
        this.name = menu.getName();
        this.price = menu.getPrice();
        this.menuType = menu.getMenuType();
    }
}
