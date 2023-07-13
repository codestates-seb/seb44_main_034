package mainproject.cafeIn.domain.cafe.repository;

import mainproject.cafeIn.domain.cafe.dto.request.SearchCafeFilterCondition;
import mainproject.cafeIn.domain.cafe.dto.response.CafeDetailResponse;
import mainproject.cafeIn.domain.cafe.dto.response.CafeResponse;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface CafeRepositoryCustom {
    CafeDetailResponse getCafe(Long cafeId);
    List<CafeResponse> findCafesByFilterCondition(SearchCafeFilterCondition searchCafeFilterCondition, Pageable pageable);
    List<CafeResponse> findCafesByFilterConditionOrderByCreatedAt(SearchCafeFilterCondition searchCafeFilterCondition, Pageable pageable);
    List<CafeResponse> findCafesByFilterConditionOrderByCountBookmark(SearchCafeFilterCondition searchCafeFilterCondition, Pageable pageable);
    List<CafeResponse> findCafesByFilterConditionOrderByRating(SearchCafeFilterCondition searchCafeFilterCondition, Pageable pageable);
    List<CafeResponse> findCafesByFilterConditionOrderByCountPost(SearchCafeFilterCondition searchCafeFilterCondition, Pageable pageable);
}
