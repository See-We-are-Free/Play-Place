package kr.co.playplace.controller.playlist;

import kr.co.playplace.controller.playlist.response.GetMyPlaylistResponse;
import kr.co.playplace.service.playlist.PlaylistQueryService;
import kr.co.playplace.service.playlist.PlaylistService;
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
    private final PlaylistService playlistService;

    @GetMapping
    public ResponseEntity<?> getMyPlaylist(){
        GetMyPlaylistResponse getMyPlaylistResponse = playlistQueryService.getMyPlaylist();
        return ResponseEntity.ok().body(getMyPlaylistResponse);
    }

    @DeleteMapping("/{isLandmark}/{songId}")
    public ResponseEntity<?> deleteMySong(@PathVariable("isLandmark") boolean isLandmark, @PathVariable("songId") long songId){
        playlistService.deleteMySong(isLandmark, songId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/group/{groupId}")
    public ResponseEntity<?> deleteMySong(@PathVariable("groupId") long groupId){
        playlistService.deleteMyGroup(groupId);
        return ResponseEntity.ok().build();
    }
}
