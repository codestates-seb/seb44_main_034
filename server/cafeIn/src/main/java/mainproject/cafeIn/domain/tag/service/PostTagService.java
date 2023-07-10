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
    private final PostService postService;
    private final TagRepository tagRepository;
    private final PostTagRepository postTagRepository;

    public List<PostTag> createSimplePostTag(List<String> tags) {

        // 반복문으로 PostTag 생성
        List<PostTag> postTags = tags.stream()
                .map(name -> PostTag.builder().tag(tagRepository.findByName(name)).build())
                .peek(postTagRepository::save)
                .collect(Collectors.toList());

        return postTags;
    }

    public List<PostTag> createPostTag(List<String> tags, Long postId, Cafe cafe) {
        Post post = postService.findPostById(postId);

        List<PostTag> postTags = new ArrayList<>();
        for (String tagName : tags) {
            PostTag postTag = PostTag.builder()
                    .tag(tagRepository.findByName(tagName))
                    .cafe(cafe)
                    .post(post)
                    .build();
            postTags.add(postTag);
        }

        return postTags;
    }

    public List<String> getTagNamesFromPostTags(List<PostTag> postTags) {
        List<String> tagNames = postTags.stream()
                .map(postTag -> postTag.getTag().getName())
                .collect(Collectors.toList());

        return tagNames;
    }

    public void addPostTagInfo(Long postId, Cafe cafe) {
        Post post = postService.findPostById(postId);
        Optional<List<PostTag>> optionalPostTags = postService.checkPostTag(postId);
        optionalPostTags.get().stream().forEach(postTag -> {
            postTag.setPost(post);
            postTag.setCafe(cafe);
        });
    }
}
