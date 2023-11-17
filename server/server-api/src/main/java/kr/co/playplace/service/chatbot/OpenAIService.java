package kr.co.playplace.service.chatbot;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import kr.co.playplace.entity.chatbot.ChatbotMessage;
import kr.co.playplace.service.chatbot.dto.ChatbotDto;
import kr.co.playplace.service.chatbot.dto.ChatbotMessageDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
@Slf4j
public class OpenAIService {
    private final RestTemplate restTemplate;
    private String openAiApiEndpoint = "https://api.openai.com/v1/chat/completions";  // 수정된 URL

    @Value("${openai.api-key}")
    private String openAiApiKey;

    public OpenAIService() {
        this.restTemplate = new RestTemplate();
    }

    public ChatbotDto getResponse(ChatbotMessageDto chatbotMessageDto) {

        String prompt = chatbotMessageDto.getComment();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", "Bearer " + openAiApiKey);

        Map<String, Object> message = new HashMap<>();
        message.put("role", "system");
        message.put("content", "이미지 라벨을 바탕으로 이미지에 대한 설명과 추천 노래를 답해주세요." +
                "응답은 다음과 같은 json 형식으로 부탁 드립니다. comment의 내용은 한글로 부탁해요 comment: 이미지의 느낌을 한줄로 설명, songs: [{title: 노래 제목, artist: 아티스트 이름}, ...]}");


        Map<String, Object> userMessage = new HashMap<>();
        userMessage.put("role", "user");
        userMessage.put("content", prompt);

        Map<String, Object> body = new HashMap<>();
        body.put("model", "gpt-3.5-turbo");
        body.put("messages", new Map[]{message, userMessage});

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);

        String response = restTemplate.postForObject(openAiApiEndpoint, entity, String.class);

        try {
            return getProcessedResponse(response);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }
    public ChatbotDto getProcessedResponse(String response) throws JsonProcessingException {
        log.info("response : {}", response);
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode rootNode = objectMapper.readTree(response);

        JsonNode choices = rootNode.path("choices");
        if (!choices.isArray() || choices.isEmpty()) {
            throw new RuntimeException("Invalid response structure");
        }

        JsonNode firstChoice = choices.get(0);
        String content = firstChoice.path("message").path("content").asText();

        // content가 JSON 객체임을 가정하고 직접 파싱합니다.
        JsonNode contentNode = objectMapper.readTree(content);
        String comment = contentNode.path("comment").asText();
        JsonNode songsNode = contentNode.path("songs");

        // songs 정보를 DTO 리스트로 변환합니다.
        List<ChatbotDto.Song> songs = objectMapper.convertValue(songsNode, new TypeReference<List<ChatbotDto.Song>>() {});

        // DTO 객체를 생성하고 반환합니다.
        ChatbotDto responseDto = new ChatbotDto();
        responseDto.setComment(comment);
        responseDto.setSongs(songs);

        return responseDto;
    }
}

