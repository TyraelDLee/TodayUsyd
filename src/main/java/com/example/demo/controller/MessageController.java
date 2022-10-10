package com.example.demo.controller;

import com.example.demo.entity.Message;
import com.example.demo.utils.Result;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class MessageController {
    @MessageMapping("/message")
    @SendTo("/topic/messages")
    public Result getMessage(final Message message) throws InterruptedException {
        Thread.sleep(1000);
        return new Result(200, message.toString());

    }

}
