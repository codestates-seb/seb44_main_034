package mainproject.cafeIn.domain.menu.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import mainproject.cafeIn.domain.cafe.entity.Cafe;
import mainproject.cafeIn.domain.menu.entity.enums.MenuType;
import mainproject.cafeIn.domain.menucomment.entity.MenuComment;
import org.hibernate.annotations.OnDelete;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

import static javax.persistence.CascadeType.PERSIST;
import static javax.persistence.EnumType.STRING;
import static javax.persistence.FetchType.LAZY;
import static org.hibernate.annotations.OnDeleteAction.CASCADE;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "menus")
public class Menu {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "menu_id", nullable = false, updatable = false)
    private Long id;

    @Column(name = "menu_name", nullable = false)
    private String name;

    @Column(name = "price", nullable = false)
    private Integer price;

    @Enumerated(STRING)
    @Column(name = "menu_type", nullable = false)
    private MenuType menuType;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "cafe_id", nullable = false)
    private Cafe cafe;

    @OnDelete(action = CASCADE)
    @OneToMany(mappedBy = "menu", cascade = PERSIST)
    private List<MenuComment> menuComments = new ArrayList<>();

    @Builder
    public Menu(String name, Integer price, MenuType menuType, Cafe cafe) {
        this.name = name;
        this.price = price;
        this.menuType = menuType;
        this.cafe = cafe;
    }

    public void updateMenu(Menu menu) {
        this.name = menu.name;
        this.price = menu.price;
        this.menuType = menu.menuType;
    }
}
