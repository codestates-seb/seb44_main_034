package mainproject.cafeIn.domain.menucomment.repository;

import mainproject.cafeIn.domain.menucomment.dto.response.MenuCommentResponse;

import java.util.List;

public interface MenuCommentRepositoryCustom {
    List<MenuCommentResponse> getMenuComments(Long menuId);
}
