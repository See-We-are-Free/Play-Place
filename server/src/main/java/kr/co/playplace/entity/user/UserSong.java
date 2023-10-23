package kr.co.playplace.entity.user;

import kr.co.playplace.entity.song.Song;
import kr.co.playplace.entity.TimeBaseEntity;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class UserSong extends TimeBaseEntity {
    @Id
    @GeneratedValue
    @Column(name = "user_song_id")
    Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    Users user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "youtube_id")
    Song song;

}
