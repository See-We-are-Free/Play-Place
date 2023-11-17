package kr.co.playplace.service.location;

import kr.co.playplace.common.exception.BaseException;
import kr.co.playplace.common.exception.ErrorCode;
import kr.co.playplace.common.util.Geocoder;
import kr.co.playplace.controller.home.request.PositionRequest;
import kr.co.playplace.controller.home.response.GetVillageResponse;
import kr.co.playplace.entity.location.Village;
import kr.co.playplace.repository.location.VillageRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class LocationQueryService {

    private final VillageRepository villageRepository;

    private final Geocoder geocoder;

    public GetVillageResponse getVillage(PositionRequest positionRequest){ // 가장 최근 재생 곡
        int code = geocoder.getGeoCode(positionRequest.getLat(), positionRequest.getLon());
        Village village = villageRepository.findByCode(code).orElseThrow(()->new BaseException(ErrorCode.INVALID_USE_LAT_LON));
        return GetVillageResponse.of(village);
    }

}
