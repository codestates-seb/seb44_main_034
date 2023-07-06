package mainproject.cafeIn.domain.menu.dto.response;

import lombok.Getter;

@Getter
public class GetMenuDetailResponse {
    private MenuResponse menu;
    private List<MenuCommentsResponse> comments;

    public GetMenuDetailResponse(MenuResponse menu, List<MenuCommentsResponse> comments) {
        this.menu = menu;
        this.comments = comments;
    }
}
