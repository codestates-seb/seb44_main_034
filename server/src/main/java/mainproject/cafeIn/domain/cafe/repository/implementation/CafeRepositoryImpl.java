package mainproject.cafeIn.domain.cafe.repository.implementation;

import com.nimbusds.oauth2.sdk.util.StringUtils;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import mainproject.cafeIn.domain.cafe.dto.request.SearchCafeFilterCondition;
import mainproject.cafeIn.domain.cafe.dto.response.CafeDetailResponse;
import mainproject.cafeIn.domain.cafe.dto.response.CafeResponse;
import mainproject.cafeIn.domain.cafe.dto.response.QCafeDetailResponse;
import mainproject.cafeIn.domain.cafe.dto.response.QCafeResponse;
import mainproject.cafeIn.domain.cafe.repository.CafeRepositoryCustom;
import mainproject.cafeIn.domain.tag.entity.QPostTag;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.util.List;

import static mainproject.cafeIn.domain.cafe.entity.QCafe.cafe;
import static mainproject.cafeIn.domain.cafe.entity.QCafeBookmark.cafeBookmark;
import static mainproject.cafeIn.domain.menu.entity.QMenu.menu;
import static mainproject.cafeIn.domain.owner.entity.QOwner.owner;
import static mainproject.cafeIn.domain.tag.entity.QTag.tag;

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
    public Page<CafeResponse> findCafesByFilterCondition(Long loginId, SearchCafeFilterCondition searchCafeFilterCondition, Pageable pageable) {
        List<CafeResponse> response = queryFactory
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
                        cafe.cafeBookmarks.size(),
                        cafe.posts.size()
                ))
                .from(cafe)
                .where(allFilter(searchCafeFilterCondition))
                .orderBy(orderType(searchCafeFilterCondition.getSortType()))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        Long count = queryFactory
                .select(cafe.count())
                .from(cafe)
                .where(allFilter(searchCafeFilterCondition))
                .fetchOne();

        return new PageImpl<>(response,pageable, count == null ? 0 : count);
    }

    @Override
    public Page<CafeResponse> findCafesByName(Long loginId, String name, Pageable pageable) {
        List<CafeResponse> response = queryFactory
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
                        cafe.cafeBookmarks.size(),
                        cafe.posts.size()
                ))
                .from(cafe)
                .where(cafe.name.contains(name))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        Long count = queryFactory
                .select(cafe.count())
                .from(cafe)
                .where(cafe.name.contains(name))
                .fetchOne();

        return new PageImpl<>(response, pageable, count == null ? 0 : count);
    }

    @Override
    public Page<CafeResponse> findCafesByMenu(Long loginId, String menuName, Pageable pageable) {
        List<CafeResponse> response = queryFactory
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
                        cafe.cafeBookmarks.size(),
                        cafe.posts.size()
                ))
                .from(cafe)
                .where(menu.name.eq(menuName))
                .leftJoin(cafe.menus, menu)
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        Long count = queryFactory
                .select(cafe.count())
                .from(cafe)
                .where(menu.name.eq(menuName))
                .leftJoin(cafe.menus, menu)
                .fetchOne();

        return new PageImpl<>(response, pageable, count == null ? 0 : count);
    }

    private BooleanBuilder allFilter(SearchCafeFilterCondition searchCafeFilterCondition) {
        BooleanBuilder builder = new BooleanBuilder();

        builder.and(eqAddress(searchCafeFilterCondition.getShortAddress()))
                .and(openHour(searchCafeFilterCondition.getIsOpenAllTime()))
                .and(charging(searchCafeFilterCondition.getIsChargingAvailable()))
                .and(pet(searchCafeFilterCondition.getIsPetFriendly()))
                .and(parking(searchCafeFilterCondition.getHasParking()))
                .and(dessert(searchCafeFilterCondition.getHasDessert()))
                .and(hasTag(searchCafeFilterCondition.getTags()));

        return builder;
    }

    private BooleanExpression hasTag(List<Long> tags) {
        if (tags == null || tags.isEmpty()) {
            return null;
        }

        return cafe.postTags.any().tag.tagId.in(tags);
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
        if (StringUtils.isBlank(sortType)) {
            return cafe.createdAt.desc();
        } else if (sortType.equals("countBookmark")) {
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
