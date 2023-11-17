package kr.co.playplace.service.landmark;

import kr.co.playplace.common.exception.BaseException;
import kr.co.playplace.common.exception.ErrorCode;
import kr.co.playplace.common.util.Geocoder;
import kr.co.playplace.controller.landmark.response.FindLandmarkResponse;
import kr.co.playplace.controller.landmark.response.FindLandmarkSongResponse;
import kr.co.playplace.controller.landmark.response.SearchLandmarkResponse;
import kr.co.playplace.entity.landmark.Landmark;
import kr.co.playplace.entity.location.Village;
import kr.co.playplace.repository.landmark.LandmarkQueryRepository;
import kr.co.playplace.repository.location.VillageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class LandmarkQueryService {

    private final LandmarkQueryRepository landmarkQueryRepository;
    private final VillageRepository villageRepository;

    private final Geocoder geocoder;

    public List<FindLandmarkResponse> findLandmarks() {
        return landmarkQueryRepository.findLandmarks();
    }

    public List<FindLandmarkSongResponse> findLandmarksSongs(Long landmarkId) {
        List<FindLandmarkSongResponse> responses = landmarkQueryRepository.findLandmarkSongs(landmarkId);
        //if (responses.isEmpty()) throw new BaseException(ErrorCode.NOT_FOUND_LANDMARK_SONG);
        return responses;
    }

    public List<SearchLandmarkResponse> searchLandmark(String keyword) {
        List<SearchLandmarkResponse> result = new ArrayList<>();
        List<Landmark> responses = landmarkQueryRepository.searchLandmark(keyword);
        for (Landmark landmark : responses){
            int code = geocoder.getGeoCode(landmark.getLatitude(), landmark.getLongitude());
            Village village = villageRepository.findByCode(code)
                    .orElseThrow(IllegalArgumentException::new);
            SearchLandmarkResponse searchLandmarkResponse = SearchLandmarkResponse.builder()
                    .landmarkId(landmark.getId())
                    .landmarkName(landmark.getTitle())
                    .villageName(village.getName())
                    .build();
            result.add(searchLandmarkResponse);
        }
        return result;
    }
}
