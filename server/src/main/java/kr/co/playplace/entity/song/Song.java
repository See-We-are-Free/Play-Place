package kr.co.playplace.entity.song;

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
public class Song extends TimeBaseEntity {
    @Id
    @GeneratedValue
    @Column(name = "youtube_id")
    Long id;
}
