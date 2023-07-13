package mainproject.cafeIn.domain.member.repository;

import mainproject.cafeIn.domain.member.entity.Follow;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FollowRepository extends JpaRepository<Follow,Long> {

    Long countByFollowerId(Long id);

    Long countByFollowingId(Long id);
}
