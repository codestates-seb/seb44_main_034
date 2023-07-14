package mainproject.cafeIn.domain.post.repository;

import mainproject.cafeIn.domain.post.dto.response.PostResponse;

import java.util.List;

public interface PostRepositoryCustom {
    List<PostResponse> getPosts(Long cafeId);
}
