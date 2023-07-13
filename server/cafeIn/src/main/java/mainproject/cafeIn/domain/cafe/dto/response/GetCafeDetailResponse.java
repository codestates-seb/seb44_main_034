package mainproject.cafeIn.domain.cafe.dto.response;

import lombok.Getter;
import mainproject.cafeIn.domain.menu.dto.response.MenuResponse;
import mainproject.cafeIn.domain.post.dto.response.PostResponse;
import mainproject.cafeIn.domain.tag.dto.TagResponse;

import java.util.List;

@Getter
public class GetCafeDetailResponse {
    private CafeDetailResponse cafeDetail;
    private List<List<MenuResponse>> menus;
    private List<PostResponse> posts;
    private List<TagResponse> tags;
    private boolean isBookmarked;

    public GetCafeDetailResponse(CafeDetailResponse cafeDetail, List<List<MenuResponse>> menus, List<PostResponse> posts, List<TagResponse> tags, boolean isBookmarked) {
        this.cafeDetail = cafeDetail;
        this.menus = menus;
        this.posts = posts;
        this.tags = tags;
        this.isBookmarked = isBookmarked;
    }
}
