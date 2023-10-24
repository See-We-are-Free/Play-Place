package kr.co.playplace.repository;

import kr.co.playplace.entity.location.Village;

import java.util.List;

public interface VillageJDBCRepository {

    void bulkInsert(List<Village> villages);
    boolean isExistsData();
}
