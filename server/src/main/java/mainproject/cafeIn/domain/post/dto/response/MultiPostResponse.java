package mainproject.cafeIn.domain.post.dto.response;

import lombok.Getter;
import org.springframework.data.domain.Page;

import java.util.List;

@Getter
public class MultiPostResponse<T> {
    private List<T> data;
    private PageInfo pageInfo;

    public MultiPostResponse(List<T> data, Page page) {
        this.data = data;
        this.pageInfo = new PageInfo(page.getNumber() + 1, page.getSize(), (int) page.getTotalElements(), page.getTotalPages());
    }

}
