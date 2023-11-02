package kr.co.playplace.repository.stats;

import kr.co.playplace.service.song.dto.SongAreaDto;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface SongAreaDtoRedisRepository extends CrudRepository<SongAreaDto, Long> {

    List<SongAreaDto> findAllByVillageCode(int villageCode);
}
