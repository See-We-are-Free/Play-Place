package kr.co.playplace.repository.song;

import kr.co.playplace.entity.song.Song;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SongRepository extends JpaRepository<Song, Long> {
    boolean existsByYoutubeId(String youtubeId);
    Optional<Song> findByYoutubeId(String youtubeId);
}
