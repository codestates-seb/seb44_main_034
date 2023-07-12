package mainproject.cafeIn.domain.tag.service;

import lombok.RequiredArgsConstructor;
import mainproject.cafeIn.domain.cafe.entity.Cafe;
import mainproject.cafeIn.domain.post.entity.Post;
import mainproject.cafeIn.domain.post.service.PostService;
import mainproject.cafeIn.domain.tag.entity.PostTag;
import mainproject.cafeIn.domain.tag.repsitory.PostTagRepository;
import mainproject.cafeIn.domain.tag.repsitory.TagRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class PostTagService {
    private final TagRepository tagRepository;
    private final PostTagRepository postTagRepository;

    public List<PostTag> createPostTag(List<String> tags, Post post, Cafe cafe) {
        List<PostTag> postTags = tags.stream()
                .map(name -> PostTag.builder()
                        .tag(tagRepository.findByName(name))
                        .cafe(cafe)
                        .post(post)
                        .build())
                .peek(postTagRepository::save)
                .collect(Collectors.toList());
        return postTags;
    }

    public List<String> getTagNames(Long postId) {
        List<PostTag> postTags = postTagRepository.findPostTagsByPostPostId(postId).get();
        List<String> tagNames = postTags.stream()
                .map(postTag -> postTag.getTag().getName())
                .collect(Collectors.toList());
        return tagNames;
    }
}
