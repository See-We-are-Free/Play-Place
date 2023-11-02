package kr.co.playplace.repository.stats;

import kr.co.playplace.entity.stats.SongTimeStats;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SongTimeStatsRepository extends JpaRepository<SongTimeStats, Long> {
}
