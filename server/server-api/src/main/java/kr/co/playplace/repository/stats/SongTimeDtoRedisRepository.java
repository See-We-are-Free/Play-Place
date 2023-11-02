package kr.co.playplace.repository.stats;

import kr.co.playplace.entity.Timezone;
import kr.co.playplace.service.song.dto.SongTimezoneDto;
import org.springframework.data.repository.CrudRepository;

import java.util.List;


public interface SongTimeDtoRedisRepository extends CrudRepository<SongTimezoneDto, Long> {

    List<SongTimezoneDto> findAllByTimezoneOrderByCountDesc(Timezone timezone);

}
