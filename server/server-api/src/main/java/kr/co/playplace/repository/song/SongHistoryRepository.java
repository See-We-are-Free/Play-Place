package kr.co.playplace.repository.song;

import kr.co.playplace.entity.song.SongHistory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SongHistoryRepository extends JpaRepository<SongHistory, Long> {
    List<SongHistory> findAllByUser_Id(long userId);
}
