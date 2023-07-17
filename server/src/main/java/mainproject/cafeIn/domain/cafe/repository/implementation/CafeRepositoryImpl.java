package mainproject.cafeIn.domain.cafe.repository.implementation;

import com.nimbusds.oauth2.sdk.util.StringUtils;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import mainproject.cafeIn.domain.cafe.dto.request.SearchCafeFilterCondition;
import mainproject.cafeIn.domain.cafe.dto.response.CafeDetailResponse;
import mainproject.cafeIn.domain.cafe.dto.response.CafeResponse;
import mainproject.cafeIn.domain.cafe.dto.response.QCafeDetailResponse;
import mainproject.cafeIn.domain.cafe.dto.response.QCafeResponse;
import mainproject.cafeIn.domain.cafe.repository.CafeRepositoryCustom;
import mainproject.cafeIn.global.exception.CustomException;
import org.springframework.data.domain.Pageable;

import java.util.List;

import static mainproject.cafeIn.domain.cafe.entity.QCafe.cafe;
import static mainproject.cafeIn.domain.cafe.entity.QCafeBookmark.cafeBookmark;
import static mainproject.cafeIn.domain.owner.entity.QOwner.owner;
import static mainproject.cafeIn.global.exception.ErrorCode.REQUEST_VALIDATION_FAIL;

@RequiredArgsConstructor
public class CafeRepositoryImpl implements CafeRepositoryCustom {
    private final JPAQueryFactory queryFactory;

    @Override
    public CafeDetailResponse getCafe(Long cafeId, Long loginId) {
        return queryFactory.select(new QCafeDetailResponse(
                        owner.ownerId,
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
                        cafe.hasDessert,
                        Expressions.asBoolean(queryFactory
                                .selectFrom(cafeBookmark)
                                .where(cafeBookmark.cafe.id.eq(cafe.id),
                                        cafeBookmark.member.id.eq(loginId))
                                .fetchFirst() != null)
                ))
                .from(cafe)
                .where(cafe.id.eq(cafeId))
                .leftJoin(cafe.owner, owner)
                .fetchOne();
    }

    @Override
    public List<CafeResponse> findCafesByFilterCondition(Long loginId, SearchCafeFilterCondition searchCafeFilterCondition, Pageable pageable) {
        return getCafes(loginId, searchCafeFilterCondition)
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();
    }

    private JPAQuery<CafeResponse> getCafes(Long loginId, SearchCafeFilterCondition searchCafeFilterCondition) {
        return queryFactory
                .select(new QCafeResponse(
                        cafe.id,
                        cafe.name,
                        cafe.address,
                        cafe.rating,
                        cafe.latitude,
                        cafe.longitude,
                        cafe.image,
                        Expressions.asBoolean(queryFactory
                                .selectFrom(cafeBookmark)
                                .where(cafeBookmark.cafe.id.eq(cafe.id),
                                        cafeBookmark.member.id.eq(loginId))
                                .fetchFirst() != null),
                        cafe.posts.size()
                ))
                .from(cafe)
                .where(allFilter(searchCafeFilterCondition))
                .orderBy(orderType(searchCafeFilterCondition.getSortType()));
    }

    private BooleanBuilder allFilter(SearchCafeFilterCondition searchCafeFilterCondition) {
        BooleanBuilder builder = new BooleanBuilder();

        builder.and(eqAddress(searchCafeFilterCondition.getShortAddress()))
                .and(openHour(searchCafeFilterCondition.getIsOpenAllTime()))
                .and(charging(searchCafeFilterCondition.getIsChargingAvailable()))
                .and(pet(searchCafeFilterCondition.getIsPetFriendly()))
                .and(parking(searchCafeFilterCondition.getHasParking()))
                .and(dessert(searchCafeFilterCondition.getHasDessert()));

        return builder;
    }

    private BooleanExpression eqAddress(String shortAddress) {
        if (StringUtils.isBlank(shortAddress)) {
            return null;
        }
        return cafe.shortAddress.contains(shortAddress);
    }

    private BooleanExpression openHour(Boolean isOpenAllTime) {
        if (isOpenAllTime == null) {
            return null;
        }
        return cafe.isOpenAllTime.eq(isOpenAllTime);
    }

    private BooleanExpression charging(Boolean isChargingAvailable) {
        if (isChargingAvailable == null) {
            return null;
        }
        return cafe.isChargingAvailable.eq(isChargingAvailable);
    }

    private BooleanExpression pet(Boolean isPetFriendly) {
        if (isPetFriendly == null) {
            return null;
        }
        return cafe.isPetFriendly.eq(isPetFriendly);
    }

    private BooleanExpression dessert(Boolean hasDessert) {
        if (hasDessert == null) {
            return null;
        }
        return cafe.hasDessert.eq(hasDessert);
    }

    private BooleanExpression parking(Boolean hasParking) {
        if (hasParking == null) {
            return null;
        }
        return cafe.hasParking.eq(hasParking);
    }

    private OrderSpecifier<?> orderType(String sortType) {
        if (sortType.equals("countBookmark")) {
            return cafe.cafeBookmarks.size().desc();
        } else if (sortType.equals("rating")) {
            return cafe.rating.desc();
        } else if (sortType.equals("countPost")) {
            return cafe.posts.size().desc();
        } else {
            return cafe.createdAt.desc();
        }
    }
}
