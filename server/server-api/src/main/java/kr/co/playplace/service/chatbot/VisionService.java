package kr.co.playplace.service.chatbot;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface VisionService {

    String extractTextFromImage(MultipartFile file);

    String getLandmarkFromImage(MultipartFile file);

    String detectLabelFromImage(MultipartFile file);


    byte[] detectFaceFromImage(MultipartFile file) throws IOException;

}