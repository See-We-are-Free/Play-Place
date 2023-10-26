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
public class UserLandmarkSong extends TimeBaseEntity {
    @Id
    @GeneratedValue
    @Column(name = "user_landmark_song_id")
    Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "song_id")
    Song song;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="user_landmark_group_id")
    UserLandmarkGroup userLandmarkGroup;
}
