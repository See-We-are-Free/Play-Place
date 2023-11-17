package kr.co.playplace.controller.home.response;

import kr.co.playplace.entity.Weather;
import kr.co.playplace.service.song.dto.SongDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.util.List;


@Getter
@Builder
@ToString
@AllArgsConstructor
public class WeatherSongResponse {

    private Weather weather;
    private List<SongDto> songs;

}
