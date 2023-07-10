package mainproject.cafeIn.domain.member.repository;

import mainproject.cafeIn.domain.member.dto.reponse.FollowResponseDto;
import mainproject.cafeIn.domain.member.entity.Follow;
import mainproject.cafeIn.domain.member.entity.Member;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;

import java.util.List;

public interface CustomFollowRepository {

    List<Follow> findByFollowing(Long id, Member member);

    Slice<FollowResponseDto> findByFollowingList(Long id, Long cursorId, Pageable pageable);

    Slice<FollowResponseDto> findByFollowerList(Long id, Long cursorId, Pageable pageable);

}
