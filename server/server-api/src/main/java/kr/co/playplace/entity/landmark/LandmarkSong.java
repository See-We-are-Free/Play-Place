package kr.co.playplace.entity.landmark;

import kr.co.playplace.entity.TimeBaseEntity;
import kr.co.playplace.entity.song.Song;
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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "landmark_song_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "landmark_id")
    private Landmark landmark;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private Users user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "song_id")
    private Song song;

    @Builder
    public LandmarkSong(Landmark landmark, Users user, Song song) {
        this.landmark = landmark;
        this.user = user;
        this.song = song;
    }
}
