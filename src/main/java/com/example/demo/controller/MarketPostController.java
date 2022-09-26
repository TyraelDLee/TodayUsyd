package com.example.demo.controller;


import com.example.demo.entity.MarketPost;
import com.example.demo.service.MarketPostService;
import com.example.demo.utils.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/Market")
@SuppressWarnings("all")
public class MarketPostController {
    @Autowired
    private MarketPostService marketPostService;


    @GetMapping("/getAllPosts")
    public Result findAllPost() {
        return new Result((List<MarketPost>) marketPostService.getAllMarketPosts());
    }

    @PostMapping("/createPost")
    public Result createPost(@RequestParam("userID") String userID, @RequestParam("category") String category, @RequestParam("subject") String subject, @RequestParam("details") String details) {
        return new Result(marketPostService.saveMarketPost(new MarketPost(userID, category, subject, details)));
    }

    @PostMapping("/likeThePost")
    public Result likeThePost(@RequestParam("marketPostID") String marketPostID, @RequestParam("userID") String userID) {
        return new Result(marketPostService.likeTheMarketPost(marketPostID));
        // To-Do
        // user should be only able to like a post once,
        // and every time the user log in, the above rule should remain working
    }

}
