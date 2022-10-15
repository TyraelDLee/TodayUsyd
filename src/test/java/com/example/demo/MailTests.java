package com.example.demo;
import com.example.demo.utils.MailUtil;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;

import javax.mail.MessagingException;


@RunWith(SpringRunner.class)
@SpringBootTest
@ContextConfiguration(classes = DemoApplication.class)
public class MailTests {
    @Autowired
    private MailUtil mailUtil;
    @Test
    public void testTextMail() throws MessagingException {
        mailUtil.sendHtmlMail("kryanchang1997@gmail.com", "注册验证码", new StringBuffer().toString());
    }
    @Test
    public void testHello(){
        System.out.println("hello-----------------------------");
    }
}