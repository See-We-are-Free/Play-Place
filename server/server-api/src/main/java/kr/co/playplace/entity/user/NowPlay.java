package kr.co.playplace.entity.user;

import kr.co.playplace.entity.TimeBaseEntity;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@ToString
public class NowPlay extends TimeBaseEntity {
    @Id
    @Column(name = "now_play_id")
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private Users user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_song_id")
    private UserSong userSong;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_landmark_song_id")
    private UserLandmarkSong userLandmarkSong;

}
