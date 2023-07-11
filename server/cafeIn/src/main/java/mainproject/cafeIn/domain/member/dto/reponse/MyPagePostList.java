package mainproject.cafeIn.domain.member.dto.reponse;


import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class MyPagePostList {

    private long postId;
    private String image;
    private String title;
    private String author;
}
