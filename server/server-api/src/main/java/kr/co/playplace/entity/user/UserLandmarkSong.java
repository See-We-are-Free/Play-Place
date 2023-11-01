package kr.co.playplace.entity.user;

import kr.co.playplace.entity.TimeBaseEntity;
import kr.co.playplace.entity.song.Song;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class UserLandmarkSong extends TimeBaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_landmark_song_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "song_id")
    private Song song;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="user_landmark_group_id")
    private UserLandmarkGroup userlandmarkGroup;
}
