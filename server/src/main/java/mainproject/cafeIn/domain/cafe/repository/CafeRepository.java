package mainproject.cafeIn.domain.cafe.repository;

import mainproject.cafeIn.domain.cafe.entity.Cafe;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CafeRepository extends JpaRepository<Cafe, Long>, CafeRepositoryCustom {

}
