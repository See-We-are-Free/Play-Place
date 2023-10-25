package kr.co.playplace.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RequestMapping("/api/test")
@RestController
public class TestController {

    @GetMapping
    public String test() {
        log.info("testsetsetsetsetsetsetsetset");
        System.out.println("test");
        return "teststeest";
    }
}
