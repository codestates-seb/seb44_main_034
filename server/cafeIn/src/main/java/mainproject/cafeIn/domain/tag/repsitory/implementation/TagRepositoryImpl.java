package mainproject.cafeIn.domain.tag.repsitory.implementation;

import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import mainproject.cafeIn.domain.tag.dto.QTagResponse;
import mainproject.cafeIn.domain.tag.dto.TagResponse;
import mainproject.cafeIn.domain.tag.entity.QPostTag;
import mainproject.cafeIn.domain.tag.repsitory.TagRepositoryCustom;

import java.util.List;

import static mainproject.cafeIn.domain.tag.entity.QPostTag.*;
import static mainproject.cafeIn.domain.tag.entity.QTag.tag;

@RequiredArgsConstructor
public class TagRepositoryImpl implements TagRepositoryCustom {
    private final JPAQueryFactory queryFactory;


    @Override
    public List<TagResponse> getTags(Long cafeId) {
        return queryFactory
                .select(new QTagResponse(
                        tag.tagId,
                        tag.name
                ))
                .from(tag)
                .innerJoin(postTag.tag, tag).fetchJoin()
                .where(postTag.cafe.id.eq(cafeId))
                .fetch();
    }
}
