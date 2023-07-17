package mainproject.cafeIn.domain.owner.entity;


import lombok.*;
import mainproject.cafeIn.domain.cafe.entity.Cafe;
import mainproject.cafeIn.domain.owner.enums.OwnerStatus;
import mainproject.cafeIn.global.base.BaseEntity;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter // UserDetails 만드는데 필요
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Owner extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "OWNER_ID", updatable = false, nullable = false)
    private Long ownerId;

    @Column(name = "OWNER_EMAIL", updatable = false, nullable = false)
    private String email;

    @Column(name = "OWNER_DISPLAYNAME",nullable = false)
    private String displayName;

    @Column(name = "OWNER_PASSWORD", nullable = false)
    private String password;

    @Enumerated(value = EnumType.STRING)
    @Column(name = "OWNER_STATUS", nullable = false)
    private OwnerStatus ownerStatus;

    @OneToMany(mappedBy = "owner", cascade = CascadeType.REMOVE, fetch = FetchType.LAZY)
    private List<Cafe> cafes = new ArrayList<>();

    @ElementCollection(fetch = FetchType.EAGER)
    List<String> roles = new ArrayList<>();

    @Builder
    public Owner(String email, String displayName, String password, OwnerStatus ownerStatus, List<Cafe> cafes, List<String> roles) {
        this.email = email;
        this.displayName = displayName;
        this.password = password;
        this.ownerStatus = ownerStatus;
        this.cafes = cafes;
        this.roles = roles;
    }
}
