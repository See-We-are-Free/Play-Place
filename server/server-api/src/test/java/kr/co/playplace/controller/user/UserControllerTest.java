package kr.co.playplace.controller.user;

import kr.co.playplace.RestDocsSupport;
import kr.co.playplace.controller.user.response.FindUserInfoResponse;
import kr.co.playplace.service.user.UserQueryService;
import kr.co.playplace.service.user.UserService;
import kr.co.playplace.testUser.WithMockCustomAccount;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessResponse;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.prettyPrint;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;

@ExtendWith(SpringExtension.class)
@AutoConfigureMockMvc
@SpringBootTest
class UserControllerTest extends RestDocsSupport {

    @MockBean
    private UserService userService;

    @MockBean
    private UserQueryService userQueryService;

    @Override
    protected Object initController() {
        return new UserController(userService, userQueryService);
    }

    @DisplayName("사용자 정보를 조회 할 수 있다.")
    @WithMockCustomAccount
    @Test
    void getUserInfo() throws Exception {
        //given
        FindUserInfoResponse findUserInfoResponse = FindUserInfoResponse.builder()
                .email("outh_id1")
                .nickname("nickname1")
                .profileImg(1)
                .isPush(1)
                .isShake(1)
                .build();
        //when
        given(userQueryService.findUserInfoByEmail()).willReturn(findUserInfoResponse);

        //when //then
        mockMvc.perform(
                        get("/api/v1/users")
                )
                .andDo(print())
                .andDo(document("user-search",
                        preprocessResponse(prettyPrint()),
                        responseFields(
                                fieldWithPath("code").type(JsonFieldType.NUMBER)
                                        .description("코드"),
                                fieldWithPath("status").type(JsonFieldType.STRING)
                                        .description("상태"),
                                fieldWithPath("message").type(JsonFieldType.STRING)
                                        .description("메시지"),
                                fieldWithPath("data.email").type(JsonFieldType.STRING).description("유저 이메일"),
                                fieldWithPath("data.nickname").type(JsonFieldType.STRING)
                                        .description("유저 닉네임"),
                                fieldWithPath("data.profileImg").type(JsonFieldType.NUMBER)
                                        .description("유저 프로필 남바"),
                                fieldWithPath("data.isPush").type(JsonFieldType.NUMBER)
                                        .description("푸쉬 알림 여부 "),
                                fieldWithPath("data.isShake").type(JsonFieldType.NUMBER)
                                        .description("흔들기 동의 여부")
                        )));

        //then
    }

    @DisplayName("푸쉬 여부를 변경 할 수 있다.")
    @WithMockCustomAccount
    @Test
    void changePushState() throws Exception {
        //given

        //when
        given(userService.changePushState()).willReturn(0);
        //then
        mockMvc.perform(
                        patch("/api/v1/users/push")
                )
                .andDo(print())
                .andDo(document("user-change-push",
                        preprocessResponse(prettyPrint()),
                        responseFields(
                                fieldWithPath("code").type(JsonFieldType.NUMBER)
                                        .description("코드"),
                                fieldWithPath("status").type(JsonFieldType.STRING)
                                        .description("상태"),
                                fieldWithPath("message").type(JsonFieldType.STRING)
                                        .description("메시지"),
                                fieldWithPath("data").type(JsonFieldType.NUMBER).description("푸쉬 여부(0: 동의, 1: 미동의")

                        )));
    }

    @DisplayName("흔들기 동의 여부를 변경 할 수 있다.")
    @WithMockCustomAccount
    @Test
    void changeShakeState() throws Exception {
        //given

        //when
        given(userService.changeShakeState()).willReturn(0);
        //then
        mockMvc.perform(
                        patch("/api/v1/users/shake")
                )
                .andDo(print())
                .andDo(document("user-change-shake",
                        preprocessResponse(prettyPrint()),
                        responseFields(
                                fieldWithPath("code").type(JsonFieldType.NUMBER)
                                        .description("코드"),
                                fieldWithPath("status").type(JsonFieldType.STRING)
                                        .description("상태"),
                                fieldWithPath("message").type(JsonFieldType.STRING)
                                        .description("메시지"),
                                fieldWithPath("data").type(JsonFieldType.NUMBER).description("흔들기 동의 여부(0: 동의, 1: 미동의")

                        )));
    }

    @DisplayName("프로필 이미지를 변경 할 수 있다.")
    @WithMockCustomAccount
    @Test
    void changeProfileImg() throws Exception {
        //given

        //when
        given(userService.changeProfileImg(anyInt())).willReturn(4);
        //then
        mockMvc.perform(
                        patch("/api/v1/users/{numImg}",4)
                )
                .andDo(print())
                .andDo(document("user-change-profile",
                        preprocessResponse(prettyPrint()),
                        responseFields(
                                fieldWithPath("code").type(JsonFieldType.NUMBER)
                                        .description("코드"),
                                fieldWithPath("status").type(JsonFieldType.STRING)
                                        .description("상태"),
                                fieldWithPath("message").type(JsonFieldType.STRING)
                                        .description("메시지"),
                                fieldWithPath("data").type(JsonFieldType.NUMBER).description("프로필 넘버")

                        )));
    }


}