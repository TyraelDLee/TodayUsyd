package com.example.demo.controller;


import com.example.demo.entity.Post;
import com.example.demo.service.PostService;
import com.example.demo.utils.Result;
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
    public Result findAllPost() {
        return new Result((List<Post>) postService.getAllPosts());
    }

    @PostMapping("/createPost")
    public Result createPost(@RequestBody Post post){
        return new Result(postService.savePost(post));
    }

    @GetMapping("/likeThePost")
    public Result likeThePost(@RequestParam("PostID") String PostID, @RequestParam("UserID") String UserID){
        return new Result(postService.likeThePost(PostID));
        // To-Do
        // user should be only able to like a post once,
        // and every time the user log in, the above rule should remain working
    }

}
