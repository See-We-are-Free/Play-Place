package kr.co.playplace.repository.location;

import kr.co.playplace.common.util.location.VillageCsvDto;

import java.util.List;

public interface VillageJDBCRepository {

    void bulkInsert(List<VillageCsvDto> villages);
    boolean isExistsData();
}
