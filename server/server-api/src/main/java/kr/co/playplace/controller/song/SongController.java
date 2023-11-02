package kr.co.playplace.controller.song;

import kr.co.playplace.controller.song.request.LikeSongRequest;
import kr.co.playplace.controller.song.request.SavePlaySongRequest;
import kr.co.playplace.controller.song.request.SaveSongHistoryRequest;
import kr.co.playplace.controller.song.request.SaveSongRequest;
import kr.co.playplace.controller.song.response.GetLikeSongResponse;
import kr.co.playplace.controller.song.response.GetRecentSongResponse;
import kr.co.playplace.controller.song.response.SaveSongResponse;
import kr.co.playplace.service.song.SongQueryService;
import kr.co.playplace.service.song.SongService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/v1/songs")
@RequiredArgsConstructor
public class SongController {

    private final SongService songService;
    private final SongQueryService songQueryService;

    @PostMapping
    public ResponseEntity<?> saveSong(@RequestBody SaveSongRequest saveSongRequest){
        SaveSongResponse saveSongResponse = songService.saveSong(saveSongRequest);
        return ResponseEntity.ok().body(saveSongResponse);
    }

    @PostMapping("/history")
    public ResponseEntity<?> saveSongHistory(@RequestBody SaveSongHistoryRequest saveSongHistoryRequest){
        songService.saveSongHistory(saveSongHistoryRequest);
        return ResponseEntity.ok().build();
    }

    @GetMapping // 가장 최근 재생 곡
    public ResponseEntity<?> getRecentSong(){
        GetRecentSongResponse getRecentSongResponse = songQueryService.getRecentSong();
        return ResponseEntity.ok().body(getRecentSongResponse);
    }

    @PostMapping("/play") // 곡 재생(redis에 저장)
    public ResponseEntity<?> playSong(@RequestBody SavePlaySongRequest savePlaySongRequest){
        songService.playSong(savePlaySongRequest);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/like") // 곡 좋아요/좋아요 취소
    public ResponseEntity<?> likeSong(@RequestBody LikeSongRequest likeSongRequest){
        songService.likeSong(likeSongRequest);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/like/{songId}") // 곡 좋아요/좋아요 취소
    public ResponseEntity<?> getLikeSong(@PathVariable("songId") long songId){
        GetLikeSongResponse getLikeSongResponse = songService.getLikeSong(songId);
        return ResponseEntity.ok().body(getLikeSongResponse);
    }
}
