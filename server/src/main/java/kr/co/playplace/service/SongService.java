package kr.co.playplace.service;

import kr.co.playplace.controller.song.request.SaveSongHistoryRequest;
import kr.co.playplace.controller.song.request.SaveSongRequest;
import kr.co.playplace.entity.song.Song;
import kr.co.playplace.repository.song.SongRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class SongService {

    private final SongRepository songRepository;
    private final S3Uploader s3Uploader;

    public void saveSong(SaveSongRequest saveSongRequest){
        boolean alreadySaved = songRepository.existsByYoutubeId(saveSongRequest.getYoutubeId());
        if(!alreadySaved){ // db에 없는 곡이라면 저장
            String imgUrl = "";
            try {
                imgUrl = s3Uploader.upload(saveSongRequest.getAlbumImg(), "album");
            } catch (IOException e) {
                throw new RuntimeException(e);
            }

            Song song = saveSongRequest.toEntity(imgUrl);
            songRepository.save(song);
        }

        // TODO: user 확인해서 곡을 재생목록에 추가
        saveSongInPlayList();
    }

    private void saveSongInPlayList(){
        // TODO: user 확인해서 곡을 재생목록에 추가
    }

    public void saveSongHistory(SaveSongHistoryRequest saveSongHistoryRequest){
        // 로그인한 사용자
        // 재생한 곡
        // 1. 위도 경도로 api 호출해서 지역 코드 받아오기
        // 2. 위도 경도로 날씨 받아오기
        // 3. 곡 기록에 저장
    }
}
