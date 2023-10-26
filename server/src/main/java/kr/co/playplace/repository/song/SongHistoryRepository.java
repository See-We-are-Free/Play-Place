package kr.co.playplace.repository.song;

import kr.co.playplace.entity.song.SongHistory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SongHistoryRepository extends JpaRepository<SongHistory, Long> {
}
