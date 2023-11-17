package kr.co.playplace.entity.location;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class City {
    @Id
    @Column(name = "city_id")
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "state_id")
    private State state;

    @Column(name = "name", nullable = false, columnDefinition = "VARCHAR(255) CHARACTER SET UTF8")
    private String name;

    private int code;
}
