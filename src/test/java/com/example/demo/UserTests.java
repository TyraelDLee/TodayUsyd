package com.example.demo;

import com.example.demo.controller.UserController;
import com.example.demo.service.UserService;
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
public class UserTests {
    @Autowired
    private UserService userService;

    @Autowired
    private UserController userController;
    @Test
    public void testUpdateLabelUser() throws MessagingException {
        userService.updateLabelUser("18",2);
        int labelDesc = userService.getUserInfo("18").getLabeldesc();
        System.out.println(labelDesc);
        if (labelDesc==2) System.out.println("true");
        else System.out.println("false");
    }
}
