package mainproject.cafeIn.domain.cafe.repository.implementation;

import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import mainproject.cafeIn.domain.cafe.dto.request.SearchCafeFilterCondition;
import mainproject.cafeIn.domain.cafe.dto.response.GetCafesResponse;
import mainproject.cafeIn.domain.cafe.repository.CafeRepositoryCustom;
import org.springframework.data.domain.Pageable;

import java.util.List;

@RequiredArgsConstructor
public class CafeRepositoryImpl implements CafeRepositoryCustom {
    private final JPAQueryFactory queryFactory;
    @Override
    public List<GetCafesResponse> findCafesByFilterCondition(SearchCafeFilterCondition searchCafeFilterCondition, Pageable pageable) {

    }
}
