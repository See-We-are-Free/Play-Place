package kr.co.playplace.entity.stats;

import kr.co.playplace.entity.location.Village;
import kr.co.playplace.entity.song.Song;
import kr.co.playplace.entity.TimeBaseEntity;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class SongAreaStats extends TimeBaseEntity {
    @Id
    @GeneratedValue
    @Column(name= "song_area_stats_id")
    Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "song_id")
    Song song;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "village_id")
    Village village;

}
