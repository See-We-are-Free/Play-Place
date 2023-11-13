package kr.co.playplace.controller.chatbot;


import kr.co.playplace.common.ApiResponse;
import kr.co.playplace.controller.chatbot.response.GetRecommendHistoryResponse;
import kr.co.playplace.controller.chatbot.response.GetRecommendSongsResponse;
import kr.co.playplace.service.chatbot.ChatbotQueryService;
import kr.co.playplace.service.chatbot.ChatbotService;
import kr.co.playplace.service.chatbot.OpenAIService;
import kr.co.playplace.service.chatbot.VisionService;
import kr.co.playplace.service.chatbot.dto.ChatbotDto;
import kr.co.playplace.service.chatbot.dto.ChatbotMessageDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/chatbots")
@Slf4j
public class ChatbotController {
    private final VisionService visionService;
    private final OpenAIService openAIService;
    private final ChatbotService chatbotService;
    private final ChatbotQueryService chatbotQueryService;

    @PostMapping
    public ApiResponse<Object> recommendSongs(@ModelAttribute("img") MultipartFile img) {
        log.info("멀티파트 파일이다 임마 {}", img.toString());
        ChatbotMessageDto chatbotMessageDto = visionService.detectLabelFromImage(img);
        ChatbotDto result = openAIService.getResponse(chatbotMessageDto);
        GetRecommendSongsResponse getRecommendSongsResponse = chatbotService.getSongs(chatbotMessageDto.getImgUrl(), result);
        return ApiResponse.ok(getRecommendSongsResponse);
    }

    @GetMapping
    public ApiResponse<Object> getRecommendHistory() {
        List<GetRecommendHistoryResponse> getRecommendHistoryResponseList = chatbotQueryService.getRecommendHistory();
        return ApiResponse.ok(getRecommendHistoryResponseList);
    }
}
