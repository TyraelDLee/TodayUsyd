package com.example.demo.controller;

import com.example.demo.entity.CoursePost;
import com.example.demo.service.CoursePostService;
import com.example.demo.utils.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/Course")
@SuppressWarnings("all")
public class CoursePostController {
    @Autowired
    private CoursePostService coursePostService;


    @GetMapping("/getAllPosts")
    public Result findAllPost() {
        return new Result((List<CoursePost>) coursePostService.getAllCoursePosts());
    }

    @PostMapping("/createPost")
    public Result createPost(@RequestParam("userID") String userID, @RequestParam("courseID") String courseID, @RequestParam("title") String title, @RequestParam("details") String details) {
        return new Result(coursePostService.saveCoursePost(new CoursePost(userID, courseID, title, details)));
    }

    @PostMapping("/likeThePost")
    public Result likeThePost(@RequestParam("coursePostID") String coursePostID, @RequestParam("userID") String userID) {
        return new Result(coursePostService.likeTheCoursePost(coursePostID));
        // To-Do
        // user should be only able to like a post once,
        // and every time the user log in, the above rule should remain working
    }

}
