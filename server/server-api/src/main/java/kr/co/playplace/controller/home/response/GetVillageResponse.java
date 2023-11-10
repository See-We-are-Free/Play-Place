package kr.co.playplace.controller.home.response;

import kr.co.playplace.entity.location.Village;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@Builder
@ToString
@AllArgsConstructor
public class GetVillageResponse {

    private String villageName;
    private int villageCode;

    public static GetVillageResponse of(Village village){
        return GetVillageResponse.builder()
                .villageCode(village.getCode())
                .villageName(village.getName())
                .build();
    }

}
