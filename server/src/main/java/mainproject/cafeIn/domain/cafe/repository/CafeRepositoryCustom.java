package mainproject.cafeIn.domain.cafe.repository;

import mainproject.cafeIn.domain.cafe.dto.request.SearchCafeFilterCondition;
import mainproject.cafeIn.domain.cafe.dto.response.CafeDetailResponse;
import mainproject.cafeIn.domain.cafe.dto.response.CafeResponse;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface CafeRepositoryCustom {
    CafeDetailResponse getCafe(Long cafeId, Long loginId);
    PageImpl<CafeResponse> findCafesByFilterCondition(Long loginId, SearchCafeFilterCondition searchCafeFilterCondition, Pageable pageable);
    PageImpl<CafeResponse> findCafesByName(Long loginId, String name, Pageable pageable);
    PageImpl<CafeResponse> findCafesByMenu(Long loginId, String menu, Pageable pageable);
}
