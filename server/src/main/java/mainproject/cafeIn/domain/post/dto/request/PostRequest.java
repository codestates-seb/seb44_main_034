package mainproject.cafeIn.domain.post.dto.request;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import mainproject.cafeIn.domain.cafe.entity.Cafe;
import mainproject.cafeIn.domain.member.entity.Member;
import mainproject.cafeIn.domain.post.entity.Post;
import mainproject.cafeIn.domain.tag.entity.PostTag;

import javax.validation.constraints.NotNull;
import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PostRequest {

    @NotNull
    private String title;
    @NotNull
    private String content;
    @NotNull
    private int starRating;
    private List<String> tags;

    public Post toEntity(Member member, Cafe cafe) {
        return Post.builder()
                .member(member)
                .title(title)
                .content(content)
                .starRating(starRating)
                .cafe(cafe)
                .build();
    }

    public Post toEntity() {
        return Post.builder()
                .title(title)
                .content(content)
                .starRating(starRating)
                .build();
    }

}
