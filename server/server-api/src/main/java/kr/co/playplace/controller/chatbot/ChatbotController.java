package kr.co.playplace.controller.chatbot;


import kr.co.playplace.common.ApiResponse;
import kr.co.playplace.controller.chatbot.response.GetRecommendSongsResponse;
import kr.co.playplace.entity.chatbot.ChatbotMessage;
import kr.co.playplace.service.chatbot.ChatbotService;
import kr.co.playplace.service.chatbot.OpenAIService;
import kr.co.playplace.service.chatbot.VisionService;
import kr.co.playplace.service.chatbot.dto.ChatbotDto;
import kr.co.playplace.service.chatbot.dto.ChatbotMessageDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/chatbots")
public class ChatbotController {
    private final VisionService visionService;
    private final OpenAIService openAIService;
    private final ChatbotService chatbotService;

    @PostMapping
    public ApiResponse<Object> recommendSongs(@RequestParam("img") MultipartFile img) {
        ChatbotMessageDto chatbotMessageDto = visionService.detectLabelFromImage(img);
        ChatbotDto result = openAIService.getResponse(chatbotMessageDto);
        GetRecommendSongsResponse getRecommendSongsResponse = chatbotService.getSongs(chatbotMessageDto.getImgUrl(), result);
        return ApiResponse.ok(getRecommendSongsResponse);
    }

//    @PostMapping("/test")
//    public ApiResponse<Object> getTEST(@RequestParam("img") String imgLabels) {
//        String result = String.valueOf(openAIService.getResponse(imgLabels));
//        return ApiResponse.ok(result);
//    }
}
