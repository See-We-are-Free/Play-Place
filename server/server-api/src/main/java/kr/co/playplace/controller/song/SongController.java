package kr.co.playplace.controller.song;

import kr.co.playplace.controller.song.request.SavePlaySongRequest;
import kr.co.playplace.controller.song.request.SaveSongHistoryRequest;
import kr.co.playplace.controller.song.request.SaveSongRequest;
import kr.co.playplace.controller.song.response.GetRecentSongResponse;
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
    public ResponseEntity<?> saveSong(@ModelAttribute SaveSongRequest saveSongRequest){
        songService.saveSong(saveSongRequest);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/history")
    public ResponseEntity<?> saveSongHistory(@RequestBody SaveSongHistoryRequest saveSongHistoryRequest){
        songService.saveSongHistory(saveSongHistoryRequest);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity<?> getRecentSong(){
        GetRecentSongResponse getRecentSongResponse = songQueryService.getRecentSong();
        return ResponseEntity.ok().body(getRecentSongResponse);
    }

    @PostMapping("/play")
    public ResponseEntity<?> playSong(@RequestBody SavePlaySongRequest savePlaySongRequest){
        songService.playSong(savePlaySongRequest);
        return ResponseEntity.ok().build();
    }
}
