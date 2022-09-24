package com.example.demo.controller;


import com.example.demo.entity.Post;
import com.example.demo.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/posting")
@SuppressWarnings("all")
public class PostController {
    @Autowired
    private PostService postService;


    @GetMapping("/getPosts")
    public List<Post> findAllPost() {
        return (List<Post>) postService.getAllPosts();
    }

    @PostMapping("/createPost")
    public Post createPost(@RequestBody Post post){
        return postService.savePost(post);
    }

    @GetMapping("/likeThePost")
    public Post likeThePost(@RequestParam("PostID") String PostID, @RequestParam("UserID") String UserID){
        return postService.likeThePost(PostID);
    }

}
