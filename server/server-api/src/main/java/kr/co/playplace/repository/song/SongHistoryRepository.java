package kr.co.playplace.repository.song;

import io.lettuce.core.dynamic.annotation.Param;
import kr.co.playplace.entity.song.SongHistory;
import kr.co.playplace.service.song.dto.GetAreaSongDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SongHistoryRepository extends JpaRepository<SongHistory, Long> {
    @Query(value = "SELECT * FROM (\n" +
            "    SELECT song_id, village_id, COUNT(*) AS count,\n" +
            "        ROW_NUMBER() OVER (PARTITION BY village_id ORDER BY COUNT(*) DESC) as rn\n" +
            "    FROM song_history\n" +
            "    GROUP BY song_id, village_id\n" +
            ") as village_song " +
            "WHERE rn <= 10;", nativeQuery = true)
            List<Object[]> findAreaSong();

    @Query(value = "SELECT * FROM (\n" +
            "    SELECT song_id, weather, COUNT(*) AS count,\n" +
            "        ROW_NUMBER() OVER (PARTITION BY weather ORDER BY COUNT(*) DESC) as rn\n" +
            "    FROM song_history\n" +
            "    GROUP BY song_id, weather\n" +
            ") as weather_song " +
            "WHERE rn <= 10;", nativeQuery = true)
    List<Object[]> findWeatherSong();

    @Query(value = "SELECT * FROM (\n" +
            "    SELECT song_id, timezone, COUNT(*) AS count,\n" +
            "        ROW_NUMBER() OVER (PARTITION BY timezone ORDER BY COUNT(*) DESC) as rn\n" +
            "    FROM song_history\n" +
            "    GROUP BY song_id, timezone\n" +
            ") as timezone_song " +
            "WHERE rn <= 10;", nativeQuery = true)
    List<Object[]> findTimeZoneSong();

    List<SongHistory> findAllByUser_Id(long userId);
}
