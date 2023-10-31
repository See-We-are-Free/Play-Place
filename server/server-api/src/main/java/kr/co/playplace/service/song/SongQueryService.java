package kr.co.playplace.service.song;

import kr.co.playplace.common.exception.BaseException;
import kr.co.playplace.common.exception.ErrorCode;
import kr.co.playplace.common.util.SecurityUtils;
import kr.co.playplace.controller.song.response.GetRecentSongResponse;
import kr.co.playplace.entity.song.SongHistory;
import kr.co.playplace.entity.user.NowPlay;
import kr.co.playplace.entity.user.UserSong;
import kr.co.playplace.entity.user.Users;
import kr.co.playplace.repository.UserRepository;
import kr.co.playplace.repository.song.SongHistoryRepository;
import kr.co.playplace.repository.user.NowPlayRepository;
import kr.co.playplace.repository.user.UserSongRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class SongQueryService {

    private final UserRepository userRepository;
    private final UserSongRepository userSongRepository;
    private final NowPlayRepository nowPlayRepository;

    private final RedisTemplate redisTemplate;

    public GetRecentSongResponse getRecentSong(){
        // 로그인한 사용자
        Optional<Users> user = userRepository.findById(SecurityUtils.getUser().getUserId());

        // 재생 기록 확인 -> redis 확인 후 mysql 확인
        List<Long> playListSongIds = checkRedis(user.get());
        if(playListSongIds == null){ // mysql 확인
            Optional<NowPlay> nowPlay = nowPlayRepository.findByUser_Id(user.get().getId());
            if(nowPlay.isEmpty()){
                throw new BaseException(ErrorCode.NOT_FOUND_RECENT_SONG);
            }

            playListSongIds = new ArrayList<>();
            if(nowPlay.get().getUserSong() != null){
                playListSongIds.add(nowPlay.get().getUserSong().getId());
                playListSongIds.add(1L);
            }else if(nowPlay.get().getUserLandmarkSong() != null){
                playListSongIds.add(nowPlay.get().getUserLandmarkSong().getId());
                playListSongIds.add(0L);
            }
        }

        if(playListSongIds.get(1) == 0L){
            // TODO: landmark
        }else{
            // song
            Optional<UserSong> userSong = userSongRepository.findById(playListSongIds.get(0));
            return GetRecentSongResponse.of(userSong.get().getSong(), playListSongIds.get(0), false);
        }

        return null;
    }

    private List<Long> checkRedis(Users user){
        Set<String> changeUserKeys = redisTemplate.keys("play:*");
        if (changeUserKeys.isEmpty()) return null;

        for (String key : changeUserKeys) {
            long userId = Long.parseLong(key.split(":")[1]);
            if(userId == user.getId()){
                return getRecentSongInRedis(user);
            }
        }

        return null;
    }

    private List<Long> getRecentSongInRedis(Users user){
        List<Long> result = new ArrayList<>();

        Set<Object> companyIdsObjects = redisTemplate.opsForHash().keys("play:" + user.getId());
        Set<Long> playlistSongIds = companyIdsObjects.stream()
                .map(objectId -> (Long) objectId)
                .collect(Collectors.toSet());
        Long playListSongId = playlistSongIds.iterator().next();
        result.add(playListSongId);

        Object check = redisTemplate.opsForHash().get("play:" + user.getId(), playListSongId);
        if (check == null) return null;

        if (check.equals("true")) {
            result.add(0L);
        } else {
            result.add(1L);
        }
        return result;
    }
}
