package kr.co.playplace.entity.landmark;

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
public class Landmark {
    @Id
    @GeneratedValue
    @Column(name = "landmark_id")
    Long id;

}
