package kr.co.playplace.repository.user;

import kr.co.playplace.entity.user.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<Users, Long> {
    Optional<Users> findByOuthId(String email);

    Boolean existsByIdAndIsRadar(long id, int isRadar);
}
