package kr.co.playplace.entity.user;

import kr.co.playplace.entity.TimeBaseEntity;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Users extends TimeBaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long id;

    @Column(length = 24)
    private String nickname;

    private int profileImg;

    @Column(length = 50)
    private String outhId;

    @ColumnDefault("0")
    private int isRemoved;

    @ColumnDefault("1")
    private int isPush;

    @ColumnDefault("1")
    private int isShake;

    private String role;

    @Builder
    public Users(String nickname, int profileImg, String outhId, int isRemoved, int isPush, int isShake, String role) {
        this.nickname = nickname;
        this.profileImg = profileImg;
        this.outhId = outhId;
        this.isRemoved = isRemoved;
        this.isPush = isPush;
        this.isShake = isShake;
        this.role = role;
    }

    public void changePushState() {
        this.isPush = this.isPush == 0 ? 1 : 0;
    }

    public void changeShakeState() {
        this.isShake = this.isShake == 0 ? 1 : 0;
    }

    public void changeProfileImg(int numImg) {
        this.profileImg = numImg;
    }
}
