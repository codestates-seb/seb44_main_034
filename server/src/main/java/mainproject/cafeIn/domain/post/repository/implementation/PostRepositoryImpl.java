package mainproject.cafeIn.domain.post.repository.implementation;

import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import mainproject.cafeIn.domain.post.dto.response.PostResponse;
import mainproject.cafeIn.domain.post.dto.response.QPostResponse;
import mainproject.cafeIn.domain.post.repository.PostRepositoryCustom;

import java.util.List;

import static mainproject.cafeIn.domain.member.entity.QMember.member;
import static mainproject.cafeIn.domain.post.entity.QPost.post;

@RequiredArgsConstructor
public class PostRepositoryImpl implements PostRepositoryCustom {
    private final JPAQueryFactory queryFactory;

    @Override
    public List<PostResponse> getPosts(Long cafeId) {
        return queryFactory.select(new QPostResponse(
                        post.postId,
                        post.title,
                        post.member.displayName,
                        post.image
                ))
                .from(post)
                .where(post.cafe.id.eq(cafeId))
                .innerJoin(post.member, member)
                .fetch();
    }
}
