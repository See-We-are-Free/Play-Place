package kr.co.playplace.repository;

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
    public void bulkInsert(List<Village> villages) {

        int batchSize = 1000;
        for (int i = 0; i < villages.size(); i += batchSize) {
            List<Village> batch = villages.subList(i, Math.min(i + batchSize, villages.size()));
            batchInsert(batch);

            if (i % 5000 == 0 || i == villages.size() - 1) {  // 5000번째나 마지막 배치의 경우 로그 출력
                log.info("Inserted {} out of {} recipes.", i + batch.size(), villages.size());
            }
        }
    }
    @Override
    public boolean isExistsData() {
        return this.jdbcTemplate.queryForObject("SELECT COUNT(*) FROM village", Integer.class) > 0;
    }

    private void batchInsert(List<Village> villages) {
        String sql = "INSERT INTO village (name, code) "
                + "VALUES (?, ?)";

        jdbcTemplate.batchUpdate(sql, villages, 1000, (ps, recipe) -> {
            ps.setString(1, recipe.getName());
            ps.setInt(2, recipe.getCode());
        });
    }
}
