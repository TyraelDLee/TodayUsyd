package com.example.demo;

import com.example.demo.entity.Post;
import com.example.demo.service.PostService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
@ContextConfiguration(classes = DemoApplication.class)
public class PostTests {
    @Autowired
    private PostService postService;

    Post post = new Post("14", "testzhetao", "market", "Careers", "ddd", "zzz");
    Post post1 = new Post("14", "testzhetao", "market", "Rental", "ccc", "www");


    @Test
    public void TestAddPost() {
        System.out.println(postService.savePost(post).toString());
    }

    @Test
    public void deletePost() {
        System.out.println(postService.deletePostById(post.getPostID()).toString());
    }

    @Test
    public void updatePost() {
        System.out.println(postService.updatePost(post.getPostID(), post1).toString());
    }

    @Test
    public void findPost() {
        System.out.println(postService.findPostByPostId(post.getPostID()).toString());
    }
}
