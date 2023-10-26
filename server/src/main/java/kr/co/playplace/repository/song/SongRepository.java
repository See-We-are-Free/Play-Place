package kr.co.playplace.repository.song;

import kr.co.playplace.entity.song.Song;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SongRepository extends JpaRepository<Song, Long> {
    boolean existsByYoutubeId(String youtubeId);
}
