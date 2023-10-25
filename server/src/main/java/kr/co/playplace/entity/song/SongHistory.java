package kr.co.playplace.entity.song;

import kr.co.playplace.entity.location.Village;
import kr.co.playplace.entity.user.Users;
import kr.co.playplace.entity.TimeBaseEntity;
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
    @JoinColumn(name = "song_id")
    Song song;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "village_id")
    Village village;
}
