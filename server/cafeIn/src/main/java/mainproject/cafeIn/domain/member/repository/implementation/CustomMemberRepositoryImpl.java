package mainproject.cafeIn.domain.member.repository.implementation;


import com.querydsl.core.types.dsl.BooleanExpression;

import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;


import mainproject.cafeIn.domain.member.dto.reponse.*;

import mainproject.cafeIn.domain.member.entity.Follow;
import mainproject.cafeIn.domain.member.entity.Member;
import mainproject.cafeIn.domain.member.repository.CustomMemberRepository;
import org.springframework.data.domain.*;


import java.util.List;

import static mainproject.cafeIn.domain.cafe.entity.QCafe.cafe;
import static mainproject.cafeIn.domain.member.entity.QFollow.follow;
import static mainproject.cafeIn.domain.member.entity.QMember.member;
import static mainproject.cafeIn.domain.member.entity.enums.MemberStatus.MEMBER_ACTIVE;
import static mainproject.cafeIn.domain.post.entity.QPost.post;
import static mainproject.cafeIn.domain.postBookmark.entity.QPostBookmark.postBookmark;


@RequiredArgsConstructor
public class CustomMemberRepositoryImpl implements CustomMemberRepository {

    private final JPAQueryFactory queryFactory;

    @Override
    public List<Follow> findByFollowing(Long id, Member followingMember) {

        return queryFactory
                .selectFrom(follow)
                .innerJoin(follow.followerId, member).fetchJoin()
                .where(follow.followerId.member.id.eq(id), follow.followingId.eq(followingMember))
                .fetch();
    }


    //내가 팔로우한 사람들
    @Override
    public Slice<SearchFollow> findByFollowingList(Long id, Long cursorId,Pageable pageable) {

        List<SearchFollow> followings = queryFactory
                .select(new QSearchFollow(follow.id,member.displayName,member.image))
                .from(member)
                .leftJoin(follow.followingId, member).fetchJoin()
                .where(follow.followerId.member.id.eq(id), member.status.eq(MEMBER_ACTIVE),followLtCursorId(cursorId))
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
                .leftJoin(follow.followerId, member).fetchJoin()
                .where(follow.followingId.member.id.eq(id), member.status.eq(MEMBER_ACTIVE), followLtCursorId(cursorId))
                .orderBy(follow.id.desc())
                .limit(pageable.getPageSize()+1)
                .fetch();

        return checkLastPage(followers, pageable);

    }

    @Override
    public Slice<MyPagePostList> findByPostList(Long id, Long cursorId, Pageable pageable) {

        List<MyPagePostList> postList = queryFactory
                .select(new QMyPagePostList(post.postId, post.title, post.image, member.displayName))
                .from(post)
                .innerJoin(post.member, member).fetchJoin()
                .where(member.id.eq(id), member.status.eq(MEMBER_ACTIVE),postIdLtCursorId(cursorId))
                .orderBy(post.postId.desc())
                .limit(pageable.getPageSize()+1)
                .fetch();

        return checkLastPage(postList, pageable);
    }

    @Override
    public Slice<MyPagePostList> findByBookMarkPostList(Long id, Long cursorId, Pageable pageable) {

        List<MyPagePostList> postList = queryFactory
                .select(new QMyPagePostList(post.postId, post.title, post.image, member.displayName))
                .from(member)
                .innerJoin(member, postBookmark.member).fetchJoin()
                .innerJoin(postBookmark.post, post).fetchJoin()
                .where(member.id.eq(id), member.status.eq(MEMBER_ACTIVE),postIdLtCursorId(cursorId))
                .orderBy(post.postId.desc())
                .limit(pageable.getPageSize()+1)
                .fetch();

        return checkLastPage(postList, pageable);
    }

    @Override
    public Slice<MyBookMarkCafeList> findByBookMarkCafeList(Long id, Long cursorId, Pageable pageable) {

        List<MyBookMarkCafeList> cafeList = queryFactory
                .select(new QMyBookMarkCafeList(cafe.id, cafe.name, cafe.image, cafe.address,cafe.rating))
                .from(member)
                .innerJoin(member, cafeBookmark.member).fetchJoin()
                .innerJoin(cafeBookmark.cafe, cafe).fetchJoin()
                .where(member.id.eq(id), member.status.eq(MEMBER_ACTIVE),cafeLtCursorId(cursorId))
                .orderBy(post.postId.desc())
                .limit(pageable.getPageSize()+1)
                .fetch();

        return checkLastPage(cafeList, pageable);
    }
    private BooleanExpression followLtCursorId(Long cursorId) {
        if(cursorId == null) {
            return null;
        }
        return follow.id.lt(cursorId);
    }

    private BooleanExpression postIdLtCursorId(Long cursorId) {
        if(cursorId == null) {
            return null;
        }
        return post.postId.lt(cursorId);
    }

    private BooleanExpression cafeLtCursorId(Long cursorId) {
        if(cursorId == null) {
            return null;
        }
        return cafe.id.lt(cursorId);
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
