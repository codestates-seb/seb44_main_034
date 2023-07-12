package mainproject.cafeIn.domain.member.repository.implementation;


import com.querydsl.core.types.dsl.BooleanExpression;

import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;


import mainproject.cafeIn.domain.member.dto.reponse.QSearchFollow;
import mainproject.cafeIn.domain.member.dto.reponse.SearchFollow;

import mainproject.cafeIn.domain.member.entity.Follow;
import mainproject.cafeIn.domain.member.entity.Member;
import mainproject.cafeIn.domain.member.repository.CustomMemberRepository;
import org.springframework.data.domain.*;


import java.util.List;

import static mainproject.cafeIn.domain.member.entity.QFollow.follow;
import static mainproject.cafeIn.domain.member.entity.QMember.member;
import static mainproject.cafeIn.domain.member.entity.enums.MemberStatus.MEMBER_ACTIVE;


@RequiredArgsConstructor
public class CustomMemberRepositoryImpl implements CustomMemberRepository {

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
    public Slice<SearchFollow> findByFollowingList(Long id, Long cursorId,Pageable pageable) {

        List<SearchFollow> followings = queryFactory
                .select(new QSearchFollow(follow.id,member.displayName,member.image))
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
    public Slice<SearchFollow> findByFollowerList(Long id, Long cursorId,Pageable pageable) {

        List<SearchFollow> followers = queryFactory
                .select(new QSearchFollow(follow.id,member.displayName,member.image))
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

    private <T> Slice<T> checkLastPage(List<T> results, Pageable pageable) {

        boolean hasNext = false;

        if (results.size() > pageable.getPageSize()) {
            hasNext = true;
            results.remove(pageable.getPageSize());
        }
        return new SliceImpl<>(results, pageable, hasNext);
    }
}
