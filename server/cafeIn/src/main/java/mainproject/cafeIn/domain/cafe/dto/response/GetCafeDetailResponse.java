package mainproject.cafeIn.domain.cafe.dto.response;

import lombok.Getter;
import mainproject.cafeIn.domain.menu.dto.response.MenuResponse;
import mainproject.cafeIn.domain.post.dto.response.PostResponse;
import mainproject.cafeIn.domain.tag.entity.Tag;

import java.util.List;

@Getter
public class GetCafeDetailResponse {
    private CafeDetailResponse cafeDetail;
    private List<MenuResponse> menus;
    private List<PostResponse> posts;
    private List<Tag> tags;

    public GetCafeDetailResponse(CafeDetailResponse cafeDetail, List<MenuResponse> menus, List<PostResponse> posts, List<Tag> tags) {
        this.cafeDetail = cafeDetail;
        this.menus = menus;
        this.posts = posts;
        this.tags = tags;
    }
}
