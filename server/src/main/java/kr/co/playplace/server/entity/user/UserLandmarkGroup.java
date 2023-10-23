package kr.co.playplace.server.entity.user;

import kr.co.playplace.server.entity.TimeBaseEntity;
import kr.co.playplace.server.entity.landmark.Landmark;
import kr.co.playplace.server.entity.user.Users;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class UserLandmarkGroup extends TimeBaseEntity {
    @Id
    @GeneratedValue
    @Column(name = "user_landmark_group_id")
    Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "landmark_id")
    Landmark landmark;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    Users user;
}
