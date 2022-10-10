package com.example.demo.controller;

import com.example.demo.entity.Post;
import com.example.demo.service.FileService;
import com.example.demo.service.PostService;
import com.example.demo.utils.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.ResponseEntity;

import java.util.List;

@RestController
@RequestMapping("/Post")
@SuppressWarnings("all")
public class PostController {
    @Autowired
    private PostService postService;

    @Autowired
    private FileService fileService;

    @GetMapping("/getAllPostsByType")
    public Result findAllPost(@RequestParam("type") String type) {
        return new Result((List<Post>) postService.getPostsByType(type));
    }

    @GetMapping("/filterByCategory")
    public Result getMarketPostsByCategory(@RequestParam("category") String category) {
        return new Result(postService.getPostsByCategory(category));
    }

    @PostMapping("/createPost")
    public Result createPost(@RequestParam("userID") String userID,
                             @RequestParam("type") String type, @RequestParam("category") String category,
                             @RequestParam("title") String title, @RequestParam("details") String details,
                             @RequestParam("file") MultipartFile file) {
        Post post = postService.savePost(new Post(userID, type, category, title, details));
        String postID = post.getPostID();
        String message = "";
        try {
            fileService.storeFile(file, postID);
            message = "Uploaded the file successfully: " + file.getOriginalFilename();
        } catch (Exception e) {
            message = "Could not upload the file: " + file.getOriginalFilename() + "!";
        }
        return new Result(200, message, post);
    }

    @PutMapping("/updatePost")
    public Result updateThePost(@RequestParam("postID") String postID, @RequestParam("category") String category, @RequestParam("title") String title, @RequestParam("details") String details) {
        return new Result(postService.updatePost(postID, new Post(category, title, details)));
    }

    @PutMapping("/updatePostInvisible")
    public Result updatePostInvisible(@RequestParam("postID") String postID) {
        return new Result(postService.updatePostInvisible(postID));
    }

    @PutMapping("/updatePostIsTop")
    public Result updateThePostTop(@RequestParam("postID") String postID) {
        return new Result(postService.updatePostTop(postID));
    }

    @PutMapping("/likeThePost")
    public Result likeThePost(@RequestParam("postID") String postID, @RequestParam("userID") String userID) {
        return new Result(postService.likeThePost(postID));
        // To-Do
        // user should be only able to like a post once,
        // and every time the user log in, the above rule should remain working
    }

    @DeleteMapping("/deleteThePost")
    public Result deleteThePost(@RequestParam("postID") String postID) {
        return new Result(postService.deletePostById(postID));
    }


}
