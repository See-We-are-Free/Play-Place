package kr.co.playplace;

import com.fasterxml.jackson.databind.ObjectMapper;
import kr.co.playplace.common.security.filter.JwtAuthFilter;
import kr.co.playplace.common.security.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

@ActiveProfiles("test")
public abstract class ControllerTestSupport {

    @Autowired
    protected MockMvc mockMvc;

    @Autowired
    protected ObjectMapper objectMapper;

    @Autowired
    protected JwtUtil jwtUtil;

    @Autowired
    protected JwtAuthFilter jwtAuthFilter;

}
