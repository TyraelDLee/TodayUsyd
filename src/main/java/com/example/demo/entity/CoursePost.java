package com.example.demo.entity;


import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "coursePost")
@SuppressWarnings("all")
public class CoursePost {
    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid")
    @Column(name = "coursePostID")
    private String coursePostID;
    @Column(name = "userid")
    private String userid;
    @Column(name = "courseID")
    private String courseID;
    @Column(name = "title")
    private String title;
    @Column(name = "details")
    private String details;
    @Column(name = "numOfLikes")
    private Integer numOfLikes;

    public CoursePost(String userid, String courseID, String title, String details) {
        this.userid = userid;
        this.courseID = courseID;
        this.title = title;
        this.details = details;
        this.numOfLikes = 0;
    }

    public CoursePost(String courseID, String title, String details) {
        this.courseID = courseID;
        this.title = title;
        this.details = details;
    }

    public CoursePost() {

    }

    public String getCoursePostID() {
        return coursePostID;
    }

    public void setCoursePostID(String coursePostID) {
        this.coursePostID = coursePostID;
    }

    public String getUserid() {
        return userid;
    }

    public void setUserid(String userid) {
        this.userid = userid;
    }

    public String getCourseID() {
        return courseID;
    }

    public void setCourseID(String courseID) {
        this.courseID = courseID;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDetails() {
        return details;
    }

    public void setDetails(String details) {
        this.details = details;
    }

    public Integer getNumOfLikes() {
        return numOfLikes;
    }

    public void setNumOfLikes(Integer numOfLikes) {
        this.numOfLikes = numOfLikes;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CoursePost that = (CoursePost) o;
        return coursePostID.equals(that.coursePostID);
    }

    @Override
    public int hashCode() {
        return Objects.hash(coursePostID);
    }
}
