package kr.co.playplace.common.util;

import kr.co.playplace.controller.song.response.SearchSongResponse;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.text.StringEscapeUtils;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

@Component
@Slf4j
public class GetSongInYoutube {

    @Value("${youtube.api-key}")
    String apiKey;

    public List<SearchSongResponse> searchSongsInYoutube(String keyword){
        StringBuilder url = new StringBuilder("https://www.googleapis.com/youtube/v3/search?part=id,snippet&type=video&videoCategoryId=10&maxResults=25");
        url.append("&key="+apiKey);
        try { // url에 공백 넣으려면 encoding 필요
            String encodedKeyword = URLEncoder.encode(keyword + " topic auto-generated", "UTF-8");
            url.append("&q=" + encodedKeyword);
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace(); // 예외 처리 필요
        }

        List<SearchSongResponse> result = new ArrayList<>();
        try{
            JSONParser jspa = new JSONParser();
            JSONObject jsob = (JSONObject) jspa.parse(new BufferedReader(new InputStreamReader(new URL(url.toString()).openStream(), StandardCharsets.UTF_8)));
            JSONArray jsonArray = (JSONArray) jsob.get("items");
            for (Object object : jsonArray){
                JSONObject jsonObject = (JSONObject) object;
                // id -> youtubeId
                JSONObject id = (JSONObject) jsonObject.get("id");
                String youtubeId = (String) id.get("videoId");
                // snippet -> title, artist, albumImg
                JSONObject snippet = (JSONObject) jsonObject.get("snippet");
                String inputTitle = (String) snippet.get("title");
                String title = StringEscapeUtils.unescapeHtml4(inputTitle);
                String artist = (String) snippet.get("channelTitle");
                if(artist.contains("Topic")) {
                    artist = artist.substring(0, artist.length()-8);
                }
                log.info(artist);
                JSONObject thumbnails = (JSONObject) snippet.get("thumbnails");
                JSONObject high = (JSONObject) thumbnails.get("high");
                String albumImg = (String) high.get("url");
                // dto add
                result.add(SearchSongResponse.builder()
                                .youtubeId(youtubeId)
                                .title(title)
                                .albumImg(albumImg)
                                .artist(artist)
                                .build());
            }
            url.setLength(0);
        } catch (IOException | ParseException e) {
            throw new RuntimeException(e);
        }
        return result;
    }

    public SearchSongResponse searchSongInYoutube(String keyword){
        StringBuilder url = new StringBuilder("https://www.googleapis.com/youtube/v3/search?part=id,snippet&type=video&videoCategoryId=10");
        url.append("&key="+apiKey);
        try { // url에 공백 넣으려면 encoding 필요
            String encodedKeyword = URLEncoder.encode(keyword + " topic auto-generated", "UTF-8");
            url.append("&q=" + encodedKeyword);
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace(); // 예외 처리 필요
        }

        try{
            JSONParser jspa = new JSONParser();
            JSONObject jsob = (JSONObject) jspa.parse(new BufferedReader(new InputStreamReader(new URL(url.toString()).openStream(), StandardCharsets.UTF_8)));
            JSONArray jsonArray = (JSONArray) jsob.get("items");
            for (Object object : jsonArray){
                JSONObject jsonObject = (JSONObject) object;
                // id -> youtubeId
                JSONObject id = (JSONObject) jsonObject.get("id");
                String youtubeId = (String) id.get("videoId");
                // snippet -> title, artist, albumImg
                JSONObject snippet = (JSONObject) jsonObject.get("snippet");
                String inputTitle = (String) snippet.get("title");
                String title = StringEscapeUtils.unescapeHtml4(inputTitle);
                String artist = (String) snippet.get("channelTitle");
                artist = artist.substring(0, artist.length()-8);
                log.info(artist);
                JSONObject thumbnails = (JSONObject) snippet.get("thumbnails");
                JSONObject high = (JSONObject) thumbnails.get("high");
                String albumImg = (String) high.get("url");

                return SearchSongResponse.builder()
                        .youtubeId(youtubeId)
                        .title(title)
                        .albumImg(albumImg)
                        .artist(artist)
                        .build();
            }
            url.setLength(0);
        } catch (IOException | ParseException e) {
            throw new RuntimeException(e);
        }
        return null;
    }

}
