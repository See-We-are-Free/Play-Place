package kr.co.playplace.controller.radar;

import kr.co.playplace.service.radar.dto.UserLocation;
import org.apache.catalina.User;
import org.junit.Before;
import org.junit.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Bean;
import org.springframework.messaging.converter.MappingJackson2MessageConverter;
import org.springframework.messaging.simp.stomp.*;
import org.springframework.web.socket.WebSocketHttpHeaders;
import org.springframework.web.socket.client.standard.StandardWebSocketClient;
import org.springframework.web.socket.messaging.WebSocketStompClient;
import org.springframework.web.socket.sockjs.client.SockJsClient;
import org.springframework.web.socket.sockjs.client.WebSocketTransport;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.BlockingDeque;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.LinkedBlockingDeque;
import java.util.concurrent.TimeUnit;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class UserLocationTest {

    static final String WEBSOCKET_URI = "ws://localhost:8080/ws";
    static final String WEBSOCKET_SEND_URI = "/pub/location";
    static final String WEBSOCKET_USER_URI = "/user/queue/location";
    int numberOfConnections = 500;

    // 다른 스레드에서 수행되는 작업이 완료될 때까지 대기
    CountDownLatch lock = new CountDownLatch(numberOfConnections);

    BlockingDeque<UserLocation> blockingDeque;
    List<StompSession> socketSessions;
    WebSocketStompClient stompClient;

    private WebSocketStompClient createClients() {
        WebSocketStompClient stompClient = new WebSocketStompClient(
                new SockJsClient(List.of(
                        new WebSocketTransport(
                                new StandardWebSocketClient()
                        )
                )
                )
        );
        return stompClient;
    }

    @Before
    public void setup() throws InterruptedException {
        blockingDeque = new LinkedBlockingDeque<>();
        stompClient = createClients();
        stompClient.setMessageConverter(new MappingJackson2MessageConverter());

        socketSessions = new ArrayList<>(500);
    }

    @Test
    public void contextLoads() throws InterruptedException {
        StompSession stompSession = null;

        for (int i = 0; i < numberOfConnections; i++) {
            TimeUnit.SECONDS.sleep(1);

            try {
                // handShake custom header 추가 시 아래 connect 메서드로 설정
                WebSocketHttpHeaders handShakeHeaders = new WebSocketHttpHeaders();
                handShakeHeaders.add("Authorization", "jkjdljldjldj");

                // webSocket 연결 후 메세지 전송 때마다 체크할 stompHeader를 추가하려면
                StompHeaders stompHeaders = new StompHeaders();
                stompHeaders.add("user", "fsfsdf");

                stompSession = stompClient.connect(WEBSOCKET_URI,
                        handShakeHeaders,
                        stompHeaders,
                        new StompSessionHandlerAdapter() {
                        }).get(1, TimeUnit.SECONDS);

                socketSessions.add(stompSession);
            } catch (Exception e) {
                e.printStackTrace();
            }

        }

        for (int i = 0; i < socketSessions.size(); i++) {
            Thread t = new Thread(new SendTest(i));
            t.start();
        }

        lock.await();
    }

    class DefaultStompFrameHandler implements StompFrameHandler {
        @Override
        public Type getPayloadType(StompHeaders headers) {
            return UserLocation.class;
        }

        @Override
        public void handleFrame(StompHeaders headers, Object payload) {
             blockingDeque.offer((UserLocation) payload);
        }
    }

    class SendTest implements Runnable {
        int index;

        SendTest(int i) {
            this.index = 1;
        }

        @Override
        public void run() {
            System.out.println("run: " + index);

            String data = "{\n" +
                    "\t\"latitude\" : 35.191378,\n" +
                    "\t\"longitude\" : 126.823162\n" +
                    "}";

            while (true) {
                socketSessions.get(index).send(WEBSOCKET_SEND_URI, data);
                try {
                    TimeUnit.SECONDS.sleep(10);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        }
    }
}
