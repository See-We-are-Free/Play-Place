package kr.co.playplace.server.entity.location;

import kr.co.playplace.server.entity.location.City;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Village {
    @Id
    @GeneratedValue
    @Column(name = "village_id")
    int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "city_id")
    City city;
}
