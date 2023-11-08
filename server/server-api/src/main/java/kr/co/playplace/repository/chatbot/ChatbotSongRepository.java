package kr.co.playplace.repository.chatbot;

import kr.co.playplace.entity.chatbot.ChatbotSong;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatbotSongRepository extends JpaRepository<ChatbotSong, Long> {
}
