package mainproject.cafeIn.domain.cafe.dto.request;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PasswordRequest {
    private String password;

    public PasswordRequest(String password) {
        this.password = password;
    }
}
