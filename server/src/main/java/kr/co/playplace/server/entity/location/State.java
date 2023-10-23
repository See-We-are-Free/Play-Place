package kr.co.playplace.server.entity.location;

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
public class State {
    @Id
    @GeneratedValue
    @Column(name = "state_id")
    int id;
}
