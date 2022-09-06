package com.example.demo;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ApiController {

    @GetMapping("/requestClassList")
    public GetClassList getClassList(@RequestParam(value = "startRank", defaultValue = "1") int startRank, @RequestParam(value = "rankSize", defaultValue = "1") int rankSize) {
        return new GetClassList(startRank, rankSize);
    }

    @GetMapping("/requestClassInfo")
    public GetCourseInfo getClassInfo(@RequestParam(value = "coursePrefix", defaultValue = "") String coursePrefix, @RequestParam(value = "courseCode", defaultValue = "") String courseCode){
        return new GetCourseInfo(coursePrefix, courseCode);
    }
}
