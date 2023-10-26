package kr.co.playplace.common.util;

import kr.co.playplace.entity.Weather;
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
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Component
@Slf4j
public class GetWeather {

    @Value("${weather.service-key}")
    String serviceKey;

    public Weather getWeatherCode(double lat, double lon){
        StringBuilder url = new StringBuilder("http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst?pageNo=1&numOfRows=19&dataType=JSON");
        url.append("&serviceKey="+serviceKey);

        /**
         * base_time
         * -> 현재시간에서 1시간 빼준 뒤에 보내기
         * ex. 현재시각 12:42이면 11:42로 요청 -> 11:30에 발표한 12:00 데이터 사용하면 됨(첫번째 데이터임)
         * ex. 현재시각 12:22면 11:22로 요청 -> 11:30에 발표한 12:00 데이터 사용하면 됨(첫번째 데이터임)
         */
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime base = now.minusHours(1);
        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyyMMdd");
        DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("HHmm");
        url.append("&base_date="+base.format(dateFormatter));
        url.append("&base_time="+base.format(timeFormatter));

        LatXLngY converted = convertGRID_GPS("TO_GRID", lat, lon);
        url.append("&nx="+(int)converted.x);
        url.append("&ny="+(int)converted.y);

        Weather result = Weather.SUN;
        String ptyCode = "0";
        String skyCode = "0";
        try{
            JSONParser jspa = new JSONParser();
            JSONObject jsob = (JSONObject) jspa.parse(new BufferedReader(new InputStreamReader(new URL(url.toString()).openStream(), StandardCharsets.UTF_8)));
            JSONObject response = (JSONObject) jsob.get("response");
            JSONObject body = (JSONObject) response.get("body");
            JSONObject items = (JSONObject) body.get("items");
            JSONArray item = (JSONArray) items.get("item");
            JSONObject pty = (JSONObject) item.get(6); // PTY
            JSONObject sky = (JSONObject) item.get(18); // SKY
            ptyCode = (String) pty.get("fcstValue");
            skyCode = (String) sky.get("fcstValue");
            url.setLength(0);
        } catch (IOException | ParseException e) {
            throw new RuntimeException(e);
        }

        /**
         * 하늘상태(SKY) 코드 : 맑음(1), 구름많음(3), 흐림(4)
         * 강수형태(PTY) 코드 : (초단기) 없음(0), 비(1), 비/눈(2), 눈(3), 빗방울(5), 빗방울눈날림(6), 눈날림(7)
         */
        if(ptyCode.equals("0")){ // ptyCode == 0 -> sky로 weather 추가함
            if(skyCode.equals("1")) result = Weather.SUN;
            else result = Weather.CLOUD;
        }else if(ptyCode.equals("1") || ptyCode.equals("5")){
            result = Weather.RAIN;
        }else{
            result = Weather.SNOW;
        }

        return result;
    }

    /**
     *  LCC DFS 좌표변환
     *  param: mode
     * "TO_GRID"(위경도->좌표, lat_X:위도, lng_Y:경도)
     * "TO_GPS"(좌표->위경도,  lat_X:x, lng_Y:y)
    */
    private LatXLngY convertGRID_GPS(String mode, double lng_Y, double lat_X)
    {
        double RE = 6371.00877; // 지구 반경(km)
        double GRID = 5.0; // 격자 간격(km)
        double SLAT1 = 30.0; // 투영 위도1(degree)
        double SLAT2 = 60.0; // 투영 위도2(degree)
        double OLON = 126.0; // 기준점 경도(degree)
        double OLAT = 38.0; // 기준점 위도(degree)
        double XO = 43; // 기준점 X좌표(GRID)
        double YO = 136; // 기1준점 Y좌표(GRID)

        double DEGRAD = Math.PI / 180.0;
        double RADDEG = 180.0 / Math.PI;

        double re = RE / GRID;
        double slat1 = SLAT1 * DEGRAD;
        double slat2 = SLAT2 * DEGRAD;
        double olon = OLON * DEGRAD;
        double olat = OLAT * DEGRAD;

        double sn = Math.tan(Math.PI * 0.25 + slat2 * 0.5) / Math.tan(Math.PI * 0.25 + slat1 * 0.5);
        sn = Math.log(Math.cos(slat1) / Math.cos(slat2)) / Math.log(sn);
        double sf = Math.tan(Math.PI * 0.25 + slat1 * 0.5);
        sf = Math.pow(sf, sn) * Math.cos(slat1) / sn;
        double ro = Math.tan(Math.PI * 0.25 + olat * 0.5);
        ro = re * sf / Math.pow(ro, sn);
        LatXLngY rs = new LatXLngY();

        if (mode.equals("TO_GRID")) {
            rs.lat = lat_X;
            rs.lng = lng_Y;
            double ra = Math.tan(Math.PI * 0.25 + (lat_X) * DEGRAD * 0.5);
            ra = re * sf / Math.pow(ra, sn);
            double theta = lng_Y * DEGRAD - olon;
            if (theta > Math.PI) theta -= 2.0 * Math.PI;
            if (theta < -Math.PI) theta += 2.0 * Math.PI;
            theta *= sn;
            rs.x = Math.floor(ra * Math.sin(theta) + XO + 0.5);
            rs.y = Math.floor(ro - ra * Math.cos(theta) + YO + 0.5);
        }
        else {
            rs.x = lat_X;
            rs.y = lng_Y;
            double xn = lat_X - XO;
            double yn = ro - lng_Y + YO;
            double ra = Math.sqrt(xn * xn + yn * yn);
            if (sn < 0.0) {
                ra = -ra;
            }
            double alat = Math.pow((re * sf / ra), (1.0 / sn));
            alat = 2.0 * Math.atan(alat) - Math.PI * 0.5;

            double theta = 0.0;
            if (Math.abs(xn) <= 0.0) {
                theta = 0.0;
            }
            else {
                if (Math.abs(yn) <= 0.0) {
                    theta = Math.PI * 0.5;
                    if (xn < 0.0) {
                        theta = -theta;
                    }
                }
                else theta = Math.atan2(xn, yn);
            }
            double alon = theta / sn + olon;
            rs.lat = alat * RADDEG;
            rs.lng = alon * RADDEG;
        }
        return rs;
    }



    class LatXLngY
    {
        public double lat;
        public double lng;

        public double x;
        public double y;

    }

}
