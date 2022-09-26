package com.example.demo.service.impl;

import com.example.demo.dao.CoursePostDao;
import com.example.demo.entity.CoursePost;
import com.example.demo.service.CoursePostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;
import java.util.Optional;

@Service
@Transactional
@SuppressWarnings("all")
public class CoursePostServiceImpl implements CoursePostService {
    @Autowired
    private CoursePostDao coursePostDao;

    @Override
    public Iterable<CoursePost> getAllCoursePosts() {
        return coursePostDao.findAll();
    }

    @Override
    public Optional<CoursePost> findCoursePostById(String coursePostID) {
        return coursePostDao.findById(coursePostID);
    }

    @Override
    public CoursePost saveCoursePost(CoursePost coursePost) {
        return coursePostDao.save(coursePost);
    }

    @Override
    public Boolean deleteCoursePostById(String coursePostID) {
        coursePostDao.deleteById(coursePostID);
        Optional<CoursePost> coursePost = coursePostDao.findById(coursePostID);
        if (null == coursePost) {
            return true;
        }
        return false;
    }

    @Override
    public CoursePost likeTheCoursePost(String coursePostID) {
        CoursePost coursePost = coursePostDao.findById(coursePostID).orElseThrow(() -> new EntityNotFoundException(coursePostID));
        coursePost.setNumOfLikes(coursePost.getNumOfLikes() + 1);
        return coursePostDao.save(coursePost);
    }

    @Override
    public CoursePost updateTheCoursePost(String coursePostID, CoursePost newCoursePost) {
        CoursePost coursePost = coursePostDao.findById(coursePostID).orElseThrow(() -> new EntityNotFoundException(coursePostID));
        coursePost.setCourseID(newCoursePost.getCourseID());
        coursePost.setTitle(newCoursePost.getTitle());
        coursePost.setDetails(newCoursePost.getDetails());
        return coursePostDao.save(coursePost);
    }
}
