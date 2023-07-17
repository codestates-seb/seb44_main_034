package mainproject.cafeIn.domain.cafe.repository;

import mainproject.cafeIn.domain.cafe.dto.request.SearchCafeFilterCondition;
import mainproject.cafeIn.domain.cafe.dto.response.CafeDetailResponse;
import mainproject.cafeIn.domain.cafe.dto.response.CafeResponse;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface CafeRepositoryCustom {
    CafeDetailResponse getCafe(Long cafeId, Long loginId);
    List<CafeResponse> findCafesByFilterCondition(Long loginId, SearchCafeFilterCondition searchCafeFilterCondition, Pageable pageable);
    List<CafeResponse> findCafesByName(Long loginId, String name, Pageable pageable);
    List<CafeResponse> findCafesByMenu(Long loginId, String menu, Pageable pageable);
}
