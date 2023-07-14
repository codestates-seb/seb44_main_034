package mainproject.cafeIn.domain.owner.repository;

import mainproject.cafeIn.domain.owner.dto.response.OwnerDetailResponse;
import mainproject.cafeIn.domain.owner.entity.Owner;

public interface OwnerRepositoryCustom {
    OwnerDetailResponse getOwnerDetailResponse(Long ownerId);

    void deleteOwnerCafe(Owner owner);
}
