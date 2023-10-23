package kr.co.playplace.server.entity.chatbot;

import kr.co.playplace.server.entity.song.Song;
import kr.co.playplace.server.entity.TimeBaseEntity;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class ChatbotSong extends TimeBaseEntity {
    @Id
    @GeneratedValue
    @Column(name = "chatbot_song_id")
    Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "chaybot_message_id")
    ChatbotMessage chatbotMessage;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "youtube_id")
    Song song;
}
