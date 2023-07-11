package mainproject.cafeIn.domain.menucomment.repository;

import mainproject.cafeIn.domain.menucomment.entity.MenuComment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.awt.*;
import java.util.Optional;

public interface MenuCommentRepository extends JpaRepository<MenuComment, Long>, MenuCommentRepositoryCustom {

    Optional<Long> findMenuCommentByMemberIdAndMenuId(Long memberId, Long menuId);
}
