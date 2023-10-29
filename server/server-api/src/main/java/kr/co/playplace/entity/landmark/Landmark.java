package kr.co.playplace.entity.landmark;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.math.BigDecimal;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Landmark {
    @Id
    @GeneratedValue
    @Column(name = "landmark_id")
    private Long id;

    @Column(length = 60)
    private String title;

    @Column(precision = 16, scale = 14)
    private double latitude;

    @Column(precision = 17, scale = 14)
    private double longitude;

    @Builder
    public Landmark(String title, double latitude, double longitude) {
        this.title = title;
        this.latitude = latitude;
        this.longitude = longitude;
    }
}
