
package kr.co.playplace.controller.chatbot.response;

import kr.co.playplace.entity.chatbot.ChatbotMessage;
import kr.co.playplace.entity.chatbot.ChatbotSong;
import kr.co.playplace.entity.song.Song;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.util.List;

@Getter
@Builder
@ToString
@AllArgsConstructor
public class GetRecommendSongsResponse {

    private String comment;
    private List<Song> songs;

    public static GetRecommendSongsResponse of(ChatbotMessage chatbotMessage, List<Song> songList){
        return GetRecommendSongsResponse.builder()
                .comment(chatbotMessage.getComment())
                .songs(songList)
                .build();
    }
}
