package kr.co.playplace.repository.location;

import kr.co.playplace.common.util.location.CityCsvDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Slf4j
@Repository
@RequiredArgsConstructor
public class CityJDBCRepositoryImpl implements CityJDBCRepository {

    private final JdbcTemplate jdbcTemplate;

    @Override
    public void bulkInsert(List<CityCsvDto> cities) {
        int batchSize = 1000;
        for (int i = 0; i < cities.size(); i += batchSize) {
            List<CityCsvDto> batch = cities.subList(i, Math.min(i + batchSize, cities.size()));
            batchInsert(batch);
        }
    }
    @Override
    public boolean isExistsData() {
        // 1번째 데이터 없으면 insert 진행
        String sql = "SELECT count(*) FROM city WHERE city_id = ?";

        int count = jdbcTemplate.queryForObject(sql, new Object[]{1}, Integer.class);
        return count > 0;
    }

    private void batchInsert(List<CityCsvDto> cities) {
        log.info(cities.toString());
        String sql = "INSERT INTO city (city_id, code, name, state_id) "
                + "VALUES (?, ?, ?, ?)";

        jdbcTemplate.batchUpdate(sql, cities, 1000, (ps, city) -> {
            ps.setInt(1, city.getId());
            ps.setInt(2, city.getCode());
            ps.setString(3, city.getName());
            ps.setInt(4, city.getStateId());
        });
    }
}
