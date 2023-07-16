package mainproject.cafeIn.domain.member.dto.reponse;

import lombok.Builder;
import lombok.Getter;
import org.springframework.data.domain.Slice;

import java.util.List;

@Getter
public class SliceResponse<T> {

    private List<T> data;
    private boolean hasNext;
    private int pageSize;

    public SliceResponse(List<T> data, boolean hasNext, int pageSize) {
        this.data = data;
        this.hasNext = hasNext;
        this.pageSize = pageSize;
    }
}
