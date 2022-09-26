package com.example.demo.controller;


import com.example.demo.entity.CoursePost;
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

    @PutMapping("/likeThePost")
    public Result likeThePost(@RequestParam("marketPostID") String marketPostID, @RequestParam("userID") String userID) {
        return new Result(marketPostService.likeTheMarketPost(marketPostID));
        // To-Do
        // user should be only able to like a post once,
        // and every time the user log in, the above rule should remain working
    }

    @PutMapping("/updateThePost")
    public Result updateThePost(@RequestParam("marketPostID") String marketPostID, @RequestParam("category") String category, @RequestParam("subject") String subject, @RequestParam("details") String details) {
        return new Result(marketPostService.updateTheMarketPost(marketPostID, new MarketPost(category, subject, details)));
    }

    @DeleteMapping("/deleteThePost")
    public Result deleteThePost(@RequestParam("marketPostID") String marketPostID) {
        return new Result(marketPostService.deleteMarketPostById(marketPostID));
    }

    @GetMapping("filterByCategory")
    public Result getMarketPostsByCategory(@RequestParam("category") String category) {
        return new Result(marketPostService.getMarketPostsByCategory(category));
    }

}
