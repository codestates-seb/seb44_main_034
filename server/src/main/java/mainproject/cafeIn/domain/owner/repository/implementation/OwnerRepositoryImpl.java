package mainproject.cafeIn.domain.owner.repository.implementation;

import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import mainproject.cafeIn.domain.cafe.entity.QCafe;
import mainproject.cafeIn.domain.owner.dto.response.*;
import mainproject.cafeIn.domain.owner.entity.Owner;
import mainproject.cafeIn.domain.owner.repository.OwnerRepositoryCustom;
import static mainproject.cafeIn.domain.cafe.entity.QCafe.cafe;
import static mainproject.cafeIn.domain.cafe.entity.QCafeBookmark.cafeBookmark;
import static mainproject.cafeIn.domain.owner.entity.QOwner.owner;


@RequiredArgsConstructor
public class OwnerRepositoryImpl implements OwnerRepositoryCustom {
    private final JPAQueryFactory queryFactory;

    @Override
    public OwnerDetailResponse getOwnerDetailResponse(Long ownerId) {
        OwnerResponse ownerResponse = getOwnerResponse(ownerId);
        OwnerCafeResponse ownerCafeResponses = getOwnerCafeResponse(ownerId);

        return new OwnerDetailResponse(ownerResponse, ownerCafeResponses);
    }

    @Override
    public void deleteOwnerCafe(Owner owner) {
        QCafe cafe = QCafe.cafe;
        queryFactory
                .delete(cafe)
                .where(cafe.owner.eq(owner))
                .execute();
    }

    private OwnerCafeResponse getOwnerCafeResponse(long ownerId) {
        return queryFactory
                .select(new QOwnerCafeResponse(
                        cafe.id,
                        cafe.name,
                        cafeBookmark.count(), // TODO countBookmakred
                        cafe.image))
                .from(owner)
                .join(owner.cafe, cafe)
                .leftJoin(cafe.cafeBookmarks, cafeBookmark)
                .where(owner.ownerId.eq(ownerId))
                .groupBy(cafe) // TODO bookmark
                .fetchOne();
    }

    private OwnerResponse getOwnerResponse(long ownerId) {
        return queryFactory
                .select(new QOwnerResponse(
                        owner.email,
                        owner.displayName))
                .from(owner)
                .where(owner.ownerId.eq(ownerId))
                .fetchOne();
    }
}