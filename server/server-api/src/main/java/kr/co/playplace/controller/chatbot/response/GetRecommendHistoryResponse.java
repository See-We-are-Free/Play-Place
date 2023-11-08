
package kr.co.playplace.controller.chatbot.response;

import kr.co.playplace.entity.chatbot.ChatbotMessage;
import kr.co.playplace.service.chatbot.dto.SongDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.util.List;

@Getter
@Builder
@ToString
@AllArgsConstructor
public class GetRecommendHistoryResponse {

    private String imgUrl;
    private String comment;
    private List<SongDto> songs;

    public static GetRecommendHistoryResponse of(ChatbotMessage chatbotMessage, List<SongDto> songList){
        return GetRecommendHistoryResponse.builder()
                .imgUrl(chatbotMessage.getImgUrl())
                .comment(chatbotMessage.getComment())
                .songs(songList)
                .build();
    }
}
