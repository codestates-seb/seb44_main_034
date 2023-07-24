package mainproject.cafeIn.domain.owner.dto.request;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import mainproject.cafeIn.domain.owner.entity.Owner;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class OwnerPostDto {
    @NotBlank(message = "이메일을 입력해 주세요.")
    @Email(message = "이메일 형식을 지켜주세요.")
    private String email;

    @NotBlank(message = "닉네임을 입력해 주세요.")
    private String displayName;

    @NotBlank(message = "비밀번호를 입력해 주세요.")
    @Pattern(regexp = "^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$",
            message = "비밀번호는 영문, 숫자, 특수문자를 포함한 8~15자를 입력해 주세요.")
    private String password;

    public static Owner toEntity(OwnerPostDto request) {
        return Owner.builder()
                .email(request.getEmail())
                .displayName(request.getDisplayName())
                .password(request.getPassword())
                .build();
    }
}
