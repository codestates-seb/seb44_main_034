package mainproject.cafeIn.domain.cafe.dto.request;

import lombok.Getter;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

@Getter
public class PageCafeRequest {
    private final int DEFAULT_SIZE = 10;
    private final int MAX_SIZE = 50;

    private int page;
    private int size;

    public PageCafeRequest(int page, int size) {
        setPage(page);
        setSize(size);
    }

    public void setPage(int page) {
        this.page = page <= 0 ? 1 : page;
    }

    public void setSize(int size) {
        this.size = size > MAX_SIZE ? DEFAULT_SIZE : size;
    }

    public PageRequest of() {

        return PageRequest.of(page - 1, size);
    }
}
