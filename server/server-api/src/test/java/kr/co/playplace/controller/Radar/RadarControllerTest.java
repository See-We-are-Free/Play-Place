package kr.co.playplace.controller.Radar;

import kr.co.playplace.RestDocsSupport;
import kr.co.playplace.controller.radar.RadarController;
import kr.co.playplace.controller.radar.response.UsersNearbyResponse;
import kr.co.playplace.service.radar.RadarQueryService;
import kr.co.playplace.service.radar.RadarService;
import kr.co.playplace.service.user.UserService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.ArrayList;
import java.util.List;

@ExtendWith(SpringExtension.class)
@AutoConfigureMockMvc
@SpringBootTest
public class RadarControllerTest extends RestDocsSupport {

    @MockBean
    private RadarQueryService radarQueryService;

    @MockBean
    private RadarService radarService;

    @MockBean
    private UserService userService;

    private final String BASEURL = "/api/v1/radar";

    @Override
    protected Object initController() {
        return new RadarController(radarQueryService, radarService, userService);
    }

    @Test
    @DisplayName("주변에 있는 사용자의 최근 재생 곡을 조회할 수 있다")
    void findUsersNearby() throws Exception {

        List<UsersNearbyResponse> mockList = new ArrayList<>();
        UsersNearbyResponse response = UsersNearbyResponse.builder()
                .userId(1L)
                .nickname("jjoyra")
                .youtubeId("youtubeId")
                .title("savage")
                .artist("aespa")
                .albumImg("albumImg")
                .level(1)
                .build();

    }

}
