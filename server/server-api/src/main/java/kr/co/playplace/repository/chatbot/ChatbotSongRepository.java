package kr.co.playplace.repository.chatbot;

import kr.co.playplace.entity.chatbot.ChatbotSong;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChatbotSongRepository extends JpaRepository<ChatbotSong, Long> {
    List<ChatbotSong> findAllByChatbotMessage_Id(long chatbotMessageId);
}
