package rc.noteit.security.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import rc.noteit.model.security.Authority;
import rc.noteit.model.security.AuthorityName;

import java.util.Optional;

public interface AuthorityRepository extends JpaRepository<Authority, Long> {
    Optional<Authority> findByName(AuthorityName roleName);


}
