package kr.co.playplace.service.chatbot;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.List;

@Transactional
@Slf4j
@Service
public class OpenAIService {

    private final RestTemplate restTemplate;

    @Value("${openai.api-key}")
    private String apiKey;

    public OpenAIService() {
        this.restTemplate = new RestTemplate();
    }

    public String getRecommendations(String imageLabels) {
        String userMessage = "이 이미지 라벨들을 바탕으로 : " + imageLabels + " 이미지에 대한 한줄 설명과 이미지에 어울리는 노래를 추천해주세요. " +
                "응답은 다음과 같은 형식으로 부탁드립니다: {\"comment\": \"이미지의 느낌을 설명\", \"songs\": [{\"title\": \"노래 제목\", \"artist\": \"아티스트 이름\"}, ...]}\"";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(apiKey);

        OpenAIRequest request = new OpenAIRequest("gpt-3.5-turbo", userMessage);
        HttpEntity<OpenAIRequest> entity = new HttpEntity<>(request, headers);

        ResponseEntity<OpenAIResponse> response = restTemplate.exchange(
                "https://api.openai.com/v1/chat/completions",
                HttpMethod.POST,
                entity,
                OpenAIResponse.class
        );

        log.info("이미지 라벨 :{}",imageLabels );
        log.info("응답 : {}",response);
        log.info("응답 데이터 : {}",response.getBody());

        return response.getBody() != null && response.getBody().getChoices() != null && !response.getBody().getChoices().isEmpty()
                ? response.getBody().getChoices().get(0).getContent() : null;
    }

    static class OpenAIRequest {
        private final String model;
        private final List<Message> messages;

        public OpenAIRequest(String model, String userMessage) {
            this.model = model;
            this.messages = Arrays.asList(
                    new Message("system", "You are a helpful assistant."),
                    new Message("user", userMessage)
            );
        }

        public String getModel() {
            return model;
        }

        public List<Message> getMessages() {
            return messages;
        }
    }

    static class Message {
        private final String role;
        private final String content;

        public Message(String role, String content) {
            this.role = role;
            this.content = content;
        }

        public String getRole() {
            return role;
        }

        public String getContent() {
            return content;
        }
    }

    static class OpenAIResponse {
        private List<Choice> choices;

        public OpenAIResponse() {}  // 기본 생성자 추가


        public OpenAIResponse(List<Choice> choices) {
            this.choices = choices;
        }

        public List<Choice> getChoices() {
            return choices;
        }

        public void setChoices(List<Choice> choices) { // setter 메서드 추가
            this.choices = choices;
        }
        @Override
        public String toString() {
            return "OpenAIResponse{" +
                    "choices=" + choices +
                    '}';
        }
    }

    static class Choice {
        private String content;

        public Choice() {} // 기본 생성자 추가

        public Choice(String content) {
            this.content = content;
        }

        public String getContent() {
            return content;
        }

        public void setContent(String content) { // setter 메서드 추가
            this.content = content;
        }
        @Override
        public String toString() {
            return "Choice{" +
                    "content='" + content + '\'' +
                    '}';
        }
    }
}
