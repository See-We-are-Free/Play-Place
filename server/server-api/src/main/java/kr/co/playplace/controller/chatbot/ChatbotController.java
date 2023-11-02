package kr.co.playplace.controller.chatbot;


import kr.co.playplace.common.ApiResponse;
import kr.co.playplace.service.chatbot.OpenAIService;
import kr.co.playplace.service.chatbot.VisionServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/chatbots")
public class ChatbotController {
    private final VisionServiceImpl visionService;
    private final OpenAIService openAIService;

    @PostMapping
    public ApiResponse<Object> getLable(@RequestParam("img") MultipartFile img) {
        String imgLabels = visionService.detectLabelFromImage(img);
//        String result = String.valueOf(openAIService.getRecommendations(imgLabels));
        return ApiResponse.ok(imgLabels);
    }

    @PostMapping("/test")
    public ApiResponse<Object> getTEST(@RequestParam("img") String imgLabels) {
        String result = String.valueOf(openAIService.getRecommendations(imgLabels));
        return ApiResponse.ok(result);
    }
}
