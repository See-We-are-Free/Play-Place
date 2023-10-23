package kr.co.playplace.entity.stats;

import kr.co.playplace.entity.song.Song;
import kr.co.playplace.entity.TimeBaseEntity;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class SongWeatherStats extends TimeBaseEntity {
    @Id
    @GeneratedValue
    @Column(name = "song_weather_stats_id")
    Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "youtube_id")
    Song song;
}
