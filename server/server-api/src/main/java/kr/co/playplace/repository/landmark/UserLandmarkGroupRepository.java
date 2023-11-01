package kr.co.playplace.repository.landmark;

import kr.co.playplace.entity.user.UserLandmarkGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserLandmarkGroupRepository extends JpaRepository<UserLandmarkGroup, Long> {

    Optional<UserLandmarkGroup> findByUserIdAndLandmarkId(Long userId, Long landmarkId);

    void deleteUserLandmarkGroupByUserIdAndLandmarkId(Long userId, Long landmarkId);

    int countByUserId(Long userId);

    List<UserLandmarkGroup> findByUser_Id(long userId);
}
