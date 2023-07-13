package mainproject.cafeIn.domain.owner.repository.implementation;

import com.querydsl.core.types.Expression;
import com.querydsl.core.types.dsl.NumberPath;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import mainproject.cafeIn.domain.cafe.repository.CafeRepository;
import mainproject.cafeIn.domain.owner.dto.response.*;
import mainproject.cafeIn.domain.owner.repository.OwnerRepositoryCustom;
import org.springframework.stereotype.Repository;

import java.util.List;

import static mainproject.cafeIn.domain.cafe.entity.QCafe.cafe;
import static mainproject.cafeIn.domain.owner.entity.QOwner.owner;


@RequiredArgsConstructor
public class OwnerRepositoryImpl implements OwnerRepositoryCustom {
    private final JPAQueryFactory queryFactory;

    @Override
    public OwnerDetailResponse getOwnerDetailResponse(Long ownerId) {
        OwnerResponse ownerResponse = getOwnerResponse(ownerId);
        List<OwnerCafeResponse> ownerCafeResponses = getOwnerCafeResponse(ownerId);

        return new OwnerDetailResponse(ownerResponse, ownerCafeResponses);
    }

    private List<OwnerCafeResponse> getOwnerCafeResponse(long ownerId) {
        return queryFactory
                .select(new QOwnerCafeResponse(
                        cafe.name,
                        cafeBookmark.count(), // TODO countBookmakred
                        cafe.image))
                .from(owner)
                .join(owner.cafes, cafe)
                .leftJoin(cafe.cafeBookmarks, cafeBookmark)
                .where(owner.ownerId.eq(ownerId))
                .groupBy(cafe) // TODO bookmark
                .fetch();
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
    // TODO countBookmakred 작성
}