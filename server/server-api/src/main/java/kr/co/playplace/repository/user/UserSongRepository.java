package kr.co.playplace.repository.user;

import kr.co.playplace.entity.user.UserSong;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserSongRepository extends JpaRepository<UserSong, Long> {
    List<UserSong> findAllByUser_Id(long userId);

    int countUserSongByUser_Id(long userId);

//    @Query("DELETE FROM UserSong us WHERE us.user.id = :userId LIMIT 1")
    void deleteUserSongByUser_Id(long userId);

    /**
     @Query("SELECT DISTINCT fh.funding FROM FundingHistory fh WHERE fh.member.id = :memberId")
     List<Funding> findDistinctFundingByMemberId(Long memberId);
     */
}
