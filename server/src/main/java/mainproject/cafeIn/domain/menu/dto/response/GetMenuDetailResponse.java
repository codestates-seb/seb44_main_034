package mainproject.cafeIn.domain.menu.dto.response;

import lombok.Getter;
import mainproject.cafeIn.domain.menucomment.dto.response.MenuCommentResponse;

import java.util.List;

@Getter
public class GetMenuDetailResponse {
    private MenuResponse menu;
    private List<MenuCommentResponse> comments;

    public GetMenuDetailResponse(MenuResponse menu, List<MenuCommentResponse> comments) {
        this.menu = menu;
        this.comments = comments;
    }
}
