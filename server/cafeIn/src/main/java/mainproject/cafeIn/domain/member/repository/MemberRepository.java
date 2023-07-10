package mainproject.cafeIn.domain.member.repository;

import mainproject.cafeIn.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {

    Optional<Member> findByEmail(String email);

    Optional<Member> findByDisplayName(String displayName);
}
