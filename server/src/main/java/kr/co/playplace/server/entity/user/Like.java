package kr.co.playplace.server.entity.user;

import kr.co.playplace.server.entity.TimeBaseEntity;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Like extends TimeBaseEntity {
    @EmbeddedId
    private LikeId likeId;
}
