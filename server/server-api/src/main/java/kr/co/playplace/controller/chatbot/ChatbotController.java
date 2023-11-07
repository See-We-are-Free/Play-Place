//package kr.co.playplace.controller.chatbot;
//
//
//import kr.co.playplace.common.ApiResponse;
//import kr.co.playplace.service.chatbot.OpenAIService;
//import kr.co.playplace.service.chatbot.VisionService;
//import kr.co.playplace.service.chatbot.dto.ChatbotDto;
//import lombok.RequiredArgsConstructor;
//import org.springframework.web.bind.annotation.*;
//import org.springframework.web.multipart.MultipartFile;
//
//@RequiredArgsConstructor
//@RestController
//@RequestMapping("/api/v1/chatbots")
//public class ChatbotController {
//    private final VisionService visionService;
//    private final OpenAIService openAIService;
//
//    @PostMapping
//    public ApiResponse<Object> getLable(@RequestParam("img") MultipartFile img) {
//        String imgLabels = visionService.detectLabelFromImage(img);
//        ChatbotDto result = openAIService.getResponse(imgLabels);
//        return ApiResponse.ok(result);
//    }
//
//    @PostMapping("/test")
//    public ApiResponse<Object> getTEST(@RequestParam("img") String imgLabels) {
//        String result = String.valueOf(openAIService.getResponse(imgLabels));
//        return ApiResponse.ok(result);
//    }
//}
