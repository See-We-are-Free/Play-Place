package kr.co.playplace.repository;

import kr.co.playplace.entity.location.State;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Slf4j
@Repository
@RequiredArgsConstructor
public class StateJDBCRepositoryImpl implements StateJDBCRepository {

    private final JdbcTemplate jdbcTemplate;

    @Override
    public void bulkInsert(List<State> states) {

        int batchSize = 10;
        for (int i = 0; i < states.size(); i += batchSize) {
            List<State> batch = states.subList(i, Math.min(i + batchSize, states.size()));
            batchInsert(batch);

            if (i % 5000 == 0 || i == states.size() - 1) {  // 5000번째나 마지막 배치의 경우 로그 출력
                log.info("Inserted {} out of {} states.", i + batch.size(), states.size());
            }
        }
    }
    @Override
    public boolean isExistsData() {
        return this.jdbcTemplate.queryForObject("SELECT COUNT(*) FROM state", Integer.class) > 0;
    }

    private void batchInsert(List<State> states) {
        String sql = "INSERT INTO state (state_id, code, name) "
                + "VALUES (?, ?, ?)";

        jdbcTemplate.batchUpdate(sql, states, 1000, (ps, state) -> {
            ps.setInt(1, state.getId());
            ps.setInt(2, state.getCode());
            ps.setString(3, state.getName());
        });
    }
}
