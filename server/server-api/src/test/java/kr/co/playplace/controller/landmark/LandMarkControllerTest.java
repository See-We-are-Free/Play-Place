package kr.co.playplace.controller.landmark;

import kr.co.playplace.RestDocsSupport;
import kr.co.playplace.controller.GenerateMockToken;
import kr.co.playplace.controller.landmark.requset.SaveLandMarkSongRequest;
import kr.co.playplace.controller.landmark.response.FindLandMarkResponse;
import kr.co.playplace.controller.landmark.response.FindLandMarkSongResponse;
import kr.co.playplace.service.landmark.LandMarkQueryService;
import kr.co.playplace.service.landmark.LandMarkService;
import kr.co.playplace.testUser.WithMockCustomAccount;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.List;

import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessResponse;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.prettyPrint;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;

@ExtendWith(SpringExtension.class)
@AutoConfigureMockMvc
@SpringBootTest
class LandMarkControllerTest extends RestDocsSupport {

    @MockBean
    private LandMarkQueryService landMarkQueryService;

    @MockBean
    private LandMarkService landMarkService;

    @Override
    protected Object initController() {
        return new LandMarkController(landMarkQueryService, landMarkService);
    }

    @DisplayName("사용자는 전체 랜드마크를 조회 할 수 있다")
    @WithMockCustomAccount
    @Test
    void findLandMarks() throws Exception {
        //given
        FindLandMarkResponse response1 = FindLandMarkResponse.builder()
                .landMarkId(1L)
                .title("해운대")
                .latitude(37.566535)
                .longitude(126.977969)
                .representativeImg("이야 바다다")
                .build();
        FindLandMarkResponse response2 = FindLandMarkResponse.builder()
                .landMarkId(2L)
                .title("남산")
                .latitude(37.566535)
                .longitude(126.977969)
                .representativeImg("이야 산이다")
                .build();

        List<FindLandMarkResponse> responses = List.of(response1, response2);

        given(landMarkQueryService.findLandMarks()).willReturn(responses);

        //when //then
        mockMvc.perform(
                        get("/api/v1/landmarks")
                )
                .andDo(print())
                .andDo(document("landmark-search",
                        preprocessResponse(prettyPrint()),
                        responseFields(
                                fieldWithPath("code").type(JsonFieldType.NUMBER)
                                        .description("코드"),
                                fieldWithPath("status").type(JsonFieldType.STRING)
                                        .description("상태"),
                                fieldWithPath("message").type(JsonFieldType.STRING)
                                        .description("메시지"),
                                fieldWithPath("data").type(JsonFieldType.ARRAY)
                                        .description("랜드마크 데이터"),
                                fieldWithPath("data[].landMarkId").type(JsonFieldType.NUMBER).description("랜드마크 ID"),
                                fieldWithPath("data[].title").type(JsonFieldType.STRING)
                                        .description("랜드마크 타이틀"),
                                fieldWithPath("data[].latitude").type(JsonFieldType.NUMBER)
                                        .description("위도"),
                                fieldWithPath("data[].longitude").type(JsonFieldType.NUMBER)
                                        .description("경도"),
                                fieldWithPath("data[].representativeImg").type(JsonFieldType.STRING)
                                        .description("썸네일")
                        )));
    }

    @DisplayName("사용자는 랜드마크의 곡들을 조회 할 수 있다.")
    @WithMockCustomAccount
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
                        get("/api/v1/landmarks/{landMarkId}", 1L)
                )
                .andDo(print())
                .andDo(document("landmark-song-search",
                        preprocessResponse(prettyPrint()),
                        responseFields(
                                fieldWithPath("code").type(JsonFieldType.NUMBER)
                                        .description("코드"),
                                fieldWithPath("status").type(JsonFieldType.STRING)
                                        .description("상태"),
                                fieldWithPath("message").type(JsonFieldType.STRING)
                                        .description("메시지"),
                                fieldWithPath("data").type(JsonFieldType.ARRAY)
                                        .description("랜드마크 데이터"),
                                fieldWithPath("data[].title").type(JsonFieldType.STRING)
                                        .description("곡"),
                                fieldWithPath("data[].artist").type(JsonFieldType.STRING)
                                        .description("아티스트"),
                                fieldWithPath("data[].albumImg").type(JsonFieldType.STRING)
                                        .description("앨범 이미지"),
                                fieldWithPath("data[].playTime").type(JsonFieldType.STRING)
                                        .description("재생 시간")
                        )));
    }

    @DisplayName("사용자는 랜드마크의 공유 재생목록에 노래를 추가 할 수 있다.")
    @WithMockCustomAccount
    @Test
    void saveLandMarkSong() throws Exception {
        //given
        SaveLandMarkSongRequest request = SaveLandMarkSongRequest.builder()
                .landMarkId(3L)
                .youtubeId("youtudeId")
                .albumImg("img")
                .artist("hong")
                .playTime("04:00")
                .title("test")
                .build();

        //when
        mockMvc.perform(
                        post("/api/v1/landmarks")
                                .headers(GenerateMockToken.getToken())
                                .content(objectMapper.writeValueAsString(request))
                                .contentType(MediaType.APPLICATION_JSON)
                )
                .andDo(print())
                .andDo(document("landmark-song-save",
                        preprocessResponse(prettyPrint()),
                        requestFields(
                                fieldWithPath("landMarkId").type(JsonFieldType.NUMBER)
                                        .description("랜드마크 아이디"),
                                fieldWithPath("youtubeId").type(JsonFieldType.STRING)
                                        .description("유튜브 아이디"),
                                fieldWithPath("albumImg").type(JsonFieldType.STRING)
                                        .description("앨범 이미지"),
                                fieldWithPath("artist").type(JsonFieldType.STRING)
                                        .description("아티스트"),
                                fieldWithPath("playTime").type(JsonFieldType.STRING)
                                        .description("재생시간"),
                                fieldWithPath("title").type(JsonFieldType.STRING)
                                        .description("곡")
                        ),
                        responseFields(
                                fieldWithPath("code").type(JsonFieldType.NUMBER)
                                        .description("코드"),
                                fieldWithPath("status").type(JsonFieldType.STRING)
                                        .description("상태"),
                                fieldWithPath("message").type(JsonFieldType.STRING)
                                        .description("메시지"),
                                fieldWithPath("data").type(JsonFieldType.NULL)
                                        .description("응답 데이터")

                        )));

    }

}

