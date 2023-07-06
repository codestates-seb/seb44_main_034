package mainproject.cafeIn.domain.cafe.repository;

import mainproject.cafeIn.domain.cafe.dto.request.SearchCafeFilterCondition;
import mainproject.cafeIn.domain.cafe.dto.response.GetCafesResponse;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface CafeRepositoryCustom {
    List<GetCafesResponse> findCafesByFilterCondition(SearchCafeFilterCondition searchCafeFilterCondition, Pageable pageable);

}
