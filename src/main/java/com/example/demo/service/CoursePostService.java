package com.example.demo.service;


import com.example.demo.entity.CoursePost;

import java.util.List;
import java.util.Optional;

public interface CoursePostService {
    Iterable<CoursePost> getAllCoursePosts();

    Optional<CoursePost> findCoursePostById(String coursePostID);

    CoursePost saveCoursePost(CoursePost coursePost);

    Boolean deleteCoursePostById(String coursePostID);

    CoursePost likeTheCoursePost(String coursePostID);

    CoursePost updateTheCoursePost(String coursePostID, CoursePost newCoursePost);

    List<CoursePost> getCoursePostsByCourseID(String courseID);
}
