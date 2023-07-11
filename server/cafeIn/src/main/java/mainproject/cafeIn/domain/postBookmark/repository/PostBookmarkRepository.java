package mainproject.cafeIn.domain.postBookmark.repository;

import mainproject.cafeIn.domain.postBookmark.entity.PostBookmark;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PostBookmarkRepository extends JpaRepository<PostBookmark, Long> {
    Optional<PostBookmark> findByMemberIdAndPostId(Long memberId, Long postId);
}
