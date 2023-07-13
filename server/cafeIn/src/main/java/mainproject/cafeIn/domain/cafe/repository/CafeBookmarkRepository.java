package mainproject.cafeIn.domain.cafe.repository;

import mainproject.cafeIn.domain.cafe.entity.CafeBookmark;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CafeBookmarkRepository extends JpaRepository<CafeBookmark, Long> {
    Optional<CafeBookmark> findByCafeIdAndMemberId(Long cafeId, Long memberId);
}
