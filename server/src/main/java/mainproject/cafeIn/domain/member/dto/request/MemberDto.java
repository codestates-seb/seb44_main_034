package mainproject.cafeIn.domain.member.dto.request;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import mainproject.cafeIn.domain.member.entity.Member;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;


public class MemberDto {

    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    @Getter
    @AllArgsConstructor
    public static class Post {

        @NotBlank(message = "이메일을 입력해주세요.")
        @Email(message = "올바른 이메일 주소를 입력해주세요.")
        private String email;

        @NotBlank(message = "닉네임을 입력해주세요.")
        @Pattern(regexp = "^[가-힣a-zA-Z0-9]{2,10}$", message = "닉네임은 특수문자를 제외한 2~10자리여야 합니다.")
        private String displayName;

        @NotBlank(message = "비밀번호를 입력해주세요.")
        @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@#$%^&+=!])(?!.*\\s).{8,15}$", message = "비밀번호는 8~15자리여야합니다.")
        private String password;

        private boolean privacy;


        public Member toEntity() {
            return Member.builder()
                    .email(email)
                    .displayName(displayName)
                    .password(password)
                    .isPrivacy(privacy)
                    .build();
        }

    }

    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    @Getter
    @AllArgsConstructor
    public static class Patch {


        @Pattern(regexp = "^[가-힣a-zA-Z0-9]{2,10}$", message = "닉네임은 특수문자를 제외한 2~10자리여야 합니다.")
        private String displayName;


        @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@#$%^&+=!])(?!.*\\s).{8,15}$", message = "비밀번호는 8~15자리여야합니다.")
        private String password;




    }

    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    @Getter
    @AllArgsConstructor
    public static class checkPassword {

        private String password;
    }

}
