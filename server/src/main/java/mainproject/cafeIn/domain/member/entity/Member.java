package mainproject.cafeIn.domain.member.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import mainproject.cafeIn.domain.cafe.entity.CafeBookmark;
import mainproject.cafeIn.domain.member.entity.enums.MemberGrade;
import mainproject.cafeIn.domain.member.entity.enums.MemberStatus;
import mainproject.cafeIn.domain.post.entity.Post;
import mainproject.cafeIn.domain.postbookmark.entity.PostBookmark;
import mainproject.cafeIn.global.base.BaseEntity;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Member extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MEMBER_ID")
    private Long id;


    @Column(length = 100, nullable = false)
    private String displayName;

    @Column(name = "MEMBER_EMAIL", length = 100, nullable = false)
    private String email;

    @Column(name = "MEMBER_PASSWORD", length = 100, nullable = false)
    private String password;

    @Column(name = "PROFILE_IMAGE", columnDefinition = "TEXT")
    private String image;

    @Column(nullable = false)
    private boolean isPrivacy;

    @Enumerated(value = EnumType.STRING)
    @Column(name = "MEMBER_STATUS", length = 30, nullable = false)
    private MemberStatus status;

    @Enumerated(value = EnumType.STRING)
    @Column(length = 30, nullable = false)
    private MemberGrade grade;

    @ElementCollection(fetch = FetchType.EAGER)
    List<String> roles = new ArrayList<>();

    @OneToMany(mappedBy = "followerId", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Follow> followers = new ArrayList<>();

    @OneToMany(mappedBy = "followingId", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Follow> followings = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.REMOVE)
    private List<Post> posts = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.REMOVE)
    private List<PostBookmark> postBookmarks = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.REMOVE)
    private List<CafeBookmark> cafeBookmarks = new ArrayList<>();


    @Builder
    public Member(String displayName, String email, String password, String image, boolean isPrivacy, MemberStatus status, MemberGrade grade, List<String> roles) {

        this.displayName = displayName;
        this.email = email;
        this.password = password;
        this.image = image;
        this.isPrivacy = isPrivacy;
        this.status = status;
        this.grade = grade;
        this.roles = roles;

    }

    public void deleteMember(String displayName,String email, String password, MemberStatus status, String image) {
        this.displayName = displayName;
        this.email = email;
        this.password = password;
        this.status = status;
        this.image = image;
    }

    public void updateDisplay(String displayName) {
        this.displayName = displayName;
    }

    public void updatePassword(String password) {
        this.password = password;
    }

    public void updateImage(String image) {
        this.image = image;
    }

    public void deleteStatus(MemberStatus status) {
        this.status = status;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setRoles(List<String> roles) {
        this.roles = roles;
    }
}
