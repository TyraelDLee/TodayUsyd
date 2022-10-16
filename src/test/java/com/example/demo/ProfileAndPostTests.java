package com.example.demo;


import com.example.demo.dao.UserProfileDao;
import com.example.demo.entity.Post;
import com.example.demo.entity.UserProfile;
import com.example.demo.service.PostService;
import com.example.demo.service.UserProfileService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

@RunWith(SpringRunner.class)
@SpringBootTest
@ContextConfiguration(classes = DemoApplication.class)
public class ProfileAndPostTests{
    @Autowired
    UserProfileService userProfileService;

    @Autowired
    PostService postService;

    Post post1 = new Post("777", "testzhetao", "market", "Rental", "ccc", "www");

    @Test
    public void testUserProfile(){
        UserProfile userProfile = userProfileService.findUserProfileByUserid("777");
        System.out.println(userProfile);
    }

    @Test
    public void testPostService(){
        List<Post> post = postService.findPostByUserId("777");
        System.out.println(post);
    }
}