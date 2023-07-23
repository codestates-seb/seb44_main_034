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
                        cafe.shortAddress,
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
                                .where(cafeBookmark.cafe.id.eq(cafeId),
                                        cafeBookmark.member.id.eq(loginId))
                                .limit(1)
                                .fetchOne() != null)
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
                                .limit(1)
                                .fetchOne() != null),
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

    private BooleanBuilder allFilter(SearchCafeFilterCondition searchCafeFilterCondition) {
        BooleanBuilder builder = new BooleanBuilder();

        builder.and(eqAddress(searchCafeFilterCondition.getShortAddress()))
                .and(openHour(searchCafeFilterCondition.getIsOpenAllTime()))
                .and(charging(searchCafeFilterCondition.getIsChargingAvailable()))
                .and(pet(searchCafeFilterCondition.getIsPetFriendly()))
                .and(parking(searchCafeFilterCondition.getHasParking()))
                .and(dessert(searchCafeFilterCondition.getHasDessert()))
                .and(eqCafeName(searchCafeFilterCondition.getCafeName()))
                .and(eqMenuName(searchCafeFilterCondition.getMenuName()));

        BooleanExpression tagExpression = hasTag(searchCafeFilterCondition.getTags());
        if (tagExpression != null) {
            builder.and(tagExpression);
        }

        return builder;
    }

    private BooleanExpression hasTag(List<Long> tags) {
        if (tags == null || tags.isEmpty()) {
            return null;
        }

        BooleanExpression allTagsPresent = null;
        for (Long tagId : tags) {
            BooleanExpression tagPresent = cafe.postTags.any().tag.tagId.eq(tagId);
            allTagsPresent = (allTagsPresent == null) ? tagPresent : allTagsPresent.and(tagPresent);
        }

        return allTagsPresent;
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

    private BooleanExpression eqCafeName(String cafeName) {
        if (StringUtils.isBlank(cafeName)) {
            return null;
        }
        return cafe.name.contains(cafeName);
    }

    private BooleanExpression eqMenuName(String menuName) {
        if (StringUtils.isBlank(menuName)) {
            return null;
        }
        return cafe.menus.any().name.eq(menuName);
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
