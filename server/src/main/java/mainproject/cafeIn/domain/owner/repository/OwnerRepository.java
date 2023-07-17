package mainproject.cafeIn.domain.owner.repository;

import mainproject.cafeIn.domain.owner.entity.Owner;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OwnerRepository extends JpaRepository<Owner, Long>, OwnerRepositoryCustom {
    Optional<Owner> findByEmail(String email);
}
