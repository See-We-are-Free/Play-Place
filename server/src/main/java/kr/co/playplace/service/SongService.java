package kr.co.playplace.service;

import kr.co.playplace.controller.song.request.SaveSongRequest;
import kr.co.playplace.repository.song.SongRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class SongService {

    private final SongRepository songRepository;

    public void saveSong(SaveSongRequest saveSongRequest){

    }
}
