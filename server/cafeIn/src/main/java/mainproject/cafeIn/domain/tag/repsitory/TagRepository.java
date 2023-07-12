package mainproject.cafeIn.domain.tag.repsitory;

import mainproject.cafeIn.domain.tag.entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TagRepository extends JpaRepository<Tag, Long>, TagRepositoryCustom {
    Tag findByName(String name);
}
