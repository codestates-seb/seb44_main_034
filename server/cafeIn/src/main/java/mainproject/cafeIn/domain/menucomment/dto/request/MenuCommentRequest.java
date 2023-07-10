package mainproject.cafeIn.domain.menucomment.dto.request;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import mainproject.cafeIn.domain.menu.entity.Menu;
import mainproject.cafeIn.domain.menucomment.entity.MenuComment;

import static lombok.AccessLevel.*;

@Getter
@NoArgsConstructor(access = PROTECTED)
public class MenuCommentRequest {
    private String content;

    public MenuComment toEntity() {
        return MenuComment.builder()
                .content(content)
                .build();
    }

    public MenuComment toEntity(Member member, Menu menu) {
        return MenuComment.builder()
                .content(content)
                .member(member)
                .menu(menu)
                .build();
    }
}
