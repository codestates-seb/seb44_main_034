package mainproject.cafeIn.domain.member.repository;

import mainproject.cafeIn.domain.member.entity.Follow;
import mainproject.cafeIn.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FollowRepository extends JpaRepository<Follow,Long> {


}
