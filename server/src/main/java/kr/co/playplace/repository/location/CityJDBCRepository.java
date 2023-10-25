package kr.co.playplace.repository.location;

import kr.co.playplace.common.util.CityCsvDto;
import kr.co.playplace.entity.location.City;

import java.util.List;

public interface CityJDBCRepository {

    void bulkInsert(List<CityCsvDto> cities);
    boolean isExistsData();
}
