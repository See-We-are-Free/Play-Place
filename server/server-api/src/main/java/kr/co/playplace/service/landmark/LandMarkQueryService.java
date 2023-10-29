package kr.co.playplace.service.landmark;

import kr.co.playplace.common.exception.BaseException;
import kr.co.playplace.common.exception.ErrorCode;
import kr.co.playplace.controller.landmark.response.FindLandMarkResponse;
import kr.co.playplace.controller.landmark.response.FindLandMarkSongResponse;
import kr.co.playplace.repository.LandMarkQueryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class LandMarkQueryService {

    private final LandMarkQueryRepository landMarkQueryRepository;

    public List<FindLandMarkResponse> findLandMarks() {
        return landMarkQueryRepository.findLandMarks();
    }

    public List<FindLandMarkSongResponse> findLandMarksSongs(Long landMarkId) {
        List<FindLandMarkSongResponse> responses = landMarkQueryRepository.findLandMarkSongs(landMarkId);
        if (responses.isEmpty()) throw new BaseException(ErrorCode.NOT_FOUND_LANDMARK_SONG);
        return responses;
    }
}
