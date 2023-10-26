package kr.co.playplace.common.util;

import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;
import java.nio.charset.StandardCharsets;

@Component
@Slf4j
public class Geocoder {

    @Value("${geocoder.api-key}")
    String apiKey;

    public int getGeoCode(double lat, double lon){
        StringBuilder url = new StringBuilder("https://api.vworld.kr/req/address?service=address&request=getAddress&version=2.0&type=PARCEL&zipcode=false&simple=true");
        int result = 0;
        url.append("&point="+lat+","+lon);
        url.append("&key="+apiKey);
        try{
            JSONParser jspa = new JSONParser();
            JSONObject jsob = (JSONObject) jspa.parse(new BufferedReader(new InputStreamReader(new URL(url.toString()).openStream(), StandardCharsets.UTF_8)));
            JSONObject jsrs = (JSONObject) jsob.get("response");
            JSONArray jsonArray = (JSONArray) jsrs.get("result");
            JSONObject jsonfor = (JSONObject) jsonArray.get(0);
            JSONObject jsst = (JSONObject) jsonfor.get("structure");
            String level = (String) jsst.get("level4AC");
            result = Integer.parseInt(level.substring(0, 8));
            url.setLength(0);
        } catch (IOException | ParseException e) {
            throw new RuntimeException(e);
        }
        return result;
    }

}
