package kr.co.playplace.service.chatbot;

import kr.co.playplace.common.exception.BaseException;
import kr.co.playplace.common.exception.ErrorCode;
import kr.co.playplace.common.util.GetSongInYoutube;
import kr.co.playplace.common.util.SecurityUtils;
import kr.co.playplace.controller.chatbot.response.GetRecommendSongsResponse;
import kr.co.playplace.controller.song.response.SearchSongResponse;
import kr.co.playplace.entity.chatbot.ChatbotMessage;
import kr.co.playplace.entity.chatbot.ChatbotSong;
import kr.co.playplace.entity.song.Song;
import kr.co.playplace.entity.user.Users;
import kr.co.playplace.repository.chatbot.ChatbotMessageRepository;
import kr.co.playplace.repository.chatbot.ChatbotSongRepository;
import kr.co.playplace.repository.song.SongRepository;
import kr.co.playplace.repository.user.UserRepository;
import kr.co.playplace.service.chatbot.dto.ChatbotDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class ChatbotService {

    private final UserRepository userRepository;
    private final ChatbotMessageRepository chatbotMessageRepository;
    private final ChatbotSongRepository chatbotSongRepository;
    private final SongRepository songRepository;

    private final GetSongInYoutube getSongInYoutube;

    public GetRecommendSongsResponse getSongs(String imgUrl, ChatbotDto chatbotDto){
        // ChatbotMessage 저장
        ChatbotMessage chatbotMessage = saveChatbotMessage(imgUrl, chatbotDto.getComment());

        List<Song> songList = new ArrayList<>();
        for (ChatbotDto.Song song : chatbotDto.getSongs()){ // title, artist 만 있는 song class(entity아님!!)
            // 유튜브 검색 -> db확인
            SearchSongResponse searchSongResponse = getSongInYoutube.searchSongInYoutube(song.getTitle()+" "+song.getArtist());
            if (searchSongResponse == null) continue;

            if(songRepository.existsByYoutubeId(searchSongResponse.getYoutubeId())){ // 있으면 찾아오고
                Optional<Song> entity = songRepository.findByYoutubeId(searchSongResponse.getYoutubeId());
                entity.ifPresent(songList::add);
            }else{ // 없으면 저장하고
                Song entity = searchSongResponse.toEntity();
                songRepository.save(entity);
                songList.add(entity);
            }
        }

        // ChatbotSong 저장
        saveChatbotSong(chatbotMessage, songList);

        return GetRecommendSongsResponse.of(chatbotMessage, songList);
    }

    private ChatbotMessage saveChatbotMessage(String imgUrl, String comment){
        Users user = userRepository.findById(SecurityUtils.getUser().getUserId()).orElseThrow(() -> new BaseException(ErrorCode.NOT_FOUND_USER));
        ChatbotMessage chatbotMessage = ChatbotMessage.builder()
                .user(user)
                .comment(comment)
                .imgUrl(imgUrl)
                .build();
        chatbotMessageRepository.save(chatbotMessage);
        return chatbotMessage;
    }

    private void saveChatbotSong(ChatbotMessage chatbotMessage, List<Song> songList){
        for (Song song : songList){
            ChatbotSong chatbotSong = ChatbotSong.builder()
                    .chatbotMessage(chatbotMessage)
                    .song(song)
                    .build();
            chatbotSongRepository.save(chatbotSong);
        }
    }
}
