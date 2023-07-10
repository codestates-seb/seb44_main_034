package mainproject.cafeIn.domain.tag.service;

import lombok.RequiredArgsConstructor;
import mainproject.cafeIn.domain.cafe.entity.Cafe;
import mainproject.cafeIn.domain.post.entity.Post;
import mainproject.cafeIn.domain.post.service.PostService;
import mainproject.cafeIn.domain.tag.entity.PostTag;
import mainproject.cafeIn.domain.tag.repsitory.PostTagRepository;
import mainproject.cafeIn.domain.tag.entity.Tag;
import mainproject.cafeIn.domain.tag.repsitory.TagRepository;
import org.springframework.stereotype.Service;

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

    public List<PostTag> createPostTag (String tagString) {
        List<String> tagNames = parseTags(tagString);

        // 반복문으로 PostTag 생성
        for(String tagName : tagNames) {
            postTagRepository.save(
                    PostTag.builder()
                    .tag(tagRepository.findByName(tagName))
                    .build()
            );
        }

        List<PostTag> postTag = tagNames
                .stream()
                .map(name -> postTagRepository.findByName(name))
                .collect(Collectors.toList());

        return postTag;
    }

    public void addPostTagInfo(Long postId, Cafe cafe) {
        Post post = postService.findPostById(postId);
        Optional<List<PostTag>> optionalPostTags = postService.checkPostTag(postId);
        optionalPostTags.get().stream().forEach(postTag -> {
            postTag.setPost(post);
            postTag.setCafe(cafe);
        });
    }

    private List<String> parseTags(String tagString) {

        return Arrays.asList(tagString.split(","));
    }
}
