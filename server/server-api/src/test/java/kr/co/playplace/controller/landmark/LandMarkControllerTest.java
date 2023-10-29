package kr.co.playplace.controller.landmark;

import kr.co.playplace.ControllerTestSupport;
import kr.co.playplace.controller.landmark.response.FindLandMarkResponse;
import kr.co.playplace.controller.landmark.response.FindLandMarkSongResponse;
import kr.co.playplace.service.landmark.LandMarkQueryService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit.jupiter.SpringExtension;


import java.util.List;

import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(SpringExtension.class)
@AutoConfigureMockMvc
@SpringBootTest
class LandMarkControllerTest extends ControllerTestSupport {

    @MockBean
    private LandMarkQueryService landMarkQueryService;

    @DisplayName("사용자는 전체 랜드마크를 조회 할 수 있다")
    @Test
    void findLandMarks() throws Exception {
        //given
        FindLandMarkResponse response1 = FindLandMarkResponse.builder()
                .title("해운대")
                .latitude(37.566535)
                .langitude(126.977969)
                .representativeImg("이야 바다다")
                .build();
        FindLandMarkResponse response2 = FindLandMarkResponse.builder()
                .title("남산")
                .latitude(37.566535)
                .langitude(126.977969)
                .representativeImg("이야 산이다")
                .build();

        List<FindLandMarkResponse> responses = List.of(response1, response2);

        given(landMarkQueryService.findLandMarks()).willReturn(responses);

        //when //then
        mockMvc.perform(
                        get("/api/v1/landmarks")
                )
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.code").value("200"))
                .andExpect(jsonPath("$.status").value("OK"))
                .andExpect(jsonPath("$.message").value("SUCCESS"))
                .andExpect(jsonPath("$.data").isArray());
    }

    @DisplayName("사용자는 랜드마크의 곡들을 조회 할 수 있다.")
    @Test
    void findLandMarkSongs() throws Exception {
        //given
        FindLandMarkSongResponse response1 = FindLandMarkSongResponse.builder()
                .title("부산 바캉스")
                .artist("하하")
                .albumImg("이미지url")
                .playTime("04:00")
                .build();

        FindLandMarkSongResponse response2 = FindLandMarkSongResponse.builder()
                .title("후라이의 꿈")
                .artist("AKMU")
                .albumImg("이미지url")
                .playTime("03:34")
                .build();

        List<FindLandMarkSongResponse> responses = List.of(response1, response2);

        //when
        given(landMarkQueryService.findLandMarksSongs(anyLong())).willReturn(responses);

        //when //then
        mockMvc.perform(
                        get("/api/v1/landmarks/{landMarkId}",1L)
                )
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.code").value("200"))
                .andExpect(jsonPath("$.status").value("OK"))
                .andExpect(jsonPath("$.message").value("SUCCESS"))
                .andExpect(jsonPath("$.data").isArray());
    }

}

