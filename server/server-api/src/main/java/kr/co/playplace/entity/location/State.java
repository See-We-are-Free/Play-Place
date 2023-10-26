package kr.co.playplace.entity.location;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class State {
    @Id
    @Column(name = "state_id")
    private int id;

    @Column
    private int code;

    @Column(name = "name", nullable = false, columnDefinition = "VARCHAR(255) CHARACTER SET UTF8")
    private String name;
}
