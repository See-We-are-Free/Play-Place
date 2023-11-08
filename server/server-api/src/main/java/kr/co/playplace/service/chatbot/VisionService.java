package kr.co.playplace.service.chatbot;

import com.google.cloud.spring.vision.CloudVisionTemplate;
import com.google.cloud.vision.v1.*;
import kr.co.playplace.common.exception.BaseException;
import kr.co.playplace.common.exception.ErrorCode;
import kr.co.playplace.common.util.S3Uploader;
import kr.co.playplace.common.util.SecurityUtils;
import kr.co.playplace.entity.chatbot.ChatbotMessage;
import kr.co.playplace.entity.user.Users;
import kr.co.playplace.repository.chatbot.ChatbotMessageRepository;
import kr.co.playplace.repository.user.UserRepository;
import kr.co.playplace.service.chatbot.dto.ChatbotMessageDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;


@Transactional
@Service
public class VisionService{

    @Autowired
    private CloudVisionTemplate cloudVisionTemplate;

    @Autowired
    private ResourceLoader resourceLoader;

    @Autowired
    private S3Uploader s3Uploader;

    public ChatbotMessageDto detectLabelFromImage(MultipartFile file) {

        AnnotateImageResponse response =
                cloudVisionTemplate.analyzeImage(
                        file.getResource(), Feature.Type.LABEL_DETECTION);

        List<EntityAnnotation> labels = response.getLabelAnnotationsList();

        List<String> descriptions = new ArrayList<>();
        for (EntityAnnotation label : labels) {
            descriptions.add(label.getDescription());
        }

        // s3 upload
        String url = "";
        try {
            url = s3Uploader.upload(file, "chatbot");
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        return ChatbotMessageDto.builder()
                .comment(descriptions.toString())
                .imgUrl(url)
                .build();
    }

}