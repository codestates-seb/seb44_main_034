package mainproject.cafeIn.domain.post.dto.response;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
@Getter
@AllArgsConstructor
public class PageInfo {
    private int page;
    private int size;
    private int totalElements;
    private int totalPages;
}
