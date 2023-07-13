package mainproject.cafeIn.domain.cafe.controller;

import mainproject.cafeIn.common.IntegrationTest;
import mainproject.cafeIn.domain.cafe.entity.Cafe;
import mainproject.cafeIn.domain.cafe.repository.CafeRepository;
import mainproject.cafeIn.domain.owner.entity.Owner;
import mainproject.cafeIn.domain.owner.repository.OwnerRepository;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

class CafeControllerTest extends IntegrationTest {
    private static final String BASE_URI = "/api/cafes";
    @Autowired
    private OwnerRepository ownerRepository;
    @Autowired
    private CafeRepository cafeRepository;
    private Owner owner;
    private Cafe cafe;

    @BeforeEach
    void setUp() {
        final String email = "owner123@naver.com";
        final String displayName = "owner123";
        final String password = "password123!";

        owner = ownerRepository.save(Owner.builder()
                .email(email)
                .displayName(displayName)
                .password(password)
                .roles(List.of("OWNER"))
                .build());
    }
}