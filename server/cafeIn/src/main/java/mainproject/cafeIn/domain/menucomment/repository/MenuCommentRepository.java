package mainproject.cafeIn.domain.menucomment.repository;

import mainproject.cafeIn.domain.menucomment.entity.MenuComment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.awt.*;

public interface MenuCommentRepository extends JpaRepository<MenuComment, Long>, MenuCommentRepositoryCustom {
    boolean existsMenuCommentByMemberIdAndMenuId(Long memberId, Long menuId);
}
