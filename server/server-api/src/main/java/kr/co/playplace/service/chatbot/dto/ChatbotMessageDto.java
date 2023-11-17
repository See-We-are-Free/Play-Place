package kr.co.playplace.service.chatbot.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ChatbotMessageDto {
    private String comment;
    private String imgUrl;
}