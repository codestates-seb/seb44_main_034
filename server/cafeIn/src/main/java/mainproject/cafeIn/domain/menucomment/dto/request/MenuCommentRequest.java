package mainproject.cafeIn.domain.menucomment.dto.request;

import mainproject.cafeIn.domain.menucomment.entity.MenuComment;

public class MenuCommentRequest {
    private String content;

    public MenuComment toEntity() {
        return MenuComment.builder()
                .content(content)
                .build();
    }
}
