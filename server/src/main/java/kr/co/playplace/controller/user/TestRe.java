package kr.co.playplace.controller.user;

import lombok.Builder;
import lombok.Data;

@Data
public class TestRe {
    String email;

    @Builder
    public TestRe(String email) {
        this.email = email;
    }
}
