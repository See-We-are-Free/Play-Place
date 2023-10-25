package kr.co.playplace.common.util;

import kr.co.playplace.entity.location.State;
import lombok.*;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class StateDto {
    private int code;
    private String name;

    public State toEntity(){
        return State.builder()
                .code(code)
                .name(name)
                .build();
    }
}
