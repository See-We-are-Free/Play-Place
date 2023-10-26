package kr.co.playplace.entity.location;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Village {
    @Id
    @Column(name = "village_id")
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "city_id")
    private City city;

    @Column(name = "name", nullable = false, columnDefinition = "VARCHAR(255) CHARACTER SET UTF8")
    private String name;

    private int code;
}
