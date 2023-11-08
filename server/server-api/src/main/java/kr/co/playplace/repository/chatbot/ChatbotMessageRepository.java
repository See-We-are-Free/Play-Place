package kr.co.playplace.repository.chatbot;

import kr.co.playplace.entity.chatbot.ChatbotMessage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatbotMessageRepository extends JpaRepository<ChatbotMessage, Long> {
}
