package mainproject.cafeIn.domain.menucomment.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import mainproject.cafeIn.domain.member.entity.Member;
import mainproject.cafeIn.domain.menu.entity.Menu;
import mainproject.cafeIn.global.base.BaseEntity;

import javax.persistence.*;

import static javax.persistence.FetchType.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "menu_comments")
public class MenuComment extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "menu_comment_id", nullable = false)
    private Long id;

    @Column(name = "menu_content", nullable = false)
    private String content;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "menu_id", nullable = false)
    private Menu menu;

    @Builder
    private MenuComment(String content, Member member, Menu menu) {
        this.content = content;
        this.member = member;
        this.menu = menu;
    }

    public void update(String content) {
        this.content = content;
    }
}
