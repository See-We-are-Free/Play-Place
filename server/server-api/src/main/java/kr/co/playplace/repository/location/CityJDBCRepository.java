package kr.co.playplace.repository.location;

import kr.co.playplace.common.util.location.CityCsvDto;

import java.util.List;

public interface CityJDBCRepository {

    void bulkInsert(List<CityCsvDto> cities);
    boolean isExistsData();
}
