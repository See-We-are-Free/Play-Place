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
public class SongTimeStats extends TimeBaseEntity {
    @Id
    @GeneratedValue
    @Column(name = "song_time_stats_id")
    Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "song_id")
    Song song;
}
