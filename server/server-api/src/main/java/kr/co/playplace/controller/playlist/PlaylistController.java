package kr.co.playplace.controller.playlist;

import kr.co.playplace.controller.playlist.response.GetMyPlaylistResponse;
import kr.co.playplace.service.playlist.PlaylistQueryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/v1/playlists")
@RequiredArgsConstructor
public class PlaylistController {

    private final PlaylistQueryService playlistQueryService;

    @GetMapping
    public ResponseEntity<?> getMyPlaylist(){
        GetMyPlaylistResponse getMyPlaylistResponse = playlistQueryService.getMyPlaylist();
        return ResponseEntity.ok().body(getMyPlaylistResponse);
    }
}
