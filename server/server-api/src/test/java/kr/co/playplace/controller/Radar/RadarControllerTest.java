package kr.co.playplace.controller.Radar;

import kr.co.playplace.RestDocsSupport;
import kr.co.playplace.service.radar.RadarService;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit.jupiter.SpringExtension;

@ExtendWith(SpringExtension.class)
@AutoConfigureMockMvc
@SpringBootTest
public class RadarControllerTest extends RestDocsSupport {

    @MockBean
    RadarService radarService;

    @Override
    protected Object initController() {
        return null;
    }

}
