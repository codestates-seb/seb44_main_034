package mainproject.cafeIn.domain.post.dto.request;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import mainproject.cafeIn.domain.cafe.entity.Cafe;
import mainproject.cafeIn.domain.post.entity.Post;
import mainproject.cafeIn.domain.tag.entity.PostTag;
import mainproject.cafeIn.domain.tag.service.PostTagService;

import javax.validation.constraints.NotNull;
import java.util.Arrays;
import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PostRequest {
    @NotNull
    private String title;

    @NotNull
    private String content;

    @NotNull
    private float starRating;

    private String image;

    private String tags;

    public Post toEntity(Cafe cafe, List<PostTag> postTags) {
        return Post.builder()
                .title(title)
                .content(content)
                .starRating(starRating)
                .image(image)
                .cafe(cafe)
                .postTags(postTags)
                .build();
    }

    public Post toEntity(List<PostTag> postTags) {
        return Post.builder()
                .title(title)
                .content(content)
                .starRating(starRating)
                .image(image)
                .postTags(postTags)
                .build();
    }

}
