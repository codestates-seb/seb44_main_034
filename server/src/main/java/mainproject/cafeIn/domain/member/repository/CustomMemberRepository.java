package mainproject.cafeIn.domain.member.repository;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.dsl.BooleanExpression;
import mainproject.cafeIn.domain.cafe.entity.CafeBookmark;
import mainproject.cafeIn.domain.member.dto.reponse.MyBookMarkCafeList;
import mainproject.cafeIn.domain.member.dto.reponse.MyBookMarkPostList;
import mainproject.cafeIn.domain.member.dto.reponse.MyPagePostList;
import mainproject.cafeIn.domain.member.dto.reponse.SearchFollow;
import mainproject.cafeIn.domain.member.entity.Follow;
import mainproject.cafeIn.domain.member.entity.Member;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;

import java.util.List;
import java.util.Optional;

import static mainproject.cafeIn.domain.cafe.entity.QCafeBookmark.cafeBookmark;
import static mainproject.cafeIn.domain.member.entity.QFollow.follow;

public interface CustomMemberRepository {

    List<Follow> findByFollowing(Long id, Member member);

    Slice<SearchFollow> findByFollowingList(Long id, Long cursorId, Pageable pageable);

    Slice<SearchFollow> findByFollowerList(Long id, Long cursorId, Pageable pageable);

    Slice<MyPagePostList> findByPostList(Long id, Long cursorId, Pageable pageable);

    Slice<MyBookMarkPostList> findByBookMarkPostList(Long id, Long cursorId, Pageable pageable);

    Slice<MyBookMarkCafeList> findByBookMarkCafeList(Long id, Long cursorId, Pageable pageable);

    Long countByFollowers(Long id);

    Long countByFollowings(Long id);

    public void deleteFollowerOrFollowing(Member m);

    public void deleteCafeBookMarkList(Member m);


}
