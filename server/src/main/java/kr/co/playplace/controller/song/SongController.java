package kr.co.playplace.controller.song;

import kr.co.playplace.controller.song.request.SaveSongRequest;
import kr.co.playplace.service.SongService;
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

    @PostMapping
    public ResponseEntity<?> saveSong(@ModelAttribute SaveSongRequest saveSongRequest){
        return ResponseEntity.ok().build();
    }
}
