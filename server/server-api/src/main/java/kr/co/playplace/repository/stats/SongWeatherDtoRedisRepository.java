package kr.co.playplace.repository.stats;

import kr.co.playplace.entity.Weather;
import kr.co.playplace.service.song.dto.SongWeatherDto;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface SongWeatherDtoRedisRepository extends CrudRepository<SongWeatherDto, Long> {

    List<SongWeatherDto> findAllByWeatherOrderByCountDesc(Weather weather);

}
