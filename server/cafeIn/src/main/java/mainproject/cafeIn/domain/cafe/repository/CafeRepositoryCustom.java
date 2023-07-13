package mainproject.cafeIn.domain.cafe.repository;

import mainproject.cafeIn.domain.cafe.dto.request.SearchCafeFilterCondition;
import mainproject.cafeIn.domain.cafe.dto.response.CafeDetailResponse;
import mainproject.cafeIn.domain.cafe.dto.response.CafeResponse;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface CafeRepositoryCustom {
    CafeDetailResponse getCafe(Long cafeId, Long loginId);
    List<CafeResponse> findCafesByFilterCondition(Long loginId, SearchCafeFilterCondition searchCafeFilterCondition, Pageable pageable);
    List<CafeResponse> findCafesByFilterConditionOrderByCreatedAt(Long loginId, SearchCafeFilterCondition searchCafeFilterCondition, Pageable pageable);
    List<CafeResponse> findCafesByFilterConditionOrderByCountBookmark(Long loginId, SearchCafeFilterCondition searchCafeFilterCondition, Pageable pageable);
    List<CafeResponse> findCafesByFilterConditionOrderByRating(Long loginId, SearchCafeFilterCondition searchCafeFilterCondition, Pageable pageable);
    List<CafeResponse> findCafesByFilterConditionOrderByCountPost(Long loginId, SearchCafeFilterCondition searchCafeFilterCondition, Pageable pageable);
}
