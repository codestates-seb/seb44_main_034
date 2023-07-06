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
    private String sort;

    public PageCafeRequest(int page, int size, String sort) {
        setPage(page);
        setSize(size);
        setSort(sort);
    }

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

    public void setSort(String sort) {
        this.sort = sort;
    }

    public PageRequest of() {

        return sort == "" ? PageRequest.of(page - 1, size) : PageRequest.of(page - 1, size, Sort.by(sort).descending());
    }
}
