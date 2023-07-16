package mainproject.cafeIn.domain.tag.repsitory.implementation;

import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import mainproject.cafeIn.domain.tag.dto.QTagResponse;
import mainproject.cafeIn.domain.tag.dto.TagResponse;
import mainproject.cafeIn.domain.tag.repsitory.TagRepositoryCustom;

import java.util.List;

import static mainproject.cafeIn.domain.cafe.entity.QCafe.cafe;
import static mainproject.cafeIn.domain.tag.entity.QPostTag.postTag;
import static mainproject.cafeIn.domain.tag.entity.QTag.tag;

@RequiredArgsConstructor
public class TagRepositoryImpl implements TagRepositoryCustom {
    private final JPAQueryFactory queryFactory;


    @Override
    public List<TagResponse> getTags(Long cafeId) {
        return queryFactory
                .selectDistinct(new QTagResponse(
                        postTag.tag.tagId,
                        postTag.tag.name
                ))
                .from(postTag)
                .innerJoin(postTag.tag, tag)
                .where(postTag.cafe.id.eq(cafeId))
                .fetch();
    }
}
