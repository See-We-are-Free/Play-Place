package kr.co.playplace.entity.chatbot;

import kr.co.playplace.entity.TimeBaseEntity;
import kr.co.playplace.entity.user.Users;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class ChatbotMessage extends TimeBaseEntity {
    @Id
    @GeneratedValue
    @Column(name = "chatbot_message_id")
    Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    Users user;
}
