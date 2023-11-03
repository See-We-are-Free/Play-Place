package kr.co.playplace.service.chatbot.dto;

import lombok.Data;

import java.util.List;

@Data
public class ChatbotDto {
    private String comment;
    private List<Song> songs;


    @Data
    public static class Song {
        private String title;
        private String artist;

        public Song() {
        }

        public Song(String title, String artist) {
            this.title = title;
            this.artist = artist;
        }
    }
}