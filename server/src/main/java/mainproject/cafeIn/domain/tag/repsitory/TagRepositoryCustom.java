package mainproject.cafeIn.domain.tag.repsitory;

import mainproject.cafeIn.domain.tag.dto.TagResponse;

import java.util.List;

public interface TagRepositoryCustom {
    List<TagResponse> getTags(Long cafeId);
}
