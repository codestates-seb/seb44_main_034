package mainproject.cafeIn.domain.member.repository.implementation;


import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;


import mainproject.cafeIn.domain.member.dto.reponse.FollowResponseDto;
import mainproject.cafeIn.domain.member.dto.reponse.QFollowResponseDto;
import mainproject.cafeIn.domain.member.entity.Follow;
import mainproject.cafeIn.domain.member.entity.Member;
import mainproject.cafeIn.domain.member.repository.CustomFollowRepository;
import org.springframework.data.domain.*;


import java.util.List;

import static mainproject.cafeIn.domain.member.entity.QFollow.follow;
import static mainproject.cafeIn.domain.member.entity.QMember.member;
import static mainproject.cafeIn.domain.member.entity.enums.MemberStatus.MEMBER_ACTIVE;


@RequiredArgsConstructor
public class CustomFollowRepositoryImpl implements CustomFollowRepository {

    private final JPAQueryFactory queryFactory;

    @Override
    public List<Follow> findByFollowing(Long id, Member followingMember) {

        return queryFactory
                .selectFrom(follow)
                .leftJoin(follow.followerId, member)
                .where(follow.followerId.member.id.eq(id).and(follow.followingId.eq(followingMember)))
                .fetch();
    }


    //내가 팔로우한 사람들
    @Override
    public Slice<FollowResponseDto> findByFollowingList(Long id, Long cursorId,Pageable pageable) {

        List<FollowResponseDto> followings = queryFactory
                .select(new QFollowResponseDto(follow.id,member.displayName,member.image))
                .from(member)
                .leftJoin(follow.followingId, member)
                .where(follow.followerId.member.id.eq(id), member.status.eq(MEMBER_ACTIVE),ltCursorId(cursorId))
                .orderBy(follow.id.desc())
                .limit(pageable.getPageSize() + 1)
                .fetch();


        return checkLastPage(followings,pageable);
    }

    //나를 팔로우하는사람들
    @Override
    public Slice<FollowResponseDto> findByFollowerList(Long id, Long cursorId,Pageable pageable) {

        List<FollowResponseDto> followers = queryFactory
                .select(new QFollowResponseDto(follow.id,member.displayName,member.image))
                .from(member)
                .leftJoin(follow.followerId, member)
                .where(follow.followingId.member.id.eq(id), member.status.eq(MEMBER_ACTIVE), ltCursorId(cursorId))
                .orderBy(follow.id.desc())
                .limit(pageable.getPageSize()+1)
                .fetch();

        return checkLastPage(followers, pageable);

    }

    private BooleanExpression ltCursorId(Long cursorId) {
        if(cursorId == null) {
            return null;
        }

        return follow.id.lt(cursorId);
    }

    private Slice<FollowResponseDto> checkLastPage(List<FollowResponseDto> results, Pageable pageable) {

        boolean hasNext = false;

        if (results.size() > pageable.getPageSize()) {
            hasNext = true;
            results.remove(pageable.getPageSize());
        }
        return new SliceImpl<>(results, pageable, hasNext);
    }
}
