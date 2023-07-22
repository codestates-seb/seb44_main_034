package mainproject.cafeIn.domain.cafe.repository;

import mainproject.cafeIn.domain.cafe.dto.request.SearchCafeFilterCondition;
import mainproject.cafeIn.domain.cafe.dto.response.CafeDetailResponse;
import mainproject.cafeIn.domain.cafe.dto.response.CafeResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface CafeRepositoryCustom {
    CafeDetailResponse getCafe(Long cafeId, Long loginId);
    Page<CafeResponse> findCafesByFilterCondition(Long loginId, SearchCafeFilterCondition searchCafeFilterCondition, Pageable pageable);
}
