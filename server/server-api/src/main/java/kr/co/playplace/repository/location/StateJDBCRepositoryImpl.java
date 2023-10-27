package kr.co.playplace.repository.location;

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

        int batchSize = 1000;
        for (int i = 0; i < states.size(); i += batchSize) {
            List<State> batch = states.subList(i, Math.min(i + batchSize, states.size()));
            batchInsert(batch);
        }
    }
    @Override
    public boolean isExistsData() {
        // 1은 1번째 데이터로, 없으면 insert 진행
        String sql = "SELECT count(*) FROM state WHERE state_id = ?";

        int count = jdbcTemplate.queryForObject(sql, new Object[]{1}, Integer.class);
        return count > 0;
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
