package kr.co.playplace.entity.location;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class City {
    @Id
    @GeneratedValue
    @Column(name = "city_id")
    int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "state_id")
    State state;

    String name;
    int code;
}
