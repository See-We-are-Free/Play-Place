package kr.co.playplace.repository.song;

import kr.co.playplace.service.song.dto.RecentSongDto;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface RecentSongDtoRedisRepository extends CrudRepository<RecentSongDto, Long> {
    Optional<RecentSongDto> findByUserId(long userId);
}
