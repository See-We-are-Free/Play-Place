package kr.co.playplace.service.chatbot;

import kr.co.playplace.common.util.SecurityUtils;
import kr.co.playplace.controller.chatbot.response.GetRecommendHistoryResponse;
import kr.co.playplace.entity.chatbot.ChatbotMessage;
import kr.co.playplace.entity.chatbot.ChatbotSong;
import kr.co.playplace.entity.song.Song;
import kr.co.playplace.repository.chatbot.ChatbotMessageRepository;
import kr.co.playplace.repository.chatbot.ChatbotSongRepository;
import kr.co.playplace.repository.song.SongRepository;
import kr.co.playplace.service.chatbot.dto.SongDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ChatbotQueryService {

    private final ChatbotMessageRepository chatbotMessageRepository;
    private final ChatbotSongRepository chatbotSongRepository;
    private final SongRepository songRepository;

    public List<GetRecommendHistoryResponse> getRecommendHistory(){
        List<GetRecommendHistoryResponse> result = new ArrayList<>();

        List<ChatbotMessage> chatbotMessageList = chatbotMessageRepository.findAllByUser_Id(SecurityUtils.getUser().getUserId());
        for (ChatbotMessage chatbotMessage : chatbotMessageList){
            List<ChatbotSong> chatbotSongList = chatbotSongRepository.findAllByChatbotMessage_Id(chatbotMessage.getId());
            List<SongDto> songList = new ArrayList<>();
            for (ChatbotSong chatbotSong : chatbotSongList){
                Optional<Song> song = songRepository.findById(chatbotSong.getSong().getId());
                song.ifPresent(value -> songList.add(SongDto.of(value)));
            }
            result.add(GetRecommendHistoryResponse.of(chatbotMessage, songList));
        }

        return result;
    }
}
