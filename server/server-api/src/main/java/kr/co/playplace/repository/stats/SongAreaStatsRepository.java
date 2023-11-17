package kr.co.playplace.repository.stats;

import kr.co.playplace.entity.stats.SongAreaStats;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SongAreaStatsRepository extends JpaRepository<SongAreaStats, Long> {
    List<SongAreaStats> findAllByVillage_Code(int code);
}
