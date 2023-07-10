package mainproject.cafeIn.domain.tag.repsitory;

import mainproject.cafeIn.domain.post.entity.Post;
import mainproject.cafeIn.domain.tag.entity.PostTag;
import mainproject.cafeIn.domain.tag.entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PostTagRepository extends JpaRepository<PostTag, Long> {
    PostTag findByName(String name);

    Optional<List<PostTag>> findPostTagsByPostPostId(Long postId);
}
