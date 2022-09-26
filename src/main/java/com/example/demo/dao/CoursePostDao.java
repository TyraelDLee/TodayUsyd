package com.example.demo.dao;

import com.example.demo.entity.CoursePost;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface CoursePostDao extends CrudRepository<CoursePost, String> {
    List<CoursePost> findByCourseID(String courseID);
}
