package com.example.demo.dao;

import com.example.demo.entity.CoursePost;
import org.springframework.data.repository.CrudRepository;

public interface CoursePostDao extends CrudRepository<CoursePost, String> {
}
