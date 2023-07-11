package mainproject.cafeIn.domain.member.repository;

import mainproject.cafeIn.domain.member.dto.reponse.SearchFollow;
import mainproject.cafeIn.domain.member.entity.Follow;
import mainproject.cafeIn.domain.member.entity.Member;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;

import java.util.List;

public interface CustomFollowRepository {

    List<Follow> findByFollowing(Long id, Member member);

    Slice<SearchFollow> findByFollowingList(Long id, Long cursorId, Pageable pageable);

    Slice<SearchFollow> findByFollowerList(Long id, Long cursorId, Pageable pageable);

}
