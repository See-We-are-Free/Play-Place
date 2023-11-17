package kr.co.playplace.repository.stats;

import kr.co.playplace.entity.stats.SongWeatherStats;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SongWeatherStatsRepository extends JpaRepository<SongWeatherStats, Long> {
}
