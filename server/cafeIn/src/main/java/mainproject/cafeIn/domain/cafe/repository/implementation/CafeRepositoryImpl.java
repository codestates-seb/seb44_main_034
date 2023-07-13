package mainproject.cafeIn.domain.cafe.repository.implementation;

import com.querydsl.core.types.ExpressionUtils;
import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import mainproject.cafeIn.domain.cafe.dto.request.SearchCafeFilterCondition;
import mainproject.cafeIn.domain.cafe.dto.response.CafeDetailResponse;
import mainproject.cafeIn.domain.cafe.dto.response.CafeResponse;
import mainproject.cafeIn.domain.cafe.dto.response.QCafeDetailResponse;
import mainproject.cafeIn.domain.cafe.dto.response.QCafeResponse;
import mainproject.cafeIn.domain.cafe.repository.CafeRepositoryCustom;
import mainproject.cafeIn.domain.tag.dto.QTagResponse;
import mainproject.cafeIn.domain.tag.dto.TagResponse;
import mainproject.cafeIn.domain.tag.repsitory.TagRepository;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.ArrayList;
import java.util.List;

import static mainproject.cafeIn.domain.cafe.entity.QCafe.cafe;
import static mainproject.cafeIn.domain.cafe.entity.QCafeBookmark.cafeBookmark;
import static mainproject.cafeIn.domain.owner.entity.QOwner.owner;
import static mainproject.cafeIn.domain.post.entity.QPost.post;
import static mainproject.cafeIn.domain.tag.entity.QPostTag.postTag;
import static mainproject.cafeIn.domain.tag.entity.QTag.tag;

@RequiredArgsConstructor
public class CafeRepositoryImpl implements CafeRepositoryCustom {
    private final JPAQueryFactory queryFactory;

    @Override
    public CafeDetailResponse getCafe(Long cafeId) {
        return queryFactory.select(new QCafeDetailResponse(
                        cafe.owner.ownerId,
                        cafe.id,
                        cafe.name,
                        cafe.address,
                        cafe.latitude,
                        cafe.longitude,
                        cafe.contact,
                        cafe.notice,
                        cafe.image,
                        cafe.rating,
                        cafe.openTime,
                        cafe.closeTime,
                        cafe.isOpenAllTime,
                        cafe.isChargingAvailable,
                        cafe.hasParking,
                        cafe.isPetFriendly,
                        cafe.hasDessert
                ))
                .from(cafe)
                .where(cafe.id.eq(cafeId))
                .leftJoin(cafe.owner, owner)
                .fetchOne();
    }

    @Override
    public List<CafeResponse> findCafesByFilterCondition(SearchCafeFilterCondition searchCafeFilterCondition, Pageable pageable) {
        return getCafes(searchCafeFilterCondition)
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();
    }

    @Override
    public List<CafeResponse> findCafesByFilterConditionOrderByCreatedAt(SearchCafeFilterCondition searchCafeFilterCondition, Pageable pageable) {
        return getCafes(searchCafeFilterCondition)
                .orderBy(cafe.createdAt.desc())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();
    }

    @Override
    public List<CafeResponse> findCafesByFilterConditionOrderByCountBookmark(SearchCafeFilterCondition searchCafeFilterCondition, Pageable pageable) {
        return getCafes(searchCafeFilterCondition)
                .leftJoin(cafe, cafeBookmark.cafe)
                .orderBy(cafeBookmark.count().desc())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();
    }

    @Override
    public List<CafeResponse> findCafesByFilterConditionOrderByRating(SearchCafeFilterCondition searchCafeFilterCondition, Pageable pageable) {
        return getCafes(searchCafeFilterCondition)
                .orderBy(cafe.rating.desc())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();
    }

    @Override
    public List<CafeResponse> findCafesByFilterConditionOrderByCountPost(SearchCafeFilterCondition searchCafeFilterCondition, Pageable pageable) {
        return getCafes(searchCafeFilterCondition)
                .leftJoin(cafe, post.cafe)
                .orderBy(post.count().desc())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();
    }

    private JPAQuery<CafeResponse> getCafes(SearchCafeFilterCondition searchCafeFilterCondition) {
        return queryFactory
                .select(new QCafeResponse(
                        cafe.id,
                        cafe.name,
                        cafe.address,
                        cafe.rating,
                        cafe.image
                ))
                .from(cafe)
                .leftJoin(postTag.cafe, cafe)
                .where(
                        cafe.shortAddress.eq(searchCafeFilterCondition.getShortAddress()),
                        cafe.isOpenAllTime.eq(searchCafeFilterCondition.isOpenAllTime()),
                        cafe.isChargingAvailable.eq(searchCafeFilterCondition.isChargingAvailable()),
                        cafe.isPetFriendly.eq(searchCafeFilterCondition.isPetFriendly()),
                        cafe.hasDessert.eq(searchCafeFilterCondition.isHasDessert()),
                        cafe.hasParking.eq(searchCafeFilterCondition.isHasParking())
                );
    }
}
