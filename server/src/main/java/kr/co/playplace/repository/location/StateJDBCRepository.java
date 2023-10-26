package kr.co.playplace.repository.location;

import kr.co.playplace.entity.location.State;

import java.util.List;

public interface StateJDBCRepository {

    void bulkInsert(List<State> states);
    boolean isExistsData();
}
