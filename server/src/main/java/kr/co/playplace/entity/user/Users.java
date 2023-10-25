package kr.co.playplace.entity.user;

import kr.co.playplace.entity.TimeBaseEntity;
import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Users extends TimeBaseEntity {
    @Id
    @GeneratedValue
    @Column(name = "user_id")
    Long id;

    @Column(length = 24)
    String nickname;

    @Column(length = 512)
    String profileImg;

    @Column(length = 50)
    String outhId;

    int isRemoved;

    int isPush;

    int isShake;

    String role;

    @Builder
    public Users(String nickname, String profileImg, String outhId, int isRemoved, int isPush, int isShake, String role) {
        this.nickname = nickname;
        this.profileImg = profileImg;
        this.outhId = outhId;
        this.isRemoved = isRemoved;
        this.isPush = isPush;
        this.isShake = isShake;
        this.role = role;
    }
}
