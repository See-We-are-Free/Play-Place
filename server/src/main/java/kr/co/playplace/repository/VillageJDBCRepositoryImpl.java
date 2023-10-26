package kr.co.playplace.repository;

import kr.co.playplace.common.util.VillageCsvDto;
import kr.co.playplace.entity.location.Village;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Slf4j
@Repository
@RequiredArgsConstructor
public class VillageJDBCRepositoryImpl implements VillageJDBCRepository {

    private final JdbcTemplate jdbcTemplate;

    @Override
    public void bulkInsert(List<VillageCsvDto> villages) {
        int batchSize = 1000;
        for (int i = 0; i < villages.size(); i += batchSize) {
            List<VillageCsvDto> batch = villages.subList(i, Math.min(i + batchSize, villages.size()));
            batchInsert(batch);
        }
    }
    @Override
    public boolean isExistsData() {
        // 1번째 데이터 없으면 insert 진행
        String sql = "SELECT count(*) FROM village WHERE village_id = ?";

        int count = jdbcTemplate.queryForObject(sql, new Object[]{1}, Integer.class);
        return count > 0;
    }

    private void batchInsert(List<VillageCsvDto> villages) {
        String sql = "INSERT INTO village (village_id, name, code, city_id) "
                + "VALUES (?, ?, ?, ?)";

        jdbcTemplate.batchUpdate(sql, villages, 1000, (ps, village) -> {
            ps.setInt(1, village.getId());
            ps.setString(2, village.getName());
            ps.setInt(3, village.getCode());
            ps.setInt(4, village.getCityId());
        });
    }
}
