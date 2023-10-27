package kr.co.playplace.entity.landmark;

import kr.co.playplace.entity.song.Song;
import kr.co.playplace.entity.TimeBaseEntity;
import kr.co.playplace.entity.user.Users;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class LandmarkSong extends TimeBaseEntity {
    @Id
    @GeneratedValue
    @Column(name = "landmark_song_id")
    Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "landmark_id")
    Landmark landmark;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    Users user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "song_id")
    Song song;
}
