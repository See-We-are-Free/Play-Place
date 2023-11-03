package kr.co.playplace.service.chatbot;

import com.google.cloud.spring.vision.CloudVisionTemplate;
import com.google.cloud.vision.v1.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;


@Transactional
@Service
public class VisionService{

    @Autowired
    private CloudVisionTemplate cloudVisionTemplate;

    @Autowired
    private ResourceLoader resourceLoader;

    public String detectLabelFromImage(MultipartFile file) {

        AnnotateImageResponse response =
                cloudVisionTemplate.analyzeImage(
                        file.getResource(), Feature.Type.LABEL_DETECTION);

        List<EntityAnnotation> labels = response.getLabelAnnotationsList();

        List<String> descriptions = new ArrayList<>();
        for (EntityAnnotation label : labels) {
            descriptions.add(label.getDescription());
        }
        return descriptions.toString();
    }

}