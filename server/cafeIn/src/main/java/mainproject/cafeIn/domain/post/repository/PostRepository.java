package mainproject.cafeIn.domain.post.repository;

import mainproject.cafeIn.domain.post.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PostRepository extends JpaRepository<Post, Long> {
    Optional<Post> findPostById(Long postId);

}
