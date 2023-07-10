package mainproject.cafeIn.domain.owner.repository;

import mainproject.cafeIn.domain.owner.dto.response.OwnerDetailResponse;

public interface OwnerRepositoryCustom {
    OwnerDetailResponse getOwnerDetailResponse(Long ownerId);
}
