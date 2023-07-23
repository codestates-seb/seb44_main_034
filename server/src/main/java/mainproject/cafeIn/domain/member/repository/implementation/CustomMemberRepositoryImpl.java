package mainproject.cafeIn.domain.member.repository.implementation;


import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.dsl.BooleanExpression;

import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import mainproject.cafeIn.domain.member.dto.reponse.*;

import mainproject.cafeIn.domain.member.entity.Follow;
import mainproject.cafeIn.domain.member.entity.Member;
import mainproject.cafeIn.domain.member.entity.QMember;
import mainproject.cafeIn.domain.member.repository.CustomMemberRepository;
import org.springframework.data.domain.*;


import java.util.List;


import static mainproject.cafeIn.domain.cafe.entity.QCafe.cafe;
import static mainproject.cafeIn.domain.cafe.entity.QCafeBookmark.cafeBookmark;
import static mainproject.cafeIn.domain.member.entity.QFollow.follow;
import static mainproject.cafeIn.domain.member.entity.QMember.member;
import static mainproject.cafeIn.domain.member.entity.enums.MemberGrade.*;
import static mainproject.cafeIn.domain.member.entity.enums.MemberStatus.MEMBER_ACTIVE;
import static mainproject.cafeIn.domain.post.entity.QPost.post;
import static mainproject.cafeIn.domain.postbookmark.entity.QPostBookmark.postBookmark;


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

    //내가 팔로우하고 있는 사람수
    @Override
    public Long countByFollowers(Long id) {

        QMember m = new QMember("m");

        return queryFactory
                .selectFrom(m)
                .innerJoin(m.followers, follow)
                .innerJoin(follow.followingId, member)
                .where(m.id.eq(id))
                .fetch()
                .stream()
                .count();
    }

    //나를 팔로우 하는 사람수
    @Override
    public Long countByFollowings(Long id) {

        QMember m = new QMember("m");

        return queryFactory
                .selectFrom(m)
                .innerJoin(m.followings, follow)
                .innerJoin(follow.followerId, member)
                .where(m.id.eq(id))
                .fetch()
                .stream()
                .count();
    }


    //내가 팔로우한 사람들
    @Override
    public Slice<SearchFollow> findByFollowingList(Long id, Long cursorId,Pageable pageable) {

        QMember m = new QMember("m");

        List<SearchFollow> followings = queryFactory
                .select(new QSearchFollow(follow.id, m.displayName, m.image, m.id))
                .from(m)
                .innerJoin(m.followings, follow)
                .innerJoin(follow.followerId, member)
                .where(member.id.eq(id), m.status.eq(MEMBER_ACTIVE),followLtCursorId(cursorId))
                .orderBy(follow.id.desc())
                .limit(pageable.getPageSize() + 1)
                .fetch();

        return checkLastPage(followings,pageable);
    }

    //나를 팔로우하는사람들
    @Override
    public Slice<SearchFollow> findByFollowerList(Long id, Long cursorId,Pageable pageable) {

        QMember m = new QMember("m");
        List<SearchFollow> followers = queryFactory
                .select(new QSearchFollow(follow.id, m.displayName, m.image, m.id))
                .from(m)
                .innerJoin(m.followers, follow)
                .innerJoin(follow.followingId, member)
                .where(member.id.eq(id), m.status.eq(MEMBER_ACTIVE), followLtCursorId(cursorId))
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
                .innerJoin(post.member, member)
                .where(member.id.eq(id),postIdLtCursorId(cursorId))
                .orderBy(post.postId.desc())
                .limit(pageable.getPageSize()+1)
                .fetch();

        return checkLastPage(postList, pageable);
    }

    @Override
    public Slice<MyBookMarkPostList> findByBookMarkPostList(Long id, Long cursorId, Pageable pageable) {

        List<MyBookMarkPostList> postList = queryFactory
                .select(new QMyBookMarkPostList(post.postId, post.title, post.member.displayName, post.image, postBookmark.postBookmarkId))
                .from(member)
                .innerJoin(member.postBookmarks, postBookmark)
                .innerJoin(postBookmark.post, post)
                .where(member.id.eq(id), postBookMarkIdLtCursorId(cursorId))
                .orderBy(postBookmark.postBookmarkId.desc())
                .limit(pageable.getPageSize()+1)
                .fetch();

        return checkLastPage(postList, pageable);
    }

    @Override
    public Slice<MyBookMarkCafeList> findByBookMarkCafeList(Long id, Long cursorId, Pageable pageable) {


        List<MyBookMarkCafeList> cafeList = queryFactory
                .select(new QMyBookMarkCafeList(cafe.id, cafe.name, cafe.image, cafe.address,cafe.rating, cafeBookmark.id))
                .from(member)
                .innerJoin(member.cafeBookmarks, cafeBookmark)
                .innerJoin(cafeBookmark.cafe, cafe)
                .where(member.id.eq(id), cafeBookMarkLtCursorId(cursorId))
                .orderBy(cafeBookmark.id.desc())
                .limit(pageable.getPageSize()+1)
                .fetch();

        return checkLastPage(cafeList, pageable);
    }

    @Override
    public void deleteFollowerOrFollowing(Member m) {

        BooleanExpression condition1 = follow.followerId.eq(m);
        BooleanExpression condition2 = follow.followingId.eq(m);

        BooleanBuilder list = new BooleanBuilder();

        if (condition1 != null) {
            list.or(condition1);
        }

        if (condition2 != null) {
            list.or(condition2);
        }


        queryFactory.delete(follow)
                .where(list)
                .execute();

    }

    @Override
    public void deleteCafeBookMarkList(Member m) {

        BooleanExpression condition1 = cafeBookmark.member.eq(m);

        queryFactory.delete(cafeBookmark)
                .where(condition1)
                .execute();

    }

    @Override
    public List<MemberGrade> memberGradeCoffeeBean() {

        List<MemberGrade> list = queryFactory
                .select(new QMemberGrade(member.id, follow.followingId.count(), post.member.count()))
                .from(member)
                .leftJoin(member.followings, follow)
                .leftJoin(member.posts, post)
                .where(member.grade.ne(GRADE_COFFEE_BEAN), member.status.eq(MEMBER_ACTIVE))
                .groupBy(member.id)
                .having(follow.followingId.count().goe(10L), follow.followingId.count().lt(50L),post.member.count().goe(3L))
                .fetch();

        return list;
    }

    @Override
    public List<MemberGrade> memberGradeRoastedBean() {

        List<MemberGrade> list = queryFactory
                .select(new QMemberGrade(member.id, follow.followingId.count(), post.member.count()))
                .from(member)
                .leftJoin(member.followings, follow)
                .leftJoin(member.posts, post)
                .where(member.grade.ne(GRADE_ROASTED_BEAN), member.status.eq(MEMBER_ACTIVE))
                .groupBy(member.id)
                .having(follow.followingId.count().goe(50), follow.followingId.count().lt(100L),post.member.count().goe(3L))
                .fetch();

        return list;
    }

    @Override
    public List<MemberGrade> memberGradeEspresso() {

        List<MemberGrade> list = queryFactory
                .select(new QMemberGrade(member.id, follow.followingId.count(), post.member.count()))
                .from(member)
                .leftJoin(member.followings, follow)
                .leftJoin(member.posts, post)
                .where(member.grade.ne(GRADE_ESPRESSO), member.status.eq(MEMBER_ACTIVE))
                .groupBy(member.id)
                .having(follow.followingId.count().goe(100L), post.member.count().goe(3L))
                .fetch();

        return list;
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

    private BooleanExpression postBookMarkIdLtCursorId(Long cursorId) {
        if(cursorId == null) {
            return null;
        }
        return postBookmark.postBookmarkId.lt(cursorId);
    }

    private BooleanExpression cafeBookMarkLtCursorId(Long cursorId) {
        if(cursorId == null) {
            return null;
        }
        return cafeBookmark.id.lt(cursorId);
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
