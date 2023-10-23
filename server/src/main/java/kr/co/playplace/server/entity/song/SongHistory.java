package kr.co.playplace.server.entity.song;

import kr.co.playplace.server.entity.TimeBaseEntity;
import kr.co.playplace.server.entity.location.Village;
import kr.co.playplace.server.entity.user.Users;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class SongHistory extends TimeBaseEntity {
    @Id
    @GeneratedValue
    @Column(name = "song_history_id")
    Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    Users user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "youtube_id")
    Song song;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "village_id")
    Village village;
}
