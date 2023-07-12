package mainproject.cafeIn.domain.menucomment.repository.implementation;

import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import mainproject.cafeIn.domain.menucomment.dto.response.MenuCommentResponse;
import mainproject.cafeIn.domain.menucomment.dto.response.QMenuCommentResponse;
import mainproject.cafeIn.domain.menucomment.repository.MenuCommentRepositoryCustom;

import java.util.List;

import static mainproject.cafeIn.domain.member.entity.QMember.member;
import static mainproject.cafeIn.domain.menucomment.entity.QMenuComment.menuComment;

@RequiredArgsConstructor
public class MenuCommentRepositoryImpl implements MenuCommentRepositoryCustom {
    private final JPAQueryFactory queryFactory;

    @Override
    public List<MenuCommentResponse> getMenuComments(Long menuId) {
        return queryFactory
                .select(new QMenuCommentResponse(
                        menuComment.content,
                        member.id,
                        member.displayName
                ))
                .from(menuComment)
                .innerJoin(menuComment.member, member).fetchJoin()
                .where(menuComment.menu.id.eq(menuId))
                .fetch();
    }
}
