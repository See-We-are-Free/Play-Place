package kr.co.playplace.service.landmark;

import kr.co.playplace.common.exception.BaseException;
import kr.co.playplace.common.exception.ErrorCode;
import kr.co.playplace.controller.landmark.response.FindLandmarkResponse;
import kr.co.playplace.controller.landmark.response.FindLandmarkSongResponse;
import kr.co.playplace.repository.landmark.LandmarkQueryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class LandmarkQueryService {

    private final LandmarkQueryRepository landmarkQueryRepository;

    public List<FindLandmarkResponse> findLandmarks() {
        return landmarkQueryRepository.findLandmarks();
    }

    public List<FindLandmarkSongResponse> findLandmarksSongs(Long landmarkId) {
        List<FindLandmarkSongResponse> responses = landmarkQueryRepository.findLandmarkSongs(landmarkId);
        if (responses.isEmpty()) throw new BaseException(ErrorCode.NOT_FOUND_LANDMARK_SONG);
        return responses;
    }
}
