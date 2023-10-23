package kr.co.playplace.entity.user;

import kr.co.playplace.entity.TimeBaseEntity;
import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Users extends TimeBaseEntity {
    @Id
    @GeneratedValue
    @Column(name = "user_id")
    Long id;
}
